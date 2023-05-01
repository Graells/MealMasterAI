const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dotenv = require("dotenv");
dotenv.config();
const { OpenAIApi, Configuration } = require("openai");
const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

const controller = {};

controller.getAll = async (req, res) => {
  try {
    const meals = await prisma.mealAI.findMany({
      include: {
        user: true,
        mealInfo: true,
      },
    });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching meals" });
    console.log(error);
  }
};

controller.postAI = async (req, res) => {
  const {
    auth0Id,
    userName,
    userPic,
    email,
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
  } = req.body;
  try {
    //if something is less than 0, throw an error
    if (age < 0 || weight < 0 || height < 0 || weightAmount < 0 || timeFrame < 0 || eatingFrequency < 0) {
      return res.status(400).json({ error: "It must be a positive number" });
    }
    const prompt = `Generate a diet plan for user name ${name}, a ${age}-year-old ${gender}, weighing ${weight} kg, and ${height} cm tall, with an activity level of ${activityLevel}, dietary preferences of ${dietaryPreferences}, a weight goal of ${weightGoal} ${weightAmount} kg, a time frame of ${timeFrame} weeks, and an eating frequency of ${eatingFrequency} times a day.`;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${prompt}. Give the response as if you were talking to the user directly saying his/her name.`,
        },
      ],
    });
    const diet = response.data.choices[0].message.content;
    // res.json(diet);
    console.log(auth0Id);
    const user = await prisma.user.upsert({
      where: { auth0Id },
      update: {},
      create: { auth0Id, email: email, userName, userPic },
    });
    const newMealInfo = await prisma.mealInfo.create({
      data: {
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
      },
    });
    const newMealAI = await prisma.mealAI.create({
      data: {
        description: diet,
        userId: user.auth0Id,
        mealInfoId: newMealInfo.id,
      },
    });
    res.json({ ...newMealAI, user, mealInfo: newMealInfo });
    res.status(200);
  } catch (error) {
    console.error("Error generating diet plan:", error);
    res.status(500).json({ error: "Failed to generate diet plan" });
  }
};
// controller.postOne = async (req, res) => {
//   try {
//     const newMeal = await prisma.mealInfo.create({ data: req.body });
//     res.status(201)
//     res.json(newMeal); //res.send
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating meal' });
//     console.log(error);
//   }
// }
controller.getOne = async (req, res) => {
  try {
    const meal = await prisma.mealInfo.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: "Error fetching meal" });
    console.log(error);
  }
};
controller.updateOne = async (req, res) => {
  try {
    const { title } = req.body;
    const updatedMeal = await prisma.mealInfo.update({
      where: { id: parseInt(req.params.id) },
      data: { title },
    });
    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ error: "Error updating meal" });
  }
};

controller.deleteOne = async (req, res) => {
  try {
    const deleted = await prisma.mealAI.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send(deleted);
  } catch (error) {
    res.status(500).json({ error: "Error deleting meal" });
  }
};

module.exports = controller;
