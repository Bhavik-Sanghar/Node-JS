// Generate a unique user ID
function generateUserId() {
    return 'user-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

document.getElementById('userId').value = generateUserId();

// Handle 'Enter' key press to send the message
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        askBrainiac();
    }
}

// Determine the API URL based on the hostname
const apiUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/ask-brainiac'
    : 'https://chat-bot-google-api.onrender.com/ask-brainiac';

// Function to send user input to Brainiac and display the response
async function askBrainiac() {
    const userId = document.getElementById('userId').value;
    const userInput = document.getElementById('userInput').value;
    const chatBox = document.getElementById('chatBox');

    if (userInput.trim() === '') {
        return; // Exit the function if the input is empty or contains only whitespace
    }

    // Create a new user message element
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'message user-message';
    userMessageElement.textContent = userInput;

    // Append the user message to the chat box
    chatBox.appendChild(userMessageElement);

    // Clear the input field
    document.getElementById('userInput').value = '';

    // Create a new loading message element
    const loadingMessageElement = document.createElement('div');
    loadingMessageElement.className = 'message';
    loadingMessageElement.textContent = 'Loading...';

    // Append the loading message to the chat box
    chatBox.appendChild(loadingMessageElement);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, userInput })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.text();

        // Remove the loading message element
        chatBox.removeChild(loadingMessageElement);

        // Create a new response message element
        const responseMessageElement = document.createElement('div');
        responseMessageElement.className = 'message';
        responseMessageElement.textContent = data;

        // Append the response message to the chat box
        chatBox.appendChild(responseMessageElement);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);

        // Remove the loading message element
        chatBox.removeChild(loadingMessageElement);

        // Create a new error message element
        const errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'message';
        errorMessageElement.textContent = 'Error: ' + error.message;

        // Append the error message to the chat box
        chatBox.appendChild(errorMessageElement);
    }
}
