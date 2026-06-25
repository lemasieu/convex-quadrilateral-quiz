const QUESTIONS_PER_TEST = 15;

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const vertexSets = [
    ['A', 'B', 'C', 'D'],
    ['M', 'N', 'P', 'Q'],
    ['E', 'F', 'G', 'H'],
    ['P', 'Q', 'R', 'S']
];

// ================= BỘ BIÊN DỊCH PHÁT TRIỂN LÊN TOÁN HỌC =================
function parseTemplate(str, vSet) {
    if (!str) return "";
    
    // 1. CHUẨN HÓA: Biến random(1-4) thành một số trong ngoặc vuông trước, ví dụ: [2]
    // Nhờ vậy, cấu trúc "góc[random(1-4)]" sẽ trở thành "góc[2]", không bị mất dấu ngoặc vuông
    let res = str.replace(/\[random\(1-4\)\]/g, () => `[${getRandomInt(1, 4)}]`);
    
    // 2. Biến đổi chữ "độ" thành ký hiệu °
    res = res.replace(/độ/g, '°');

    // 3. Biến đổi cụm "góc[134]" hoặc "góc [1]" thành ký hiệu có mũ góc chuẩn toán học
    res = res.replace(/góc\s*\[([1-4]+)\]/g, (match, p1) => {
        let letters = '';
        for(let i = 0; i < p1.length; i++) {
            letters += vSet[parseInt(p1[i]) - 1];
        }
        return `<span class="math-angle">${letters}</span>`;
    });

    // 4. Biến đổi các đỉnh, cạnh còn lại không kèm chữ góc (ví dụ [1234] -> ABCD)
    res = res.replace(/\[([1-4]+)\]/g, (match, p1) => {
        let parsed = '';
        for(let i = 0; i < p1.length; i++) {
            parsed += vSet[parseInt(p1[i]) - 1];
        }
        return parsed;
    });

    return res;
}

// ================= KHO CÂU HỎI LÝ THUYẾT =================
const theoryTemplates = [
    { q: "Cho tứ giác lồi [1234] có [12]//[34] và [14] = [23] (hai cạnh bên không song song). [1234] thuộc dạng hình nào?", a: "Hình thang cân" },
    { q: "Cho tứ giác lồi [1234] có [12]//[34] and [13] = [24]. [1234] thuộc dạng hình nào?", a: "Hình thang cân" },
    { q: "Cho tứ giác lồi [1234] có [12]//[34] và góc[134] = góc[243]. [1234] thuộc dạng hình nào?", a: "Hình thang cân" },

    { q: "Cho tứ giác lồi [1234] có [12]//[34] và [23]//[14]. [1234] thuộc dạng hình nào?", a: "Hình bình hành" },
    { q: "Cho tứ giác lồi [1234] có [12]=[34] và [23]=[14]. [1234] thuộc dạng hình nào?", a: "Hình bình hành" },
    { q: "Cho tứ giác lồi [1234] có [23]//[14] và [23]=[14]. [1234] thuộc dạng hình nào?", a: "Hình bình hành" },
    { q: "Cho tứ giác lồi [1234] có [12]//[34] và [12]=[34]. [1234] thuộc dạng hình nào?", a: "Hình bình hành" },
    { q: "Cho tứ giác lồi [1234] có góc[1] = góc[3] và góc[2] = góc[4]. [1234] thuộc dạng hình nào?", a: "Hình bình hành" },
    { q: "Cho tứ giác lồi [1234] có hai đường chéo [13] và [24] cắt nhau tại O, O[1]=O[3], O[2]=O[4]. [1234] thuộc dạng hình nào?", a: "Hình bình hành" },

    { q: "Cho tứ giác lồi [1234] có góc[1] = góc[2] = góc[3] = 90 độ. [1234] thuộc dạng hình nào?", a: "Hình chữ nhật" },
    { q: "Cho tứ giác lồi [1234] có [13], [24] cắt tại O, O[1]=O[3], O[2]=O[4], và góc[random(1-4)] = 90 độ. [1234] thuộc dạng hình nào?", a: "Hình chữ nhật" },
    { q: "Cho tứ giác lồi [1234] có góc[random(1-4)] = 90 độ, [12]//[34] và [23]//[14]. [1234] thuộc dạng hình nào?", a: "Hình chữ nhật" },
    { q: "Cho tứ giác lồi [1234] có [13] = [24], [12]//[34] và [23]//[14]. [1234] thuộc dạng hình nào?", a: "Hình chữ nhật" },
    { q: "Cho tứ giác lồi [1234] có [13] = [24], góc[1] = góc[3] và góc[2] = góc[4]. [1234] thuộc dạng hình nào?", a: "Hình chữ nhật" },

    { q: "Cho tứ giác lồi [1234] có [12] = [23] = [34] = [41]. [1234] thuộc dạng hình nào?", a: "Hình thoi" },
    { q: "Cho tứ giác lồi [1234] có [12] = [23], [12]//[34] và [23]//[14]. [1234] thuộc dạng hình nào?", a: "Hình thoi" },
    { q: "Cho tứ giác lồi [1234] có [12] = [23], góc[1] = góc[3] và góc[2] = góc[4]. [1234] thuộc dạng hình nào?", a: "Hình thoi" },
    { q: "Cho tứ giác lồi [1234] có [13] vuông góc với [24], [12]//[34] và [23]//[14]. [1234] thuộc dạng hình nào?", a: "Hình thoi" },
    { q: "Cho tứ giác lồi [1234] có [12]//[34], [23]//[14], và [13] là đường phân giác của góc[1]. [1234] thuộc dạng hình nào?", a: "Hình thoi" },

    { q: "Cho tứ giác lồi [1234] có góc[1] = góc[2] = góc[3] = 90 độ, và [12] = [23]. [1234] thuộc dạng hình nào?", a: "Hình vuông" },
    { q: "Cho tứ giác lồi [1234] có góc[random(1-4)] = 90 độ, [12]//[34], [23]//[14], và [13] vuông góc với [24]. [1234] thuộc dạng hình nào?", a: "Hình vuông" },
    { q: "Cho tứ giác lồi [1234] có góc[random(1-4)] = 90 độ, [12]=[34], [23]=[14], và [13] là đường phân giác của góc[1]. [1234] thuộc dạng hình nào?", a: "Hình vuông" },
    { q: "Cho tứ giác lồi [1234] có [13] và [24] cắt nhau tại O (O[1]=O[3], O[2]=O[4]), [13]=[24], [12]=[23]. [1234] thuộc dạng hình nào?", a: "Hình vuông" },
    { q: "Cho tứ giác lồi [1234] có [13]=[24], [12]//[34], [23]//[14], và [13] vuông góc với [24]. [1234] thuộc dạng hình nào?", a: "Hình vuông" }
];

const allShapeTypes = ["Tứ giác thường", "Hình thang", "Hình thang vuông", "Hình thang cân", "Hình bình hành", "Hình chữ nhật", "Hình thoi", "Hình vuông"];

// ================= CÁC GENERATOR LOGIC TOÁN VÀ BIÊN DỊCH CHÚ THÍCH =================
function genMathQ01() {
    let vSet = vertexSets[Math.floor(Math.random() * vertexSets.length)];
    let a = getRandomInt(60, 110), b = getRandomInt(60, 110), c = getRandomInt(60, 110);
    let d = 360 - (a + b + c);

    let qRaw = `Cho tứ giác lồi [1234] có góc[1] = ${a} độ, góc[2] = ${b} độ, góc[3] = ${c} độ. Tính số đo của góc[4].`;
    let expRaw = `Tổng 4 góc tứ giác là 360°. Góc còn lại: góc[4] = 360° - (góc[1] + góc[2] + góc[3]) = 360° - (${a}° + ${b}° + ${c}°) = ${d}°.`;

    return {
        question: parseTemplate(qRaw, vSet),
        options: [`${d}°`, `${d + 10}°`, `${d - 10}°`, `${180 - d > 0 ? 180 - d : d + 5}°`],
        correctIndex: 0,
        explanation: parseTemplate(expRaw, vSet)
    };
}

function genMathQ02() {
    let vSet = vertexSets[Math.floor(Math.random() * vertexSets.length)];
    let isValid = Math.random() > 0.5;
    let a, b, c, d;
    if (isValid) {
        a = getRandomInt(50, 120); b = getRandomInt(50, 120); c = getRandomInt(50, 120);
        d = 360 - (a + b + c);
        if (d >= 180 || d <= 0) isValid = false;
    }
    if (!isValid) {
        a = getRandomInt(100, 150); b = getRandomInt(100, 150); c = getRandomInt(100, 150);
        d = getRandomInt(50, 100);
    }

    let qRaw = `Cho tứ giác [1234] có góc[1]=${a} độ, góc[2]=${b} độ, góc[3]=${c} độ, góc[4]=${d} độ. Tứ giác [1234] có phải là tứ giác lồi không?`;
    let sum = a + b + c + d;

    let ansText = (sum === 360 && a < 180 && b < 180 && c < 180 && d < 180) ? "Có, đây là tứ giác lồi." : "Không phải tứ giác lồi.";
    let wrongText = ansText === "Có, đây là tứ giác lồi." ? "Không phải tứ giác lồi." : "Có, đây là tứ giác lồi.";

    let expRaw = `Tổng các góc góc[1] + góc[2] + góc[3] + góc[4] = ${sum}°. Điều kiện để là tứ giác lồi là tổng phải bằng 360° và không có góc nào lớn hơn hoặc bằng 180°.`;

    return {
        question: parseTemplate(qRaw, vSet),
        options: [ansText, wrongText],
        correctIndex: 0,
        explanation: parseTemplate(expRaw, vSet)
    };
}

function genMathQ03() {
    return {
        question: `Trong một tứ giác lồi, hỏi số góc tù nhiều nhất có thể có là bao nhiêu và số góc nhọn nhiều nhất là bao nhiêu?`,
        options: [`3 góc tù, 3 góc nhọn`, `4 góc tù, 2 góc nhọn`, `2 góc tù, 2 góc nhọn`, `3 góc tù, 4 góc nhọn`],
        correctIndex: 0,
        explanation: `Tứ giác lồi có thể có tối đa 3 góc nhọn (ví dụ: 89°, 89°, 89°, 93°) hoặc tối đa 3 góc tù (ví dụ: 91°, 91°, 91°, 87°).`
    };
}

function genMathQ04() {
    let vSet = vertexSets[Math.floor(Math.random() * vertexSets.length)];
    let qRaw = `Cho tứ giác lồi [1234] có [12] = [14] và [32] = [34]. Khẳng định nào dưới đây là ĐÚNG?`;

    let correctRaw = `[13] là đường trung trực của [24]`;
    let wrong1 = `[24] là đường trung trực của [13]`;
    let wrong2 = `[1234] là hình thoi`;
    let wrong3 = `[13] bằng [24]`;

    let expRaw = `Vì [12]=[14] và [32]=[34], theo tính chất đường trung trực, điểm [1] và điểm [3] cùng cách đều hai đầu mút [2] và [4]. Do đó đường chéo [13] là đường trung trực của đoạn thẳng [24].`;

    return {
        question: parseTemplate(qRaw, vSet),
        options: [parseTemplate(correctRaw, vSet), parseTemplate(wrong1, vSet), parseTemplate(wrong2, vSet), parseTemplate(wrong3, vSet)],
        correctIndex: 0,
        explanation: parseTemplate(expRaw, vSet)
    };
}

function genMathQ09() {
    let vSet = vertexSets[Math.floor(Math.random() * vertexSets.length)];
    let isNhoHon = Math.random() > 0.5;
    let cond = isNhoHon ? "[12] < [34]" : "[12] > [34]";
    let qRaw = `Cho hình thang cân [1234] có đáy [12] // [34] và ${cond}. Đâu là cặp góc tù của hình thang này?`;

    let correctRaw = isNhoHon ? `góc[1] và góc[2]` : `góc[3] và góc[4]`;
    let wrong1 = isNhoHon ? `góc[3] và góc[4]` : `góc[1] và góc[2]`;
    let wrong2 = `góc[1] và góc[3]`;
    let wrong3 = `góc[2] và góc[4]`;

    let expRaw = isNhoHon ?
        `Trong hình thang cân [1234] có [12] // [34] và đáy nhỏ [12] < [34], hai góc kề đáy nhỏ góc[1] và góc[2] là hai góc tù.` :
        `Trong hình thang cân [1234] có [12] // [34] và đáy nhỏ [34] < [12], hai góc kề đáy nhỏ góc[3] và góc[4] là hai góc tù.`;

    return {
        question: parseTemplate(qRaw, vSet),
        options: [parseTemplate(correctRaw, vSet), parseTemplate(wrong1, vSet), parseTemplate(wrong2, vSet), parseTemplate(wrong3, vSet)],
        correctIndex: 0,
        explanation: parseTemplate(expRaw, vSet)
    };
}

function genTheoryQuestion() {
    let tpl = theoryTemplates[Math.floor(Math.random() * theoryTemplates.length)];
    let vSet = vertexSets[Math.floor(Math.random() * vertexSets.length)];
    let questionParsed = parseTemplate(tpl.q, vSet);

    let options = [tpl.a];
    let availableWrongs = allShapeTypes.filter(s => s !== tpl.a);
    shuffleArray(availableWrongs);
    options.push(availableWrongs[0], availableWrongs[1], availableWrongs[2]);

    return {
        question: questionParsed,
        options: options,
        correctIndex: 0,
        explanation: `Theo dấu hiệu nhận biết SGK Toán 8, tứ giác thỏa mãn các điều kiện trên là ${tpl.a}.`
    };
}

// ================= KHỞI CHẠY VÀ QUẢN LÝ QUIZ =================
let quizData = [];
let currentIndex = 0;
let correctCount = 0;

function initQuiz() {
    let currentPool = [];
    currentPool.push(genMathQ01(), genMathQ02(), genMathQ03(), genMathQ04(), genMathQ09());

    while (currentPool.length < QUESTIONS_PER_TEST) {
        currentPool.push(genTheoryQuestion());
    }

    shuffleArray(currentPool);

    quizData = currentPool.map(q => {
        let optionsObj = q.options.map((text, idx) => ({ text, isCorrect: idx === q.correctIndex }));
        shuffleArray(optionsObj);
        q.options = optionsObj.map(o => o.text);
        q.correctIndex = optionsObj.findIndex(o => o.isCorrect);
        return q;
    });

    currentIndex = 0;
    correctCount = 0;
    updateScoreBoard();
    renderQuestion();
}

function updateScoreBoard() {
    document.getElementById('correct-count').innerText = correctCount;
    document.getElementById('total-count').innerText = quizData.length;
    let percent = currentIndex === 0 ? 0 : Math.round((correctCount / currentIndex) * 100);
    document.getElementById('percent-count').innerText = percent + "%";
}

function renderQuestion() {
    const container = document.getElementById('quiz-content');
    if (currentIndex >= quizData.length) {
        renderSummary();
        return;
    }

    let q = quizData[currentIndex];

    let optionsHtml = q.options.map((optText, index) => `
            <li class="option-item">
                <label class="option-label" id="label-${index}">
                    <input type="radio" name="quiz-opt" value="${index}" onclick="handleSelect(${index})">
                    ${optText}
                </label>
            </li>
        `).join('');

    container.innerHTML = `
            <div class="question-box">
                <div class="question-text">Câu ${currentIndex + 1}: ${q.question}</div>
                <ul class="options-list">${optionsHtml}</ul>
                
                <div class="feedback-area" id="feedback-box">
                    <div id="feedback-title" class="feedback-title"></div>
                    <div id="feedback-exp">${q.explanation}</div>
                </div>

                <div class="action-area" id="action-box" style="display: none;">
                    <button onclick="handleNext()">
                        ${currentIndex === quizData.length - 1 ? 'Xem kết quả chung cuộc' : 'Câu tiếp theo ➜'}
                    </button>
                </div>
            </div>
        `;
}

function handleSelect(selectedIndex) {
    let q = quizData[currentIndex];

    const radios = document.querySelectorAll('input[name="quiz-opt"]');
    radios.forEach(radio => radio.disabled = true);

    const labels = document.querySelectorAll('.option-label');
    labels.forEach((label, idx) => {
        label.classList.add('disabled');
        if (idx === q.correctIndex) label.classList.add('correct-choice');
    });

    const feedbackBox = document.getElementById('feedback-box');
    const feedbackTitle = document.getElementById('feedback-title');

    if (selectedIndex === q.correctIndex) {
        correctCount++;
        feedbackTitle.innerText = "✔️ CHÍNH XÁC!";
        feedbackTitle.className = "feedback-title true";
    } else {
        document.getElementById(`label-${selectedIndex}`).classList.add('incorrect-choice');
        feedbackTitle.innerText = "❌ CHƯA CHÍNH XÁC!";
        feedbackTitle.className = "feedback-title false";
    }

    currentIndex++;
    updateScoreBoard();

    feedbackBox.style.display = "block";
    document.getElementById('action-box').style.display = "block";
}

function handleNext() { renderQuestion(); }

function renderSummary() {
    const container = document.getElementById('quiz-content');
    let finalPercent = Math.round((correctCount / quizData.length) * 100);
    container.innerHTML = `
            <div class="summary-screen">
                <h2>🎉 Hoàn Thành Bài Kiểm Tra!</h2>
                <p style="font-size: 1.3em;">Tổng kết: <strong>${correctCount} / ${quizData.length}</strong> câu đúng (${finalPercent}%)</p>
                <div style="margin-top: 30px;">
                    <button onclick="initQuiz()">🔄 Luyện tập bộ 15 câu khác</button>
                </div>
            </div>
        `;
}

window.onload = initQuiz;