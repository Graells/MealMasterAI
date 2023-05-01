export const getAll = async () => {
  try {
    const response = await fetch("http://localhost:3001/meals", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    // console.log("apiService DATA", data);
    return data;
  } catch (error) {
    console.error("Error fetching diets:", error);
    return "Error message:" + error.message;
  }
};

export const submitForm = async (
  formData,
  auth0Id,
  userEmail,
  userName,
  userPic
) => {
  const {
    title,
    name,
    age,
    gender,
    weight,
    height,
    activityLevel,
    dietaryPreferences,
    weightGoal,
    weightAmount,
    timeFrame,
    eatingFrequency,
  } = formData;

  try {
    const response = await fetch("http://localhost:3001/ai-generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userPic,
        userName,
        auth0Id,
        email: userEmail,
        title,
        name,
        age,
        gender,
        weight,
        height,
        activityLevel,
        dietaryPreferences,
        weightGoal,
        weightAmount,
        timeFrame,
        eatingFrequency,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data: {} = await response.json();
    console.log("RESPONSE", data);
    return data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

export const addOne = async (meal) => {
  try {
    const response = await fetch("http://localhost:3001/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.json();
    console.log("Meal created:", result);
    return result;
  } catch (error) {
    console.error("Error creating meal:", error);
  }
};
