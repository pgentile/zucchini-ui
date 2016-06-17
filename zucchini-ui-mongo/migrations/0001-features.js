migrate(function () {

  db.features.createIndex({ featureKey: 1 });
  db.features.createIndex({ testRunId: 1 });
  db.features.createIndex({ tags: 1 });

});
