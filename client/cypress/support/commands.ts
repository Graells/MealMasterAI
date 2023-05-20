/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Cypress.Commands.add('login', (overrides = {}) => {
//     Cypress.log({
//       name: 'loginViaAuth0',
//     });
  
//     const options = {
//       method: 'POST',
//       url: Cypress.env('auth_url'),
//       body: {
//         grant_type: 'password',
//         username: Cypress.env('auth_username'),
//         password: Cypress.env('auth_password'),
//         audience: Cypress.env('auth_audience'),
//         scope: 'openid profile email',
//         client_id: Cypress.env('auth_client_id'),
//         client_secret: Cypress.env('auth_client_secret'),
//       },
//     };
//     cy.request(options);
//   });