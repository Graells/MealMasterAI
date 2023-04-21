const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');
dotenv.config();
const { OpenAIApi, Configuration } = require('openai');
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}))

const controller = {};


controller.getAll = async (req, res) => {
  try {
    const meals = await prisma.mealAI.findMany();
    res.status(200)
    res.json(meals); //res.send(meals)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meals' });
    console.log(error)
  }
}
controller.postAI = async (req, res) => {
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
  } = req.body;
  try {
    const prompt = `Generate a diet plan for user name ${name}, a ${age}-year-old ${gender}, weighing ${weight} kg, and ${height} cm tall, with an activity level of ${activityLevel}, dietary preferences of ${dietaryPreferences}, a weight goal of ${weightGoal} ${weightAmount} kg, a time frame of ${timeFrame} weeks, and an eating frequency of ${eatingFrequency} times a day.`;
    console.log(prompt);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${prompt}. Give the response as if you were talking to the user directly saying his/her name.`}]
    });
    const diet = response.data.choices[0].message.content;
    // res.json(diet);
    const newMealAI = await prisma.mealAI.create({
      data: {
        description: diet,
      }
    });
    res.json(newMealAI);
  } catch (error) {
    console.error('Error generating diet plan:', error);
    res.status(500).json({ error: 'Failed to generate diet plan' });
  }
}
controller.postOne = async (req, res) => {
  try {
    const newMeal = await prisma.userInfo.create({ data: req.body });
    res.status(201)
    res.json(newMeal); //res.send
  } catch (error) {
    res.status(500).json({ error: 'Error creating meal' });
    console.log(error);
  }
}
controller.getOne = async (req, res) => {
  try {
    const meal = await prisma.userInfo.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!meal) return res.status(404).json({ error: 'Meal not found' });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meal' });
    console.log(error)
  }
}
controller.updateOne = async (req, res) => {
  try {
    const updatedMeal = await prisma.userInfo.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ error: 'Error updating meal' });
  }
}
controller.deleteOne = async (req, res) => {
  try {
    await prisma.userInfo.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting meal' });
  }
}

module.exports = controller;
