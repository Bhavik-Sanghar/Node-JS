import express from "express";
import OpenAI from "openai";

const app = express();
const openai = new OpenAI({
  apiKey: "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"
});

// Define your API endpoint
app.get("/api/chat", async (req, res) => {
  try {
    // Get user input from query parameter
    const userInput = req.query.input;

    // Make a request to the OpenAI API to generate a completion
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userInput }],
      model: "text-davinci", // Use a different model
      max_tokens: 1 // Limit the response to a single token ("yes" or "no")
    });

    // Extract the generated response
    const botResponse = completion.choices[0].message.content;

    // Send the bot response back to the client
    res.json({ response: botResponse });
  } catch (error) {
    // Log the entire error object for debugging
    console.error("Error:", error);

    // Send an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
