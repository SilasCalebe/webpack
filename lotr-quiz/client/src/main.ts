import Iquestions from "./interfaces/question";

const start = document.querySelector(".start")!;
const next = document.querySelector(".next")!;
const answers = document.querySelector(".answers")!;
const overlay = document.querySelector(".overlay") as HTMLElement;
let options = document.querySelectorAll(".btn");
let question = document.getElementById("asking")!;
let random: number = 0;

let questionsData: Iquestions[]
async function fetchQuestions() {
    const response = await fetch('https://lotr-quiz.herokuapp.com/read');
    questionsData = await response.json()
    console.log(questionsData)
}
fetchQuestions();

start.addEventListener("click", () => {
    startGame();
});

function randomNumber(): void {
    random = Math.floor(Math.random() * questionsData.length);
    console.log(random)
}

function startGame(): void {
    randomNumber();
    start.classList.add("hide");
    answers.classList.remove("hide");

    /*question */
    question.innerHTML = questionsData[random].question;

    /*options*/
    options.forEach((item, index) => {
        item.innerHTML = questionsData[random].answer[index].text;
    });
}

/*check answer */
options.forEach((item, index) => {
    item.addEventListener("click", () => {
        if (next.classList.contains("hide") === false) return;

        next.classList.remove("hide");
        overlay.classList.remove("hide");
        setColor();

        //set background-color
        let background = questionsData[random].answer[index].correct;
        if (background) {
            overlay.style.backgroundColor = "rgba(60, 250, 43, 0.2)";
        } else {
            overlay.style.backgroundColor = "rgba(248, 0, 0, 0.2)";
        }
    });
});

function setColor(): void {
    questionsData[random].answer.forEach((button, position) => {
        if (button.correct) {
            options[position].classList.add("correct");
        } else {
            options[position].classList.add("incorrect");
        }
    });
}

/*next question */
next.addEventListener("click", () => {
    randomNumber();
    next.classList.add("hide");
    overlay.classList.add("hide");
    options.forEach((item) => {
        if (item.classList.contains("correct")) {
            item.classList.remove("correct");
        } else {
            item.classList.remove("incorrect");
        }
    });
    question.innerHTML = questionsData[random].question;
    /*options*/
    options.forEach((item, index) => {
        item.innerHTML = questionsData[random].answer[index].text;
    });
});
