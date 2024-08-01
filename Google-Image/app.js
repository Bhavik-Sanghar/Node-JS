const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const multer = require('multer');
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' });

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

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
        threshold: HarmBlockThreshold.BLOCK_LOW,
    },
];

app.post('/generate-caption', upload.single('image'), async (req, res) => {
    const prompt = "I'm going to post this awesome photo on Instagram and Twitter, and I need a single creative caption to go with it. Please use plenty of emojis to make the caption fun and engaging, and don't forget to include trendy hashtags. Make sure the caption is catchy and fits well with the vibe of the photo. 📸✨ #CreativeCaptions #InstaGood #TwitterMagic";

    const imagePath = req.file.path;
    const mimeType = req.file.mimetype;

    const imageParts = [
        {
            inlineData: {
                data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
                mimeType,
            },
        },
    ];

    const content = [{ text: prompt }, ...imageParts];

    try {
        const result = await model.generateContent(content, {
            safetySettings,
        });
        const response = await result.response;
        const text = response.text().trim(); // Ensure there's no extra whitespace
        res.json({ captions: [text] }); // Return as a single-item array for consistency
    } catch (error) {
        console.error('Error during text generation:', error);
        res.status(500).send('An error occurred while generating the caption.');
    } finally {
        // Clean up the uploaded file
        fs.unlinkSync(imagePath);
    }
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
