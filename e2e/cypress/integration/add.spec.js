describe('Add page spec', () => {
  it('Display add title', () => {
    cy.visit('/add');
    cy.contains('Ajouter une nouvelle bouteille');
  });

  it('Should display preview image', () => {
    cy.visit('/add');
    cy.get('input[name=picture]').dropFile('chateau-margaux.jpg');
    cy.getElement('picture').find('img').should('have.attr', 'src');
  });

  it.only('Should Add wine', () => {
    cy.visit('/add');
    cy.get('input[name=picture]').dropFile('chateau-margaux.jpg');
    cy.get('input[name=name]').type('Chateau Margaux');
    cy.get('input[name=year]').type(2010);
    cy.get('input[name=wineFamily]').type('Marg');
    cy.get('ul[role=listbox]').find('li').contains('margaux').click();
    cy.getElement('cellar').find('rect').eq(4).click();
    cy.getElement('box').find('rect').eq(1).click();
    cy.getElement('box').find('rect').eq(2).click();
    cy.getElement('box').find('rect').eq(3).click();
    cy.get('button[type=submit]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Ajout avec succès`);
    });
  });
});
