migrate(() => {

  db.scenarii.update(
    {
      status: { $not: { $eq: 'PASSED' } },
      reviewed: { $exists: false }
    },
    {
      $set: { reviewed: false }
    },
    {
      multi: true
    }
  );

});
