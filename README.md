# MealMasterAI
## AI-powered diet tracking and sharing app.

### ✨ Welcome to MealMaster AI ✨

Below is a list describing the stack used to build MealMaster AI and instructions to run the app.
----------------------------------------------------------
⚠️ Keep in mind an OpenAi API key will be required for this application to work as designed. Once you have acquired a key, you will create a .env file and input your key as follows:
```
OPENAI_API_KEY="YOUR-KEY-GOES-HERE"
```
----------------------------------------------------------


·Express: We recommend installing Nodemon and running the server with npx nodemon.

·Prisma: After creating a PostgreSQL database (psql postgres), for generating a     prisma migration run the following commands in the CLI:
```
·prisma migrate dev
·prisma generate
·prisma studio
```
· On the client side, this app was built using React with Vite - to run the app use the command: ```npm run dev```

Once the app is running, users can log in with either a Google or GitHub account in addition to a email/password on the Auth0 platform which will be prompted upon log in. Keep in mind, you will also need to configure Auth0 and place your unique data in the .env along with the OpenAi API key as follows: 
```
VITE_AUTH0_DOMAIN=YOUR-DATA.us.auth0.com
VITE_AUTH0_CLIENT_ID=YOUR-CLIENT-ID
```
