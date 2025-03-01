document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.querySelector(".chat-container");
    const userInput = document.querySelector("#user-input");
    const sendButton = document.querySelector("#send-btn");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        // Add user message
        addMessage("user", userMessage);
        userInput.value = "";

        setTimeout(() => {
            fetchChatbotResponse(userMessage);
        }, 1000);
    }

    function addMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);

        if (sender === "bot") {
            messageDiv.innerHTML = "<span class='typing-dots'>...</span>";
        } else {
            messageDiv.textContent = message;
        }

        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        return messageDiv;
    }

    function fetchChatbotResponse(userMessage) {
        const botMessage = addMessage("bot", "Typing...");
        setTimeout(() => botMessage.innerHTML = "<span class='typing-dots'>...</span>", 500);

        // Simulating AI response
        setTimeout(() => {
            let response = generateResponse(userMessage);
            botMessage.innerHTML = response;
        }, 2000);
    }

    function generateResponse(input) {
        const responses = {
            "hello": "Hello! How can I assist you today?",
            "how are you?": "I'm here to help. What do you need?",
            "what is AI?": "Artificial Intelligence (AI) is a field of computer science that simulates human intelligence.",
            "bye": "Goodbye! If you need anything, just ask."
        };

        input = input.toLowerCase();
        return responses[input] || "That's an interesting question. Let me analyze it!";
    }
});
