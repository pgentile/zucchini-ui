migrate(() => {

  db.testRuns.createIndex({ env: 1 });
  db.testRuns.createIndex({ date: -1 });

});
