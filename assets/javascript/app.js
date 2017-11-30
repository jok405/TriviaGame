

//End user selection .on(click) trigger for starting/answering/restarting game
$(document).on('click', '#start', function(action) {
  $('#game-Window').prepend('<br>Time Remaining: <span id="counter-number">10</span> Seconds<br>');
  trivia.startingQuestion();//starting timer works!
});

$(document).on('click', '.answer-button', function(action) {
  trivia.clicked(action);
});

$(document).on('click', '#start-over', function(action) {
  trivia.reset();
});

var quizzy = $('#quizzy'); //////////////////////
var secondsRemaining = 10;//deducting timer 
var trivia = {
  topQuestion:0,
  correct:0,
  wrong:0,

// the count down function for each series of 7 questions
  countdown: function(){ //anon function establishing timer
    trivia.counter--;
    $('#counter-number').html(trivia.counter); //displays counter in html

    if (trivia.counter === 0){
      console.log('Time is up!');//displays once time expires
      trivia.timeUp();
    }
  },

  startingQuestion: function(){//begins the game and the timer: anon function used
    timer = setInterval(trivia.countdown, 1000); // timer set to 10 seconds
    quizzy.html(questions[this.topQuestion].question); //executing display of trivia question

//re-coded for loop containing another variable and used this as a template for the remaining executions
//refering to w3 JS best practices under optimize loops section
    for (var i = 0; i<questions[this.topQuestion].answers.length; i++){ //condensed the for loop
      quizzy.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.topQuestion].answers[i] + '">' + questions[this.topQuestion].answers[i]+ '</button>');
    }
  },

  nextQuestion: function(){// function used to present next question
    trivia.counter = secondsRemaining;// game timer
    $('#counter-number').html(trivia.counter);// display of game timer
    trivia.topQuestion++; //tally of questions 
    trivia.startingQuestion();//starting 
  },

  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(trivia.counter);//displays timer
    quizzy.html("<br>Time is Up!<br>");//displays when user runs out of time
    quizzy.append("<br>The Correct Answer is: " + questions[this.topQuestion].correctAnswer + "<br>"); // triggers display of correct answer

//if, else statement progression to the next question
    if (trivia.topQuestion === questions.length - 1){
      setTimeout(trivia.results, 1 * 1000);
    } else {
      setTimeout(trivia.nextQuestion, 1 * 1000);
    }
  },

  clicked: function(action) {
    clearInterval(timer);

    if ($(action.target).data("name") === questions[this.topQuestion].correctAnswer){
      this.rightyy();
    } else {
      this.wrongly();
    }
  },

  rightyy: function(){
    clearInterval(timer);
    trivia.correct++; //adds tally to correct answer
    quizzy.html("<br>Correct!<br>"); //diplays message


    if (trivia.topQuestion === questions.length - 1){
      setTimeout(trivia.results, 1 * 1000);
      } else {
      setTimeout(trivia.nextQuestion, 1 * 1000);
    }
  },

  wrongly: function() {
    clearInterval(timer);
    trivia.wrong++; //adds tally to incorrect answer
    quizzy.html("<br>Nope!<br>"); //displays message
    quizzy.append("<br>The Correct Answer is: " + questions[trivia.topQuestion].correctAnswer + "<br>"); //triggers the display of correct answer

    if (trivia.topQuestion === questions.length - 1){
      setTimeout(trivia.results, 1 * 1000);
    } else {
      setTimeout(trivia.nextQuestion, 1 * 1000);
    }
  },



  results: function() {
  clearInterval(timer);

  quizzy.html("Completed!, Your results!");
  $('#counter-number').html(trivia.counter);
  quizzy.append("<br>Correct: " + trivia.correct);
  quizzy.append("<br>Wrong: " + trivia.wrong);
  quizzy.append("<br>Unanswered: " + (questions.length - (trivia.correct + trivia.wrong)));
  quizzy.append('<br><button id="start-over">Another Attempt?</button>');
  },


//starting a new game and resets timer and answer tally
  reset: function(){
    this.topQuestion = 0;
    this.correct = 0;
    this.wrong = 0;
    this.startingQuestion(); //function allows for restart of game
  }
};


//Questions and array answer set 

var questions = [{
  question: "1. After the first battle what level does Cloud level up to ?",
  answers: ["Level 1", "Level 4", "Level 8", "Level 7"],
  correctAnswer: "Level 7"
}, {
  question: "2. What is Tifa's bar called?",
  answers: ["Mako Reactor", "7th Heaven", "Shinra's Corner", "Side Pocket"],
  correctAnswer: "7th Heaven"
}, {
  question: "3. How many areas of attractions are there at the Gold Saucer?",
  answers: ["Two", "Four", "Six","Seven"],
  correctAnswer: "Seven"
}, {
  question: "4. You can search for treasures in the Ancient Forest. How many are there?",
  answers: ["Four", "Five", "Seven", "Nine"],
  correctAnswer: "Seven"
}, {
  question: "5. How many playable characters does the game have?",
  answers: ["Three", "Five", "Seven", "Nine"],
  correctAnswer: "Nine"
}, {
  question: "6. Which character has the least amount of different limit breaks?",
  answers: ["Red XIII", "Vincent", "Cait Sith", "Aerith"],
  correctAnswer: "Cait Sith"
}, {
  question: "7. Which character dies in the game?",
  answers: ["Aerith", "Sephorith", "Vincent", "Barret"],
  correctAnswer: "Aerith"
}];


//var beepOne = $("#beep-one")[0];
//$("#beep-select-sound")
//  .mouseenter(function()) {
 //   beepOne.play();
 // });

//var rimShotAudio = document.getElementById('beep-one');

//function playRim() {
//  rimShotAudio.play();
//}
//item.addEventListener('mouseover', rimShotAudio.playRim, false);
