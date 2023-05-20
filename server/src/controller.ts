// typeScript
import {
  ActivityLevel,
  Gender,
  PrismaClient,
  WeightGoal,
} from '../node_modules/.prisma/client';

//workaround for open issue https://github.com/prisma/prisma/issues/13672#issuecomment-1152581890
import dotenv from 'dotenv';
import { OpenAIApi, Configuration } from 'openai';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

interface MealInfo {
  title: string;
  name: string;
  age: number;
  gender: string;
  weight: number;
  height: number;
  activityLevel: string;
  howManyDays: number;
  howMuchMoney: number;
  dietaryPreferences: string[];
  weightGoal: string;
  weightAmount: number;
  timeFrame: number;
  eatingFrequency: number;
}

interface MealAI {
  description: string;
  userId: string;
  mealInfoId: number;
}

interface User {
  auth0Id: string;
  email: string;
  userName: string;
  userPic: string;
}

interface Controller {
  getAll: (req: any, res: any) => Promise<void>;
  postAI: (req: any, res: any) => Promise<void>;
  getOne: (req: any, res: any) => Promise<void>;
  updateOne: (req: any, res: any) => Promise<void>;
  deleteOne: (req: any, res: any) => Promise<void>;
}

export const controller: Controller = {} as Controller;

controller.getAll = async (req, res) => {
  console.log('im in the getAll');
  try {
    const meals = await prisma.mealAI.findMany({
      include: {
        user: true,
        mealInfo: true,
      },
    });
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meals' });
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
  } = req.body as {
    auth0Id: string;
    userName: string;
    userPic: string;
    email: string;
    title: string;
    name: string;
    age: number;
    gender: Gender;
    weight: number;
    height: number;
    activityLevel: ActivityLevel;
    dietaryPreferences: string | null;
    weightGoal: WeightGoal;
    weightAmount: number;
    timeFrame: number;
    eatingFrequency: number;
  };

  try {
    const prompt: string = `Generate a diet plan for user name ${name}, a ${age}-year-old ${gender}, weighing ${weight} kg, and ${height} cm tall, with an activity level of ${activityLevel}, dietary preferences of ${dietaryPreferences}, a weight goal of ${weightGoal} ${weightAmount} kg, a time frame of ${timeFrame} weeks, and an eating frequency of ${eatingFrequency} times a day.`;
    console.log(prompt);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `${prompt}. Give the response as if you were talking to the user directly saying his/her name.`,
        },
      ],
    });
    const diet: string | undefined =
      response?.data?.choices[0]?.message?.content;
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
  } catch (error) {
    console.error('Error generating diet plan:', error);
    res.status(500).json({ error: 'Failed to generate diet plan' });
  }
};

controller.getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const meal = await prisma.mealInfo.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!meal) res.status(404).json({ error: 'Meal not found' });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching meal' });
    console.log(error);
  }
};

controller.updateOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;
    const updatedMeal = await prisma.mealInfo.update({
      where: { id: parseInt(req.params.id) },
      data: { title },
    });
    res.status(200).json(updatedMeal);
  } catch (error) {
    res.status(500).json({ error: 'Error updating meal' });
  }
};

controller.deleteOne = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.mealAI.delete({ where: { id: parseInt(req.params.id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting meal' });
  }
};
