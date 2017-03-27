migrate(function () {

  // Update feature languages

  var defaultLanguage = 'fr'; // Use french as default language on existing docs

  db.features.update({ language: { $exists: false } }, { $set: { language: defaultLanguage } }, { multi: true });
  db.scenarii.update({ language: { $exists: false } }, { $set: { language: defaultLanguage } }, { multi: true });

  // Create search index

  db.scenarii.createIndex(
    {
      "info.name": "text",
      "comment": "text",
      "steps.info.name": "text",
      "steps.info.arguments.value": "text",
      "background.steps.info.name": "text",
      "background.steps.info.arguments.value": "text",
    },
    {
      name: "searchIndex",
      background: true,
      language_override: "language",
      weights: {
        "info.name": 10,
        "comment": 5,
        "steps.info.name": 5,
        "steps.info.arguments.value": 4,
        "background.steps.info.name": 3,
        "background.steps.info.arguments.value": 2,
      }
    }
  );

});
