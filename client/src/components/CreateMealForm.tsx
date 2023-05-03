import React, { ChangeEvent, FormEvent, useState } from "react";
// import { addOne } from '../api.service';
import "../styles/CreateMealForm.css";


interface Meal {
  title: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: string;
  dietaryPreferences: string;
  weightGoal: number;
  weightAmount: number;
  timeFrame: number;
  eatingFrequency: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateMealFormProps {
  onMealSubmit: (meal: Meal) => void;
}

const initialState: Meal = {
  title: "",
  name: "",
  age: 0,
  gender: "",
  weight: 0,
  height: 0,
  activityLevel: "",
  dietaryPreferences: "",
  weightGoal: 0,
  weightAmount: 0,
  timeFrame: 0,
  eatingFrequency: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const CreateMealForm: React.FC<CreateMealFormProps> = ({ onMealSubmit }) => {
  const [formData, setFormData] = useState<Meal>(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const meal: Meal = {
      ...formData,
      title: formData.title,
      name: formData.name,
      age: parseInt(formData.age.toString(), 10),
      weight: parseFloat(formData.weight.toString()),
      height: parseFloat(formData.height.toString()),
      dietaryPreferences: formData.dietaryPreferences,
      weightAmount: parseFloat(formData.weightAmount.toString()),
      timeFrame: parseInt(formData.timeFrame.toString(), 10),
      eatingFrequency: parseInt(formData.eatingFrequency.toString(), 10),
      createdAt: formData.createdAt,
      updatedAt: formData.updatedAt,
    };
    // addOne(meal);
    onMealSubmit(meal);
    setFormData(initialState);
  };
  return (
    <form className="formStyle" onSubmit={handleSubmit}>
      <h2>CREATE A NEW DIET</h2>
      <div className="columns-container">
      <div className="column">
        <label htmlFor="title">Meal Plan Title:</label>
        <input
          data-cy="meal-name-input"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />


          <label htmlFor="name">Your name:</label>
          <input
            data-cy="your-name-input"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>


        <label htmlFor="weight">Your Weight (kg):</label>
        <input
          type="number"
          step="0.1"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <label htmlFor="height">Your Height (cm):</label>
        <input
          type="number"
          id="height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
        />
        </div>
<div className="column">
        <label htmlFor="activityLevel">Activity Level:</label>
        <select
          id="activityLevel"
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select Activity Level</option>
          <option value="SEDENTARY">Sedentary</option>
          <option value="LIGHT">Light</option>
          <option value="MODERATE">Moderate</option>
          <option value="ACTIVE">Active</option>
          <option value="VERY_ACTIVE">Very Active</option>
        </select>
        <label htmlFor="dietaryPreferences">Dietary Preferences:</label>
        <input
          id="dietaryPreferences"
          name="dietaryPreferences"
          value={formData.dietaryPreferences}
          onChange={handleChange}
          required
        />
        <label htmlFor="weightGoal">Weight Goal:</label>
        <select
          id="weightGoal"
          name="weightGoal"
          value={formData.weightGoal}
          onChange={handleChange}
          required
        >
          <option value="">Select Weight Goal</option>
          <option value="LOSE">Lose</option>
          <option value="GAIN">Gain</option>
          <option value="MAINTAIN">Maintain</option>
        </select>
        <label htmlFor="weightAmount">Amount To Gain/Lose (kg):</label>
        
        <input
          type="number"
          id="weightAmount"
          name="weightAmount"
          value={formData.weightAmount}
          onChange={handleChange}
          required
        />

        <label htmlFor="timeFrame">Time Frame (weeks):</label>
        <input
          type="number"
          id="timeFrame"
          name="timeFrame"
          value={formData.timeFrame}
          onChange={handleChange}
          required
        />
        <label htmlFor="eatingFrequency">
          Meals Eaten Per Day:
        </label>
        <input
          type="number"
          id="eatingFrequency"
          name="eatingFrequency"
          value={formData.eatingFrequency}
          onChange={handleChange}
          required
        />
       </div>
    </div>
    {/* create-meal-nav-link for cypress test */}
      <button data-cy="submit-meal-button" type="submit">Create Diet</button>
    </form>
  );
};
export default CreateMealForm;
