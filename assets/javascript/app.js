var triviaGame = (function () {
    'use strict'


    var gameController = {

        // initialize the game state
        init: function () {
            gameData.inProgress - false;
            gameData.questionIndex = 0;
            uiController.updateUI("info", gameData.messages.initial);
            uiController.updateUI("image", gameData.openingGIF, true);
            uiController.updateQuestion(null, false);
        },

        // handle clicks on the answers
        onAnswerClick: function () {
            console.log(this);
        },

        // On document click, begin the game.
        onDocumentClick: function () {
            if (gameData.inProgress) {
                return;
            }

            gameController.loadNextQuestion();
            gameData.inProgress = true;
        },

        // Method to start the countdown timer.
        startTimer: function () {
            gameData.timeLeft = 30;
            gameData.intervalId = setInterval(gameController.countDown, 1000);
        },

        // Method to stop the countdown timer.
        stopTimer: function () {
            clearInterval(gameData.intervalId);
        },

        // Method to handle the countdown ticks.
        countDown: function () {
            gameData.timeLeft--;

            // if the counter reaches zero stop the countdown
            if (gameData.timeLeft == 0) {
                gameController.stopTimer();

                //handle the failure to answer.
                //TODO: function call

                if (gameData.questionIndex < gameData.questions.length) {
                    setTimeout(uiController.loadNextQuestion, 3000);
                }
            }

            uiController.updateUI("timer", gameData.timeLeft);
        },

        // Method to load the next question in the play area.
        loadNextQuestion: function () {
            if (gameData.inProgress) {
                gameData.questionIndex++;
            }

            uiController.updateUI("image", "", false);
            uiController.updateUI("timer", gameData.timeLeft, true);
            uiController.updateUI("info", gameData.messages.instructions);
            uiController.updateQuestion(gameData.questions[gameData.questionIndex], true);
            gameController.startTimer();
        },

        // Method to randomize the order of an array so we can change up the answers.
        randomizeArray: function (array) {
            var newArr = [];
            while(array.length > 1) {
                var randomIndex = Math.floor(Math.random() * array.length);
                newArr.push(array[randomIndex]);
                array.splice(randomIndex, 1);
            }

            newArr.push(array[0]);
            return newArr;
        }
    };

    var uiController = {

        // Mthod for displaying the question and answers
        updateQuestion: function (question, show) {
            if (question) {
                $("#question-text").text(question.text);

                console.log(question);

                // Randomize the answer order.
                var answers = gameController.randomizeArray(question.answers);

                // Update the answers.
                $("#answer-a").children("span").text(answers[0].value);
                $("#answer-a").val(answers[0].key);
                $("#answer-b").children("span").text(answers[1].value);
                $("#answer-b").val(answers[1].key);
                $("#answer-c").children("span").text(answers[2].value);
                $("#answer-c").val(answers[2].key);
                $("#answer-d").children("span").text(answers[3].value);
                $("#answer-d").val(answers[3].key);

            }

            if (show !== undefined) {
                $(".row.question").toggleClass("hidden", !show);
            }
        },

        // Use this for the elements other than the question section
        updateUI: function (item, value, show) {
            var $section;
            switch (item) {
                case "score":
                    $section = $(".row.score");
                    $("#score-text").text(value);
                    break;
                case "info":
                    $section = $(".row.info");
                    $("#info-text").html(value);
                    break;
                case "timer":
                    $section = $(".row.timer");
                    $("#timer-text").text(value);
                    break;
                case "image":
                    $section = $(".row.image");
                    $(".card-img").attr("src", value);
                    break;
            }

            if (show !== undefined) {
                $section.toggleClass("hidden", !show);
            }
        } 



    };

    // data construct to store questions and the variables needed to manage teh game state.
    var gameData = {
        inProgress: false,
        questionIndex: 0,
        intervalId: null,
        timeLeft: 30,
        openingGIF: "assets/images/sci-fi-zoom.gif",
        messages: {
            initial: "This is a quiz based on the top 10 sci-fi movies of all time as determined by a panel of scientists consulted by The Guardian newspaper. Click anywhere to start the quiz!",
            instructions: "Click one of the answers to make a guess. You have 30 seconds. Good luck!",
            correctAnswer: "{0} is the correct answer!",
            incorrectAnswer: "Sorry, the correct answer is {0}.",
            timeIsUp: "You ran out of time.  the correct answer is {0}.",
        },
        questions: [
            {
                text: "Coming in at #10 was 'Close Encounters of the Third Kind', an extraordinary tale of unearthly visitors and the unusual effects they have on ordinary earthlings. Who directed this popular sci-fi extravaganza?",
                correctAnswer: "D",
                imagePath: "assets/images/close-encounters.gif",
                answers: [
                    {
                        key: "1",
                        value: "George Lucas"
                    },
                    {
                        key: "2",
                        value: "Milos Forman"
                    },
                    {
                        key: "3",
                        value: "Stanley Kubrick"
                    },
                    {
                        key: "4",
                        value: "Steven Spielberg"
                    }
                ]
            },
            {
                text: "At #9 on the list is 'The Matrix', a 1999 brain-in-the-box, sci-fi thriller that starred all but which of the following actors?",
                correctAnswer: "B",
                imagePath: "assets/images/the-matrix.gif",
                answers: [
                    {
                        key: "1",
                        value: "Keanu Reeves"
                    },
                    {
                        key: "2",
                        value: "Guy Pearce"
                    },
                    {
                        key: "3",
                        value: "Laurence Fishburne"
                    },
                    {
                        key: "4",
                        value: "Carrie-Anne Moss"
                    }
                ]
            },
            {
                text: "Arriving at #8 on the list was the 1953 classic 'The War of the Worlds'. Though the special effects featured in this film are now well-outdated, it nonetheless captured well the mood set in the original novel that was written by whom?",
                correctAnswer: "B",
                imagePath: "assets/images/war-of-the-worlds.gif",
                answers: [
                    {
                        key: "1",
                        value: "Arthur C.Clarke"
                    },
                    {
                        key: "2",
                        value: "H.G.Wells"
                    },
                    {
                        key: "3",
                        value: "Isaac Asimov"
                    },
                    {
                        key: "4",
                        value: "Jules Verne"
                    }
                ]
            },
            {
                text: "#7 on this top ten list is a wonderful 1951 sci-fi, adventure film that is part thriller, part moral play, namely 'The Day the Earth Stood Still'.  What is the name of the alien being in this film?",
                correctAnswer: "C",
                imagePath: "assets/images/the-day-the-earth-stood-still.gif",
                answers: [
                    {
                        key: "1",
                        value: "Accabwehc"
                    },
                    {
                        key: "2",
                        value: "Nikto"
                    },
                    {
                        key: "3",
                        value: "Klaatu"
                    },
                    {
                        key: "4",
                        value: "Verata"
                    }
                ]
            },
            {
                text: "Listed at #6 on the top ten list is the combination of the first two 'Terminator' films. In these films, cybernetic organisms called terminators travel to the past in order to kill a woman and her son. What is the last name of this mother/son pair?",
                correctAnswer: "B",
                imagePath: "assets/images/terminator.gif",
                answers: [
                    {
                        key: "1",
                        value: "Davis"
                    },
                    {
                        key: "2",
                        value: "Connor"
                    },
                    {
                        key: "3",
                        value: "Phillips"
                    },
                    {
                        key: "4",
                        value: "Anderson"
                    }
                ]
            },
            {
                text: "We now reach the top five! Which 1972 film, which was remade in a 2002 version starring George Clooney, and which was based on a novel by Stanislaw Lem, occupies the #5 position on the list?",
                correctAnswer: "A",
                imagePath: "assets/images/solaris.gif",
                answers: [
                    {
                        key: "1",
                        value: "Solaris"
                    },
                    {
                        key: "2",
                        value: "Soylent Green"
                    },
                    {
                        key: "3",
                        value: "The Andromeda Strain"
                    },
                    {
                        key: "4",
                        value: "Day of the Triffids"
                    }
                ]
            },
            {
                text: "Coming aboard at #4 we have the 1979 classic sci-fi film 'Alien'.Which actress is featured among the cast of this gruesome tale of outer space encounters with a malevolent alien race?",
                correctAnswer: "B",
                imagePath: "assets/images/alien-ripley.gif",
                answers: [
                    {
                        key: "1",
                        value: "Jessica Lange"
                    },
                    {
                        key: "2",
                        value: "Sigourney Weaver"
                    },
                    {
                        key: "3",
                        value: "Geena Davis"
                    },
                    {
                        key: "4",
                        value: "Glenn Close"
                    }
                ]
            },
            {
                text: "Down to the nitty-gritty we come. At #3 in our countdown we have another classic sci-fi series, this time the original 'Star Wars' and its sequel 'The Empire Strikes Back'. This question should not be difficult for true fans of the series: Which of these characters only appears in one of the first two films?",
                correctAnswer: "C",
                imagePath: "assets/images/star-wars.gif",
                answers: [
                    {
                        key: "1",
                        value: "Chewbacca"
                    },
                    {
                        key: "2",
                        value: "C-3PO"
                    },
                    {
                        key: "3",
                        value: "Lando Calrissian"
                    },
                    {
                        key: "4",
                        value: "Obi-Wan Kenobi"
                    }
                ]
            },
            {
                text: "The #2 movie on this list is one of the most beautiful films ever produced, namely '2001: A Space Odyssey'. What is the name of the main character in this lovely film, portrayed by Keir Dullea?",
                correctAnswer: "C",
                imagePath: "assets/images/space-oddyssey.gif",
                answers: [
                    {
                        key: "1",
                        value: "Dr.Rolf Halvorsen"
                    },
                    {
                        key: "2",
                        value: "Dr.Frank Poole"
                    },
                    {
                        key: "3",
                        value: "Dr.Dave Bowman"
                    },
                    {
                        key: "4",
                        value: "Dr.Bill Michaels"
                    }
                ]
            },
            {
                text: "And finally, the #1 sci-fi film of all-time according to this group of prominent scientists is 'Blade Runner', the futuristic drama detailing a bounty hunter's relentless pursuit of a series of androids on the lam. What is the name used for these androids in the film?",
                answers: [
                    {
                        key: "1",
                        value: "Pseudo-humans"
                    },
                    {
                        key: "2",
                        value: "Synthoids"
                    },
                    {
                        key: "3",
                        value: "Cybots"
                    },
                    {
                        key: "4",
                        value: "Replicants"
                    }
                ],
                correctAnswer: "D",
                imagePath: "assets/images/blade-runner.gif"
            },

        ]
    };

    // Bind the click events.
    $(".answers > li").on("click", gameController.onAnswerClick);
    $(document).on("click", gameController.onDocumentClick);

    gameController.init();

})();


