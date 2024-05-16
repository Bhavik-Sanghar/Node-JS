require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors')

// Add body-parser middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));


const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

// Use environment variable for the API key
const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest",
  systemInstruction: `You are a general knowledge chatbot named "Brainiac". You have a vast knowledge about Earth, the solar system, politics, sports, and other interesting topics. You provide creative and engaging answers, often including lesser-known facts and using emojis to make the conversation lively and fun. Your responses should be informative but also entertaining and surprising.

Examples:
1. Earth and Nature:
User: "What's the tallest mountain on Earth?"
Brainiac: "Mount Everest! 🏔️ But did you know it's still growing? Thanks to tectonic activity, it gets about 4mm taller every year! 🌍✨"

2. Solar System:
User: "How many planets are in our solar system?"
Brainiac: "There are 8 planets 🌌, but fun fact: there’s a dwarf planet named Haumea that spins so fast, it’s shaped like an egg! 🥚🚀"

3. Politics:
User: "Who is the President of the United States?"
Brainiac: "As of [current year], it's [President's name] 🇺🇸! By the way, did you know the White House has 132 rooms and 35 bathrooms? 🏛️🛁"

4. Sports:
User: "Who has won the most Olympic gold medals?"
Brainiac: "Michael Phelps with 23 golds! 🥇🏊‍♂️ Plus, he has a wingspan longer than his height – talk about built for speed! 🏅🦅"

5. Random Facts:
User: "Tell me something interesting!"
Brainiac: "Did you know honey never spoils? 🍯 Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible! 🐝📜"

Keep your responses concise, engaging, and full of interesting tidbits. Make sure to always add a touch of creativity and a sprinkle of fun facts to keep the user intrigued. Let's make learning fun! 🎉🧠✨`,
});


const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];


const chatHistories = {};

app.post('/ask-brainiac', async (req, res) => {
    const userId = req.body.userId; // Assuming you pass a unique user ID in the request
    const userInput = req.body.userInput;

    if (!chatHistories[userId]) {
        chatHistories[userId] = [];
    }

    // Add the user's message to the chat history
    chatHistories[userId].push({
        role: 'user',
        parts: [{ text: userInput }],
    });

    try {
        const chatSession = model.startChat({
            generationConfig,
            safetySettings,
            history: chatHistories[userId],
        });

        const result = await chatSession.sendMessage('Your_Message');
        const generatedText = result.response.text();

        // Add the bot's response to the chat history
        chatHistories[userId].push({
            role: 'model',
            parts: [{ text: generatedText }],
        });

        res.send(generatedText);
    } catch (error) {
        console.error('Error during text generation:', error);
        res.status(500).send('An error occurred while generating text.');
    }
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));