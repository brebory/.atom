(function() {
  var $, extend, handleDrag, hg;

  hg = require('mercury');

  extend = require('xtend');

  $ = require('atom-space-pen-views').$;

  handleDrag = function(ev, broadcast) {
    var data, delegator, onmove, onup;
    data = this.data;
    delegator = hg.Delegator();
    onmove = function(ev) {
      var delta, docHeight, docWidth, pageX, pageY, statusBarHeight;
      docHeight = $(document).height();
      docWidth = $(document).width();
      pageY = ev.pageY, pageX = ev.pageX;
      statusBarHeight = $('div.status-bar-left').height();
      if (statusBarHeight == null) {
        statusBarHeight = 0;
      }
      delta = {
        height: docHeight - pageY - statusBarHeight,
        sideWidth: docWidth - pageX
      };
      return broadcast(extend(data, delta));
    };
    onup = function(ev) {
      delegator.unlistenTo('mousemove');
      delegator.removeGlobalEventListener('mousemove', onmove);
      return delegator.removeGlobalEventListener('mouseup', onup);
    };
    delegator.listenTo('mousemove');
    delegator.addGlobalEventListener('mousemove', onmove);
    return delegator.addGlobalEventListener('mouseup', onup);
  };

  module.exports = hg.BaseEvent(handleDrag);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL1VzZXJzL2Jyb2JlcnRvLy5hdG9tL3BhY2thZ2VzL25vZGUtZGVidWdnZXIvbGliL0NvbXBvbmVudHMvZHJhZy1oYW5kbGVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSx5QkFBQTs7QUFBQSxFQUFBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUFMLENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsT0FBQSxDQUFRLE9BQVIsQ0FEVCxDQUFBOztBQUFBLEVBRUMsSUFBSyxPQUFBLENBQVEsc0JBQVIsRUFBTCxDQUZELENBQUE7O0FBQUEsRUFJQSxVQUFBLEdBQWEsU0FBQyxFQUFELEVBQUssU0FBTCxHQUFBO0FBQ1gsUUFBQSw2QkFBQTtBQUFBLElBQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxJQUFaLENBQUE7QUFBQSxJQUNBLFNBQUEsR0FBWSxFQUFFLENBQUMsU0FBSCxDQUFBLENBRFosQ0FBQTtBQUFBLElBR0EsTUFBQSxHQUFTLFNBQUMsRUFBRCxHQUFBO0FBQ1AsVUFBQSx5REFBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxNQUFaLENBQUEsQ0FBWixDQUFBO0FBQUEsTUFDQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEtBQVosQ0FBQSxDQURYLENBQUE7QUFBQSxNQUVDLFdBQUEsS0FBRCxFQUFRLFdBQUEsS0FGUixDQUFBO0FBQUEsTUFHQSxlQUFBLEdBQWtCLENBQUEsQ0FBRSxxQkFBRixDQUF3QixDQUFDLE1BQXpCLENBQUEsQ0FIbEIsQ0FBQTtBQUlBLE1BQUEsSUFBMkIsdUJBQTNCO0FBQUEsUUFBQSxlQUFBLEdBQWtCLENBQWxCLENBQUE7T0FKQTtBQUFBLE1BTUEsS0FBQSxHQUFRO0FBQUEsUUFDTixNQUFBLEVBQVEsU0FBQSxHQUFZLEtBQVosR0FBb0IsZUFEdEI7QUFBQSxRQUVOLFNBQUEsRUFBVyxRQUFBLEdBQVcsS0FGaEI7T0FOUixDQUFBO2FBV0EsU0FBQSxDQUFVLE1BQUEsQ0FBTyxJQUFQLEVBQWEsS0FBYixDQUFWLEVBWk87SUFBQSxDQUhULENBQUE7QUFBQSxJQWlCQSxJQUFBLEdBQU8sU0FBQyxFQUFELEdBQUE7QUFDTCxNQUFBLFNBQVMsQ0FBQyxVQUFWLENBQXFCLFdBQXJCLENBQUEsQ0FBQTtBQUFBLE1BQ0EsU0FBUyxDQUFDLHlCQUFWLENBQW9DLFdBQXBDLEVBQWlELE1BQWpELENBREEsQ0FBQTthQUVBLFNBQVMsQ0FBQyx5QkFBVixDQUFvQyxTQUFwQyxFQUErQyxJQUEvQyxFQUhLO0lBQUEsQ0FqQlAsQ0FBQTtBQUFBLElBdUJBLFNBQVMsQ0FBQyxRQUFWLENBQW1CLFdBQW5CLENBdkJBLENBQUE7QUFBQSxJQXdCQSxTQUFTLENBQUMsc0JBQVYsQ0FBaUMsV0FBakMsRUFBOEMsTUFBOUMsQ0F4QkEsQ0FBQTtXQXlCQSxTQUFTLENBQUMsc0JBQVYsQ0FBaUMsU0FBakMsRUFBNEMsSUFBNUMsRUExQlc7RUFBQSxDQUpiLENBQUE7O0FBQUEsRUFnQ0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsRUFBRSxDQUFDLFNBQUgsQ0FBYSxVQUFiLENBaENqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/Users/broberto/.atom/packages/node-debugger/lib/Components/drag-handler.coffee
