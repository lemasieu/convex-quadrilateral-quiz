# Convex Quadrilateral Quiz

A lightweight, interactive, and mobile-responsive web-based quiz application designed for Vietnamese geometry students to practice and master **Convex Quadrilaterals** (Tứ Giác Lồi). Featuring an automated question-shuffling mechanism and smart geometric symbol rendering, it delivers an engaging learning experience in a sleek Dark Mode interface.

## 🚀 Live Demo

Check out the live demo: [https://www.sieu.io.vn/github/convex-quadrilateral-quiz](https://www.sieu.io.vn/github/convex-quadrilateral-quiz)

## ✨ Features

- **Dynamic Question Generator** – Automatically generates custom math questions by randomly assigning vertex sets (e.g., `ABCD`, `MNPQ`, `EFGH`, `PQRS`) to ensure high replayability
- **Pure CSS Mathematical Notation** – Renders standard Vietnamese textbook style angle notations (e.g., `A^`, `ACD^`) using semantic HTML and custom CSS pseudo-elements—eliminating the need for heavy external libraries like MathJax
- **Smart Feedback System** – Provides immediate correction with comprehensive explanations and proofs right after an option is selected
- **Dark Mode UI** – Designed with a modern, eye-friendly dark aesthetic to minimize eye strain during long study sessions
- **Score Tracking** – Real-time metrics display the current correct count, total attempted questions, and accurate percentage accuracy
- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **HTML5** – Structured semantic layout
- **CSS3** – Custom Dark Mode styling, layout responsiveness, and math symbol rendering
- **Vanilla JavaScript (ES6)** – Core logic handling template parsing, question pool management, Fisher-Yates array shuffling, and UI updates

## 📁 Project Structure

```
convex-quadrilateral-quiz/
├── index.html               # Main HTML file
├── style.css                # Stylesheet with dark mode and custom math rendering
├── script.js                # Core quiz logic and question generation
└── README.md                # Project documentation
```

## 🔧 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/lemasieu/convex-quadrilateral-quiz.git
   ```
2. **Navigate to the project folder**   
   ```bash
   cd convex-quadrilateral-quiz
   ```
3. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local development server (e.g., Live Server in VS Code)

## 📝 How It Works

1. **A question is displayed** – The app randomly generates a question about convex quadrilaterals, with four answer options
2. **Choose your answer** – Select one of the multiple-choice options
3. **Receive instant feedback** – If your answer is correct, it is highlighted. If incorrect, the correct answer is shown along with a detailed explanation and proof
4. **Track your progress** – The scoreboard updates in real time, showing:
   - **Đúng** – Number of correct answers
   - **Tổng** – Total number of questions attempted
   - **Tỷ lệ** – Accuracy percentage
5. **Continue** – A new random question is generated for continued practice

**Topics covered include:**

- Identifying convex quadrilaterals based on properties
- Sum of interior angles (360°)
- Special quadrilaterals (square, rectangle, rhombus, parallelogram, trapezoid)
- Angle relationships and calculations
- Geometric proofs and reasoning

## ⚙️ Core Logic Highlight: Custom Math Compiler

The application uses an internal template engine (`parseTemplate`) utilizing Regular Expressions (RegEx) to translate abstract question frameworks into formatted math notation on the fly:
1. Randomized Tokenization: Converts structural templates like góc[random(1-4)] into explicit structural tokens such as góc[3].
2. Textbook Angle Rendering: Matches góc[...] expressions and wraps target text inside a <span class="math-angle"> tag, applying custom CSS stretching (scaleX) to dynamically draw hat symbols (^) overhead.
3. Degree Unit Sanitization: Replaces descriptive string units ("độ") with the native degree mathematical symbol (°).

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request or open an Issue.
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the MIT License.
