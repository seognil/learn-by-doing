///  <reference types="cypress" />

describe('Window', () => {
  beforeEach(() => cy.visit('https://fe.rualc.com/'));

  it('document is in utf8 ', () => {
    cy.document()
      .should('have.property', 'charset')
      .and('eq', 'UTF-8');
  });

  it('content', () => {
    cy.contains('前端指南');
    cy.contains('锟斤拷烫烫烫').should('not.exist');
  });
});
