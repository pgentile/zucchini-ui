// Update class name of stored objects

var results = db.scenarii.update(
  {},
  {
    $set: {
      className: 'example.reporting.scenario.domain.Scenario'
    }
  },
  { multi: true }
);

print("Update results:");
printjson(results);
