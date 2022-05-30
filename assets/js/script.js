const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const questionsElement = document.getElementById('questions');
const optionButtonsElement = document.getElementById('option-buttons');
var timeElement = document.getElementById('timer');
var topScores = [];
timeElement.innerHTML = 75
var date = 75

var timer = null;



let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})

function startGame() {
    
    timer = setInterval(function() {
        date--;
        timeElement.innerHTML = date
        if(date <= 0) {
            console.log(date)
            endOfGame();
        }
    }, 1000);
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();

}
var score = 0
var selectedAnswerIndex = null;

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
   
}

function showQuestion(question) {
    questionElement.innerText = question.question
    let index = 0
    question.options.forEach(option => {
        const button = document.createElement('button');
        
        // button.onclick = function() {
            
        //     setAnswerIndex(index);
        // }
        
        button.innerText = option.text;
        button.classList.add('btn');
        if (option.correct) {
            button.setAttribute('id', 'correct');
            button.dataset.correct = option.correct
        }
        button.addEventListener('click', selectAnswer);
        optionButtonsElement.appendChild(button);
    })

}

function setAnswerIndex(index) {
    console.log(index)
    selectedAnswerIndex = index;
}

function resetState() {
    nextButton.classList.add('hide');
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    if(selectedButton.id === 'correct') {
        score++;
    } else {
        date = date - 15;
    }
    const correct = selectedButton.dataset.correct;
    Array.from(optionButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    console.log(questions, currentQuestionIndex, selectedAnswerIndex)
    endOfGame();
}

function endOfGame() {
    clearInterval(timer);
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    }  else {
        document.getElementById('final-score').innerHTML = date;
        summary.classList.remove('hide');
        questionsElement.classList.add('hide');
        

    }
    console.log("score: " + score)
}

function submit() {
    
    topScores = localStorage.getItem('high-scores');
    if(!topScores) {
        topScores = [];
    }
    topScores.push(document.getElementById('initials').value + date);
    topScores.sort((a, b) => a + b)
    if(topScores.length > 5) {
        topScores.pop();
    }
    localStorage.setItem('high-scores');
    console.log(localStorage);

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add('correct');

    } else {
        element.classList.add('wrong');

    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question : "Can you access Cookie using javascript?", 
        options : [
            {text: "True", correct: true},
            {text: "False", correct: false},
        ]
    },
    {
        question : "Which built-in method returns the character at the specified index?", 
        options : [
            {text: "characterAt()", correct: false},
            {text: "getCharAt()", correct: false},
            {text: "charAt()", correct: true},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question : "Which built-in method returns the calling string value converted to upper case?", 
        options : [
            {text: "toUpperCase()", correct: true},
            {text: "toUpper()", correct: false},
            {text: "changeCase(case)", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question : "Which of the following function of Number object returns a string value version of the current number", 
        options : [
            {text: "toString()", correct: true},
            {text: "toFixed", correct: false},
            {text: "toLocaleString()", correct: false},
            {text: "toPrecision()", correct: false},
        ]
    }
    
];