'use babel';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.parse = parse;
var BLOCK_COMMENT_RE = /^\s+\*[^\/]/i;
var BLOCK_COMMENT_START_RE = /^\s*\/\*\*.*$/i;
var BLOCK_COMMENT_END_RE = /.*\*\/\s?$/i;

var BLOCK_COMMENT = '* ';

/**
 * parse - Work out the type of comment on the line and return the appropriate
 * comment to continue.
 *
 * @param {String} commentLine Line to parse that may be a comment
 *
 * @returns {String} Necessary characters to continue the comment to found on
 * the line.
 */

function parse(commentLine) {
  if (commentLine.match(BLOCK_COMMENT_END_RE)) {
    return '';
  }

  if (commentLine.match(BLOCK_COMMENT_START_RE)) {
    // Need to add extra indent from default line to line up with the second
    // star of a block comment line.
    return ' ' + BLOCK_COMMENT;
  } else if (commentLine.match(BLOCK_COMMENT_RE)) {
    return BLOCK_COMMENT;
  }

  return '';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hdG9tLWVhc3ktanNkb2MvbGliL2NvbW1lbnRDb250aW51ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDOzs7Ozs7QUFFWixJQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQztBQUN4QyxJQUFNLHNCQUFzQixHQUFHLGdCQUFnQixDQUFDO0FBQ2hELElBQU0sb0JBQW9CLEdBQUcsYUFBYSxDQUFDOztBQUUzQyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztBQVdwQixTQUFTLEtBQUssQ0FBQyxXQUFXLEVBQUU7QUFDakMsTUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEVBQUU7QUFDM0MsV0FBTyxFQUFFLENBQUM7R0FDWDs7QUFFRCxNQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsRUFBRTs7O0FBRzdDLGlCQUFXLGFBQWEsQ0FBRztHQUM1QixNQUFNLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO0FBQzlDLFdBQU8sYUFBYSxDQUFDO0dBQ3RCOztBQUVELFNBQU8sRUFBRSxDQUFDO0NBQ1giLCJmaWxlIjoiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F0b20tZWFzeS1qc2RvYy9saWIvY29tbWVudENvbnRpbnVlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnO1xuXG5jb25zdCBCTE9DS19DT01NRU5UX1JFID0gL15cXHMrXFwqW15cXC9dL2k7XG5jb25zdCBCTE9DS19DT01NRU5UX1NUQVJUX1JFID0gL15cXHMqXFwvXFwqXFwqLiokL2k7XG5jb25zdCBCTE9DS19DT01NRU5UX0VORF9SRSA9IC8uKlxcKlxcL1xccz8kL2k7XG5cbmNvbnN0IEJMT0NLX0NPTU1FTlQgPSAnKiAnO1xuXG4vKipcbiAqIHBhcnNlIC0gV29yayBvdXQgdGhlIHR5cGUgb2YgY29tbWVudCBvbiB0aGUgbGluZSBhbmQgcmV0dXJuIHRoZSBhcHByb3ByaWF0ZVxuICogY29tbWVudCB0byBjb250aW51ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY29tbWVudExpbmUgTGluZSB0byBwYXJzZSB0aGF0IG1heSBiZSBhIGNvbW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBOZWNlc3NhcnkgY2hhcmFjdGVycyB0byBjb250aW51ZSB0aGUgY29tbWVudCB0byBmb3VuZCBvblxuICogdGhlIGxpbmUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShjb21tZW50TGluZSkge1xuICBpZiAoY29tbWVudExpbmUubWF0Y2goQkxPQ0tfQ09NTUVOVF9FTkRfUkUpKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKGNvbW1lbnRMaW5lLm1hdGNoKEJMT0NLX0NPTU1FTlRfU1RBUlRfUkUpKSB7XG4gICAgLy8gTmVlZCB0byBhZGQgZXh0cmEgaW5kZW50IGZyb20gZGVmYXVsdCBsaW5lIHRvIGxpbmUgdXAgd2l0aCB0aGUgc2Vjb25kXG4gICAgLy8gc3RhciBvZiBhIGJsb2NrIGNvbW1lbnQgbGluZS5cbiAgICByZXR1cm4gYCAke0JMT0NLX0NPTU1FTlR9YDtcbiAgfSBlbHNlIGlmIChjb21tZW50TGluZS5tYXRjaChCTE9DS19DT01NRU5UX1JFKSkge1xuICAgIHJldHVybiBCTE9DS19DT01NRU5UO1xuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuIl19
//# sourceURL=/Users/broberto/.atom/packages/atom-easy-jsdoc/lib/commentContinuer.js
