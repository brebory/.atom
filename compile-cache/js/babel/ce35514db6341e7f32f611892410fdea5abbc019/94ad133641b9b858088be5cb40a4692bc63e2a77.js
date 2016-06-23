'use babel';

var $ = require('jquery');
var Prism = require('prismjs');
var Url = require('url');

var Highlight = function Highlight(type, rootNode) {
  if (type in Highlight) {
    Highlight[type](rootNode);
  }
};

Highlight.one = function (node, language) {
  node.classList.add('language-' + language);
  Prism.highlightElement(node);
};

Highlight.all = function (nodes, language) {
  for (var i = 0; i < nodes.length; ++i) {
    Highlight.one(nodes[i], language);
  }
};

Highlight.angular = function (rootNode) {
  var elements = rootNode.getElementsByTagName('pre');
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    var language = 'javascript';
    if (element.classList.contains('lang-html') || element.textContent[0] == '<') {
      language = 'markup';
    } else if (element.classList.contains('lang-css')) {
      language = 'css';
    }
    element.className = '';
    Highlight.one(element, language);
  }
};

Highlight.bower = function (rootNode) {
  Highlight.all($(rootNode).find('pre[data-lang="js"], pre[data-lang="json"]'), 'javascript');
};

Highlight.c = function (rootNode) {
  Highlight.all($(rootNode.find('pre.source-c, .source-c > pre')), 'c');
  Highlight.all($(rootNode.find('pre.source-cpp, .source-cpp > pre')), 'cpp');
};

Highlight.coffeescript = function (rootNode) {
  Highlight.all($(rootNode).find('.code > pre:first-child'), 'coffeescript');
  Highlight.all($(rootNode).find('.code > pre:last-child'), 'javascript');
};

Highlight.d3 = function (rootNode) {
  Highlight.all($(rootNode).find('.highlight > pre'));
};

Highlight.ember = function (rootNode) {
  var elements = rootNode.getElementsByTagName('pre');
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    if (element.classList.contains('javascript')) {
      Highlight.one(element, 'javascript');
    } else if (element.classList.contains('html')) {
      Highlight.one(element, 'markup');
    }
  }
};

Highlight.go = function (rootNode) {
  Highlight.all(rootNode.getElementsByTagName('pre'), 'go');
};

// TODO: jquery

Highlight.knockout = function (rootNode) {
  var elements = rootNode.getElementsByTagName('pre');
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    if (element.innerHTML.indexOf('data-bind="') > 0) {
      Highlight.one(element, 'markup');
    } else {
      Highlight.one(element, 'javascript');
    }
  }
};

Highlight.mdn = function (rootNode) {
  var elements = $(rootNode).find('pre[class^="brush"]');
  for (var i = 0; i < elements.length; ++i) {
    var language = elements[i].className.match(/brush: ?(\w+)/)[1].replace('html', 'markup').replace('js', 'javascript');
    elements[i].className = '';
    Highlight.one(elements[i], language);
  }
};

Highlight.php = function (rootNode) {
  Highlight.all(rootNode.getElementsByClassName('phpcode'), 'php');
};

Highlight.phpunit = function (rootNode) {
  Highlight.all($(rootNode).find('pre.programlisting'), 'php');
};

Highlight.rdoc = function (rootNode) {
  Highlight.all($(rootNode).find('pre.ruby'), 'ruby');
  Highlight.all($(rootNode).find('pre.c'), 'clike');
};

Highlight.react = function (rootNode) {
  var elements = rootNode.getElementsByTagName('pre');
  for (var i = 0; i < elements.length; ++i) {
    var element = elements[i];
    var attribute = element.getAttribute('data-lang');
    if (attribute == 'html') {
      Highlight.one(element, 'markup');
    } else if (attribute == 'javascript') {
      Highlight.one(element, 'javascript');
    }
  }
};

Highlight.sphinx = function (rootNode) {
  Highlight.all($(rootNode).find('pre.python'), 'python');
  Highlight.all($(rootNode).find('pre.markup'), 'markup');
};

Highlight.chai = Highlight.express = Highlight.grunt = Highlight.lodash = Highlight.marionette = Highlight.modernizr = Highlight.moment = Highlight.mongoose = Highlight.node = Highlight.rethinkdb = Highlight.sinon = Highlight.underscore = function (rootNode) {
  Highlight.all(rootNode.getElementsByTagName('pre'), 'javascript');
};

Highlight.requirejs = Highlight.socketio = function (rootNode) {
  var elements = rootNode.getElementsByTagName('pre');
  for (var i = 0; i < elements.length; ++i) {
    if (elements[i].textContent.match(/^\s*</)) {
      Highlight.one(elements[i], 'markup');
    } else {
      Highlight.one(elements[i], 'javascript');
    }
  }
};

module.exports = Highlight;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9icm9iZXJ0by8uYXRvbS9wYWNrYWdlcy9hcGktZG9jcy9zcmMvaGlnaGxpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQzs7QUFFWixJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUIsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFM0IsSUFBTSxTQUFTLEdBQUcsU0FBWixTQUFTLENBQVksSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN6QyxNQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7QUFDckIsYUFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0dBQzNCO0NBQ0YsQ0FBQzs7QUFFRixTQUFTLENBQUMsR0FBRyxHQUFHLFVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBSztBQUNsQyxNQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUM7QUFDM0MsT0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0NBQzlCLENBQUM7O0FBRUYsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFDLEtBQUssRUFBRSxRQUFRLEVBQUs7QUFDbkMsT0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUU7QUFDckMsYUFBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7R0FDbkM7Q0FDRixDQUFDOztBQUVGLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBQSxRQUFRLEVBQUk7QUFDOUIsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3RELE9BQUss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RUFBRSxDQUFDLEVBQUU7QUFDeEMsUUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUMxQyxlQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUN0QyxNQUFNO0FBQ0wsZUFBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDMUM7R0FDRjtDQUNGLENBQUM7O0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMiLCJmaWxlIjoiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL2FwaS1kb2NzL3NyYy9oaWdobGlnaHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuY29uc3QgJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuY29uc3QgUHJpc20gPSByZXF1aXJlKCdwcmlzbWpzJyk7XG5jb25zdCBVcmwgPSByZXF1aXJlKCd1cmwnKTtcblxuY29uc3QgSGlnaGxpZ2h0ID0gZnVuY3Rpb24odHlwZSwgcm9vdE5vZGUpIHtcbiAgaWYgKHR5cGUgaW4gSGlnaGxpZ2h0KSB7XG4gICAgSGlnaGxpZ2h0W3R5cGVdKHJvb3ROb2RlKTtcbiAgfVxufTtcblxuSGlnaGxpZ2h0Lm9uZSA9IChub2RlLCBsYW5ndWFnZSkgPT4ge1xuICBub2RlLmNsYXNzTGlzdC5hZGQoJ2xhbmd1YWdlLScgKyBsYW5ndWFnZSk7XG4gIFByaXNtLmhpZ2hsaWdodEVsZW1lbnQobm9kZSk7XG59O1xuXG5IaWdobGlnaHQuYWxsID0gKG5vZGVzLCBsYW5ndWFnZSkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XG4gICAgSGlnaGxpZ2h0Lm9uZShub2Rlc1tpXSwgbGFuZ3VhZ2UpO1xuICB9XG59O1xuXG5IaWdobGlnaHQuYW5ndWxhciA9IHJvb3ROb2RlID0+IHtcbiAgY29uc3QgZWxlbWVudHMgPSByb290Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHJlJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgbGV0IGxhbmd1YWdlID0gJ2phdmFzY3JpcHQnO1xuICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGFuZy1odG1sJykgfHwgZWxlbWVudC50ZXh0Q29udGVudFswXSA9PSAnPCcpIHtcbiAgICAgIGxhbmd1YWdlID0gJ21hcmt1cCc7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbGFuZy1jc3MnKSkge1xuICAgICAgbGFuZ3VhZ2UgPSAnY3NzJztcbiAgICB9XG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSAnJztcbiAgICBIaWdobGlnaHQub25lKGVsZW1lbnQsIGxhbmd1YWdlKTtcbiAgfVxufTtcblxuSGlnaGxpZ2h0LmJvd2VyID0gcm9vdE5vZGUgPT4ge1xuICBIaWdobGlnaHQuYWxsKCQocm9vdE5vZGUpLmZpbmQoJ3ByZVtkYXRhLWxhbmc9XCJqc1wiXSwgcHJlW2RhdGEtbGFuZz1cImpzb25cIl0nKSwgJ2phdmFzY3JpcHQnKTtcbn07XG5cbkhpZ2hsaWdodC5jID0gcm9vdE5vZGUgPT4ge1xuICBIaWdobGlnaHQuYWxsKCQocm9vdE5vZGUuZmluZCgncHJlLnNvdXJjZS1jLCAuc291cmNlLWMgPiBwcmUnKSksICdjJyk7XG4gIEhpZ2hsaWdodC5hbGwoJChyb290Tm9kZS5maW5kKCdwcmUuc291cmNlLWNwcCwgLnNvdXJjZS1jcHAgPiBwcmUnKSksICdjcHAnKTtcbn07XG5cbkhpZ2hsaWdodC5jb2ZmZWVzY3JpcHQgPSByb290Tm9kZSA9PiB7XG4gIEhpZ2hsaWdodC5hbGwoJChyb290Tm9kZSkuZmluZCgnLmNvZGUgPiBwcmU6Zmlyc3QtY2hpbGQnKSwgJ2NvZmZlZXNjcmlwdCcpO1xuICBIaWdobGlnaHQuYWxsKCQocm9vdE5vZGUpLmZpbmQoJy5jb2RlID4gcHJlOmxhc3QtY2hpbGQnKSwgJ2phdmFzY3JpcHQnKTtcbn07XG5cbkhpZ2hsaWdodC5kMyA9IHJvb3ROb2RlID0+IHtcbiAgSGlnaGxpZ2h0LmFsbCgkKHJvb3ROb2RlKS5maW5kKCcuaGlnaGxpZ2h0ID4gcHJlJykpO1xufTtcblxuSGlnaGxpZ2h0LmVtYmVyID0gcm9vdE5vZGUgPT4ge1xuICBjb25zdCBlbGVtZW50cyA9IHJvb3ROb2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcmUnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7ICsraSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2phdmFzY3JpcHQnKSkge1xuICAgICAgSGlnaGxpZ2h0Lm9uZShlbGVtZW50LCAnamF2YXNjcmlwdCcpO1xuICAgIH0gZWxzZSBpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2h0bWwnKSkge1xuICAgICAgSGlnaGxpZ2h0Lm9uZShlbGVtZW50LCAnbWFya3VwJyk7XG4gICAgfVxuICB9XG59O1xuXG5IaWdobGlnaHQuZ28gPSByb290Tm9kZSA9PiB7XG4gIEhpZ2hsaWdodC5hbGwocm9vdE5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpLCAnZ28nKTtcbn07XG5cbi8vIFRPRE86IGpxdWVyeVxuXG5IaWdobGlnaHQua25vY2tvdXQgPSByb290Tm9kZSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRzID0gcm9vdE5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGlmIChlbGVtZW50LmlubmVySFRNTC5pbmRleE9mKCdkYXRhLWJpbmQ9XCInKSA+IDApIHtcbiAgICAgIEhpZ2hsaWdodC5vbmUoZWxlbWVudCwgJ21hcmt1cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBIaWdobGlnaHQub25lKGVsZW1lbnQsICdqYXZhc2NyaXB0Jyk7XG4gICAgfVxuICB9XG59O1xuXG5IaWdobGlnaHQubWRuID0gcm9vdE5vZGUgPT4ge1xuICBjb25zdCBlbGVtZW50cyA9ICQocm9vdE5vZGUpLmZpbmQoJ3ByZVtjbGFzc149XCJicnVzaFwiXScpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBlbGVtZW50c1tpXS5jbGFzc05hbWUubWF0Y2goL2JydXNoOiA/KFxcdyspLylbMV0ucmVwbGFjZSgnaHRtbCcsICdtYXJrdXAnKS5yZXBsYWNlKCdqcycsICdqYXZhc2NyaXB0Jyk7XG4gICAgZWxlbWVudHNbaV0uY2xhc3NOYW1lID0gJyc7XG4gICAgSGlnaGxpZ2h0Lm9uZShlbGVtZW50c1tpXSwgbGFuZ3VhZ2UpO1xuICB9XG59O1xuXG5IaWdobGlnaHQucGhwID0gcm9vdE5vZGUgPT4ge1xuICBIaWdobGlnaHQuYWxsKHJvb3ROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BocGNvZGUnKSwgJ3BocCcpO1xufTtcblxuSGlnaGxpZ2h0LnBocHVuaXQgPSByb290Tm9kZSA9PiB7XG4gIEhpZ2hsaWdodC5hbGwoJChyb290Tm9kZSkuZmluZCgncHJlLnByb2dyYW1saXN0aW5nJyksICdwaHAnKTtcbn07XG5cbkhpZ2hsaWdodC5yZG9jID0gcm9vdE5vZGUgPT4ge1xuICBIaWdobGlnaHQuYWxsKCQocm9vdE5vZGUpLmZpbmQoJ3ByZS5ydWJ5JyksICdydWJ5Jyk7XG4gIEhpZ2hsaWdodC5hbGwoJChyb290Tm9kZSkuZmluZCgncHJlLmMnKSwgJ2NsaWtlJyk7XG59O1xuXG5IaWdobGlnaHQucmVhY3QgPSByb290Tm9kZSA9PiB7XG4gIGNvbnN0IGVsZW1lbnRzID0gcm9vdE5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRzW2ldO1xuICAgIGNvbnN0IGF0dHJpYnV0ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxhbmcnKTtcbiAgICBpZiAoYXR0cmlidXRlID09ICdodG1sJykge1xuICAgICAgSGlnaGxpZ2h0Lm9uZShlbGVtZW50LCAnbWFya3VwJyk7XG4gICAgfSBlbHNlIGlmIChhdHRyaWJ1dGUgPT0gJ2phdmFzY3JpcHQnKSB7XG4gICAgICBIaWdobGlnaHQub25lKGVsZW1lbnQsICdqYXZhc2NyaXB0Jyk7XG4gICAgfVxuICB9XG59O1xuXG5IaWdobGlnaHQuc3BoaW54ID0gcm9vdE5vZGUgPT4ge1xuICBIaWdobGlnaHQuYWxsKCQocm9vdE5vZGUpLmZpbmQoJ3ByZS5weXRob24nKSwgJ3B5dGhvbicpO1xuICBIaWdobGlnaHQuYWxsKCQocm9vdE5vZGUpLmZpbmQoJ3ByZS5tYXJrdXAnKSwgJ21hcmt1cCcpO1xufTtcblxuSGlnaGxpZ2h0LmNoYWkgPVxuSGlnaGxpZ2h0LmV4cHJlc3MgPVxuSGlnaGxpZ2h0LmdydW50ID1cbkhpZ2hsaWdodC5sb2Rhc2ggPVxuSGlnaGxpZ2h0Lm1hcmlvbmV0dGUgPVxuSGlnaGxpZ2h0Lm1vZGVybml6ciA9XG5IaWdobGlnaHQubW9tZW50ID1cbkhpZ2hsaWdodC5tb25nb29zZSA9XG5IaWdobGlnaHQubm9kZSA9XG5IaWdobGlnaHQucmV0aGlua2RiID1cbkhpZ2hsaWdodC5zaW5vbiA9XG5IaWdobGlnaHQudW5kZXJzY29yZSA9IHJvb3ROb2RlID0+IHtcbiAgSGlnaGxpZ2h0LmFsbChyb290Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHJlJyksICdqYXZhc2NyaXB0Jyk7XG59O1xuXG5IaWdobGlnaHQucmVxdWlyZWpzID1cbkhpZ2hsaWdodC5zb2NrZXRpbyA9IHJvb3ROb2RlID0+IHtcbiAgY29uc3QgZWxlbWVudHMgPSByb290Tm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHJlJyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoZWxlbWVudHNbaV0udGV4dENvbnRlbnQubWF0Y2goL15cXHMqPC8pKSB7XG4gICAgICBIaWdobGlnaHQub25lKGVsZW1lbnRzW2ldLCAnbWFya3VwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIEhpZ2hsaWdodC5vbmUoZWxlbWVudHNbaV0sICdqYXZhc2NyaXB0Jyk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhpZ2hsaWdodDtcbiJdfQ==
//# sourceURL=/Users/broberto/.atom/packages/api-docs/src/highlight.js
