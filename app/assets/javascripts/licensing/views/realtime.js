define([
  'extensions/views/view'
],
function (View) {
  var RealtimeView = View.extend({
    initialize: function () {
      this.collection.on('reset', this.render, this);
      View.prototype.initialize.apply(this, arguments);
    },
    render: function () {
        this.$el.html("<strong>" + this.collection.getPercentageOfUptime() + "%</strong>");
    }
  });
  return RealtimeView;
});