migrate(function () {

  db.testRuns.find().forEach(function (testRun) {
    if (typeof testRun.type === 'undefined') {
      testRun.type = testRun.env;
      delete testRun.env;

      db.testRuns.update({ _id: testRun._id }, testRun);
    }

  });

});
