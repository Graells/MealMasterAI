import React, { useState } from "react";
import { addOne } from "../api.service";

const initialState = {
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
};
const CreateMealForm = ({ onMealSubmit }) => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const meal = {
      ...formData,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      dietaryPreferences: JSON.stringify(formData.dietaryPreferences),
      weightAmount: parseFloat(formData.weightAmount),
      timeFrame: parseInt(formData.timeFrame),
      eatingFrequency: parseInt(formData.eatingFrequency),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // addOne(meal);
    onMealSubmit(meal);
    setFormData(initialState);
  };
  return (
    <form className="formStyle" onSubmit={handleSubmit}>
      <h2>Create a new meal</h2>
      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />

      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
      >
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
      </select>

      <label htmlFor="weight">Weight (in kg):</label>
      <input
        type="number"
        step="0.1"
        id="weight"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
      />
      <label htmlFor="height">Height (in cm):</label>
      <input
        type="number"
        id="height"
        name="height"
        value={formData.height}
        onChange={handleChange}
      />
      <label htmlFor="activityLevel">Activity Level:</label>
      <select
        id="activityLevel"
        name="activityLevel"
        value={formData.activityLevel}
        onChange={handleChange}
      >
        <option value="">Select Activity Level</option>
        <option value="SEDENTARY">Sedentary</option>
        <option value="LIGHT">Light</option>
        <option value="MODERATE">Moderate</option>
        <option value="ACTIVE">Active</option>
        <option value="VERY_ACTIVE">Very Active</option>
      </select>
      <label htmlFor="dietaryPreferences">Dietary Preferences:</label>
      <textarea
        id="dietaryPreferences"
        name="dietaryPreferences"
        value={formData.dietaryPreferences}
        onChange={handleChange}
      />
      <label htmlFor="weightGoal">Weight Goal:</label>
      <select
        id="weightGoal"
        name="weightGoal"
        value={formData.weightGoal}
        onChange={handleChange}
      >
        <option value="">Select Weight Goal</option>
        <option value="LOSE">Lose</option>
        <option value="GAIN">Gain</option>
        <option value="MAINTAIN">Maintain</option>
      </select>
      <label htmlFor="weightAmount">Amount(in kg):</label>
      <input
        type="number"
        id="weightAmount"
        name="weightAmount"
        value={formData.weightAmount}
        onChange={handleChange}
      />
      <label htmlFor="timeFrame">Time Frame (in weeks):</label>
      <input
        type="number"
        id="timeFrame"
        name="timeFrame"
        value={formData.timeFrame}
        onChange={handleChange}
      />
      <label htmlFor="eatingFrequency">Eating Frequency (meals per day):</label>
      <input
        type="number"
        id="eatingFrequency"
        name="eatingFrequency"
        value={formData.eatingFrequency}
        onChange={handleChange}
      />
      <button type="submit">Create Meal</button>
    </form>
  );
};
export default CreateMealForm;
