migrate(function () {

  db.comments.update(
    {},
    {
      $set: { className: 'io.zucchiniui.backend.comment.domain.Comment' }
    },
    { multi: true }
  );

  db.features.update(
    {},
    {
      $set: { className: 'io.zucchiniui.backend.feature.domain.Feature' }
    },
    { multi: true }
  );

  db.scenarii.update(
    {},
    {
      $set: { className: 'io.zucchiniui.backend.scenario.domain.Scenario' }
    },
    { multi: true }
  );

  db.testRuns.update(
    {},
    {
      $set: { className: 'io.zucchiniui.backend.testrun.domain.TestRun' }
    },
    { multi: true }
  );

});
