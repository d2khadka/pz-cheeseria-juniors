/// <reference types="cypress" />

context('Purchase Actions', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/');
  })

  it('should have purchase button', () => {
    cy.get('[data-cy=add-to-cart-2]').click();
    cy.get('[data-cy=add-to-cart-3]').click();
    cy.get('[data-cy=cardbutton]').click();
    cy.contains('Purchase').should('exist');
    cy.get('[data-cy=purchase]').click();
  })
  
  it('should have item on recentpurchase', () => {
    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '/api/purchase', // that have a URL that matches '/users/*'
      },
      [{ "id": 2, "title": "Test cheese 1", "price": 29.21, "description": "The Abbaye du Mont des Cats cheese is made by monks in a monastery of the same name in the town of Godewaersvelde, in Northern France. Cow's milk from local farms is used and the milk is gently pasteurised for cheese production. The maturation process takes about 4 to 5 weeks", "category": "semi-soft, artisan, brined", "image": "https://www.cheese.com/media/img/cheese/Mont_des_Cats_kaas.jpg", "amount": 1 },
      { "id": 3, "title": "Test cheese 2", "price": 367.55, "description": "Adelost is a Swedish blue cheese made from cow's milk. The blue-grey veins running throughout are a distinctive feature of the cheese. It has a sharp, salty and tangy flavour. The ripening process is for two to three months. The cheese comes in a drum shape with a rind of pale cream, which is lightly dotted with moulds.", "category": "semi-soft, blue-veined", "image": "https://www.cheese.com/media/img/cheese/Adelost_QnxYLx6.jpg", "amount": 2 },
      { "id": 1, "title": "Test cheese 3", "price": 109.95, "description": "Abbaye de Belloc is a flat wheel-shaped traditional, farmhouse, unpasteurised, semi-hard cheese made from sheep's milk. It has a natural, crusty, brownish rind with patches of red, orange and yellow. The rind is marked with tiny craters.", "category": "creamy, dense and firm", "image": "https://www.cheese.com/media/img/cheese/Abbaye-de-Belloc.jpg", "amount": 3 }] // and force the response to be: []
    )
    cy.get('[data-cy=recentPurchase]').click();
    cy.contains('Test cheese 1').should('exist');
    cy.contains('Test cheese 2').should('exist');
    cy.contains('Test cheese 3').should('exist');
  })
})
