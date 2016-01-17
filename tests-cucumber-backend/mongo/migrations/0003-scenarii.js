migrate(function () {

  db.scenarii.createIndex({ scenarioKey: 1 });
  db.scenarii.createIndex({ featureId: 1 });
  db.scenarii.createIndex({ testRunId: 1 });
  db.scenarii.createIndex({ tags: 1 });

}, true);
