# HR Assistant Chatbot - Leaves, Holidays & Attendance

An AI-powered chatbot designed to help employees with queries related to Employee Leaves, Holidays, and Attendance management.

Please follow these steps to run your Chatbot project without any errors:

## Get Your free API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Navigate to the API key section and create a new API key. It's free!

Your API key will look something like this: AIzaSyAHp0DLb6SuVFj8ftzp9QyOHIkUuY40ZXE

## Insert Your API Key

1. Open your project folder in VS Code.
2. Locate the `.env` file in your project.
3. Find the `VITE_API_URL` variable and replace `YOUR-API-KEY-HERE` with your actual API key.

## Save and Test

1. Save the `.env` file after adding your API key.
2. Open the VS Code terminal by pressing `Ctrl + J` and run the following commands:
   `npm install` This command will install the necessary dependencies.
   `npm run dev` This command will start the local development server.

Click on the `localhost` link that appears in the terminal to open the project in your browser.

## Chatbot Features

This HR Assistant chatbot is specifically designed to help employees with:

- **Employee Leaves**: Leave applications, balance inquiries, leave policies, and leave types (CL, SL, PL, etc.)
- **Holidays**: Company holidays, public holidays, holiday calendar, and holiday policies
- **Attendance**: Attendance tracking, attendance policies, late arrivals, early departures, and attendance regularization

The chatbot uses context-aware responses based on the information provided in `src/companyInfo.js`. You can customize this file with your organization's specific leave policies, holiday calendar, and attendance rules.

## Customization

To customize the chatbot for your organization:

1. Update `src/companyInfo.js` with your specific:
   - Leave policies and types
   - Holiday calendar
   - Attendance policies
   - Company-specific rules and procedures

2. Modify the welcome message in `src/App.jsx` (line 109) to match your organization's tone

3. Update the intro screen in `src/components/IntroScreen.jsx` if needed

## Important Information

This chatbot uses the Gemini beta model, gemini-1.5-flash, which allows more free requests within a shorter timeframe. If you need greater reliability, you can switch to the stable model, gemini-1.5-pro. While the free version of this model has stricter request limits, upgrading to a paid plan will remove these restrictions.

To switch to the gemini-1.5-pro stable model, update the VITE_API_URL in the `.env` file as follows:
VITE_API_URL = https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=YOUR-API-KEY-HERE

If you still get an error or get stuck, feel free to message me on Buy Me a Coffee.
https://buymeacoffee.com/codingnepal

---

Happy coding!
# chatbot
