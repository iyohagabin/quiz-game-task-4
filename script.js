const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetstate()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetstate() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild)
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Which goalkeeper has won the the most matches in uefa champions league?',
        answers: [
            { text: 'buffon', correct: false },
            { text: 'khan', correct: false },
            { text: 'cassilas', correct: true },
            { text: 'nuer', correct: false }
        ]
    },
    {
        question: 'Only one player has won the uefa champions league with 3 different teams?',
        answers: [
            { text: 'ronaldo', correct: false },
            { text: 'ibrahimovic', correct: false },
            { text: 'higuan', correct: false },
            { text: 'seedorf', correct: true }
        ]
    },
    {
        question: 'Two players scored in 15 consecutive uefa champions league seasons?',
        answers: [
            { text: 'lewandoski and ronaldo', correct: false },
            { text: 'ronaldo and benzema', correct: false },
            { text: 'messi and ronaldo', correct: false },
            { text: 'messi and benzema', correct: true }
        ]
    },
    {
        question: 'Only one african goalkeeper has scored in uefa champions league, from what country?',
        answers: [
            { text: 'Egypt', correct: false },
            { text: 'Nigeria', correct: true },
            { text: 'Algeria', correct: false },
            { text: 'Ghana', correct: false }
        ]
    },
    {
        question: 'Only player to have scored for 6 different teams in uefa champions league?',
        answers: [
            { text: 'thierry henry', correct: false },
            { text: 'edison cavani', correct: false },
            { text: 'clarence seedorf', correct: false },
            { text: 'zlatan ibrahimovic', correct: true }
        ]
    }
]