define([
  'lpa/collections/application-method-over-time',
  'extensions/views/timeseries-graph/stacked-graph',
  'extensions/collections/singleitemgraphcollection',
  'lpa/collections/conversion-series',
  'extensions/views/conversion-graph/conversion-graph',
  'lpa/collections/help-usage', 'lpa/views/help-usage-table',
  'common/controllers/availability-module'
],
function (ApplicationsCollection, ApplicationsGraph,
          SingleItemGraphCollection, ConversionSeries, ConversionGraph,
          HelpUsageCollection, HelpUsageTable,
          availabilityModule) {
  return function () {

    if (!$('.lte-ie8').length) {

      if ($('#application-method-over-time').length) {
        var applicationsCollection = new ApplicationsCollection();

        var graphView = new ApplicationsGraph({
          el: $('#application-method-over-time'),
          collection: applicationsCollection,
          showLineLabels: true
        });

        applicationsCollection.fetch();
      }

      if ($('#lpa-conversion-graph').length) {
        var conversionCollection = new SingleItemGraphCollection(null, {
          conversionCollection: ConversionSeries
        });

        var conversionGraph = new ConversionGraph({
          el: $('#lpa-conversion-graph'),
          collection: conversionCollection
        });

        conversionCollection.fetch();
      }
    }

    var helpUsageCollection = new HelpUsageCollection();

    new HelpUsageTable({
       el: $('.help-usage-table'),
       collection: helpUsageCollection
    });

    helpUsageCollection.fetch();

    availabilityModule('lasting-power-of-attorney');
  }
});
