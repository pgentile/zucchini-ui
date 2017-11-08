const migrationContext = {
  filename: null
};

function migrate(migration) {

  const runMigration = function () {
    try {
      migration(migrationContext);
    } catch (e) {
      throw new Error('Caught exception when applying migration ' + migrationContext.filename + ': ' + e);
    }
  };

  const previousAppliedMigration = db.appliedMigrations.findOne({ _id: migrationContext.filename });
  if (previousAppliedMigration == null) {
    print('Running migration ' + migrationContext.filename + ' for the first time...');
    runMigration();

    db.appliedMigrations.insert({ _id: migrationContext.filename, date: new Date() });
  } else {
    print('Skipping previously applied migration ' + migrationContext.filename);
  }

}
