// Update status of stored objects

var results = db.scenarii.update(
  {
    status: 'SKIPPED'
  },
  {
    $set: {
      status: 'FAILED'
    }
  },
  { multi: true }
);

print("Update results:");
printjson(results);
