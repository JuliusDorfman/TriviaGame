$(document).ready(function() {


    var interactiveBox = {
        portraits: ['./assets/images/aynrand.jpeg',
            './assets/images/CarlJung.jpeg',
            './assets/images/JordanPeterson.jpeg',
            './assets/images/marx.jpeg',
            './assets/images/nietzche.png',
            './assets/images/plato.jpeg',
            './assets/images/sigmundfreud.jpeg',
            './assets/images/socrates.jpeg'
        ],
        questions: ['The following quote: \"The question isn\'t who is going to let me; it\'s who is going to stop me.\", \
        is from THIS Russian philosopher, an advocate for individual rights and limited government.',
            'THIS Swiss philosopher and psychoanalyst is considered the father of analytical psychology', 'The following quote: "Clean your room.", \
        is from THIS present day Canadian born philosopher and clinical psychologist.', 'THIS Prussian born philosopher is a terrible human being for reasons that need no explaination.',
            'Friedrich Nietzche is the answer to THIS question.',
            'Kinda rhymes with PLUTO',
            'THIS philosopher couldn\'t get his mind out of the gutter',
            'THIS greek born philosopher is my favorite.'
        ],
        choices: ['Ayn Rand', 'Carl Jung', 'Jordan Peterson', 'Karl Marx', 'Friedrich Nietzche', 'Plato', 'Sigmund Freud', 'Socrates'],
        answers: []
    };

    var correctAnswers = 0;
    var wrongAnswers = 0;

    $('#startBtn')
        .click(function() {
            init();
            $('#startBtn').hide();
        });

    function init() {
        console.log('init');
        roundGenerator(interactiveBox.questions.length);
    }

    function roundGenerator(i) {
        if (i > 0) {
            questionsGenerator(i);
            answersGenerator(i);
            buttonAssigner(i);
            buttonHandler(i);
            setTimeout(function() {
                roundGenerator(--i);
            }, 1200);
        } else {
            endScreen();
        }
    };

    function questionsGenerator(i) {
        $('.question-asked')
            .html(interactiveBox.questions[interactiveBox.questions.length - i])
    }

    function randomNumber(numberofChoices) {
        return Math.floor(Math.random() * (interactiveBox.choices.length))
    }

    function answersGenerator(i) {
        interactiveBox.answers = [];
        answerNum1 = interactiveBox.choices[interactiveBox.choices.length - i];
        (interactiveBox.answers).push(answerNum1);
        answerNum1String = interactiveBox.choices.indexOf(answerNum1);
        console.log('', answerNum1);
        answerNum2 = randomNumber();
        answerNum3 = randomNumber();
        answerNum4 = randomNumber();
        // REPLACE CODE BELOW WITH FUNCTION TO SEARCH THROUGH NEW ARRAY AND REPLACE THE DUPLICATES
        if ((answerNum1String !== answerNum2) && (answerNum1String !== answerNum3) &&
            (answerNum1String !== answerNum4) && (answerNum2 !== answerNum3) &&
            (answerNum2 !== answerNum4) && (answerNum3 !== answerNum4)) {
            (interactiveBox.answers).push(interactiveBox.choices[answerNum2]);
            (interactiveBox.answers).push(interactiveBox.choices[answerNum3]);
            (interactiveBox.answers).push(interactiveBox.choices[answerNum4]);
        } else {
            answersGenerator(i);
        }
        shuffleAnswers(interactiveBox.answers);
    }

    function shuffleAnswers(array) {
        var i = 0,
            j = 0,
            temp = null

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function buttonAssigner(i) {
        $('.answers').html(
            $('<container>')
            .append(
                $('<div>')
                .text(interactiveBox.answers[0])
                .addClass('btn btn-block userChoice')
                .val(interactiveBox.answers[0]))
            .append(
                $('<div>')
                .text(interactiveBox.answers[1])
                .addClass('btn btn-block userChoice')
                .val(interactiveBox.answers[1]))
            .append(
                $('<div>')
                .text(interactiveBox.answers[2])
                .addClass('btn btn-block userChoice')
                .val(interactiveBox.answers[2]))
            .append(
                $('<div>')
                .text(interactiveBox.answers[3])
                .addClass('btn btn-block userChoice')
                .val(interactiveBox.answers[3]))
        );
    }

    function buttonHandler(i) {
        var answerMatch = false;
        var hasChosen = 0;
        $('.userChoice').on('click', function() {
            if (hasChosen == 0) {
                hasChosen = 1
                var userPicked = $(this).prop('value')
                if (userPicked == answerNum1) {
                    answerMatch = true;
                    console.log('', answerMatch);
                    winScreen(userPicked);
                } else {
                    console.log('', answerMatch);
                    loseScreen(userPicked);
                }
            }
        });
    }

    function winScreen(userPicked) {
        $('.question-asked').empty();
        $('.answers').empty();
        $('.question-asked')
            .html('Answer: ' + userPicked)
        winCounter();
        console.log('', correctAnswers);
    }

    function loseScreen(userPicked) {
        $('.question-asked').empty();
        $('.answers').empty();
        $('.question-asked')
            .text('Incorrect!')
            .text('Answer: ' + userPicked)
        loseCounter();
        console.log('', wrongAnswers);
    }

    function winCounter() {
        correctAnswers += 1;
    }

    function loseCounter() {
        wrongAnswers += 1;
    }

    function endScreen() {
        $('.question-asked').empty();
        $('.answers').empty();
        $('.question-asked')
            .append(
                $('<div>')
                .text('You answered ' + correctAnswers + ' questions correctly!'))
            .append(
                $('<div>')
                .text('You got ' + wrongAnswers + ' incorrect!'))
        return
    }
});


// Stopwatching



// how to not pick the same random answer per round





// window.onload = function() {

//     $("#lap").click(stopwatch.recordLap);
//     $("#stop").click(stopwatch.stop);
//     $("#reset").click(stopwatch.reset);
//     $("#start").click(stopwatch.start);
// };

// var intervalId;

// var clockRunning = false;

// var stopwatch = {

//         time: 0,
//         lap: 1,

//         reset: function() {

//             stopwatch.time = 0;
//             stopwatch.lap = 1;
//             $('#display').html('<div>00:00</div')

//         },   

//         start: function() {

//             $('#display').setInterval(intervalId, startTime * 1000)




//         }

//     },

//     recordLap: function() {

//     },
//     count: function() {

//         startTime++;

//     },

//     timeConverter: function(t) {

//         var minutes = Math.floor(t / 60);
//         var seconds = t - (minutes * 60);

//         if (seconds < 10) {
//             seconds = "0" + seconds;
//         }

//         if (minutes === 0) {
//             minutes = "00";
//         } else if (minutes < 10) {
//             minutes = "0" + minutes;
//         }

//         return minutes + ":" + seconds;
//     }
// };