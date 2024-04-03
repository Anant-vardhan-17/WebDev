const questions = [
   {
       question:  "What does 'DOM' stand for in JavaScript?",
       answers: [
           { text: "Document Object Model", correct: true },
           { text: "Data Object Model", correct: false },
           { text: "Dynamic Object Model", correct: false },
           { text: "Design Object Model", correct: false },
       ]
   },
   {
       question:  "Which of the following is a JavaScript framework used for building user interfaces?",
       answers: [
           { text: "React.js", correct: true },
           { text: "Express.js", correct: false },
           { text: "Django", correct: false },
           { text: "Laravel", correct: false },
       ]
   },
   {
       question:  "What does 'AJAX' stand for in web development?",
       answers: [
           { text: "Asynchronous JavaScript and XML", correct: true },
           { text: "Advanced JavaScript and XHTML", correct: false },
           { text: "Asynchronous JavaScript and XHTML", correct: false },
           { text: "Advanced JavaScript and XML", correct: false },
       ]
   },
   {
       question:  "Which JavaScript keyword is used to declare variables that cannot be reassigned?",
       answers: [
           { text: "const", correct: true },
           { text: "let", correct: false },
           { text: "var", correct: false },
           { text: "static", correct: false },
       ]
   },
   {
       question:  "What does '=== 'operator do in JavaScript?",
       answers: [
           { text: "Strict equality without type coercion", correct: true },
           { text: "Equality with type coercion", correct: false },
           { text: "Assignment", correct: false },
           { text: "Inequality", correct: false },
       ]
   }
]; 

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
   currentQuestionIndex = 0
   score = 0
   nextButton.innerHTML = "Next"
   showQuestion()
}

function showQuestion(){
   resetState()
   let currentQuestion = questions[currentQuestionIndex]
   let questionNo = currentQuestionIndex + 1
   questionElement.innerHTML = questionNo + ". " + currentQuestion.question

   currentQuestion.answers.forEach(answer => {
       const button = document.createElement("button")
       button.innerHTML = answer.text
       button.classList.add("btn")
       answerButtons.appendChild(button)
       if(answer.correct){
           button.dataset.correct = answer.correct
       }
       button.addEventListener("click", selectAnswer)
   })
}

function resetState(){
   nextButton.style.display = "none"
   while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild)
   }
}

function selectAnswer(e){
   const selectedBtn = e.target
   const isCorrect = selectedBtn.dataset.correct === "true"
   if(isCorrect){
       selectedBtn.classList.add("correct")
       score++
   }

   else{
       selectedBtn.classList.add("incorrect")
   }
   Array.from(answerButtons.children).forEach(button => {
       if(button.dataset.correct === "true"){
           button.classList.add("correct")
       }
       button.disabled = true
   })
   nextButton.style.display = "block"
}

function showScore(){
   resetState()
   questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
   nextButton.innerHTML = "Play Again"
   nextButton.style.display = "block"
}

function handleNextButton(){
   currentQuestionIndex++
   if(currentQuestionIndex < questions.length){
       showQuestion()
   }else{
       showScore()
   }
}

nextButton.addEventListener("click", ()=>{
   if(currentQuestionIndex < questions.length){
       handleNextButton()
   }else{
       startQuiz()
   }
})
startQuiz()