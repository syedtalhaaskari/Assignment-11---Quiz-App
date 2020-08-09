var questions = [
    {
        question: "Who is the best programmer?",
        options: [
            "Steve Jobs",
            "Bill Gates",
            "Elon Musk",
            "Syed Talha Askari"
        ],
        answer: "Syed Talha Askari"
    },
    {
        question: "Which is the best book of all time?",
        options: [
            "What rich people do?",
            "Quran",
            "How to overcome procrastination",
            "Secret ways to become successful"
        ],
        answer: "Quran"
    },
    {
        question: "What is 2 + 2?",
        options: [
            "4",
            "22",
            "33",
            "24"
        ],
        answer: "4"
    },
    {
        question: "Who is the best YouTuber?",
        options: [
            "Ducky Bhai",
            "Shaveer Jafry",
            "Mooroo",
            "Bhaiya Jee"
        ],
        answer: "Bhaiya Jee"
    },
    {
        question: "Is web development fun?",
        options: [
            "Kinda",
            "YES!!!",
            "Um no",
            "IDK"
        ],
        answer: "YES!!!"
    },
    {
        question: "What is 4 * 2?",
        options: [
            "6",
            "8",
            "42",
            "2"
        ],
        answer: "8"
    }
];
var score = 0;
var doneQuestions = [];

function start() {
    var name = document.getElementById("name").value;
    sessionStorage.setItem("name", name)
    window.location.href = "./quiz.html";
}

function startQuiz() {
    var username = document.getElementById("name");
    username.innerHTML = sessionStorage.getItem("name");
    var randomQuestion = Math.floor(Math.random() * questions.length);
    var question = document.getElementById("question");
    question.innerHTML = questions[randomQuestion].question;
    var options = document.getElementsByClassName("option");
    for (var i = 0; i < options.length; i++) {
        options[i].innerHTML = questions[randomQuestion].options[i];
    }
    sessionStorage.setItem("randomQuestion", randomQuestion);
}

function check(e) {

    var random = sessionStorage.getItem("randomQuestion");

    if (e.innerHTML === questions[random].answer) {
        score++;
        var sc = document.getElementById("score");
        sc.innerHTML = score;
        for (var i = 0; i < e.parentNode.childNodes.length; i++) {
            e.parentNode.childNodes[i].style.backgroundColor = "red";
            e.parentNode.childNodes[i].style.color = "white";
        }
        e.style.backgroundColor = "green";
        e.style.color = "white";
    }
    else {
        for (var i = 0; i < e.parentNode.childNodes.length; i++) {
            e.parentNode.childNodes[i].style.backgroundColor = "red";
            e.parentNode.childNodes[i].style.color = "white";
        }
        for (var i = 0; i < e.parentNode.childNodes.length; i++) {
            if (e.parentNode.childNodes[i].innerHTML === questions[random].answer) {
                e.parentNode.childNodes[i].style.backgroundColor = "green";
                e.parentNode.childNodes[i].style.color = "white";
            }
        }
    }

    doneQuestions.push.apply(doneQuestions, questions.splice(random, 1));
    doneQuestions[doneQuestions.length - 1].yourAnswer = e.innerHTML;
    if (questions.length === 1) {
        sessionStorage.setItem("score", score);
        sessionStorage.setItem("doneQuestions", JSON.stringify(doneQuestions));
        window.location.href = "./result.html";
    }

    setTimeout(newQuestion, 1000);
}

function newQuestion() {
    var list = document.getElementsByClassName("option");
    for (var i = 0; i < list.length; i++) {
        list[i].style.backgroundColor = "transparent";
        list[i].style.color = "black";
    }
    var randomQuestion = Math.floor(Math.random() * questions.length);
    var question = document.getElementById("question");
    question.innerHTML = questions[randomQuestion].question
    var options = document.getElementsByClassName("option");
    for (var i = 0; i < options.length; i++) {
        options[i].innerHTML = questions[randomQuestion].options[i];
    }
    sessionStorage.setItem("randomQuestion", randomQuestion);
}

function result() {
    var name = document.getElementById("name");
    var scored = document.getElementById("score");
    name.innerHTML = sessionStorage.getItem("name");
    scored.innerHTML = sessionStorage.getItem("score");
    var dQues = JSON.parse(sessionStorage.getItem("doneQuestions"));
    var ques = document.getElementById("questions");
    // var sp = document.createElement("span");
    for (var i = 0; i < dQues.length; i++) {
        ques.innerHTML += "<br>" + dQues[i].question + "<br>";
        for (var j = 0; j < dQues[i].options.length; j++) {
            // if (dQues[i].options[j] === dQues[i].yourAnswer) {
            //     if (dQues[i].yourAnswer === dQues[i].answer) {
            //         var sp = document.createElement("span");
            //         sp.classList.add("green");
            //         sp.innerHTML = dQues[i].yourAnswer;
            //         ques.innerHTML += sp.outerHTML + "<br>";
            //     }
            // }
            if (dQues[i].options[j] === dQues[i].answer) {
                var sp = document.createElement("span");
                sp.classList.add("green");
                    sp.innerHTML = dQues[i].options[j];
                    ques.innerHTML += sp.outerHTML + "<br>";
                    continue;
                if (dQues[i].yourAnswer === dQues[i].options[j]) {
                    
                    
                    // for (var k = j; dQues[i].options.length; k++) {
                    //     var sp1 = document.createElement("span");
                    //     sp1.classList.add("red");
                    //     sp.innerHTML = dQues[i].yourAnswer;
                    //     ques.innerHTML += sp.outerHTML + "<br>";
                    // }
                }
                
            }
            else if (dQues[i].yourAnswer === dQues[i].options[j]) {
                var sp = document.createElement("span");
                sp.classList.add("red");
                sp.innerHTML = dQues[i].options[j];
                ques.innerHTML += sp.outerHTML + "<br>";
            }
            else {
                ques.innerHTML += dQues[i].options[j] + "<br>";
            }
        }
    }
}