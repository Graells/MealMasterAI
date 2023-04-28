"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
// typeScript
const client_1 = require("../node_modules/.prisma/client");
//workaround for open issue https://github.com/prisma/prisma/issues/13672#issuecomment-1152581890
const dotenv_1 = __importDefault(require("dotenv"));
const openai_1 = require("openai");
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const openai = new openai_1.OpenAIApi(new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}));
exports.controller = {};
exports.controller.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meals = yield prisma.mealAI.findMany({
            include: {
                user: true,
                mealInfo: true,
            },
        });
        res.status(200).json(meals);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching meals' });
        console.log(error);
    }
});
exports.controller.postAI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { auth0Id, userName, userPic, email, title, name, age, gender, weight, height, activityLevel, howManyDays, howMuchMoney, dietaryPreferences, weightGoal, weightAmount, timeFrame, eatingFrequency, } = req.body;
    try {
        const prompt = `Generate a diet plan for user name ${name}, a ${age}-year-old ${gender}, weighing ${weight} kg, and ${height} cm tall, with an activity level of ${activityLevel}, how many ${howManyDays} the user needs a diet for, spending this much ${howMuchMoney} per day, dietary preferences of ${dietaryPreferences}, a weight goal of ${weightGoal} ${weightAmount} kg, a time frame of ${timeFrame} weeks, and an eating frequency of ${eatingFrequency} times a day.`;
        console.log(prompt);
        const response = yield openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `${prompt}. Give the response as if you were talking to the user directly saying his/her name.`,
                },
            ],
        });
        const diet = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.choices[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content;
        const user = yield prisma.user.upsert({
            where: { auth0Id },
            update: {},
            create: { auth0Id, email: email, userName, userPic },
        });
        const newMealInfo = yield prisma.mealInfo.create({
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
        const newMealAI = yield prisma.mealAI.create({
            data: {
                description: diet,
                userId: user.auth0Id,
                mealInfoId: newMealInfo.id,
            },
        });
        res.json(Object.assign(Object.assign({}, newMealAI), { user, mealInfo: newMealInfo }));
    }
    catch (error) {
        console.error('Error generating diet plan:', error);
        res.status(500).json({ error: 'Failed to generate diet plan' });
    }
});
exports.controller.getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meal = yield prisma.mealInfo.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!meal)
            res.status(404).json({ error: 'Meal not found' });
        res.status(200).json(meal);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching meal' });
        console.log(error);
    }
});
exports.controller.updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const updatedMeal = yield prisma.mealInfo.update({
            where: { id: parseInt(req.params.id) },
            data: { title },
        });
        res.status(200).json(updatedMeal);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating meal' });
    }
});
exports.controller.deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.mealAI.delete({ where: { id: parseInt(req.params.id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting meal' });
    }
});
