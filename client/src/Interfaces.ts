export interface IDiet {
    id:number,
    userId:string,
    user:IUser,
    description:string,
    createdAt:Date,
    mealInfoId:number,
    mealInfo:IMealInfo
}

export interface IMealInfo{
    id:number,
    title:string,
    name:string,
    age:number,
    gender:string,
    weight:number,
    height:number,
    activityLevel:string,
    dietaryPreferences:string,
    weightGoal:string,
    weightAmount:number,
    timeFrame:number,
    eatingFrequency:number,
    createdAt:Date,
    updatedAt:Date,
    mealAI:IDiet[]
}

export interface IUser{
    id:number,
    auth0Id:string,
    email:string,
    userName:string,
    userPic:string,
    meals:IDiet[]
}

export interface IAuth0User{
    picture:string,
    name:string,
    email:string
}
export interface PreviousDiet {
    createdAt: string;
    description: string;
    mealInfo: IMealInfo;
    mealInfoId: number;
    user: IUser;
    userId: string
}

export interface FormDiet {
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
    createdAt: Date,
    updatedAt: Date,
  }
