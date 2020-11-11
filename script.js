const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which of these are a JS data type?',
        choice1: "boolean",
        choice2: "null",
        choice3: "number",
        choice4: "all of the above",
        answer: "all of the above",
    },

    {
        question: 'Which of the following function of Boolean object returns a string of either true or false depending upon the value of the object?',
        choice1: "toSource()",
        choice2: "valueOf()",
        choice3: "toString()",
        choice4: "none of the above",
        answer: "toString()",
    },

    {
        question: 'Which of the following function of String object causes a string to be displayed in the specified size as if it were in a font size tag?',
        choice1: "fixed()",
        choice2: "fontcolor()",
        choice3: "fontsize()",
        choice4: "bold()",
        answer: "fontsize()",
    },

    {
        question: 'Which of the following function of Array object adds and/or removes elements from an array?',
        choice1: "splice()",
        choice2: "toSource()",
        choice3: "sort()",
        choice4: "unshift()",
        answer: "splice()",
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem ('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
// calculates what question we are on and what the score is currently
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}
// pushes correct or incorrect for each question
choices.forEach(choice => {
   choice.addEventListener('click', e => {
       if(!acceptingAnswers) return
       acceptingAnswers = false 
       const selectedChoice = e.target
       const selectedAnswer = selectedChoice.innerText
       console.log(selectedAnswer); //ie answer
       console.log(currentQuestion.answer); // fontsize
       let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"
       if(classToApply === 'correct') {
           incrementScore(SCORE_POINTS)
       }
// pauses so that the player can see if they are correct or not
       selectedChoice.parentElement.classList.add(classToApply)
       setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
       }, 1000)
   }) 
})

incrementScore = num => {
    score +=numgit
    scoreText.innerText = score

}

startGame()