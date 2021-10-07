const quizdata = [
    {
        question: 'How old is ashish?',
        a: '13',
        b: '15',
        c: '18',
        d: '10',
        correct: 'c'
    }, {
        question: 'What is the best programming language?',
        a: 'Java',
        b: 'C',
        c: 'JavaScript',
        d: 'Python',
        correct: 'd'
    }, {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    }, {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    }
];

let currentQuestion = 0
let score = 0
const quiz = document.getElementById('quiz');
const answersELs = document.querySelectorAll('.answer');
const questionEL = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitbtn = document.getElementById('submit');

loadquiz();
getSelected();

function loadquiz() {
    const currentQuizData = quizdata[currentQuestion];
    questionEL.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
};

function getSelected() {
    let answer = undefined;
    answersELs.forEach((answerEL) => {
        if (answerEL.checked) {
            answer = answerEL.id;
        }
    });
    return answer;
}

function deselect() {
    answersELs.forEach((answerEL) => {
        answerEL.checked = false;
    });
}

submitbtn.addEventListener("click", () => {
    const answer = getSelected()
    if (answer && answer === quizdata[currentQuestion].correct) {
        console.log('correct');
        currentQuestion++;
        score++
        if (currentQuestion < quizdata.length) {
            loadquiz();
            deselect();
            getSelected();
        } else {
            // alert("Quiz Finished!");
            quiz.innerHTML = 
            `
                <h2 style="text-align: center; margin: 2rem;">Your Score for this quiz is ${score}/${quizdata.length}</h2>
                <button class="submit_btn" id="submit" onclick='location.reload()'>Play Again</button>
            `;
            // submitbtn.innerText = 'Play Again';
            // submitbtn.onclick = location.reload();
            // submitbtn.disabled = true;

        }
    } else if (answer && answer != quizdata[currentQuestion].correct) {
        console.log('incorrect');
        currentQuestion++;
        if (currentQuestion < quizdata.length) {
            loadquiz();
            deselect();
            getSelected();
        } else {
            // alert("Quiz Finished!");
            quiz.innerHTML = 
            `
                <h2 style="text-align: center; margin: 2rem;">Your Score for this quiz is ${score}/${quizdata.length}</h2>
                <button class="submit_btn" id="submit" onclick='location.reload()'>Play Again</button>
            `;
            // submitbtn.innerText = 'Play Again';
            // submitbtn.onclick = location.reload();
            // submitbtn.disabled = true;

        }
    } else if (!answer) {
        alert('You need to choose any option!');
    };
    
    
    
}) 