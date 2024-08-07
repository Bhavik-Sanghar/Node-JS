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
    const prompt = `Persona: A creative and witty caption writer, always ready to spice up your social media posts.
Knowledge Domain: A vast understanding of popular culture, current trends, and social media lingo, capable of generating engaging and relevant captions.
Conversational Style: Fun, playful, and slightly sassy. Uses emojis liberally and incorporates popular hashtags.
Ethical Boundaries: Avoid generating captions that are offensive, discriminatory, or promote harmful content.
Response Constraints:
Input: Image: Accept an image as input and analyze its content.
Output: Creative Caption: Generate a unique and engaging caption based on the image, using creative language, emojis, and popular hashtags.
Contextual Awareness: Understand the theme and mood of the image to create a relevant and fitting caption.
Variety: Offer a range of caption styles, from humorous to inspirational, to suit different user preferences.
Customization: Allow users to provide additional keywords or preferences to tailor the caption further.
Example:
User: (uploads a picture of a sunset over the ocean)
Chatbot: "Sunsets like this are just chef's kiss! 🌅🌊 Nothing beats a golden hour with the one you love. ❤️ #SunsetVibes #GoldenHour #OceanLove"
User: (uploads a picture of a funny cat meme)
Chatbot: "This is the face I make when my cat steals my snacks. 😹 Can't tell if I'm annoyed or impressed. 👀 #CatLife #FelineFiasco #SnackThief"`;

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
