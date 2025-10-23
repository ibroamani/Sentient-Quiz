let currentQuestion = 0;
let score = 0;

const startContainer = document.getElementById("startContainer");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const startBtn = document.getElementById("startBtn");
const scoreText = document.getElementById("scoreText");
const shareBtn = document.getElementById("shareBtn");

function fadeIn(el) {
  el.style.display = "flex";
  setTimeout(() => el.classList.add("show"), 50);
}

function fadeOut(el) {
  el.classList.remove("show");
  setTimeout(() => (el.style.display = "none"), 800);
}

startBtn.addEventListener("click", () => {
  fadeOut(startContainer);
  setTimeout(() => fadeIn(quizContainer), 800);
  loadQuestion();
});

function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = `Q${currentQuestion + 1}. ${q.q}`;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = opt;
    div.onclick = () => selectOption(i, q.answer, div);
    optionsContainer.appendChild(div);
  });
}

function selectOption(selected, correct, btn) {
  const options = document.querySelectorAll(".option");
  options.forEach((opt, i) => {
    opt.style.pointerEvents = "none";
    if (i === correct) opt.classList.add("correct");
    else if (i === selected) opt.classList.add("wrong");
  });

  if (selected === correct) score += 5;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) loadQuestion();
    else endQuiz();
  }, 1200);
}

function endQuiz() {
  fadeOut(quizContainer);
  setTimeout(() => fadeIn(resultContainer), 800);
  scoreText.textContent = `You scored ${score}% on SentientAI Quiz!`;
  shareBtn.href = `https://twitter.com/intent/tweet?text = I just scored ${score}% on the SentientAI Quiz by @musty0411! 🧠🚀`;
}

window.onload = () => startContainer.classList.add("show");
