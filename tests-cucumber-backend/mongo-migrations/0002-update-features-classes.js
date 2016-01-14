// Update class name of stored objects

var results = db.features.update(
  {},
  {
    $set: {
      className: 'io.testscucumber.backend.feature.domain.Feature'
    }
  },
  { multi: true }
);

print("Update results:");
printjson(results);
