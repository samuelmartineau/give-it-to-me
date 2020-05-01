describe('Home page spec', () => {
  it('Display activity title', () => {
    cy.visit('/');
    cy.contains('Mon activité');
  });
});
