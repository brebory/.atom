(function() {
  var JadeProvider;

  JadeProvider = require('./jade-provider');

  module.exports = {
    activate: function() {
      return this.provider = new JadeProvider;
    },
    deactivate: function() {
      return this.provider = null;
    },
    provide: function() {
      return this.provider;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3NvdXJjZS1wcmV2aWV3LWphZGUvbGliL21haW4uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFlBQUE7O0FBQUEsRUFBQSxZQUFBLEdBQWUsT0FBQSxDQUFRLGlCQUFSLENBQWYsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsUUFBRCxHQUFZLEdBQUEsQ0FBQSxhQURKO0lBQUEsQ0FBVjtBQUFBLElBR0EsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNWLElBQUMsQ0FBQSxRQUFELEdBQVksS0FERjtJQUFBLENBSFo7QUFBQSxJQU1BLE9BQUEsRUFBUyxTQUFBLEdBQUE7YUFDUCxJQUFDLENBQUEsU0FETTtJQUFBLENBTlQ7R0FKRixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/broberto/.atom/packages/source-preview-jade/lib/main.coffee
