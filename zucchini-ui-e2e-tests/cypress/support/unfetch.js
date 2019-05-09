// Replace with a fetch implementation with XHR
// See doc: https://docs.cypress.io/api/commands/route.html
// See issue: https://github.com/cypress-io/cypress/issues/95

let polyfill;

before(() => {
  const polyfillUrl = 'https://unpkg.com/whatwg-fetch@3.0.0/dist/fetch.umd.js';
  cy.request(polyfillUrl).then(response => {
    polyfill = response.body;
  });
});

Cypress.on('window:before:load', win => {
  delete win.fetch;
  win.eval(polyfill);
});
