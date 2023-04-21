let currentQuestion = 0;
let selectedAnswers = [];
const questionContainer = document.getElementById("questionContainer");
const resultContainer = document.getElementById("resultContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const h2 = document.querySelector("h2");
let answers = [];

function loadQuestion() {
  const question = myQuestions[currentQuestion];
  const choices = Object.entries(question.answers)
    .map(
      ([key, value]) => `
        <input type="${
          question.multi ? "checkbox" : "radio"
        }" name="question${currentQuestion}" value="${key}" id="choice${key}">
        <label for="choice${key}">${value}</label><br>
      `
    )
    .join("");
  questionContainer.innerHTML = `
        
        <p><b>${question.question}</b></p>
        <form>${choices}</form>

      `;
  h2.innerText = `Question ${currentQuestion + 1} of ${myQuestions.length}`;
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = currentQuestion === myQuestions.length - 1;
  submitBtn.style.display =
    currentQuestion === myQuestions.length - 1 ? "block" : "none";
}

function prevQuestion() {
  const form = document.forms["quizForm"];
  const selectedAnswer = form.elements[`question${currentQuestion}`].value;
  answers[currentQuestion] = selectedAnswer;
  currentQuestion--;
  loadQuestion();
  nextBtn.style.display = "block"; // Show the "Next" button on previous questions
  // Retrieve previously selected answer and set it as checked
  const previousAnswer = answers[currentQuestion];
  if (previousAnswer) {
    form.elements[`question${currentQuestion}`].value = previousAnswer;
  }
}

function nextQuestion() {
  const form = document.forms["quizForm"];
  const selectedAnswer = form.elements[`question${currentQuestion}`].value;
  answers[currentQuestion] = selectedAnswer;
  currentQuestion++;
  loadQuestion();
  if (currentQuestion === myQuestions.length - 1) {
    nextBtn.style.display = "none"; // Hide the "Next" button on the last question
  }
  const nextAnswer = answers[currentQuestion];
  if (nextAnswer) {
    form.elements[`question${currentQuestion}`].value = nextAnswer;
  }
}

function submitQuiz() {
  const form = document.forms["quizForm"];
  const selectedAnswer = form.elements[`question${currentQuestion}`].value;
  answers[currentQuestion] = selectedAnswer;
  let correctCount = 0;
  for (let i = 0; i < myQuestions.length; i++) {
    if (answers[i] && answers[i].toString() === myQuestions[i].correctAnswer) {
      correctCount++;
    }
  }
  const resultPercentage = (correctCount / myQuestions.length) * 100;
  const resultMessage = `You got ${correctCount} out of ${myQuestions.length} questions correct (${resultPercentage}%).`;
  resultContainer.innerHTML = `<h2>Quiz Result:</h2><p>${resultMessage}</p>`;
}

loadQuestion();
