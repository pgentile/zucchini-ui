migrate(function () {

  db.comments.createIndex({ 'references.type': 1, 'references.reference': 1 });

}, true);
