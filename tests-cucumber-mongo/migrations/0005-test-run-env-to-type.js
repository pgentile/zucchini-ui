migrate(function () {

  db.testRuns.find({ env: { $exists: true } }).forEach(function (testRun) {
    testRun.type = testRun.env;
    delete testRun.env;

    db.testRuns.update({ _id: testRun._id }, testRun);
  });

});
