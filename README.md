# Convex Quadrilateral Quiz

A lightweight, interactive, and mobile-responsive web-based quiz application designed for Vietnamese geometry students to practice and master **Convex Quadrilaterals** (Tứ Giác Lồi). 

Featuring an automated question-shuffling mechanism and smart geometric symbol rendering, it delivers an engaging learning experience in a sleek Dark Mode interface.

## 🚀 Live Demo
👉 [https://xn--msiu-goa8b.vn/github/convex-quadrilateral-quiz/](https://xn--msiu-goa8b.vn/github/convex-quadrilateral-quiz/)

---

## ✨ Features

- **Dynamic Question Generator:** Automatically generates custom math questions by randomly assigning vertex sets (e.g., `ABCD`, `MNPQ`, `EFGH`, `PQRS`) to ensure high replayability.
- **Pure CSS Mathematical Notation:** Renders standard Vietnamese textbook style angle notations (e.g., $\widehat{A}$, $\widehat{ACD}$) using semantic HTML and custom CSS pseudo-elements—eliminating the need for heavy external libraries like MathJax.
- **Smart Feedback System:** Provides immediate correction with comprehensive explanations and proofs right after an option is selected.
- **Dark Mode UI:** Designed with a modern, eye-friendly dark aesthetic to minimize eye strain during long study sessions.
- **Score Tracking:** Real-time metrics display the current correct count, total attempted questions, and accurate percentage accuracy.

---

## 🛠️ Tech Stack

- **HTML5** - Structured semantic layout.
- **CSS3** - Custom Dark Mode styling, layout responsiveness, and math symbol rendering.
- **Vanilla JavaScript (ES6)** - Core logic handling template parsing, question pool management, Fisher-Yates array shuffling, and UI updates.

---

## 📂 Project Structure

```text
convex-quadrilateral-quiz/
├── index.html
├── style.css
├── script.js
└── README.md 
```

## ⚙️ Core Logic Highlight: Custom Math Compiler

The application uses an internal template engine (`parseTemplate`) utilizing Regular Expressions (RegEx) to translate abstract question frameworks into formatted math notation on the fly:
1. Randomized Tokenization: Converts structural templates like góc[random(1-4)] into explicit structural tokens such as góc[3].
2. Textbook Angle Rendering: Matches góc[...] expressions and wraps target text inside a <span class="math-angle"> tag, applying custom CSS stretching (scaleX) to dynamically draw hat symbols (^) overhead.
3. Degree Unit Sanitization: Replaces descriptive string units ("độ") with the native degree mathematical symbol (°).

## 🛠️ Local Setup

Since this project is built entirely using vanilla front-end technologies, it has zero dependencies and requires no installation.

1. Clone the repository:
```bash
git clone [https://github.com/your-username/convex-quadrilateral-quiz.git](https://github.com/your-username/convex-quadrilateral-quiz.git)
```
2. Navigate into the directory:
```bash
cd convex-quadrilateral-quiz
```
3. Run the app:
Simply double-click the `index.html` file to open it directly in any modern web browser (Chrome, Edge, Firefox, Safari).

## 🛠️ Deployment / Git Push Guide
If you want to initialize Git locally and push the source code to your GitHub repository `lemasieu/convex-quadrilateral-quiz`, execute the following commands in your terminal:
   ```bash
# Initialize local git profile
git init

# Stage all updated file structures
git add .

# Commit with a clear scope
git commit -m "Initial commit: Deploy Convex Quadrilateral Quiz"

# Enforce default branch naming convention
git branch -M main

# Link to the secondary repository
git remote add origin [https://github.com/lemasieu/convex-quadrilateral-quiz.git](https://github.com/lemasieu/convex-quadrilateral-quiz.git)

# Push upstream to GitHub
git push -u origin main
   ```

## 📝 License
This project is licensed under the terms of the MIT License. You are completely free to use, modify, and distribute it.
Created by Gemini with my idea.
