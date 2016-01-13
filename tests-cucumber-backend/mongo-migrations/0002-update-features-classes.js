// Update class name of stored objects

var results = db.features.update(
  {},
  {
    $set: {
      className: 'example.reporting.feature.domain.Feature'
    }
  },
  { multi: true }
);

print("Update results:");
printjson(results);
