const h1 = document.getElementById("counter");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const formElement = document.getElementById("comment-form");
const submitButton = document.getElementById("submit");

let count = 0;
let heartCounter = {};
let isCounterOn = false;
let intervalId;

document.addEventListener("DOMContentLoaded", handleCounter);
minusButton.addEventListener("click", handleMinusButtonClick);
plusButton.addEventListener("click", handlePlusButtonClick);
heartButton.addEventListener("click", handleHeartButtonClick);
pauseButton.addEventListener("click", handlePauseButtonClick);
formElement.addEventListener("submit", handleSubmitButton);

function handleCounter(event) {
    intervalId = setInterval(() => {
        if (!isCounterOn) {
            count++;
            h1.textContent = count
        } else {
            clearInterval(intervalId);
        }
    }, 1000) 
};

function handleMinusButtonClick(event) {
    count--
    h1.textContent = count
};

function handlePlusButtonClick(event) {
    count++
    h1.textContent = count
};

function handleHeartButtonClick(event) {
    handleHeartCounter()
    createAndUpdateHeartComments()
};

function handleHeartCounter() {
    if (count in heartCounter) {
        heartCounter[count] += 1;
    } else { 
        heartCounter[count] = 1;
    }
};

function createAndUpdateHeartComments() {  
    const existingLi = document.getElementById(`element-${count}`);
    
    if (!existingLi) {
        const ul = document.createElement("ul")
        const li = document.createElement("li")
        const div = document.querySelector("#list")

        li.setAttribute("id", `element-${count}`)

        div.appendChild(ul)
        ul.appendChild(li)

        li.textContent = `${count} was liked ${heartCounter[count]} times!`
    } else {
        existingLi.textContent = `${count} was liked ${heartCounter[count]} times!`
    }
};

function handlePauseButtonClick(event) {
    const buttonsArray = [minusButton, plusButton, heartButton, submitButton];

    if (pauseButton.textContent === " pause ") {
        handlePauseAction(buttonsArray)
        handleCounter()
    } else {
        handleResumeAction(buttonsArray)
        clearInterval(intervalId)
    }
};

function handlePauseAction(array) {
    isCounterOn = true;
    array.forEach(button => {
        button.setAttribute("disabled", true); 
    })
    pauseButton.textContent = " resume ";
};

function handleResumeAction(array) {
    isCounterOn = false;
    array.forEach(button => {
        button.removeAttribute("disabled");
    })
    pauseButton.textContent = " pause ";
};

function handleSubmitButton(event) {
    event.preventDefault();
    const commentInput = document.getElementById("comment-input");
    const comment = document.createElement("p");

    comment.textContent = commentInput.value;

    formElement.insertAdjacentElement("afterend", comment);
};