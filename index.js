let questionNumber = 0;
let totalScore = 0;

//set the html in the question section
function displayNextQuestion() {
    $(".js-question").html(`<div class="quiz-question">${appData[questionNumber].question}</div>`);
}

//set the html in the answer section
function displayNextAnswer() {
    $(".js-answers").html(`<form class="answer-form js-answer-form">
            <label for="option1" class="answer-option">
                <input type="radio" name="multi-choice" id="option1" value="${appData[questionNumber].answers[0]}" required>${appData[questionNumber].answers[0]}
            </label>
            <label for="option2" class="answer-option">
                <input type="radio" name="multi-choice" id="option2" value="${appData[questionNumber].answers[1]}" required>${appData[questionNumber].answers[1]}
            </label>
            <label for="option3" class="answer-option">
                <input type="radio" name="multi-choice" id="option3" value="${appData[questionNumber].answers[2]}" required>${appData[questionNumber].answers[2]}
            </label>
            <label for="option4" class="answer-option">
                <input type="radio" name="multi-choice" id="option4" value="${appData[questionNumber].answers[3]}" required>${appData[questionNumber].answers[3]}
            </label>
            <button type="submit" class="submit-answer">Submit</button>
        </form>`);
}

//increase the score by 1
//update the score in the app
function addPoint() {
    totalScore++;
    $('.score').text(totalScore);
}

function increaseQuestionNumber() {
    questionNumber++;
    $('span.question-number').text(questionNumber+1);
}

function clearFeedback() {
    $('.js-feedback').empty();
}

function loadResults() {
    console.log("we've made it to the end!");
    clearFeedback();
    $(".js-question").html(`<div class="quiz-question">You scored ${totalScore} out of 10!</div>`);
    $(".js-answers").empty();
}

function nextQuestion() {
    $('.next-question').click(function(event) {
        if (questionNumber + 1 < 10) {
            increaseQuestionNumber();
            clearFeedback();
            displayNextQuestion();
            displayNextAnswer();
            submitAnswer();
        }
        else {
            loadResults();
        }
    });
}

//display that the answer is correct
//show a relevant picture of the correct answer
//show the 'next question' button
//listen for 'next question' click
function feedbackCorrect() {
    $('.js-feedback').html(`<h3>Correct!</h3>
        <img src=${appData[questionNumber].rightImage} alt=${appData[questionNumber].rightAlt} class="correct-picture">
        <button class="next-question">-Next-</button>
    `);
    nextQuestion();
}

//play the 'no-please-no' audio clip
function playNoPleaseNo() {
    let noPleaseNo = document.getElementById("no-please-no");
    noPleaseNo.play();
}

//call the 'no-please-no' audio function
//display that the answer is incorrect
//display the correct answer
//show a negative picture from the Office
function feedbackWrong() {
    playNoPleaseNo();
    $('.js-feedback').html(`<h3>Incorrect!</h3><h4>The correct answer was '${appData[questionNumber].rightAnswer}'.</h4>
        <img src=${appData[questionNumber].wrongImage} alt=${appData[questionNumber].wrongAlt} class="wrong-picture">
        <button class="next-question">-Next-</button>
    `);
    nextQuestion();
}

//hide the 'submit' button
//display the 'next' button
//display feedback picture and text
//play audio?
//increase the score
function quizQuestionCorrect() {
    $('button.submit-answer').css("display", "none");
    addPoint();
    feedbackCorrect();
}

function quizQuestionWrong() {
    $('button.submit-answer').css("display", "none");
    feedbackWrong();
}

//watch for the submit button to be clicked
//get the value of the clicked radio button in the form
//compare the submitted answer to the correct answer
//provide feedback
function submitAnswer() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        let submittedAnswer = $("input[name='multi-choice']:checked").val();
        let rightAnswer = appData[questionNumber].rightAnswer;
        if (submittedAnswer === rightAnswer) {
            quizQuestionCorrect();
        }
        else {
            quizQuestionWrong();
        }
    });
}

function lowerVolume() {
    let turnItDown = document.getElementById("office-theme");
    turnItDown.volume = 0.35;
    console.log("turned down the volume")
}

//start the quiz
//remove the start button
//set top "nav" bar to black background and show its divs
//display question
//display the answer form
function startQuiz() {
    lowerVolume();
    $('.js-start-quiz').click(function(event) {
        $(this).remove();
        $("nav").css("background-color", "black");
        $("nav div").css("display", "inline-block");
        displayNextQuestion();
        displayNextAnswer();
        submitAnswer();
    });
}

$(startQuiz);