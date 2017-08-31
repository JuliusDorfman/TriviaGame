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
        if (i <= 0) return;
        setTimeout(function() {
            questionsGenerator(i);
            answersGenerator();
            choicesPusher(i);
            roundGenerator(--i);
        }, 800);
    };

    function questionsGenerator(i) {
        $('.question-asked')
            .html(interactiveBox.questions[interactiveBox.questions.length - i])
    }

    function randomNumber(numberofChoices) {
        return Math.floor(Math.random() * (interactiveBox.choices.length))
    }

    function answersGenerator() {
        interactiveBox.answers = [];
        answerNum1 = randomNumber();
        answerNum2 = randomNumber();
        answerNum3 = randomNumber();
        answerNum4 = randomNumber();
        console.log('', answerNum1);
        console.log('', answerNum2);
        console.log('', answerNum3);
        console.log('', answerNum4);
        if ((answerNum1 !== answerNum2) && (answerNum1 !== answerNum3) &&
            (answerNum1 !== answerNum4) && (answerNum2 !== answerNum3) &&
            (answerNum2 !== answerNum4) && (answerNum3 !== answerNum4)) {
            (interactiveBox.answers).push(interactiveBox.choices[answerNum1]);
            (interactiveBox.answers).push(interactiveBox.choices[answerNum2]);
            (interactiveBox.answers).push(interactiveBox.choices[answerNum3]);
            (interactiveBox.answers).push(interactiveBox.choices[answerNum4]);
            console.log('', interactiveBox.answers);
        } else {
            answersGenerator();
        }
    }

    function choicesPusher(i) {
        $('.answers').html(
            $('<container>')
            .append(
                $('<div>').text(interactiveBox.choices[interactiveBox.choices.length - i]))
            .append(
                $('<div>').text(interactiveBox.answers[0]))
            .append(
                $('<div>').text(interactiveBox.answers[1]))
            .append(
                $('<div>').text(interactiveBox.answers[2]))
        );
    }


});



// USE .appending
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