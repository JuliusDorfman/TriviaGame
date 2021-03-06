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
        questions: ['THIS Russian Author of "Atlas Shrugged" said the following: \"The question isn\'t who is going to let me; it\'s who is going to stop me.\"',
            'THIS Swiss philosopher and psychoanalyst is considered the father of analytical psychology', 'The following quote: "Clean your room.", \
        is from THIS present day Canadian born philosopher and clinical psychologist.', 'THIS Prussian born philosopher is a terrible human being for reasons that need no explanation.',
            'Friedrich Nietzche is the answer to THIS question.',
            'Kinda rhymes with PLUTO',
            'THIS philosopher couldn\'t get his mind out of the gutter',
            'THIS greek born philosopher is MY favorite.'
        ],
        choices: ['Ayn Rand', 'Carl Jung', 'Jordan Peterson', 'Karl Marx', 'Friedrich Nietzche', 'Plato', 'Sigmund Freud', 'Socrates'],
        answers: []
    };


    var correctAnswers = 0;
    var wrongAnswers = 0;
    var i = interactiveBox.questions.length;


    $('#startBtn')
        .click(function() {
            init(i);
            $('#startBtn').hide();
        });


    function init() {
        console.log('init');
        clearAll();
        roundGenerator(i);
    }


    function roundGenerator(i) {
        if (i > 0) {
            $('.picture')
                .attr('src', interactiveBox.portraits[interactiveBox.questions.length - i])
            countdownTimer.questionTimer(i);
            questionsGenerator(i);
            answersGenerator(i);
            buttonAssigner(i);
            buttonHandler(i);
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
            .append(
                $('<div>')
                .text('You answered: ' + userPicked))
            .append(
                $('<div>')
                .text('That was CORRECT!'))

        winCounter();
        console.log('', correctAnswers);
        clearInterval(timer)
        countdownTimer.answerScreenTimer()
    }


    function loseScreen(userPicked) {
        $('.question-asked').empty();
        $('.answers').empty();
        $('.question-asked')
            .append(
                $('<div>')
                .text('That was INCORRECT!'))
            .append(
                $('<div>')
                .text('The correct answer was ' + answerNum1 + '.'))
        loseCounter();
        console.log('', wrongAnswers);
        clearInterval(timer)
        countdownTimer.answerScreenTimer()
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
            .append(
                $('<div>')
                .text('THANKS FOR PLAYING!'))
        clearInterval(timer)
        countdownTimer.endScreenTimer();
        clearAll();
    }


    function clearAll() {
        correctAnswers = 0;
        wrongAnswers = 0;
        i = interactiveBox.questions.length;
        $('.picture').empty();
    }


    var countdownTimer = {
        questionTimer: function() {
            var secondsLeft = 15
            countdownTimer.updateTimer(secondsLeft);

            timer = setInterval(function() {
                secondsLeft--;
                countdownTimer.updateTimer(secondsLeft);
                if (secondsLeft == 0) {
                    countdownTimer.updateTimer(secondsLeft);
                    clearInterval(timer)
                    loseScreen();
                }
            }, 1000);
        },

        updateTimer: function(secondsLeft) {
            $('.time-remaining').text(secondsLeft)
        },

        updateTimerEnd: function(secondsLeft) {
            $('.time-remaining').text(secondsLeft + ' until Game Reset')
        },

        answerScreenTimer: function(secondsLeft) {
            var secondsLeft = 4
            countdownTimer.updateTimer(secondsLeft);

            timer = setInterval(function() {
                secondsLeft--;
                countdownTimer.updateTimer(secondsLeft);
                if (secondsLeft == 0) {
                    countdownTimer.updateTimer(secondsLeft);
                    clearInterval(timer)
                    roundGenerator(--i)
                }
            }, 1000);
        },

        endScreenTimer: function() {
            var secondsLeft = 10
            countdownTimer.updateTimerEnd(secondsLeft)
            timer = setInterval(function() {
                secondsLeft--;
                countdownTimer.updateTimerEnd(secondsLeft)
                if (secondsLeft == 0) {
                    countdownTimer.updateTimerEnd(secondsLeft)
                    clearInterval(timer)
                    $('#startBtn').show();
                    $('.question-asked').empty();
                    $('.answers').empty();
                    return
                }
            }, 1000);
        }
    };
});