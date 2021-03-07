const migrationContext = {
  filename: null
};

function migrate(migration) {
  const runningState = "RUNNING";
  const successState = "SUCCESS";
  const errorState = "ERROR";

  const previousAppliedMigration = db.appliedMigrations.findOne({ _id: migrationContext.filename });
  if (!previousAppliedMigration || previousAppliedMigration.state !== successState) {
    db.appliedMigrations.updateOne(
      { _id: migrationContext.filename },
      {
        $set: {
          _id: migrationContext.filename,
          state: runningState,
          date: new Date()
        },
        $unset: {
          error: ""
        }
      },
      { upsert: true }
    );

    print(`Running migration ${migrationContext.filename} for the first time...`);

    try {
      migration(migrationContext);

      db.appliedMigrations.updateOne(
        { _id: migrationContext.filename },
        { $set: { state: successState, date: new Date() } }
      );
    } catch (e) {
      db.appliedMigrations.updateOne(
        { _id: migrationContext.filename },
        {
          $set: {
            state: errorState,
            date: new Date(),
            error: `${e}`
          }
        }
      );

      throw e;
    }
  } else {
    print("Skipping previously applied migration " + migrationContext.filename);
  }
}

function runMigration({ filename, baseName }) {
  migrationContext.filename = baseName;
  try {
    load(filename);
  } finally {
    migrationContext.filename = null;
  }
}

print("Will apply migrations");

print(`Current work dir is: ${pwd()}`);

cd("./migrations");

listFiles()
  .filter((file) => !file.isDirectory)
  .sort((left, right) => left.baseName.localeCompare(right.baseName))
  .forEach((file) => runMigration({ filename: file.name, baseName: file.baseName }));

print("All migrations applied, you're ready to go !");
