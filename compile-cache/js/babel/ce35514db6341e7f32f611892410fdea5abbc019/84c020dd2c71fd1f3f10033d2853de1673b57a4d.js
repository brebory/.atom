'use babel';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var activate = function activate() {
	if (atom.packages.isPackageLoaded('refactor')) return;
	atom.notifications.addWarning('js-refactor package requires refactor package', {
		detail: 'You can install and activate refactor package using the preference pane.'
	});
};

exports.activate = activate;

var _ripper = require('./ripper');

var _ripper2 = _interopRequireDefault(_ripper);

exports.Ripper = _ripper2['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9qcy1yZWZhY3Rvci9saWIvanNfcmVmYWN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFBOzs7Ozs7OztBQUVKLElBQU0sUUFBUSxHQUFHLFNBQVgsUUFBUSxHQUFTO0FBQzdCLEtBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsT0FBTTtBQUNyRCxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FDNUIsK0NBQStDLEVBQy9DO0FBQ0MsUUFBTSxFQUFFLDBFQUEwRTtFQUNsRixDQUNELENBQUE7Q0FDRCxDQUFBOzs7O3NCQUVrQixVQUFVOzs7O1FBQXRCLE1BQU0iLCJmaWxlIjoiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2pzLXJlZmFjdG9yL2xpYi9qc19yZWZhY3Rvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2UgYmFiZWwnXG5cbmV4cG9ydCBjb25zdCBhY3RpdmF0ZSA9ICgpID0+IHtcblx0aWYgKGF0b20ucGFja2FnZXMuaXNQYWNrYWdlTG9hZGVkKCdyZWZhY3RvcicpKSByZXR1cm5cblx0YXRvbS5ub3RpZmljYXRpb25zLmFkZFdhcm5pbmcoXG5cdFx0J2pzLXJlZmFjdG9yIHBhY2thZ2UgcmVxdWlyZXMgcmVmYWN0b3IgcGFja2FnZScsXG5cdFx0e1xuXHRcdFx0ZGV0YWlsOiAnWW91IGNhbiBpbnN0YWxsIGFuZCBhY3RpdmF0ZSByZWZhY3RvciBwYWNrYWdlIHVzaW5nIHRoZSBwcmVmZXJlbmNlIHBhbmUuJ1xuXHRcdH1cblx0KVxufVxuXG5leHBvcnQgUmlwcGVyIGZyb20gJy4vcmlwcGVyJ1xuIl19
//# sourceURL=/Users/broberto/.atom/packages/js-refactor/lib/js_refactor.js
