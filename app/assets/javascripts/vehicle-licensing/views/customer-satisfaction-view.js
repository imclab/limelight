define([
  'extensions/views/view'
],
  function (View) {

    var toAttributeName = function(service) {
      return 'satisfaction_' + service.replace('-', '_');
    };

    var CustomerSatisfactionView = View.extend({

      initialize: function () {
        View.prototype.initialize.apply(this, arguments);
        this.satisfactionAttribute = toAttributeName(this.service);
        this.collection.on('reset', this.render, this);
      },

      getSatisfaction: function (model) {
        return model.get(this.satisfactionAttribute);
      },

      getCurrentValue: function() {
        var value = this.getSatisfaction(this.collection.last());
        return this.formatNumericLabel(value * 100) + '%';
      },

      getCurrentDate: function() {
        var value = this.collection.last().get('_timestamp');
        return value.format('MMMM YYYY');
      },

      getChange: function () {
        var entries = this.collection.last(2);
        return this.getSatisfaction(entries[1]) - this.getSatisfaction(entries[0]);
      },

      getChangeString: function() {
        var change = this.getChange();
        var changeString = this.formatNumericLabel(change * 100) + '%';
        if (change > 0) changeString = '+' + changeString;
        return  changeString;
      },

      getChangeClasses: function () {
        var change = this.getChange();
        if (change > 0) return "increase improvement";
        if (change < 0) return "decrease decline";
        return "no-change";
      },

      getPreviousDate: function () {
        var value = _.first(this.collection.last(2)).get('_timestamp');
        return value.format('MMMM YYYY');
      },

      render: function () {
        this.$el.find('.current-value').html("<strong>" + this.getCurrentValue() + "</strong>");
        this.$el.find('.current-date').html(this.getCurrentDate());
        this.$el.find('.change').html($('<span>').addClass(this.getChangeClasses()).text(this.getChangeString()));
        this.$el.find('.previous-date').html(this.getPreviousDate())
      }
    });
    return CustomerSatisfactionView;
  });
