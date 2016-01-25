(function() {
  var JadeProvider, fs, path;

  path = require('path');

  fs = require('fs');

  JadeProvider = require('../lib/jade-provider');

  describe("JadeProvider", function() {
    var provider;
    provider = [][0];
    beforeEach(function() {
      return provider = new JadeProvider;
    });
    return describe("transform", function() {
      it("jade -> html", function() {
        var htmlCode, jadeCode;
        jadeCode = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample.jade'), {
          encoding: 'utf8'
        });
        htmlCode = fs.readFileSync(path.join(__dirname, 'fixtures', 'sample.html'), {
          encoding: 'utf8'
        });
        return expect(provider.transform(jadeCode).code.trim()).toEqual(htmlCode.trim());
      });
      return it("jade -> html with extends", function() {
        var htmlCode, jadeCode, jadeFilePath;
        jadeFilePath = path.join(__dirname, 'fixtures', 'index.jade');
        jadeCode = fs.readFileSync(jadeFilePath, {
          encoding: 'utf8'
        });
        htmlCode = fs.readFileSync(path.join(__dirname, 'fixtures', 'index.html'), {
          encoding: 'utf8'
        });
        return expect(provider.transform(jadeCode, {
          filePath: jadeFilePath
        }).code.trim()).toEqual(htmlCode.trim());
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3NvdXJjZS1wcmV2aWV3LWphZGUvc3BlYy9qYWRlLXByb3ZpZGVyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNCQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsRUFFQSxZQUFBLEdBQWUsT0FBQSxDQUFRLHNCQUFSLENBRmYsQ0FBQTs7QUFBQSxFQUlBLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUEsR0FBQTtBQUN2QixRQUFBLFFBQUE7QUFBQSxJQUFDLFdBQVksS0FBYixDQUFBO0FBQUEsSUFFQSxVQUFBLENBQVcsU0FBQSxHQUFBO2FBQ1QsUUFBQSxHQUFXLEdBQUEsQ0FBQSxhQURGO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FLQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBLEdBQUE7QUFDcEIsTUFBQSxFQUFBLENBQUcsY0FBSCxFQUFtQixTQUFBLEdBQUE7QUFDakIsWUFBQSxrQkFBQTtBQUFBLFFBQUEsUUFBQSxHQUFXLEVBQUUsQ0FBQyxZQUFILENBQWdCLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBVixFQUFxQixVQUFyQixFQUFpQyxhQUFqQyxDQUFoQixFQUFpRTtBQUFBLFVBQUEsUUFBQSxFQUFVLE1BQVY7U0FBakUsQ0FBWCxDQUFBO0FBQUEsUUFDQSxRQUFBLEdBQVcsRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLFVBQXJCLEVBQWlDLGFBQWpDLENBQWhCLEVBQWlFO0FBQUEsVUFBQSxRQUFBLEVBQVUsTUFBVjtTQUFqRSxDQURYLENBQUE7ZUFFQSxNQUFBLENBQU8sUUFBUSxDQUFDLFNBQVQsQ0FBbUIsUUFBbkIsQ0FBNEIsQ0FBQyxJQUFJLENBQUMsSUFBbEMsQ0FBQSxDQUFQLENBQWdELENBQUMsT0FBakQsQ0FBeUQsUUFBUSxDQUFDLElBQVQsQ0FBQSxDQUF6RCxFQUhpQjtNQUFBLENBQW5CLENBQUEsQ0FBQTthQUtBLEVBQUEsQ0FBRywyQkFBSCxFQUFnQyxTQUFBLEdBQUE7QUFDOUIsWUFBQSxnQ0FBQTtBQUFBLFFBQUEsWUFBQSxHQUFlLElBQUksQ0FBQyxJQUFMLENBQVUsU0FBVixFQUFxQixVQUFyQixFQUFpQyxZQUFqQyxDQUFmLENBQUE7QUFBQSxRQUNBLFFBQUEsR0FBVyxFQUFFLENBQUMsWUFBSCxDQUFnQixZQUFoQixFQUE4QjtBQUFBLFVBQUEsUUFBQSxFQUFVLE1BQVY7U0FBOUIsQ0FEWCxDQUFBO0FBQUEsUUFFQSxRQUFBLEdBQVcsRUFBRSxDQUFDLFlBQUgsQ0FBZ0IsSUFBSSxDQUFDLElBQUwsQ0FBVSxTQUFWLEVBQXFCLFVBQXJCLEVBQWlDLFlBQWpDLENBQWhCLEVBQWdFO0FBQUEsVUFBQSxRQUFBLEVBQVUsTUFBVjtTQUFoRSxDQUZYLENBQUE7ZUFHQSxNQUFBLENBQU8sUUFBUSxDQUFDLFNBQVQsQ0FBbUIsUUFBbkIsRUFBNkI7QUFBQSxVQUFBLFFBQUEsRUFBVSxZQUFWO1NBQTdCLENBQW9ELENBQUMsSUFBSSxDQUFDLElBQTFELENBQUEsQ0FBUCxDQUF3RSxDQUFDLE9BQXpFLENBQWlGLFFBQVEsQ0FBQyxJQUFULENBQUEsQ0FBakYsRUFKOEI7TUFBQSxDQUFoQyxFQU5vQjtJQUFBLENBQXRCLEVBTnVCO0VBQUEsQ0FBekIsQ0FKQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/broberto/.atom/packages/source-preview-jade/spec/jade-provider-spec.coffee
