define([
  'vehicle-licensing/collections/volumetrics',
  'extensions/views/timeseries-graph/timeseries-graph',
  'extensions/views/tabs',
  'extensions/views/graph/headline',
],
function (VolumetricsCollection, TimeseriesGraph, Tabs, Headline) {
  return function (selector, id, type) {
    if ($('.lte-ie8').length) {
      // do not attempt to show graphs in legacy IE
      return;
    }

    var volumetricsCollection = new VolumetricsCollection([], {
      type: type
    });
    volumetricsCollection.fetch();

    new TimeseriesGraph({
      el: $(selector),
      collection: volumetricsCollection,
      valueAttr: 'volume:sum'
    });
  };
});
