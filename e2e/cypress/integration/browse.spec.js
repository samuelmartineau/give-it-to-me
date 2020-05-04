describe('Browse page spec', () => {
  it('Display add title', () => {
    cy.visit('/browse');
    cy.contains('Parcourir la cave');
  });
});
