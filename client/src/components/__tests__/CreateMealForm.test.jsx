import {describe,expect,test} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import CreateMealForm from '../CreateMealForm';
import PreviousDataItem from '../PreviousDataItem';
import DietProvider
 from '../../contexts/DietProvider';

describe("create-meal page content", () => {
const AllProviders = ({children}) => { return (
    <DietProvider>
   <BrowserRouter>
   {children}
   </BrowserRouter>
    </DietProvider>)}

    test("create-meal page should render CreateMealForm and PreviousDataItem ", () => {
      render(

        <>
          <CreateMealForm/>
          <PreviousDataItem />
       </>,
        {wrapper: AllProviders, }
      );

      const element1 = screen.getByText(/Create a new diet/i);
      const element2 = screen.getByTestId('your-previous-data');
  
      expect(element1).not.toBeNull();
      expect(element2).not.toBeNull();
    });
  });

 
  
  test('CreateMealForm submits correct data on submit', async () => {
    let submittedData = null;
    const handleSubmit = (data) => {
      submittedData = data;
    };
    render(<CreateMealForm onMealSubmit={handleSubmit} />);
  
    // Fill out the form
  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: 'Test' },
  });
  fireEvent.change(screen.getByLabelText(/Your name:/i), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByLabelText(/Age:/i), {
    target: { value: '30' },
  });
  fireEvent.change(screen.getByLabelText(/Gender:/i), {
    target: { value: 'MALE' },
  });
  fireEvent.change(screen.getByLabelText(/Weight \(in kg\):/i), {
    target: { value: '80' },
  });
  fireEvent.change(screen.getByLabelText(/Height \(in cm\):/i), {
    target: { value: '180' },
  });
  fireEvent.change(screen.getByLabelText(/Activity Level:/i), {
    target: { value: 'SEDENTARY' },
  });
  fireEvent.change(screen.getByLabelText(/Dietary Preferences:/i), {
    target: { value: 'Vegetarian' },
  });
  fireEvent.change(screen.getByLabelText(/Weight Goal:/i), {
    target: { value: 'LOSE' },
  });
  fireEvent.change(screen.getByLabelText(/Amount\(in kg\):/i), {
    target: { value: '5' },
  });
  fireEvent.change(screen.getByLabelText(/Time Frame \(in weeks\):/i), {
    target: { value: '4' },
  });
  fireEvent.change(screen.getByLabelText(/Eating Frequency/i), {
    target: { value: '3' },
  });

  // Click the submit button
  fireEvent.click(screen.getByText(/Create Diet/i));

    // Check if the handleSubmit function was called with the expected data
    expect(submittedData).toMatchObject({
      title: 'Test',
      name: 'John Doe',
      age: 30,
      gender: 'MALE',
      weight: 80,
      height: 180,
      activityLevel: 'SEDENTARY',
      dietaryPreferences: 'Vegetarian',
      weightGoal: 'LOSE',
      weightAmount: 5,
      timeFrame: 4,
      eatingFrequency: 3,
    });
  });
    
  
  