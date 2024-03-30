describe('Технические интервью', () => {
  it('Отображает список интервью', () => {
    cy.visit('/interviews');

    cy.get('h1').should('have.text', 'Технические собеседования');

    cy.get('ul li').should('have.length', 3);

    cy.get('ul li').eq(0).should('have.text', 'Frontend разработчик - 2023-04-05');
    cy.get('ul li').eq(1).should('have.text', 'Backend разработчик - 2023-04-12');
    cy.get('ul li').eq(2).should('have.text', 'Fullstack разработчик - 2023-05-01');
  });
});