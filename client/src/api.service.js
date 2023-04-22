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
    console.log('apiService DATA',data);
    return data;
  } catch (error) {
    console.error("Error fetching diets:", error);
    return error;
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

export const submitForm = async (
  formData,
  auth0Id,
  userEmail,
  userName,
  userPic
) => {
  const {
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

    const data = await response.json();
    console.log("RESPONSE",data);
    return data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

// const apiRequest = async (url, method, body) => {
//   try {
//     const response = await fetch(url, {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error in API request:", error);
//     return error;
//   }
// };
// export const getAll = async () => {
//   try {
//     const response = await apiRequest("http://localhost:3001/meals", "GET");
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.error("Error fetching diets:", error);
//     return error;
//   }
// };
// export const addOne = async (meal) => {
//   try {
//     const result = await apiRequest(
//       "http://localhost:3001/meals",
//       "POST",
//       meal
//     );
//     console.log("Meal created:", result);
//     return result
//   } catch (error) {
//     console.error("Error creating meal:", error);
//   }
// };

// export const submitForm = async (formData) => {
//   // Destructure the formData object to get the form data
//   const {
//     age,
//     gender,
//     weight,
//     height,
//     activityLevel,
//     dietaryPreferences,
//     weightGoal,
//     weightAmount,
//     timeFrame,
//     eatingFrequency,
//   } = formData;

//   try {
//     const response = await apiRequest(
//       "http://localhost:3001/ai-generate",
//       "POST",
//       {
//         age,
//         gender,
//         weight,
//         height,
//         activityLevel,
//         dietaryPreferences,
//         weightGoal,
//         weightAmount,
//         timeFrame,
//         eatingFrequency,
//       }
//     );
//     console.log(response, "RESPONSE");
//     const { description } = response;
//     // Display the generated diet to the user
//     return description;
//   } catch (error) {
//     console.error("Error submitting form:", error);
//     // Handle the error, e.g., display an error message to the user
//     throw error;
//   }
// };
