migrate(() => {

  db.scenarii.update(
    {
      status: 'PASSED',
      reviewed: { $exists: false }
    },
    {
      $set: { reviewed: true }
    },
    {
      multi: true
    }
  );

});
