var migrationContext = {
  filename: null
};

function migrate(migration, idempotent) {
  print('Running migration ' + migrationContext.filename + '...');

  migration(migrationContext);
}
