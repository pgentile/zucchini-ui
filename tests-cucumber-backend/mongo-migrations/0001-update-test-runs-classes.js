// Update class name of stored objects

var results = db.testRuns.update(
  {},
  {
    $set: {
      className: 'example.reporting.testrun.domain.TestRun'
    }
  },
  { multi: true }
);

print("Update results:");
printjson(results);
