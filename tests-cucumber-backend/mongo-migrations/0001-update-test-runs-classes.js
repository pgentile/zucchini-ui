// Update class name of stored objects

var results = db.testRuns.update(
  {},
  {
    $set: {
      className: 'io.testscucumber.backend.testrun.domain.TestRun'
    }
  },
  { multi: true }
);

print("Update results:");
printjson(results);
