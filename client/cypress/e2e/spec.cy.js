describe('MealMaster E2E Tests', () => {
  it('Visits the login page', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Log In');
  });

  it('Logs in and redirects to Auth0', () => {
    // Set the email and password variables
    const email = 'jordanrollinstefl@gmail.com';
    const password = 'Codeworks2023';
  
    cy.visit('http://localhost:5173/');
  
    cy.get('[data-cy=login-button]').click();
  
  
    // Fill the email and password input fields
    cy.get('input[name=username]').type(email);
    cy.get('input#password').type(password, { log: false });
  
    // Click the "Continue" button
    cy.contains('button', 'Continue').click();
  
    // Add your assertions to check for successful login and redirection
 cy.wait(5000);
    cy.get('[data-cy=create-meal-nav-link]').click();

    cy.url().should('include', '/create-meal');

    // create meal page
    cy.get('[data-cy=meal-name-input]').type('Test Meal');
    cy.get('[data-cy=your-name-input]').type('Test Name');
    cy.get('[data-cy=age-input]').type('30');
    cy.get('[data-cy=gender-input]').select('FEMALE');
    cy.get('[data-cy=weight-input]').type('60');
    cy.get('[data-cy=height-input]').type('160');
    cy.get('[data-cy=activity-input]').select('LIGHT');
    cy.get('[data-cy=preferences-input]').type('Italian food');
    cy.get('[data-cy=weight-goal-input]').select('GAIN');
    cy.get('[data-cy=weight-amount-input]').type('3');
    cy.get('[data-cy=timeframe-input]').type('3');
    cy.get('[data-cy=freq-input]').type('3');


    cy.get('[data-cy=submit-meal-button]').click();

    cy.wait(25000)

  });


  it('Visits the dashboard and checks for the created meal', () => {
    
    cy.visit('http://localhost:5173/home');
    cy.get('[data-cy=dashboard-nav-link]').click();

    cy.url().should('include', '/dashboard');
    Cypress.config('defaultCommandTimeout', 30000);
    cy.contains('Test Meal');
  });

 

  it('Visits a specific diet details page and checks for content', () => {
    cy.visit('http://localhost:5173/dashboard');
    cy.get('[data-cy=diet-link]').first().select('jordanrollinstefl@gmail.com');

    cy.url().should('include', '/dashboard');
    cy.get(':nth-child(6) > .title-container > a > h3').contains('Test Meal for Test Name')
  });
});
