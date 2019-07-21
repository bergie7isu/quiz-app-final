let questionNumber = 0;




function displayNextQuestion() {
    $(".js-question").append(`<div class="quiz-question">${appData[questionNumber].question}</div>`);
}

function displayNextAnswer() {
    $(".js-answers").append(`
        <form>
            <input type="radio" name="multi-choice">${appData[questionNumber].answers[0]}<br>
            <input type="radio" name="multi-choice">${appData[questionNumber].answers[1]}<br>
            <input type="radio" name="multi-choice">${appData[questionNumber].answers[2]}<br>
            <input type="radio" name="multi-choice">${appData[questionNumber].answers[3]}
        </form>`);
}

//start the quiz
//remove the main title and subtitle
//show the nav bar
//change the start button into the submit button
//display the first question and answer options
function startQuiz() {
    $('.js-start-quiz').click(function(event) {
        $("h1").remove();
        $("p.teaser").remove();
        $(this).remove();
        $(".js-submit-answer").css("display", "block");
        $("nav").css("background-color", "black");
        $("nav div").css("display", "inline-block");
        displayNextQuestion();
        displayNextAnswer();
    });
}








function loadQuizApp() {
    startQuiz();
}

$(loadQuizApp);