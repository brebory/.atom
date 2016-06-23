Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.comment = comment;

var _jsdocFuncParser = require('./jsdoc/funcParser');

var _jsdocRenderer = require('./jsdoc/renderer');

/**
 * comment - Return JS Doc or empty string for the comment on the node at or
 * one line above the line provided.
 *
 * @param {String} code     Code containing the function.
 * @param {int} [lineNum=1] Line number containing the
 * @param {boolean} [useReturns=false] Use returns style of JSDoc comment
 *
 * @returns {Object|String} Object containing the comment or an empty string.
 */
'use babel';

function comment(code) {
  var lineNum = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
  var useReturns = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var desc = (0, _jsdocFuncParser.parse)(code, lineNum);
  if (!desc) {
    return '';
  }
  desc.returns.returns = useReturns;
  var content = (0, _jsdocRenderer.render)(desc);
  var line = desc.location.line;
  return { content: content, line: line };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hdG9tLWVhc3ktanNkb2MvbGliL2pzZG9jZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7K0JBRXNCLG9CQUFvQjs7NkJBQ25CLGtCQUFrQjs7Ozs7Ozs7Ozs7O0FBSHpDLFdBQVcsQ0FBQzs7QUFlTCxTQUFTLE9BQU8sQ0FBQyxJQUFJLEVBQW1DO01BQWpDLE9BQU8seURBQUcsQ0FBQztNQUFFLFVBQVUseURBQUcsS0FBSzs7QUFDM0QsTUFBTSxJQUFJLEdBQUcsNEJBQU0sSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLE1BQUksQ0FBQyxJQUFJLEVBQUU7QUFDVCxXQUFPLEVBQUUsQ0FBQztHQUNYO0FBQ0QsTUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO0FBQ2xDLE1BQU0sT0FBTyxHQUFHLDJCQUFPLElBQUksQ0FBQyxDQUFDO0FBQzdCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQ2hDLFNBQU8sRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsQ0FBQztDQUMxQiIsImZpbGUiOiIvVXNlcnMvYnJvYmVydG8vLmF0b20vcGFja2FnZXMvYXRvbS1lYXN5LWpzZG9jL2xpYi9qc2RvY2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbmltcG9ydCB7IHBhcnNlIH0gZnJvbSAnLi9qc2RvYy9mdW5jUGFyc2VyJztcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJy4vanNkb2MvcmVuZGVyZXInO1xuXG4vKipcbiAqIGNvbW1lbnQgLSBSZXR1cm4gSlMgRG9jIG9yIGVtcHR5IHN0cmluZyBmb3IgdGhlIGNvbW1lbnQgb24gdGhlIG5vZGUgYXQgb3JcbiAqIG9uZSBsaW5lIGFib3ZlIHRoZSBsaW5lIHByb3ZpZGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb2RlICAgICBDb2RlIGNvbnRhaW5pbmcgdGhlIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtpbnR9IFtsaW5lTnVtPTFdIExpbmUgbnVtYmVyIGNvbnRhaW5pbmcgdGhlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFt1c2VSZXR1cm5zPWZhbHNlXSBVc2UgcmV0dXJucyBzdHlsZSBvZiBKU0RvYyBjb21tZW50XG4gKlxuICogQHJldHVybnMge09iamVjdHxTdHJpbmd9IE9iamVjdCBjb250YWluaW5nIHRoZSBjb21tZW50IG9yIGFuIGVtcHR5IHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbW1lbnQoY29kZSwgbGluZU51bSA9IDEsIHVzZVJldHVybnMgPSBmYWxzZSkge1xuICBjb25zdCBkZXNjID0gcGFyc2UoY29kZSwgbGluZU51bSk7XG4gIGlmICghZGVzYykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBkZXNjLnJldHVybnMucmV0dXJucyA9IHVzZVJldHVybnM7XG4gIGNvbnN0IGNvbnRlbnQgPSByZW5kZXIoZGVzYyk7XG4gIGNvbnN0IGxpbmUgPSBkZXNjLmxvY2F0aW9uLmxpbmU7XG4gIHJldHVybiB7IGNvbnRlbnQsIGxpbmUgfTtcbn1cbiJdfQ==
//# sourceURL=/Users/broberto/.atom/packages/atom-easy-jsdoc/lib/jsdocer.js
