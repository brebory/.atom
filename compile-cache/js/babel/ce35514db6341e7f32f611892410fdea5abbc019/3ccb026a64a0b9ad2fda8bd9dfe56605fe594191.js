'use babel';

/**
 * padString - Increase length of string to the defined length padding the right
 * side.
 *
 * @param {String} str    String to pad
 * @param {Number} length Length to increase it to
 *
 * @return {String} String padded to the correct length
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.render = render;
function padString(str, length) {
  var spacer = ' ';
  var padding = spacer.repeat(length - str.length);
  return '' + str + padding;
}

/**
 * renderParam - Render a function parameter as a param property.
 *
 * @param {Number} nameLength     Max name length of the parameters
 * @param {Number} typeLength     Max type length of the parameters
 * @param {Object} Parameter      Object representing the parameters
 * @param {String} Parameter.name Name of the parameter
 * @param {String} Parameter.type Type of the parameter
 *
 * @return {type} Description
 */
function renderParam(nameLength, typeLength, _ref) {
  var name = _ref.name;
  var type = _ref.type;

  var paddedName = padString(name, nameLength);
  var paddedType = padString('' + type, typeLength);
  return ' * @param ' + paddedType + ' ' + paddedName + ' Description';
}

/**
 * sortNum - Comparison of numbers for sorting.
 *
 * @param {int} a First number
 * @param {int} b Second number
 *
 * @returns {int} A negative value if a less than b, a positive if b is less
 * than a and 0 if they are the same.
 */
function sortNum(a, b) {
  return a - b;
}

/**
 * maxPropertyLength - Get the max length of a property from a list of objects.
 *
 * @param {Array}  arr      List of objects
 * @param {String} propName Property name in each of the objects
 *
 * @return {Number} Max length of the property in the array of objects.
 */
function maxPropertyLength(arr, propName) {
  return arr.map(function (obj) {
    return (obj[propName] || '').length;
  }).sort(sortNum).reverse()[0];
}

/**
 * jsdocifyParams - Simplify the param object structure. JS Doc uses param name
 * to hold default value and parent values.
 *
 * @param {Array} params List of parameters
 *
 * @return {Array} Simple parameter objects with name and type.
 */
function jsdocifyParams(params) {
  return params.map(function (_ref2) {
    var _ref2$type = _ref2.type;
    var type = _ref2$type === undefined ? 'type' : _ref2$type;
    var name = _ref2.name;
    var defaultValue = _ref2.defaultValue;
    var parent = _ref2.parent;

    var tidiedName = name;
    if (parent) {
      tidiedName = parent + '.' + tidiedName;
    }
    if (defaultValue) {
      tidiedName = '[' + tidiedName + '=' + defaultValue + ']';
    }

    return {
      type: '{' + type + '}',
      name: tidiedName
    };
  });
}

/**
 * renderParams - Render the params array as JS Doc params
 *
 * @param {Array} funcParams List of function parameters
 *
 * @return {Array} List of string lines representing function parameters
 */
function renderParams(funcParams) {
  var jsdocParams = jsdocifyParams(funcParams);

  var maxNameLength = maxPropertyLength(jsdocParams, 'name');
  var maxTypeLength = maxPropertyLength(jsdocParams, 'type');

  return jsdocParams.map(renderParam.bind(null, maxNameLength, maxTypeLength));
}

/**
 * render - Take a structure describing a function and render the JS Doc to
 * represent it.
 *
 * @param {Object} Structure                           Complete structure
 * @param {String} Structure.name                      Function name
 * @param {String} [Structure.description=Description] Function description
 * @param {Array}  [Structure.params=Array]            Array of params objects
 * @param {Object} [Structure.returns=Object]          Definition of returns
 *
 * @return {String} JS Doc comment
 */

function render(_ref3) {
  var name = _ref3.name;
  var _ref3$description = _ref3.description;
  var description = _ref3$description === undefined ? 'Description' : _ref3$description;
  var _ref3$params = _ref3.params;
  var params = _ref3$params === undefined ? [] : _ref3$params;
  var _ref3$returns = _ref3.returns;
  var returns = _ref3$returns === undefined ? {} : _ref3$returns;
  var _ref3$location = _ref3.location;
  var location = _ref3$location === undefined ? {} : _ref3$location;

  var open = '/**';
  var spacer = ' *';
  var nameLine = ' * ' + name + ' - ' + description;
  var returnKeyword = returns.returns ? 'returns' : 'return';
  var returnLine = ' * @' + returnKeyword + ' {type} Description';
  var close = ' */';
  var linePadder = ' ';

  var header = [open, nameLine, spacer];
  var footer = [returnLine, close];

  var renderedParams = renderParams(params);
  if (renderedParams.length > 0) {
    renderedParams.push(spacer);
  }

  var lines = header.concat(renderedParams).concat(footer);

  var _location$column = location.column;
  var column = _location$column === undefined ? 0 : _location$column;

  var indentation = linePadder.repeat(column);

  return lines.map(function (line) {
    return '' + indentation + line;
  }).join('\n');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hdG9tLWVhc3ktanNkb2MvbGliL2pzZG9jL3JlbmRlcmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBV1osU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUM5QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDbkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25ELGNBQVUsR0FBRyxHQUFHLE9BQU8sQ0FBRztDQUMzQjs7Ozs7Ozs7Ozs7OztBQWFELFNBQVMsV0FBVyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBYyxFQUFFO01BQWQsSUFBSSxHQUFOLElBQWMsQ0FBWixJQUFJO01BQUUsSUFBSSxHQUFaLElBQWMsQ0FBTixJQUFJOztBQUN2RCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sVUFBVSxHQUFHLFNBQVMsTUFBSSxJQUFJLEVBQUksVUFBVSxDQUFDLENBQUM7QUFDcEQsd0JBQW9CLFVBQVUsU0FBSSxVQUFVLGtCQUFlO0NBQzVEOzs7Ozs7Ozs7OztBQVdELFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckIsU0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2Q7Ozs7Ozs7Ozs7QUFVRCxTQUFTLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUU7QUFDeEMsU0FBTyxHQUFHLENBQ1AsR0FBRyxDQUFDLFVBQUEsR0FBRztXQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxDQUFFLE1BQU07R0FBQSxDQUFDLENBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDYixPQUFPLEVBQUUsQ0FBQyxDQUFD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VyxHQUFHLElBQUk7R0FBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ2hFIiwiZmlsZSI6Ii9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hdG9tLWVhc3ktanNkb2MvbGliL2pzZG9jL3JlbmRlcmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbi8qKlxuICogcGFkU3RyaW5nIC0gSW5jcmVhc2UgbGVuZ3RoIG9mIHN0cmluZyB0byB0aGUgZGVmaW5lZCBsZW5ndGggcGFkZGluZyB0aGUgcmlnaHRcbiAqIHNpZGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciAgICBTdHJpbmcgdG8gcGFkXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIExlbmd0aCB0byBpbmNyZWFzZSBpdCB0b1xuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gU3RyaW5nIHBhZGRlZCB0byB0aGUgY29ycmVjdCBsZW5ndGhcbiAqL1xuZnVuY3Rpb24gcGFkU3RyaW5nKHN0ciwgbGVuZ3RoKSB7XG4gIGNvbnN0IHNwYWNlciA9ICcgJztcbiAgY29uc3QgcGFkZGluZyA9IHNwYWNlci5yZXBlYXQobGVuZ3RoIC0gc3RyLmxlbmd0aCk7XG4gIHJldHVybiBgJHtzdHJ9JHtwYWRkaW5nfWA7XG59XG5cbi8qKlxuICogcmVuZGVyUGFyYW0gLSBSZW5kZXIgYSBmdW5jdGlvbiBwYXJhbWV0ZXIgYXMgYSBwYXJhbSBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbmFtZUxlbmd0aCAgICAgTWF4IG5hbWUgbGVuZ3RoIG9mIHRoZSBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge051bWJlcn0gdHlwZUxlbmd0aCAgICAgTWF4IHR5cGUgbGVuZ3RoIG9mIHRoZSBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gUGFyYW1ldGVyICAgICAgT2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtTdHJpbmd9IFBhcmFtZXRlci5uYW1lIE5hbWUgb2YgdGhlIHBhcmFtZXRlclxuICogQHBhcmFtIHtTdHJpbmd9IFBhcmFtZXRlci50eXBlIFR5cGUgb2YgdGhlIHBhcmFtZXRlclxuICpcbiAqIEByZXR1cm4ge3R5cGV9IERlc2NyaXB0aW9uXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclBhcmFtKG5hbWVMZW5ndGgsIHR5cGVMZW5ndGgsIHsgbmFtZSwgdHlwZSB9KSB7XG4gIGNvbnN0IHBhZGRlZE5hbWUgPSBwYWRTdHJpbmcobmFtZSwgbmFtZUxlbmd0aCk7XG4gIGNvbnN0IHBhZGRlZFR5cGUgPSBwYWRTdHJpbmcoYCR7dHlwZX1gLCB0eXBlTGVuZ3RoKTtcbiAgcmV0dXJuIGAgKiBAcGFyYW0gJHtwYWRkZWRUeXBlfSAke3BhZGRlZE5hbWV9IERlc2NyaXB0aW9uYDtcbn1cblxuLyoqXG4gKiBzb3J0TnVtIC0gQ29tcGFyaXNvbiBvZiBudW1iZXJzIGZvciBzb3J0aW5nLlxuICpcbiAqIEBwYXJhbSB7aW50fSBhIEZpcnN0IG51bWJlclxuICogQHBhcmFtIHtpbnR9IGIgU2Vjb25kIG51bWJlclxuICpcbiAqIEByZXR1cm5zIHtpbnR9IEEgbmVnYXRpdmUgdmFsdWUgaWYgYSBsZXNzIHRoYW4gYiwgYSBwb3NpdGl2ZSBpZiBiIGlzIGxlc3NcbiAqIHRoYW4gYSBhbmQgMCBpZiB0aGV5IGFyZSB0aGUgc2FtZS5cbiAqL1xuZnVuY3Rpb24gc29ydE51bShhLCBiKSB7XG4gIHJldHVybiBhIC0gYjtcbn1cblxuLyoqXG4gKiBtYXhQcm9wZXJ0eUxlbmd0aCAtIEdldCB0aGUgbWF4IGxlbmd0aCBvZiBhIHByb3BlcnR5IGZyb20gYSBsaXN0IG9mIG9iamVjdHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gIGFyciAgICAgIExpc3Qgb2Ygb2JqZWN0c1xuICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lIFByb3BlcnR5IG5hbWUgaW4gZWFjaCBvZiB0aGUgb2JqZWN0c1xuICpcbiAqIEByZXR1cm4ge051bWJlcn0gTWF4IGxlbmd0aCBvZiB0aGUgcHJvcGVydHkgaW4gdGhlIGFycmF5IG9mIG9iamVjdHMuXG4gKi9cbmZ1bmN0aW9uIG1heFByb3BlcnR5TGVuZ3RoKGFyciwgcHJvcE5hbWUpIHtcbiAgcmV0dXJuIGFyclxuICAgIC5tYXAob2JqID0+IChvYmpbcHJvcE5hbWVdIHx8ICcnKS5sZW5ndGgpXG4gICAgLnNvcnQoc29ydE51bSlcbiAgICAucmV2ZXJzZSgpWzBdO1xufVxuXG4vKipcbiAqIGpzZG9jaWZ5UGFyYW1zIC0gU2ltcGxpZnkgdGhlIHBhcmFtIG9iamVjdCBzdHJ1Y3R1cmUuIEpTIERvYyB1c2VzIHBhcmFtIG5hbWVcbiAqIHRvIGhvbGQgZGVmYXVsdCB2YWx1ZSBhbmQgcGFyZW50IHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgTGlzdCBvZiBwYXJhbWV0ZXJzXG4gKlxuICogQHJldHVybiB7QXJyYXl9IFNpbXBsZSBwYXJhbWV0ZXIgb2JqZWN0cyB3aXRoIG5hbWUgYW5kIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIGpzZG9jaWZ5UGFyYW1zKHBhcmFtcykge1xuICByZXR1cm4gcGFyYW1zLm1hcCgoeyB0eXBlID0gJ3R5cGUnLCBuYW1lLCBkZWZhdWx0VmFsdWUsIHBhcmVudCB9KSA9PiB7XG4gICAgbGV0IHRpZGllZE5hbWUgPSBuYW1lO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIHRpZGllZE5hbWUgPSBgJHtwYXJlbnR9LiR7dGlkaWVkTmFtZX1gO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgICB0aWRpZWROYW1lID0gYFske3RpZGllZE5hbWV9PSR7ZGVmYXVsdFZhbHVlfV1gO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBgeyR7dHlwZX19YCxcbiAgICAgIG5hbWU6IHRpZGllZE5hbWUsXG4gICAgfTtcbiAgfSk7XG59XG5cbi8qKlxuICogcmVuZGVyUGFyYW1zIC0gUmVuZGVyIHRoZSBwYXJhbXMgYXJyYXkgYXMgSlMgRG9jIHBhcmFtc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGZ1bmNQYXJhbXMgTGlzdCBvZiBmdW5jdGlvbiBwYXJhbWV0ZXJzXG4gKlxuICogQHJldHVybiB7QXJyYXl9IExpc3Qgb2Ygc3RyaW5nIGxpbmVzIHJlcHJlc2VudGluZyBmdW5jdGlvbiBwYXJhbWV0ZXJzXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclBhcmFtcyhmdW5jUGFyYW1zKSB7XG4gIGNvbnN0IGpzZG9jUGFyYW1zID0ganNkb2NpZnlQYXJhbXMoZnVuY1BhcmFtcyk7XG5cbiAgY29uc3QgbWF4TmFtZUxlbmd0aCA9IG1heFByb3BlcnR5TGVuZ3RoKGpzZG9jUGFyYW1zLCAnbmFtZScpO1xuICBjb25zdCBtYXhUeXBlTGVuZ3RoID0gbWF4UHJvcGVydHlMZW5ndGgoanNkb2NQYXJhbXMsICd0eXBlJyk7XG5cbiAgcmV0dXJuIGpzZG9jUGFyYW1zLm1hcChyZW5kZXJQYXJhbS5iaW5kKG51bGwsIG1heE5hbWVMZW5ndGgsIG1heFR5cGVMZW5ndGgpKTtcbn1cblxuLyoqXG4gKiByZW5kZXIgLSBUYWtlIGEgc3RydWN0dXJlIGRlc2NyaWJpbmcgYSBmdW5jdGlvbiBhbmQgcmVuZGVyIHRoZSBKUyBEb2MgdG9cbiAqIHJlcHJlc2VudCBpdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gU3RydWN0dXJlICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29tcGxldGUgc3RydWN0dXJlXG4gKiBAcGFyYW0ge1N0cmluZ30gU3RydWN0dXJlLm5hbWUgICAgICAgICAgICAgICAgICAgICAgRnVuY3Rpb24gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IFtTdHJ1Y3R1cmUuZGVzY3JpcHRpb249RGVzY3JpcHRpb25dIEZ1bmN0aW9uIGRlc2NyaXB0aW9uXG4gKiBAcGFyYW0ge0FycmF5fSAgW1N0cnVjdHVyZS5wYXJhbXM9QXJyYXldICAgICAgICAgICAgQXJyYXkgb2YgcGFyYW1zIG9iamVjdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbU3RydWN0dXJlLnJldHVybnM9T2JqZWN0XSAgICAgICAgICBEZWZpbml0aW9uIG9mIHJldHVybnNcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IEpTIERvYyBjb21tZW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoeyBuYW1lLCBkZXNjcmlwdGlvbiA9ICdEZXNjcmlwdGlvbicsIHBhcmFtcyA9IFtdLFxuICByZXR1cm5zID0ge30sIGxvY2F0aW9uID0ge30gfSkge1xuICBjb25zdCBvcGVuID0gJy8qKic7XG4gIGNvbnN0IHNwYWNlciA9ICcgKic7XG4gIGNvbnN0IG5hbWVMaW5lID0gYCAqICR7bmFtZX0gLSAke2Rlc2NyaXB0aW9ufWA7XG4gIGNvbnN0IHJldHVybktleXdvcmQgPSByZXR1cm5zLnJldHVybnMgPyAncmV0dXJucycgOiAncmV0dXJuJztcbiAgY29uc3QgcmV0dXJuTGluZSA9IGAgKiBAJHtyZXR1cm5LZXl3b3JkfSB7dHlwZX0gRGVzY3JpcHRpb25gO1xuICBjb25zdCBjbG9zZSA9ICcgKi8nO1xuICBjb25zdCBsaW5lUGFkZGVyID0gJyAnO1xuXG4gIGNvbnN0IGhlYWRlciA9IFtvcGVuLCBuYW1lTGluZSwgc3BhY2VyXTtcbiAgY29uc3QgZm9vdGVyID0gW3JldHVybkxpbmUsIGNsb3NlXTtcblxuICBjb25zdCByZW5kZXJlZFBhcmFtcyA9IHJlbmRlclBhcmFtcyhwYXJhbXMpO1xuICBpZiAocmVuZGVyZWRQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgIHJlbmRlcmVkUGFyYW1zLnB1c2goc3BhY2VyKTtcbiAgfVxuXG4gIGNvbnN0IGxpbmVzID0gaGVhZGVyLmNvbmNhdChyZW5kZXJlZFBhcmFtcykuY29uY2F0KGZvb3Rlcik7XG5cbiAgY29uc3QgeyBjb2x1bW4gPSAwIH0gPSBsb2NhdGlvbjtcbiAgY29uc3QgaW5kZW50YXRpb24gPSBsaW5lUGFkZGVyLnJlcGVhdChjb2x1bW4pO1xuXG4gIHJldHVybiBsaW5lcy5tYXAoKGxpbmUpID0+IGAke2luZGVudGF0aW9ufSR7bGluZX1gKS5qb2luKCdcXG4nKTtcbn1cbiJdfQ==
//# sourceURL=/Users/broberto/.atom/packages/atom-easy-jsdoc/lib/jsdoc/renderer.js
