import React from "react";
import { render, fireEvent, getByTestId, screen, window, getByLabelText, toHaveBeenCalledWith,  toHaveBeenCalledTimes } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import CreateMealForm from "../components/CreateMealForm";

describe('NewDietForm', () => {
  test('should submit the form when all fields are valid', () => {
    
    const handleSubmit = jest.fn();
    const { getByLabelText, getByText, click, toHaveBeenCalledTimes } = render(<CreateMealForm onMealSubmit={handleSubmit} />);

    fireEvent.change(getByLabelText('Title'), { target: { value: 'My new diet' } });
    fireEvent.change(getByLabelText('Your name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Age:'), { target: { value: '30' } });
    fireEvent.change(getByLabelText('Gender:'), { target: { value: 'MALE' } });
    fireEvent.change(getByLabelText('Weight (in kg):'), { target: { value: '70' } });
    fireEvent.change(getByLabelText('Height (in cm):'), { target: { value: '170' } });
    fireEvent.change(getByLabelText('Activity Level:'), { target: { value: 'MODERATE' } });
    fireEvent.change(getByLabelText('Dietary Preferences:'), { target: { value: 'Vegetarian' } });
    fireEvent.change(getByLabelText('Weight Goal:'), { target: { value: 'LOSE' } });
    fireEvent.change(getByLabelText('Amount(in kg):'), { target: { value: '5' } });
    fireEvent.change(getByLabelText('Time Frame (in weeks):'), { target: { value: '10' } });
    fireEvent.change(getByLabelText('Eating Frequency (meals per day):'), { target: { value: '3' } });

    fireEvent.click(getByText('Create Diet'));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  
  // test('All inputs should be in the page', () => {
    
  //   const { container, getByLabelText } = render(<CreateMealForm />);

  //   expect(container.getByLabelText('Title')).toBeInTheDocument();
  //   expect(container.getByLabelText('Your name:')).toBeInTheDocument();
  //   expect(container.getByLabelText('Gender:')).toBeInTheDocument();
  //   expect(container.getByLabelText('Select Gender')).toBeInTheDocument();
  //   expect(container.getByLabelText('Weight (in kg):')).toBeInTheDocument();
  //   expect(container.getByLabelText('Height (in cm):')).toBeInTheDocument();
  //   expect(container.getByLabelText('Activity Level:')).toBeInTheDocument();
  //   expect(container.getByLabelText('Dietary Preferences:')).toBeInTheDocument();
  //   expect(container.getByLabelText('Weight Goal:')).toBeInTheDocument();
  //   expect(container.getByLabelText('Amount(in kg):')).toBeInTheDocument();
  //   expect(container.getByLabelText('Time Frame (in weeks):')).toBeInTheDocument();
  //   expect(container.getByLabelText('Eating Frequency (meals per day):')).toBeInTheDocument();
  // });

})

describe ('Button', () => {
  it ('Button shoul be on the page', () => {
    const { queryByText } = render(<CreateMealForm />);
    const button = queryByText('Create Diet');
    expect(button).toBeInTheDocument();
  })

  it('Renders the button with the correct text', () => {
    const { queryByText } = render(<CreateMealForm />);
    const button = queryByText('Create Diet');
    expect(queryByText('Create Diet')).toHaveTextContent('Create Diet');
  });

});



