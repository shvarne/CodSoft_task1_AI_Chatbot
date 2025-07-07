// Knowledge base for the chatbot
const knowledgeBase = {
  // Science & Technology
  "artificial intelligence": {
    title: "Artificial Intelligence (AI)",
    content: "Artificial Intelligence is a branch of computer science that aims to create machines capable of performing tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, perception, and language understanding. AI technologies include machine learning, deep learning, natural language processing, and computer vision. AI is used in various applications like virtual assistants, autonomous vehicles, medical diagnosis, and recommendation systems."
  },
  "machine learning": {
    title: "Machine Learning",
    content: "Machine Learning is a subset of AI that enables computers to learn and improve from experience without being explicitly programmed. It uses algorithms to identify patterns in data and make predictions or decisions. Common types include supervised learning, unsupervised learning, and reinforcement learning. Applications include image recognition, speech processing, and predictive analytics."
  },
  "space exploration": {
    title: "Space Exploration",
    content: "Space exploration involves the discovery and exploration of celestial structures in outer space. It includes sending spacecraft to study planets, moons, asteroids, and other celestial bodies. Major milestones include the first human in space (Yuri Gagarin, 1961), the Moon landing (1969), and the International Space Station. Current missions focus on Mars exploration, studying exoplanets, and understanding the universe's origins."
  },
  "climate change": {
    title: "Climate Change",
    content: "Climate change refers to long-term shifts in global weather patterns and average temperatures. The primary cause is human activities, especially burning fossil fuels which release greenhouse gases. Effects include rising sea levels, extreme weather events, and ecosystem disruption. Solutions include renewable energy, energy efficiency, and sustainable practices. The Paris Agreement aims to limit global temperature rise to well below 2°C."
  },
  
  // Health & Medicine
  "exercise benefits": {
    title: "What are benefits of Exercise",
    content: "Regular exercise provides numerous health benefits: 1) Physical health: strengthens muscles and bones, improves cardiovascular health, and helps maintain healthy weight. 2) Mental health: reduces stress, anxiety, and depression while improving mood and cognitive function. 3) Disease prevention: lowers risk of heart disease, diabetes, and certain cancers. 4) Longevity: increases life expectancy and quality of life. Recommended: 150 minutes of moderate exercise or 75 minutes of vigorous exercise weekly."
  },
  "nutrition": {
    title: "Nutrition",
    content: "Nutrition is the science of how food affects the body. A balanced diet includes: 1) Proteins for muscle building and repair. 2) Carbohydrates for energy. 3) Healthy fats for brain function and hormone production. 4) Vitamins and minerals for various bodily functions. 5) Fiber for digestive health. Key principles: eat whole foods, stay hydrated, and maintain portion control."
  },
  "mental health": {
    title: "Mental Health",
    content: "Mental health encompasses emotional, psychological, and social well-being. It affects how we think, feel, and act. Common mental health conditions include anxiety, depression, and stress disorders. Maintaining mental health involves: regular exercise, adequate sleep, social connections, stress management, and seeking professional help when needed. Mental health is as important as physical health."
  },
  
  // History & Geography
  "world war ii": {
    title: "World War II",
    content: "World War II (1939-1945) was a global conflict involving most nations. It began with Germany's invasion of Poland and ended with Japan's surrender. Key events include the Holocaust, Pearl Harbor attack, D-Day invasion, and atomic bombings of Japan. The war resulted in 70-85 million deaths and led to the formation of the United Nations and the Cold War. It marked the end of European colonialism and the rise of the US and USSR as superpowers."
  },
  "ancient civilizations": {
    title: "Ancient Civilizations",
    content: "Ancient civilizations laid the foundation for modern society. Major ones include: 1) Mesopotamia (3500 BCE) - first writing system and cities. 2) Ancient Egypt (3100 BCE) - pyramids, hieroglyphics, and advanced architecture. 3) Ancient Greece (800 BCE) - democracy, philosophy, and arts. 4) Ancient Rome (753 BCE) - law, engineering, and empire building. 5) Ancient China (2100 BCE) - paper, gunpowder, and silk. These civilizations made significant contributions to science, art, and governance."
  },
  
  // Arts & Literature
  "renaissance": {
    title: "The Renaissance",
    content: "The Renaissance (14th-17th centuries) was a period of cultural rebirth in Europe. It marked the transition from medieval to modern times. Key features: 1) Humanism - focus on human potential and achievements. 2) Art - realistic paintings and sculptures (Leonardo da Vinci, Michelangelo). 3) Science - scientific method and discoveries (Galileo, Copernicus). 4) Literature - works by Shakespeare, Dante, and Petrarch. 5) Architecture - classical revival and new building techniques."
  },
  "modern art": {
    title: "Modern Art",
    content: "Modern art (late 19th to mid-20th century) broke from traditional artistic conventions. Major movements include: 1) Impressionism - capturing light and movement (Monet, Renoir). 2) Cubism - geometric abstraction (Picasso, Braque). 3) Surrealism - dream-like imagery (Dalí, Magritte). 4) Abstract Expressionism - emotional expression (Pollock, Rothko). Modern art emphasized innovation, experimentation, and new ways of seeing the world."
  },
  
  // Sports & Entertainment
  "olympics": {
    title: "The Olympics",
    content: "The Olympic Games are the world's premier sporting event, held every four years. The ancient Olympics began in Greece in 776 BCE. The modern Olympics started in 1896 in Athens. The Games include Summer and Winter Olympics, featuring sports like athletics, swimming, gymnastics, and skiing. The Olympics promote international cooperation, peace, and athletic excellence. The Olympic motto is 'Citius, Altius, Fortius' (Faster, Higher, Stronger)."
  },
  "cinema": {
    title: "Cinema History",
    content: "Cinema began in the late 19th century with the invention of motion picture cameras. Key milestones: 1) Silent era (1890s-1920s) - Chaplin, Keaton. 2) Sound era (1927) - 'The Jazz Singer'. 3) Golden Age (1930s-1950s) - Hollywood studio system. 4) New Wave movements (1960s) - French, Italian cinema. 5) Blockbuster era (1970s-present) - special effects and global markets. Cinema has become a powerful art form and entertainment medium."
  }
};

// Common greetings and responses
const greetings = [
  "Hello! How can I help you today?",
  "Hi there! What would you like to know about?",
  "Greetings! I'm here to answer your questions.",
  "Welcome! Feel free to ask me anything."
];

const fallbackResponses = [
  "I don't have specific information about that, but I'd be happy to help with other topics like science, history, health, or technology.",
  "That's an interesting question! While I don't have detailed information on that topic, I can help you with subjects like AI, space exploration, health, or world history.",
  "I'm not sure about that specific topic, but I can provide information on many other subjects. What interests you?"
];

let isTyping = false;

// Main function to send messages
function sendMessage() {
  const userInput = document.getElementById("user-input");
  const message = userInput.value.trim();
  
  if (message === "" || isTyping) return;
  
  // Display user message
  addMessage(message, "user");
  userInput.value = "";
  
  // Show typing indicator
  showTypingIndicator();
  
  // Get bot response after a short delay
  setTimeout(() => {
    hideTypingIndicator();
    const response = getBotResponse(message);
    addMessage(response, "bot");
  }, 1000 + Math.random() * 1000);
}

// Handle Enter key press
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

// Add message to chat
function addMessage(content, sender) {
  const chatBox = document.getElementById("chat-box");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}-message`;
  
  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  
  const icon = document.createElement("i");
  icon.className = sender === "bot" ? "fas fa-robot" : "fas fa-user";
  avatar.appendChild(icon);
  
  const messageContent = document.createElement("div");
  messageContent.className = "message-content";
  
  if (typeof content === "string") {
    messageContent.innerHTML = `<p>${content}</p>`;
  } else {
    messageContent.innerHTML = content;
  }
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(messageContent);
  chatBox.appendChild(messageDiv);
  
  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
  isTyping = true;
  const chatBox = document.getElementById("chat-box");
  const typingDiv = document.createElement("div");
  typingDiv.className = "message bot-message typing-indicator";
  typingDiv.id = "typing-indicator";
  
  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  const icon = document.createElement("i");
  icon.className = "fas fa-robot";
  avatar.appendChild(icon);
  
  const content = document.createElement("div");
  content.className = "message-content";
  content.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;
  
  typingDiv.appendChild(avatar);
  typingDiv.appendChild(content);
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
  isTyping = false;
  const typingIndicator = document.getElementById("typing-indicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Get bot response
function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  
  // Check for greetings
  if (lowerInput.includes("hi") || lowerInput.includes("hello") || lowerInput.includes("hey")) {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Check for thanks
  if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
    return "You're welcome! I'm glad I could help. Feel free to ask me anything else!";
  }
  
  // Check for goodbye
  if (lowerInput.includes("bye") || lowerInput.includes("goodbye")) {
    return "Goodbye! It was great chatting with you. Come back anytime!";
  }
  
  // Check knowledge base
  for (const [key, info] of Object.entries(knowledgeBase)) {
    if (lowerInput.includes(key) || key.includes(lowerInput)) {
      return `
        <h4>${info.title}</h4>
        <p>${info.content}</p>
      `;
    }
  }
  
  // Check for related topics
  const relatedTopics = findRelatedTopics(lowerInput);
  if (relatedTopics.length > 0) {
    return `
      <p>I don't have specific information about that, but here are some related topics I can help with:</p>
      <ul>
        ${relatedTopics.map(topic => `<li><strong>${topic}</strong></li>`).join("")}
      </ul>
      <p>Would you like to know more about any of these?</p>
    `;
  }
  
  // Fallback response
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

// Find related topics
function findRelatedTopics(input) {
  const topics = Object.keys(knowledgeBase);
  const related = [];
  
  for (const topic of topics) {
    if (topic.includes(input) || input.includes(topic)) {
      related.push(knowledgeBase[topic].title);
    }
  }
  
  return related.slice(0, 3); // Return up to 3 related topics
}

// Quick question function
function askQuestion(question) {
  document.getElementById("user-input").value = question;
  sendMessage();
}

// Clear chat
function clearChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = `
    <div class="message bot-message">
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <p>Hello! I'm your AI Knowledge Assistant. I can help you with information about:</p>
        <ul>
          <li>Science & Technology</li>
          <li>History & Geography</li>
          <li>Health & Medicine</li>
          <li>Arts & Literature</li>
          <li>Sports & Entertainment</li>
          <li>And much more!</li>
        </ul>
        <p>Just ask me anything!</p>
      </div>
    </div>
  `;
}

// Initialize chatbot
document.addEventListener("DOMContentLoaded", function() {
  // Focus on input
  document.getElementById("user-input").focus();
  
  // Add some initial suggestions
  setTimeout(() => {
    addMessage("Try asking me about artificial intelligence, space exploration, exercise benefits, or climate change!", "bot");
  }, 2000);
});
