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
function addPoint() {
    totalScore++;
    $('.score').text(totalScore);
}

//increase the question number by 1
function increaseQuestionNumber() {
    questionNumber++;
    $('span.question-number').text(questionNumber+1);
}

//empty the feedback section
function clearFeedback() {
    $('.js-feedback').empty();
}

//restart the quiz
function restartQuiz() {
    $('.try-again').click(function(event) {
        location.reload()
    });
}

//display the final results page
function loadResults() {
    clearFeedback();
    $(".js-question").html(`<div class="final-score">You scored ${totalScore} out of 10!</div>`);
    $(".js-answers").html(`<h4>You're ${characterResult[totalScore].character}.</h4>
        <img src=${characterResult[totalScore].characterImage} alt=${characterResult[totalScore].characterAlt} class="character-picture">
        <h4>${characterResult[totalScore].characterText}</h4>
        <button class="try-again">Try Again</button>
        `);
    restartQuiz();
}

//listen for the 'next' button to be clicked and load the next question
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

//provide feedback about a correct answer
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

//provide feedback about an incorrect answer
function feedbackWrong() {
    playNoPleaseNo();
    $('.js-feedback').html(`<h3>Incorrect!</h3><h4>The correct answer was '${appData[questionNumber].rightAnswer}'.</h4>
        <img src=${appData[questionNumber].wrongImage} alt=${appData[questionNumber].wrongAlt} class="wrong-picture">
        <button class="next-question">-Next-</button>
    `);
    nextQuestion();
}

//the answer is right!
function quizQuestionCorrect() {
    $('button.submit-answer').css("display", "none");
    addPoint();
    feedbackCorrect();
}

//the answer is wrong!
function quizQuestionWrong() {
    $('button.submit-answer').css("display", "none");
    feedbackWrong();
}

//listen for the 'submit' button to be clicked and check if the answer is right
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

//lower the volume on the theme audio control to 35%
function lowerVolume() {
    let turnItDown = document.getElementById("office-theme");
    turnItDown.volume = 0.35;
}

//listen for the 'start' button to be clicked and load the first question
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

//after the page loads, run the startQuiz function
$(startQuiz);