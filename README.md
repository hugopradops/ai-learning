# Hugo AI Learning 🤖

Welcome to **Hugo AI Learning**, a simple yet powerful web application that allows users to interact with an AI assistant. This project is designed to showcase how to build a user-friendly interface for generating AI responses using a backend API.

---

## 🚀 Project Overview

This project provides:
- A clean and responsive web interface.
- A form to input prompts and receive AI-generated responses.
- Content moderation to ensure safe and appropriate interactions.
- Integration with a backend API for generating responses.

---

## 📂 Project Structure

```
new-project
├── src
│   ├── index.html       # HTML structure of the web application
│   ├── styles.css       # CSS styles for the application
│   └── script.js        # JavaScript code for handling API requests
├── README.md            # Project documentation
└── favicon.ico          # Favicon for the web application
```

---

## 🛠️ Getting Started

### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge).
- An active internet connection to access the API.

### Installation
1. Clone this repository or download the project files:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd new-project
   ```

### Running the Application
1. Open the `src/index.html` file in your web browser.
2. Enter a prompt in the input field and click the **Submit** button.
3. The application will send your prompt to the API and display the response.

---

## 🌐 API Details

The application communicates with the following API endpoint:

```
https://ollama.local.9900677.xyz/api/generate
```

### Request Format
- **Method**: `POST`
- **Headers**: 
  - `Content-Type: application/json`
- **Body**:
  ```json
  {
      "model": "gemma3:12b",
      "prompt": "<your-prompt>",
      "stream": false
  }
  ```

### Response Format
The API returns a JSON object with the following fields:
- `response`: The AI-generated response.
- `model`: The model used for generation.
- `created_at`: Timestamp of the response.
- `done`: Whether the response generation is complete.
- `done_reason`: Reason for completion.

---

## ✨ Features

- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Content Moderation**: Filters inappropriate prompts to ensure safe usage.
- **Customizable AI Style**: The AI responds in the style of Hugo Prado, a friendly and humorous Computer Science student.

---

## 🖌️ Customization

### Modify the AI Style
To change the AI's response style, edit the `styledPrompt` variable in [`src/script.js`](src/script.js).

### Update Styles
To customize the appearance, modify the CSS in [`src/styles.css`](src/styles.css).

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## 📧 Contact

For questions or feedback, reach out to **Hugo Prado** at `hugo@example.com`.