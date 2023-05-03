// import { mount } from '@cypress/react';
// import CreateMealForm from '../../../src/components/CreateMealForm';

// describe('CreateMealForm', () => {
//   it('Renders the form and submits data', () => {
//     const onMealSubmit = cy.stub();
//     mount(<CreateMealForm onMealSubmit={onMealSubmit} />);

//     cy.get('form').within(() => {
//       cy.get('#title').type('Test Meal Plan');
//       cy.get('#name').type('John Doe');
//       cy.get('#age').type('25');
//       cy.get('#gender').select('MALE');
//       cy.get('#weight').type('70');
//       cy.get('#height').type('175');
//       cy.get('#activityLevel').select('MODERATE');
//       cy.get('#dietaryPreferences').type('Vegetarian');
//       cy.get('#weightGoal').select('LOSE');
//       cy.get('#weightAmount').type('5');
//       cy.get('#timeFrame').type('6');
//       cy.get('#eatingFrequency').type('3');
//       cy.get('button[type=submit]').click();
//     });

//     expect(onMealSubmit).to.have.been.calledWith({
//       title: 'Test Meal Plan',
//       name: 'John Doe',
//       age: 25,
//       gender: 'MALE',
//       weight: 70,
//       height: 175,
//       activityLevel: 'MODERATE',
//       dietaryPreferences: 'Vegetarian',
//       weightGoal: 'LOSE',
//       weightAmount: 5,
//       timeFrame: 6,
//       eatingFrequency: 3,
//       createdAt: undefined,
//       updatedAt: undefined,
//     });
//   });
// });
