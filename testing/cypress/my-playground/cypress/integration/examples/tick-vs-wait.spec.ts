///  <reference types="cypress" />

// describe('Window', () => {
//   beforeEach(() => {
//     cy.visit('https://fe.rualc.com/');
//   });

//   it('document, utf8 ', () => {
//     cy.document()
//       .should('have.property', 'charset')
//       .and('eq', 'UTF-8');
//   });

//   it('content', () => {
//     cy.title().should('include', '前端指南');
//   });
// });

const fnName = 'changeWorld';
const HELLO_CYPRESS = 'Hello Cypress!';

describe('Test', () => {
  beforeEach(() => {
    cy.visit('src/tick-vs-wait/index.html');
  });

  it(`has ${fnName} function`, () => {
    // * from index.html
    cy.window().should('have.prop', fnName);
  });

  it('clock + tick is super fast', () => {
    cy.clock();

    // @ts-ignore
    cy.window().invoke(fnName);

    cy.tick(2000);

    cy.get('#app').should('have.text', HELLO_CYPRESS);
  });

  it('wait', () => {
    // @ts-ignore
    cy.window().invoke(fnName);

    cy.wait(2000);

    cy.get('#app').should('have.text', HELLO_CYPRESS);
  });

  it('auto retry', () => {
    // @ts-ignore
    cy.window().invoke(fnName);

    cy.get('#app').should('have.text', HELLO_CYPRESS);
  });
});
