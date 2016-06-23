Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.parse = parse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _babylon = require('babylon');

var parser = _interopRequireWildcard(_babylon);

var _babelTraverse = require('babel-traverse');

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

'use babel';

var DEFAULT_PARAM_NAME = 'Unknown';
/* eslint-disable no-use-before-define */
var PARAM_PARSERS = {
  Identifier: parseIdentifierParam,
  AssignmentPattern: parseAssignmentParam,
  RestElement: parseRestParam,
  ObjectPattern: parseDestructuredParam
};
/* eslint-enable */

/**
 * getAST - Turns the code to the ast.
 *
 * @param {string} code The file containing the code
 *
 * @return {object} AST
 */
function getAST(code) {
  var PARSE_OPTS = { locations: true, sourceType: 'module' };
  var ast = parser.parse(code, PARSE_OPTS);
  return ast;
}

/**
 * onLine - Is the node on or one below the line?
 *
 * @param {object} node    AST node
 * @param {number} lineNum Line number to check the node against
 *
 * @return {boolean} Is the node on or below the line?
 */
function onLine(node, lineNum) {
  var startLine = node.loc.start.line;
  return startLine === lineNum || startLine - 1 === lineNum;
}

/**
 * getNode - Get the function node at the line number from the ast
 *
 * @param {object} ast     AST representing the file
 * @param {number} lineNum Line number to check the node against
 *
 * @return {object} AST function node
 */
function getNode(ast, lineNum) {
  var node = null;
  var exported = null;
  (0, _babelTraverse2['default'])(ast, {
    FunctionDeclaration: function FunctionDeclaration(declaration) {
      var n = declaration.node;
      if (onLine(n, lineNum)) {
        node = n;
        if (exported && exported.declaration === node) {
          node.loc = exported.loc;
        }
      }
    },
    VariableDeclaration: function VariableDeclaration(declaration) {
      var n = declaration.node;
      var declarator = n.declarations[0];
      if (onLine(n, lineNum) && declarator.type === 'VariableDeclarator') {
        var declaredNode = declarator.init;
        if (['FunctionExpression', 'ArrowFunctionExpression'].indexOf(declaredNode.type) > -1) {
          node = declaredNode;
          node.loc = n.loc;
          node.id = { name: declarator.id.name };
        }
      }
    },
    'ExportNamedDeclaration|ExportDefaultDeclaration': function ExportNamedDeclarationExportDefaultDeclaration(declaration) {
      exported = declaration.node;
    },
    AssignmentExpression: function AssignmentExpression(declaration) {
      var n = declaration.node;
      if (onLine(n, lineNum) && n.left.type === 'MemberExpression' && n.right.type === 'FunctionExpression') {
        node = n.right;
        node.loc = n.loc;
        node.id = { name: n.left.property.name };
      }
    }
  });
  return node;
}

/**
 * parseIdentifierParam - Parse an indentifier param to an array of parameters
 *
 * @param {object} param AST indentifier param
 *
 * @return {array} List of parameters
 */
function parseIdentifierParam(param) {
  return [{ name: param.name }];
}

/**
 * parseAssignmentParam - Parse an assignment parameter to an array of
 * parameters
 *
 * @param {object} param AST representation of an assignment parameter
 *
 * @return {array} Array of simple parameters
 */
function parseAssignmentParam(param) {
  var type = undefined;
  var defaultValue = param.right.value;

  var paramAssignmentType = param.right.type;

  if (paramAssignmentType === 'StringLiteral') {
    type = 'string';
  } else if (paramAssignmentType === 'NumericLiteral') {
    type = 'number';
  } else if (paramAssignmentType === 'BooleanLiteral') {
    type = 'boolean';
  } else if (paramAssignmentType === 'ArrayExpression') {
    type = 'array';
    defaultValue = '[]';
  } else if (paramAssignmentType === 'ObjectExpression') {
    type = 'object';
    defaultValue = '{}';
  } else {
    throw new Error('Unknown param type: ' + paramAssignmentType);
  }

  return [{ name: param.left.name, defaultValue: defaultValue, type: type }];
}

/**
 * parseRestParam - Turn a rest parameter to an array of simplified parameters
 *
 * @param {object} param AST representation of a rest parameter
 *
 * @return {array} Array of simplified parameters
 */
function parseRestParam(param) {
  return [{ name: param.argument.name, type: 'array' }];
}

/**
 * getParamParser - Get the parameter parser for the type
 *
 * @param {string} paramType AST parameter node type
 *
 * @return {function} Function that returns an array of simplified parameters
 * from that parameter node type.
 */
function getParamParser(paramType) {
  var pp = PARAM_PARSERS[paramType];
  if (!pp) {
    throw new Error('Unknown param type: ' + paramType);
  }
  return pp;
}

/**
 * parseDestructuredParam - Turn destrucutured parameters to a list of
 * simplified parameters
 *
 * @param {object} param AST representation of a destructured node parameter
 *
 * @return {array} List of simplified parameters
 */
function parseDestructuredParam(param) {
  var props = param.properties;
  var parent = DEFAULT_PARAM_NAME;

  return props.reduce(function (params, _ref) {
    var value = _ref.value;

    var pp = getParamParser(value.type);
    var newParams = pp(value).map(function (p) {
      return Object.assign({}, p, { parent: parent });
    });
    return params.concat(newParams);
  }, [{ name: parent, type: 'object' }]);
}

/**
 * simplifyParams - Take a list of parameters and return a list of simplified
 * parameters to represent them for JS Doc.
 *
 * @param {array} params List of AST reperesentation of parameters.
 *
 * @return {array} List of simplified parameters representation the AST
 * parameters.
 */
function simplifyParams(params) {
  return params.reduce(function (col, param) {
    var pp = getParamParser(param.type);
    return col.concat(pp(param));
  }, []);
}

/**
 * simplifyLocation - Take the node location and return just a line and column.
 * This is intended to represent where the JSDoc will be output (i.e. one line
 * above the function)
 *
 * @param {object} location AST function node location
 *
 * @return {object} Location AST doc should be output.
 */
function simplifyLocation(location) {
  return {
    line: Math.max(location.start.line - 1, 1),
    column: location.start.column
  };
}

/**
 * simplifyNode - Take the AST representation of the function node and simplifyNode
 * it to get just the information we need for generating a JS Doc.
 *
 * @param {object} node AST representation of the function node.
 *
 * @return {object} Simplified representation of the function node.
 */
function simplifyNode(node) {
  return {
    name: node.id.name,
    location: simplifyLocation(node.loc),
    params: simplifyParams(node.params),
    returns: { returns: false }
  };
}

/**
 * parse - Take code and a line number and return an object representing all
 * properties of the function.
 *
 * @param {string} code        Complete file
 * @param {number} [lineNum=1] Line number where the cursor is located and where
 * we will look for the function to create the object for.
 *
 * @return {object} Simplified object representing the function.
 */

function parse(code) {
  var lineNum = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

  var ast = getAST(code);
  var node = getNode(ast, lineNum);
  if (!node) {
    return null;
  }
  var simplified = simplifyNode(node);
  return simplified;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hdG9tLWVhc3ktanNkb2MvbGliL2pzZG9jL2Z1bmNQYXJzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O3VCQUV3QixTQUFTOztJQUFyQixNQUFNOzs2QkFDRyxnQkFBZ0I7Ozs7QUFIckMsV0FBVyxDQUFDOztBQUtaLElBQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDOztBQUVyQyxJQUFNLGFBQWEsR0FBRztBQUNwQixZQUFVLEVBQUUsb0JBQW9CO0FBQ2hDLG1CQUFpQixFQUFFLG9CQUFvQjtBQUN2QyxhQUFXLEVBQUUsY0FBYztBQUMzQixlQUFhLEVBQUUsc0JBQXNCO0NBQ3RDLENBQUM7Ozs7Ozs7Ozs7QUFVRixTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDcEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQztBQUM3RCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUMzQyxTQUFPLEdBQUcsQ0FBQztDQUNaOzs7Ozs7Ozs7O0FBVUQsU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUM3QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDdEMsU0FBTyxTQUFTLEtBQUssT0FBTyxJQUFJLFNBQVMsR0FBRyxDQUFDLEtBQUssT0FBTyxDQUFDO0NBQzNEOzs7Ozs7Ozs7O0FBVUQsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUM3QixNQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsTUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLGtDQUFTLEdBQUcsRUFBRTtBQUNaLHVCQUFtQixFQUFFLDZCQUFDLFdBQVcsRUFBSztBQUNwQyxVQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQzNCLFVBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRTtBQUN0QixZQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ1QsWUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7QUFDN0MsY0FBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1NBQ3pCO09BQ0Y7S0FDRjtBQUNELHVCQUFtQixFQUFFLDZCQUFDLFdBQVcsRUFBSztBQUNwQyxVQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0FBQzNCLFVBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsVUFBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssb0JBQW9CLEVBQUU7QUFDbEUsWUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztBQUNyQyxZQUFJLENBQUMsb0JBQW9CLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3JGLGNBQUksR0FBRyxZQUFZLENBQUM7QUFDcEIsY0FBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2pCLGNBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN4QztPQUNGO0tBQ0Y7QUFDRCxxREFBaUQsRUFBRSx3REFBQyxXQUFXLEVBQUs7QUFDbEUsY0FBUSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7S0FDN0I7QUFDRCx3QkFBb0IsRUFBRSw4QkFBQyxXQUFXLEVBQUs7QUFDckMsVUFBTSxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztBQUMzQixVQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssa0JBQWtCLElBQ3ZELENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLG9CQUFvQixFQUFFO0FBQzFDLFlBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2YsWUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDMUM7S0FDRjtHQUNGLENBQUMsQ0FBQztBQUNILFNBQU8sSUFBSSxDQUFDO0NBQ2I7Ozs7Ozs7OztBQVNELFNBQVMsb0JBQW9CLENBQUMsS0FBSyxFQUFFO0FBQ25DLFNBQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztDQUMvQjs7Ozs7Ozs7OztBQVVELFNBQVMsb0JBQW9CLENBQUMsS0FBSyxFQUFFO0FBQ25DLE1BQUksSUFBSSxZQUFBLENBQUM7QUFDVCxNQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzs7QUFFckMsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7QUFFN0MsTUFBSSxtQkFBbUIsS0FBSyxlQUFlLEVBQUU7QUFDM0MsUUFBSSxHQUFHLFFBQVEsQ0FBQztHQUNqQixNQUFNLElBQUksbUJBQW1CLEtBQUssZ0JBQWdCLEVBQUU7QUFDbkQsUUFBSSxHQUFHLFFBQVEsQ0FBQztHQUNqQixNQUFNLElBQUksbUJBQW1CLEtBQUssZ0JBQWdCLEVBQUU7QUFDbkQsUUFBSSxHQUFHLFNBQVMsQ0FBQztHQUNsQixNQUFNLElBQUksbUJBQW1CLEtBQUssaUJBQWlCLEVBQUU7QUFDcEQsUUFBSSxHQUFHLE9BQU8sQ0FBQztBQUNmLGdCQUFZLEdBQUcsSUFBSSxDQUFDO0dBQ3JCLE1BQU0sSUFBSSxtQkFBbUIsS0FBSyxrQkFBa0IsRUFBRTtBQUNyRCxRQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ2hCLGdCQUFZLEdBQUcsSUFBSSxDQUFDO0dBQ3JCLE1BQU07QUFDTCxVQUFNLElBQUksS0FBSywwQkFBd0IsbUJBQW1CLENBQUcsQ0FBQztHQUMvRDs7QUFFRCxTQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFaLFlBQVksRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLENBQUMsQ0FBQztDQUN4RDs7Ozs7Ozs7O0FBU0QsU0FBUyxjQUFjLENBQUMsS0FBSyxFQUFFO0FBQzdCLFNBQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztDQUN2RDs7Ozs7Ozs7OztBQVVELFNBQVMsY0FBYyxDQUFDLFNBQVMsRUFBRTtBQUNqQyxNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDcEMsTUFBSSxDQUFDLEVBQUUsRUFBRTtBQUNQLFVBQU0sSUFBSSxLQUFLLDBCQUF3QixTQUFTLENBQUcsQ0FBQztHQUNyRDtBQUNELFNBQU8sRUFBRSxDQUFDO0NBQ1g7Ozs7Ozs7Ozs7QUFVRCxTQUFTLHNCQUFzQixDQUFDLEtBQUssRUFBRTtBQUNyQyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0FBQy9CLE1BQU0sTUFBTSxHQUFHLGtCQUFrQixDQUFDOztBQUVsQyxTQUFPLEtBQUssQ0FDVCxNQUFNLENBQUMsVUFBQyxNQUFNLEVBQUUsSUFBUyxFQUFLO1FBQVosS0FBSyxHQUFQLElBQVMsQ0FBUCxLQUFLOztBQUN0QixRQUFNLEVBQUUsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLFFBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDO2FBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxDQUFDO0tBQUEsQ0FBQyxDQUFDO0FBQ3pFLFdBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztHQUNqQyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Q0FDMUM7Ozs7Ozs7Ozs7O0FBV0QsU0FBUyxjQUFjLENBQUMsTUFBTSxFQUFFO0FBQzlCLFNBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUs7QUFDbkMsUUFBTSxFQUFFLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxXQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7R0FDOUIsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNSOzs7Ozs7Ozs7OztBQVdELFNBQVMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0FBQ2xDLFNBQU87QUFDTCxRQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLFVBQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU07R0FDOUIsQ0FBQztDQUNIOzs7Ozs7Ozs7O0FBVUQsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFO0FBQzFCLFNBQU87QUFDTCxRQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJO0FBQ2xCLFlBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3BDLFVBQU0sRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUNuQyxXQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO0dBQzVCLENBQUM7Q0FDSDs7Ozs7Ozs7Ozs7OztBQVlNLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBZTtNQUFiLE9BQU8seURBQUcsQ0FBQzs7QUFDckMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkMsTUFBSSxDQUFDLElBQUksRUFBRTtBQUNULFdBQU8sSUFBSSxDQUFDO0dBQ2I7QUFDRCxNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsU0FBTyxVQUFVLENBQUM7Q0FDbkIiLCJmaWxlIjoiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F0b20tZWFzeS1qc2RvYy9saWIvanNkb2MvZnVuY1BhcnNlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5pbXBvcnQgKiBhcyBwYXJzZXIgZnJvbSAnYmFieWxvbic7XG5pbXBvcnQgdHJhdmVyc2UgZnJvbSAnYmFiZWwtdHJhdmVyc2UnO1xuXG5jb25zdCBERUZBVUxUX1BBUkFNX05BTUUgPSAnVW5rbm93bic7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuY29uc3QgUEFSQU1fUEFSU0VSUyA9IHtcbiAgSWRlbnRpZmllcjogcGFyc2VJZGVudGlmaWVyUGFyYW0sXG4gIEFzc2lnbm1lbnRQYXR0ZXJuOiBwYXJzZUFzc2lnbm1lbnRQYXJhbSxcbiAgUmVzdEVsZW1lbnQ6IHBhcnNlUmVzdFBhcmFtLFxuICBPYmplY3RQYXR0ZXJuOiBwYXJzZURlc3RydWN0dXJlZFBhcmFtLFxufTtcbi8qIGVzbGludC1lbmFibGUgKi9cblxuLyoqXG4gKiBnZXRBU1QgLSBUdXJucyB0aGUgY29kZSB0byB0aGUgYXN0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIFRoZSBmaWxlIGNvbnRhaW5pbmcgdGhlIGNvZGVcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IEFTVFxuICovXG5mdW5jdGlvbiBnZXRBU1QoY29kZSkge1xuICBjb25zdCBQQVJTRV9PUFRTID0geyBsb2NhdGlvbnM6IHRydWUsIHNvdXJjZVR5cGU6ICdtb2R1bGUnIH07XG4gIGNvbnN0IGFzdCA9IHBhcnNlci5wYXJzZShjb2RlLCBQQVJTRV9PUFRTKTtcbiAgcmV0dXJuIGFzdDtcbn1cblxuLyoqXG4gKiBvbkxpbmUgLSBJcyB0aGUgbm9kZSBvbiBvciBvbmUgYmVsb3cgdGhlIGxpbmU/XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG5vZGUgICAgQVNUIG5vZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lTnVtIExpbmUgbnVtYmVyIHRvIGNoZWNrIHRoZSBub2RlIGFnYWluc3RcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufSBJcyB0aGUgbm9kZSBvbiBvciBiZWxvdyB0aGUgbGluZT9cbiAqL1xuZnVuY3Rpb24gb25MaW5lKG5vZGUsIGxpbmVOdW0pIHtcbiAgY29uc3Qgc3RhcnRMaW5lID0gbm9kZS5sb2Muc3RhcnQubGluZTtcbiAgcmV0dXJuIHN0YXJ0TGluZSA9PT0gbGluZU51bSB8fCBzdGFydExpbmUgLSAxID09PSBsaW5lTnVtO1xufVxuXG4vKipcbiAqIGdldE5vZGUgLSBHZXQgdGhlIGZ1bmN0aW9uIG5vZGUgYXQgdGhlIGxpbmUgbnVtYmVyIGZyb20gdGhlIGFzdFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhc3QgICAgIEFTVCByZXByZXNlbnRpbmcgdGhlIGZpbGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lTnVtIExpbmUgbnVtYmVyIHRvIGNoZWNrIHRoZSBub2RlIGFnYWluc3RcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IEFTVCBmdW5jdGlvbiBub2RlXG4gKi9cbmZ1bmN0aW9uIGdldE5vZGUoYXN0LCBsaW5lTnVtKSB7XG4gIGxldCBub2RlID0gbnVsbDtcbiAgbGV0IGV4cG9ydGVkID0gbnVsbDtcbiAgdHJhdmVyc2UoYXN0LCB7XG4gICAgRnVuY3Rpb25EZWNsYXJhdGlvbjogKGRlY2xhcmF0aW9uKSA9PiB7XG4gICAgICBjb25zdCBuID0gZGVjbGFyYXRpb24ubm9kZTtcbiAgICAgIGlmIChvbkxpbmUobiwgbGluZU51bSkpIHtcbiAgICAgICAgbm9kZSA9IG47XG4gICAgICAgIGlmIChleHBvcnRlZCAmJiBleHBvcnRlZC5kZWNsYXJhdGlvbiA9PT0gbm9kZSkge1xuICAgICAgICAgIG5vZGUubG9jID0gZXhwb3J0ZWQubG9jO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBWYXJpYWJsZURlY2xhcmF0aW9uOiAoZGVjbGFyYXRpb24pID0+IHtcbiAgICAgIGNvbnN0IG4gPSBkZWNsYXJhdGlvbi5ub2RlO1xuICAgICAgY29uc3QgZGVjbGFyYXRvciA9IG4uZGVjbGFyYXRpb25zWzBdO1xuICAgICAgaWYgKG9uTGluZShuLCBsaW5lTnVtKSAmJiBkZWNsYXJhdG9yLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0b3InKSB7XG4gICAgICAgIGNvbnN0IGRlY2xhcmVkTm9kZSA9IGRlY2xhcmF0b3IuaW5pdDtcbiAgICAgICAgaWYgKFsnRnVuY3Rpb25FeHByZXNzaW9uJywgJ0Fycm93RnVuY3Rpb25FeHByZXNzaW9uJ10uaW5kZXhPZihkZWNsYXJlZE5vZGUudHlwZSkgPiAtMSkge1xuICAgICAgICAgIG5vZGUgPSBkZWNsYXJlZE5vZGU7XG4gICAgICAgICAgbm9kZS5sb2MgPSBuLmxvYztcbiAgICAgICAgICBub2RlLmlkID0geyBuYW1lOiBkZWNsYXJhdG9yLmlkLm5hbWUgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb258RXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJzogKGRlY2xhcmF0aW9uKSA9PiB7XG4gICAgICBleHBvcnRlZCA9IGRlY2xhcmF0aW9uLm5vZGU7XG4gICAgfSxcbiAgICBBc3NpZ25tZW50RXhwcmVzc2lvbjogKGRlY2xhcmF0aW9uKSA9PiB7XG4gICAgICBjb25zdCBuID0gZGVjbGFyYXRpb24ubm9kZTtcbiAgICAgIGlmIChvbkxpbmUobiwgbGluZU51bSkgJiYgbi5sZWZ0LnR5cGUgPT09ICdNZW1iZXJFeHByZXNzaW9uJ1xuICAgICAgICAmJiBuLnJpZ2h0LnR5cGUgPT09ICdGdW5jdGlvbkV4cHJlc3Npb24nKSB7XG4gICAgICAgIG5vZGUgPSBuLnJpZ2h0O1xuICAgICAgICBub2RlLmxvYyA9IG4ubG9jO1xuICAgICAgICBub2RlLmlkID0geyBuYW1lOiBuLmxlZnQucHJvcGVydHkubmFtZSB9O1xuICAgICAgfVxuICAgIH0sXG4gIH0pO1xuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBwYXJzZUlkZW50aWZpZXJQYXJhbSAtIFBhcnNlIGFuIGluZGVudGlmaWVyIHBhcmFtIHRvIGFuIGFycmF5IG9mIHBhcmFtZXRlcnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW0gQVNUIGluZGVudGlmaWVyIHBhcmFtXG4gKlxuICogQHJldHVybiB7YXJyYXl9IExpc3Qgb2YgcGFyYW1ldGVyc1xuICovXG5mdW5jdGlvbiBwYXJzZUlkZW50aWZpZXJQYXJhbShwYXJhbSkge1xuICByZXR1cm4gW3sgbmFtZTogcGFyYW0ubmFtZSB9XTtcbn1cblxuLyoqXG4gKiBwYXJzZUFzc2lnbm1lbnRQYXJhbSAtIFBhcnNlIGFuIGFzc2lnbm1lbnQgcGFyYW1ldGVyIHRvIGFuIGFycmF5IG9mXG4gKiBwYXJhbWV0ZXJzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtIEFTVCByZXByZXNlbnRhdGlvbiBvZiBhbiBhc3NpZ25tZW50IHBhcmFtZXRlclxuICpcbiAqIEByZXR1cm4ge2FycmF5fSBBcnJheSBvZiBzaW1wbGUgcGFyYW1ldGVyc1xuICovXG5mdW5jdGlvbiBwYXJzZUFzc2lnbm1lbnRQYXJhbShwYXJhbSkge1xuICBsZXQgdHlwZTtcbiAgbGV0IGRlZmF1bHRWYWx1ZSA9IHBhcmFtLnJpZ2h0LnZhbHVlO1xuXG4gIGNvbnN0IHBhcmFtQXNzaWdubWVudFR5cGUgPSBwYXJhbS5yaWdodC50eXBlO1xuXG4gIGlmIChwYXJhbUFzc2lnbm1lbnRUeXBlID09PSAnU3RyaW5nTGl0ZXJhbCcpIHtcbiAgICB0eXBlID0gJ3N0cmluZyc7XG4gIH0gZWxzZSBpZiAocGFyYW1Bc3NpZ25tZW50VHlwZSA9PT0gJ051bWVyaWNMaXRlcmFsJykge1xuICAgIHR5cGUgPSAnbnVtYmVyJztcbiAgfSBlbHNlIGlmIChwYXJhbUFzc2lnbm1lbnRUeXBlID09PSAnQm9vbGVhbkxpdGVyYWwnKSB7XG4gICAgdHlwZSA9ICdib29sZWFuJztcbiAgfSBlbHNlIGlmIChwYXJhbUFzc2lnbm1lbnRUeXBlID09PSAnQXJyYXlFeHByZXNzaW9uJykge1xuICAgIHR5cGUgPSAnYXJyYXknO1xuICAgIGRlZmF1bHRWYWx1ZSA9ICdbXSc7XG4gIH0gZWxzZSBpZiAocGFyYW1Bc3NpZ25tZW50VHlwZSA9PT0gJ09iamVjdEV4cHJlc3Npb24nKSB7XG4gICAgdHlwZSA9ICdvYmplY3QnO1xuICAgIGRlZmF1bHRWYWx1ZSA9ICd7fSc7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBhcmFtIHR5cGU6ICR7cGFyYW1Bc3NpZ25tZW50VHlwZX1gKTtcbiAgfVxuXG4gIHJldHVybiBbeyBuYW1lOiBwYXJhbS5sZWZ0Lm5hbWUsIGRlZmF1bHRWYWx1ZSwgdHlwZSB9XTtcbn1cblxuLyoqXG4gKiBwYXJzZVJlc3RQYXJhbSAtIFR1cm4gYSByZXN0IHBhcmFtZXRlciB0byBhbiBhcnJheSBvZiBzaW1wbGlmaWVkIHBhcmFtZXRlcnNcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW0gQVNUIHJlcHJlc2VudGF0aW9uIG9mIGEgcmVzdCBwYXJhbWV0ZXJcbiAqXG4gKiBAcmV0dXJuIHthcnJheX0gQXJyYXkgb2Ygc2ltcGxpZmllZCBwYXJhbWV0ZXJzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUmVzdFBhcmFtKHBhcmFtKSB7XG4gIHJldHVybiBbeyBuYW1lOiBwYXJhbS5hcmd1bWVudC5uYW1lLCB0eXBlOiAnYXJyYXknIH1dO1xufVxuXG4vKipcbiAqIGdldFBhcmFtUGFyc2VyIC0gR2V0IHRoZSBwYXJhbWV0ZXIgcGFyc2VyIGZvciB0aGUgdHlwZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbVR5cGUgQVNUIHBhcmFtZXRlciBub2RlIHR5cGVcbiAqXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGFycmF5IG9mIHNpbXBsaWZpZWQgcGFyYW1ldGVyc1xuICogZnJvbSB0aGF0IHBhcmFtZXRlciBub2RlIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIGdldFBhcmFtUGFyc2VyKHBhcmFtVHlwZSkge1xuICBjb25zdCBwcCA9IFBBUkFNX1BBUlNFUlNbcGFyYW1UeXBlXTtcbiAgaWYgKCFwcCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBwYXJhbSB0eXBlOiAke3BhcmFtVHlwZX1gKTtcbiAgfVxuICByZXR1cm4gcHA7XG59XG5cbi8qKlxuICogcGFyc2VEZXN0cnVjdHVyZWRQYXJhbSAtIFR1cm4gZGVzdHJ1Y3V0dXJlZCBwYXJhbWV0ZXJzIHRvIGEgbGlzdCBvZlxuICogc2ltcGxpZmllZCBwYXJhbWV0ZXJzXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtIEFTVCByZXByZXNlbnRhdGlvbiBvZiBhIGRlc3RydWN0dXJlZCBub2RlIHBhcmFtZXRlclxuICpcbiAqIEByZXR1cm4ge2FycmF5fSBMaXN0IG9mIHNpbXBsaWZpZWQgcGFyYW1ldGVyc1xuICovXG5mdW5jdGlvbiBwYXJzZURlc3RydWN0dXJlZFBhcmFtKHBhcmFtKSB7XG4gIGNvbnN0IHByb3BzID0gcGFyYW0ucHJvcGVydGllcztcbiAgY29uc3QgcGFyZW50ID0gREVGQVVMVF9QQVJBTV9OQU1FO1xuXG4gIHJldHVybiBwcm9wc1xuICAgIC5yZWR1Y2UoKHBhcmFtcywgeyB2YWx1ZSB9KSA9PiB7XG4gICAgICBjb25zdCBwcCA9IGdldFBhcmFtUGFyc2VyKHZhbHVlLnR5cGUpO1xuICAgICAgY29uc3QgbmV3UGFyYW1zID0gcHAodmFsdWUpLm1hcCgocCkgPT4gT2JqZWN0LmFzc2lnbih7fSwgcCwgeyBwYXJlbnQgfSkpO1xuICAgICAgcmV0dXJuIHBhcmFtcy5jb25jYXQobmV3UGFyYW1zKTtcbiAgICB9LCBbeyBuYW1lOiBwYXJlbnQsIHR5cGU6ICdvYmplY3QnIH1dKTtcbn1cblxuLyoqXG4gKiBzaW1wbGlmeVBhcmFtcyAtIFRha2UgYSBsaXN0IG9mIHBhcmFtZXRlcnMgYW5kIHJldHVybiBhIGxpc3Qgb2Ygc2ltcGxpZmllZFxuICogcGFyYW1ldGVycyB0byByZXByZXNlbnQgdGhlbSBmb3IgSlMgRG9jLlxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IHBhcmFtcyBMaXN0IG9mIEFTVCByZXBlcmVzZW50YXRpb24gb2YgcGFyYW1ldGVycy5cbiAqXG4gKiBAcmV0dXJuIHthcnJheX0gTGlzdCBvZiBzaW1wbGlmaWVkIHBhcmFtZXRlcnMgcmVwcmVzZW50YXRpb24gdGhlIEFTVFxuICogcGFyYW1ldGVycy5cbiAqL1xuZnVuY3Rpb24gc2ltcGxpZnlQYXJhbXMocGFyYW1zKSB7XG4gIHJldHVybiBwYXJhbXMucmVkdWNlKChjb2wsIHBhcmFtKSA9PiB7XG4gICAgY29uc3QgcHAgPSBnZXRQYXJhbVBhcnNlcihwYXJhbS50eXBlKTtcbiAgICByZXR1cm4gY29sLmNvbmNhdChwcChwYXJhbSkpO1xuICB9LCBbXSk7XG59XG5cbi8qKlxuICogc2ltcGxpZnlMb2NhdGlvbiAtIFRha2UgdGhlIG5vZGUgbG9jYXRpb24gYW5kIHJldHVybiBqdXN0IGEgbGluZSBhbmQgY29sdW1uLlxuICogVGhpcyBpcyBpbnRlbmRlZCB0byByZXByZXNlbnQgd2hlcmUgdGhlIEpTRG9jIHdpbGwgYmUgb3V0cHV0IChpLmUuIG9uZSBsaW5lXG4gKiBhYm92ZSB0aGUgZnVuY3Rpb24pXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGxvY2F0aW9uIEFTVCBmdW5jdGlvbiBub2RlIGxvY2F0aW9uXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBMb2NhdGlvbiBBU1QgZG9jIHNob3VsZCBiZSBvdXRwdXQuXG4gKi9cbmZ1bmN0aW9uIHNpbXBsaWZ5TG9jYXRpb24obG9jYXRpb24pIHtcbiAgcmV0dXJuIHtcbiAgICBsaW5lOiBNYXRoLm1heChsb2NhdGlvbi5zdGFydC5saW5lIC0gMSwgMSksXG4gICAgY29sdW1uOiBsb2NhdGlvbi5zdGFydC5jb2x1bW4sXG4gIH07XG59XG5cbi8qKlxuICogc2ltcGxpZnlOb2RlIC0gVGFrZSB0aGUgQVNUIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBmdW5jdGlvbiBub2RlIGFuZCBzaW1wbGlmeU5vZGVcbiAqIGl0IHRvIGdldCBqdXN0IHRoZSBpbmZvcm1hdGlvbiB3ZSBuZWVkIGZvciBnZW5lcmF0aW5nIGEgSlMgRG9jLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBub2RlIEFTVCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZnVuY3Rpb24gbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9IFNpbXBsaWZpZWQgcmVwcmVzZW50YXRpb24gb2YgdGhlIGZ1bmN0aW9uIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIHNpbXBsaWZ5Tm9kZShub2RlKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbm9kZS5pZC5uYW1lLFxuICAgIGxvY2F0aW9uOiBzaW1wbGlmeUxvY2F0aW9uKG5vZGUubG9jKSxcbiAgICBwYXJhbXM6IHNpbXBsaWZ5UGFyYW1zKG5vZGUucGFyYW1zKSxcbiAgICByZXR1cm5zOiB7IHJldHVybnM6IGZhbHNlIH0sXG4gIH07XG59XG5cbi8qKlxuICogcGFyc2UgLSBUYWtlIGNvZGUgYW5kIGEgbGluZSBudW1iZXIgYW5kIHJldHVybiBhbiBvYmplY3QgcmVwcmVzZW50aW5nIGFsbFxuICogcHJvcGVydGllcyBvZiB0aGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgICAgICAgIENvbXBsZXRlIGZpbGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGluZU51bT0xXSBMaW5lIG51bWJlciB3aGVyZSB0aGUgY3Vyc29yIGlzIGxvY2F0ZWQgYW5kIHdoZXJlXG4gKiB3ZSB3aWxsIGxvb2sgZm9yIHRoZSBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIG9iamVjdCBmb3IuXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBTaW1wbGlmaWVkIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UoY29kZSwgbGluZU51bSA9IDEpIHtcbiAgY29uc3QgYXN0ID0gZ2V0QVNUKGNvZGUpO1xuICBjb25zdCBub2RlID0gZ2V0Tm9kZShhc3QsIGxpbmVOdW0pO1xuICBpZiAoIW5vZGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBzaW1wbGlmaWVkID0gc2ltcGxpZnlOb2RlKG5vZGUpO1xuICByZXR1cm4gc2ltcGxpZmllZDtcbn1cbiJdfQ==
//# sourceURL=/Users/broberto/.atom/packages/atom-easy-jsdoc/lib/jsdoc/funcParser.js
