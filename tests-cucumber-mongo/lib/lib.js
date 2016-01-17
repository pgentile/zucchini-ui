var migrationContext = {
  filename: null
};

function migrate(migration, idempotent) {

  var runMigration = function () {
    migration(migrationContext);
    db.appliedMigrations.update(
      {
        _id: migrationContext.filename
      },
      {
        _id: migrationContext.filename,
        date: new Date()
      },
      {
        upsert: true
      }
    );
  };

  var previousAppliedMigration = db.appliedMigrations.findOne({ _id: migrationContext.filename });
  if (previousAppliedMigration == null) {
    print('Running migration ' + migrationContext.filename + ' for the first time...');
    runMigration();
  } else if (idempotent) {
    print('Running idempotent migration ' + migrationContext.filename + ' prevously applied...');
    runMigration();
  } else {
    print('Skipping previously applied migration ' + migrationContext.filename);
  }

}
