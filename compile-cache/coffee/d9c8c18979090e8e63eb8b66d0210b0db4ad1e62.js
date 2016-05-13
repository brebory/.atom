(function() {
  var JadeProvider, PugProvider;

  PugProvider = require('./pug-provider');

  JadeProvider = require('./jade-provider');

  module.exports = {
    activate: function() {
      this.pugProvider = new PugProvider;
      return this.jadeProvider = new JadeProvider;
    },
    deactivate: function() {
      this.pugProvider = null;
      return this.jadeProvider = null;
    },
    provide: function() {
      return [this.pugProvider, this.jadeProvider];
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL3NvdXJjZS1wcmV2aWV3LXB1Zy9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEseUJBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLGdCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUNBLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FEZixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FFRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUEsR0FBQTtBQUNSLE1BQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxHQUFBLENBQUEsV0FBZixDQUFBO2FBQ0EsSUFBQyxDQUFBLFlBQUQsR0FBZ0IsR0FBQSxDQUFBLGFBRlI7SUFBQSxDQUFWO0FBQUEsSUFJQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsV0FBRCxHQUFlLElBQWYsQ0FBQTthQUNBLElBQUMsQ0FBQSxZQUFELEdBQWdCLEtBRk47SUFBQSxDQUpaO0FBQUEsSUFRQSxPQUFBLEVBQVMsU0FBQSxHQUFBO2FBQ1AsQ0FBQyxJQUFDLENBQUEsV0FBRixFQUFlLElBQUMsQ0FBQSxZQUFoQixFQURPO0lBQUEsQ0FSVDtHQUxGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/Users/broberto/.atom/packages/source-preview-pug/lib/main.coffee
