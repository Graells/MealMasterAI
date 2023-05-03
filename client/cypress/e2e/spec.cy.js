describe('MealMaster E2E Tests', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Log In');
  });

  it('Logs in and redirects to Auth0', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy=login-button]').click();
    cy.origin('https://dev-x5rau7o7dqkll2cr.us.auth0.com', () => {
      
    cy.contains('Continue with GitHub');
    cy.contains('Continue with Google');
  });

})
   

  it('Navigates to the create meal page and creates a meal', () => {
    cy.visit('http://localhost:5173/home');
    cy.get('[data-cy=create-meal-nav-link]').click();

    cy.url().should('include', '/create-meal');

    // create meal page
    cy.get('[data-cy=meal-name-input]').type('Test Meal');
    cy.get('[data-cy=your-name-input]').type('Test Name');
    cy.get('[data-cy=submit-meal-button]').click();

    
    
    // e
    // cy.contains('Meal successfully created');
  });

  it('Visits the dashboard and checks for the created meal', () => {
    cy.visit('http://localhost:5173/home');
    cy.get('[data-cy=dashboard-nav-link]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Test Meal');
  });

  it('Visits the diet user display page and checks for content', () => {
    cy.visit('/diet-user-display');

    // Replace these with the expected content on your DietUserDisplay page
    cy.contains('User Diets');
    cy.contains('Diet Information');
  });

  it('Visits a specific diet details page and checks for content', () => {
    cy.visit('http://localhost:5173/dashboard');
    cy.get('[data-cy=diet-link]').first().click();

    cy.url().should('include', '/diet/');
    cy.contains('Diet Details');
  });
});
