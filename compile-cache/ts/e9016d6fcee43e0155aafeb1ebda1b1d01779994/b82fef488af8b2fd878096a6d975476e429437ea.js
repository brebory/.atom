// Some docs
// http://www.html5rocks.com/en/tutorials/webcomponents/customelements/ (look at lifecycle callback methods)
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var escapeHtml = require("escape-html");
var TsView = (function (_super) {
    __extends(TsView, _super);
    function TsView() {
        _super.apply(this, arguments);
    }
    TsView.prototype.createdCallback = function () {
        var preview = escapeHtml(this.innerText);
        this.innerText = "";
        // Based on markdown editor
        // https://github.com/atom/markdown-preview/blob/2bcbadac3980f1aeb455f7078bd1fdfb4e6fe6b1/lib/renderer.coffee#L111
        var editorElement = this.editorElement = document.createElement('atom-text-editor');
        editorElement.setAttributeNode(document.createAttribute('gutter-hidden'));
        editorElement.removeAttribute('tabindex'); // make read-only
        var editor = this.editor = editorElement.getModel();
        editor.getDecorations({ class: 'cursor-line', type: 'line' })[0].destroy(); // remove the default selection of a line in each editor
        editor.setText(preview);
        var grammar = atom.grammars.grammarForScopeName("source.ts");
        editor.setGrammar(grammar);
        editor.setSoftWrapped(true);
        this.appendChild(editorElement);
    };
    // API
    TsView.prototype.text = function (text) {
        this.editor.setText(escapeHtml(text));
    };
    return TsView;
})(HTMLElement);
exports.TsView = TsView;
document.registerElement('ts-view', TsView);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F0b20tdHlwZXNjcmlwdC9saWIvbWFpbi9hdG9tL2NvbXBvbmVudHMvdHMtdmlldy50cyIsInNvdXJjZXMiOlsiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2F0b20tdHlwZXNjcmlwdC9saWIvbWFpbi9hdG9tL2NvbXBvbmVudHMvdHMtdmlldy50cyJdLCJuYW1lcyI6WyJUc1ZpZXciLCJUc1ZpZXcuY29uc3RydWN0b3IiLCJUc1ZpZXcuY3JlYXRlZENhbGxiYWNrIiwiVHNWaWV3LnRleHQiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVk7QUFDWiw0R0FBNEc7Ozs7Ozs7QUFFNUcsSUFBTyxVQUFVLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFFM0MsSUFBYSxNQUFNO0lBQVNBLFVBQWZBLE1BQU1BLFVBQW9CQTtJQUF2Q0EsU0FBYUEsTUFBTUE7UUFBU0MsOEJBQVdBO0lBMEJ2Q0EsQ0FBQ0E7SUF2QkdELGdDQUFlQSxHQUFmQTtRQUNJRSxJQUFJQSxPQUFPQSxHQUFHQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUN6Q0EsSUFBSUEsQ0FBQ0EsU0FBU0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFJcEJBLEFBRkFBLDJCQUEyQkE7UUFDM0JBLGtIQUFrSEE7WUFDOUdBLGFBQWFBLEdBQUdBLElBQUlBLENBQUNBLGFBQWFBLEdBQUdBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7UUFDcEZBLGFBQWFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDMUVBLGFBQWFBLENBQUNBLGVBQWVBLENBQUNBLFVBQVVBLENBQUNBLEVBQUVBLGlCQUFpQkE7UUFDNURBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLE1BQU1BLEdBQVNBLGFBQWNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBO1FBQzNEQSxNQUFNQSxDQUFDQSxjQUFjQSxDQUFDQSxFQUFFQSxLQUFLQSxFQUFFQSxhQUFhQSxFQUFFQSxJQUFJQSxFQUFFQSxNQUFNQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxPQUFPQSxFQUFFQSxFQUFFQSx3REFBd0RBO1FBQ3BJQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtRQUN4QkEsSUFBSUEsT0FBT0EsR0FBU0EsSUFBS0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFBQTtRQUNuRUEsTUFBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDM0JBLE1BQU1BLENBQUNBLGNBQWNBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1FBRTVCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtJQUNwQ0EsQ0FBQ0E7SUFFREYsTUFBTUE7SUFDTkEscUJBQUlBLEdBQUpBLFVBQUtBLElBQVlBO1FBQ2JHLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0lBQzFDQSxDQUFDQTtJQUNMSCxhQUFDQTtBQUFEQSxDQUFDQSxBQTFCRCxFQUE0QixXQUFXLEVBMEJ0QztBQTFCWSxjQUFNLEdBQU4sTUEwQlosQ0FBQTtBQUVLLFFBQVMsQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU29tZSBkb2NzXG4vLyBodHRwOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy93ZWJjb21wb25lbnRzL2N1c3RvbWVsZW1lbnRzLyAobG9vayBhdCBsaWZlY3ljbGUgY2FsbGJhY2sgbWV0aG9kcylcblxuaW1wb3J0IGVzY2FwZUh0bWwgPSByZXF1aXJlKFwiZXNjYXBlLWh0bWxcIik7XG5cbmV4cG9ydCBjbGFzcyBUc1ZpZXcgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgZWRpdG9yRWxlbWVudDtcbiAgICBlZGl0b3I7XG4gICAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgICAgICB2YXIgcHJldmlldyA9IGVzY2FwZUh0bWwodGhpcy5pbm5lclRleHQpO1xuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IFwiXCI7XG5cbiAgICAgICAgLy8gQmFzZWQgb24gbWFya2Rvd24gZWRpdG9yXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hdG9tL21hcmtkb3duLXByZXZpZXcvYmxvYi8yYmNiYWRhYzM5ODBmMWFlYjQ1NWY3MDc4YmQxZmRmYjRlNmZlNmIxL2xpYi9yZW5kZXJlci5jb2ZmZWUjTDExMVxuICAgICAgICB2YXIgZWRpdG9yRWxlbWVudCA9IHRoaXMuZWRpdG9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F0b20tdGV4dC1lZGl0b3InKTtcbiAgICAgICAgZWRpdG9yRWxlbWVudC5zZXRBdHRyaWJ1dGVOb2RlKGRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZSgnZ3V0dGVyLWhpZGRlbicpKTtcbiAgICAgICAgZWRpdG9yRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7IC8vIG1ha2UgcmVhZC1vbmx5XG4gICAgICAgIHZhciBlZGl0b3IgPSB0aGlzLmVkaXRvciA9ICg8YW55PmVkaXRvckVsZW1lbnQpLmdldE1vZGVsKCk7XG4gICAgICAgIGVkaXRvci5nZXREZWNvcmF0aW9ucyh7IGNsYXNzOiAnY3Vyc29yLWxpbmUnLCB0eXBlOiAnbGluZScgfSlbMF0uZGVzdHJveSgpOyAvLyByZW1vdmUgdGhlIGRlZmF1bHQgc2VsZWN0aW9uIG9mIGEgbGluZSBpbiBlYWNoIGVkaXRvclxuICAgICAgICBlZGl0b3Iuc2V0VGV4dChwcmV2aWV3KTtcbiAgICAgICAgdmFyIGdyYW1tYXIgPSAoPGFueT5hdG9tKS5ncmFtbWFycy5ncmFtbWFyRm9yU2NvcGVOYW1lKFwic291cmNlLnRzXCIpXG4gICAgICAgIGVkaXRvci5zZXRHcmFtbWFyKGdyYW1tYXIpO1xuICAgICAgICBlZGl0b3Iuc2V0U29mdFdyYXBwZWQodHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChlZGl0b3JFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBBUElcbiAgICB0ZXh0KHRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmVkaXRvci5zZXRUZXh0KGVzY2FwZUh0bWwodGV4dCkpO1xuICAgIH1cbn1cblxuKDxhbnk+ZG9jdW1lbnQpLnJlZ2lzdGVyRWxlbWVudCgndHMtdmlldycsIFRzVmlldyk7XG4iXX0=
//# sourceURL=/Users/broberto/.atom/packages/atom-typescript/lib/main/atom/components/ts-view.ts
