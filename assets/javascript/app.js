var triviaGame = (function () {
    'use strict'

    var gameData = {
        questionIndex: 0,
        intervalId: null,
        timeLeft: 30,
        questions: [
            {
                question: "Coming in at #10 was 'Close Encounters of the Third Kind', an extraordinary tale of unearthly visitors and the unusual effects they have on ordinary earthlings. Who directed this popular sci-fi extravaganza?",
                answers: [
                    {
                        key: "A",
                        value: "George Lucas"
                    },
                    {
                        key: "B",
                        value: "Milos Forman"
                    },
                    {
                        key: "C",
                        value: "Stanley Kubrick"
                    },
                    {
                        key: "D",
                        value: "Steven Spielberg"
                    }
                ],
                correctAnswer: "D",
                imagePath: "assets/images/close-encounters.gif"
            },
            {
                question: "At #9 on the list is 'The Matrix', a 1999 brain-in-the-box, sci-fi thriller that starred all but which of the following actors?",
                answers: [
                    {
                        key: "A",
                        value: "Keanu Reeves"
                    },
                    {
                        key: "B",
                        value: "Guy Pearce"
                    },
                    {
                        key: "C",
                        value: "Laurence Fishburne"
                    },
                    {
                        key: "D",
                        value: "Carrie-Anne Moss"
                    }
                ],
                correctAnswer: "B",
                imagePath: "assets/images/the-matrix.gif"
            },
            {
                question: "Arriving at #8 on the list was the 1953 classic 'The War of the Worlds'. Though the special effects featured in this film are now well-outdated, it nonetheless captured well the mood set in the original novel that was written by whom?",
                answers: [
                    {
                        key: "A",
                        value: "Arthur C.Clarke"
                    },
                    {
                        key: "B",
                        value: "H.G.Wells"
                    },
                    {
                        key: "C",
                        value: "Isaac Asimov"
                    },
                    {
                        key: "D",
                        value: "Jules Verne"
                    }
                ],
                correctAnswer: "B",
                imagePath: "assets/images/war-of-the-worlds.gif"
            },
            {
                question: "#7 on this top ten list is a wonderful 1951 sci-fi, adventure film that is part thriller, part moral play, namely 'The Day the Earth Stood Still'.  What is the name of the alien being in this film?",
                answers: [
                    {
                        key: "A",
                        value: "Accabwehc"
                    },
                    {
                        key: "B",
                        value: "Nikto"
                    },
                    {
                        key: "C",
                        value: "Klaatu"
                    },
                    {
                        key: "D",
                        value: "Verata"
                    }
                ],
                correctAnswer: "C",
                imagePath: "assets/images/the-day-the-earth-stood-still.gif"
            },
            {
                question: "Listed at #6 on the top ten list is the combination of the first two 'Terminator' films. In these films, cybernetic organisms called terminators travel to the past in order to kill a woman and her son. What is the last name of this mother/son pair?",
                answers: [
                    {
                        key: "A",
                        value: "Davis"
                    },
                    {
                        key: "B",
                        value: "Connor"
                    },
                    {
                        key: "C",
                        value: "Phillips"
                    },
                    {
                        key: "D",
                        value: "Anderson"
                    }
                ],
                correctAnswer: "B",
                imagePath: "assets/images/terminator.gif"
            },
            {
                question: "We now reach the top five! Which 1972 film, which was remade in a 2002 version starring George Clooney, and which was based on a novel by Stanislaw Lem, occupies the #5 position on the list?",
                answers: [
                    {
                        key: "A",
                        value: "Solaris"
                    },
                    {
                        key: "B",
                        value: "Soylent Green"
                    },
                    {
                        key: "C",
                        value: "The Andromeda Strain"
                    },
                    {
                        key: "D",
                        value: "Day of the Triffids"
                    }
                ],
                correctAnswer: "A",
                imagePath: "assets/images/solaris.gif"
            },
            {
                question: "Coming aboard at #4 we have the 1979 classic sci-fi film 'Alien'.Which actress is featured among the cast of this gruesome tale of outer space encounters with a malevolent alien race?",
                answers: [
                    {
                        key: "A",
                        value: "Jessica Lange"
                    },
                    {
                        key: "B",
                        value: "Sigourney Weaver"
                    },
                    {
                        key: "C",
                        value: "Geena Davis"
                    },
                    {
                        key: "D",
                        value: "Glenn Close"
                    }
                ],
                correctAnswer: "B",
                imagePath: "assets/images/alien-ripley.gif"
            },
            {
                question: "Down to the nitty-gritty we come. At #3 in our countdown we have another classic sci-fi series, this time the original 'Star Wars' and its sequel 'The Empire Strikes Back'. This question should not be difficult for true fans of the series: Which of these characters only appears in one of the first two films?",
                answers: [
                    {
                        key: "A",
                        value: "Chewbacca"
                    },
                    {
                        key: "B",
                        value: "C-3PO"
                    },
                    {
                        key: "C",
                        value: "Lando Calrissian"
                    },
                    {
                        key: "D",
                        value: "Obi-Wan Kenobi"
                    }
                ],
                correctAnswer: "C",
                imagePath: "assets/images/star-wars.gif"
            },
            {
                question: "The #2 movie on this list is one of the most beautiful films ever produced, namely '2001: A Space Odyssey'. What is the name of the main character in this lovely film, portrayed by Keir Dullea?",
                answers: [
                    {
                        key: "A",
                        value: "Dr.Rolf Halvorsen"
                    },
                    {
                        key: "B",
                        value: "Dr.Frank Poole"
                    },
                    {
                        key: "C",
                        value: "Dr.Dave Bowman"
                    },
                    {
                        key: "D",
                        value: "Dr.Bill Michaels"
                    }
                ],
                correctAnswer: "C",
                imagePath: "assets/images/space-oddyssey.gif"
            },
            {
                question: "And finally, the #1 sci-fi film of all-time according to this group of prominent scientists is 'Blade Runner', the futuristic drama detailing a bounty hunter's relentless pursuit of a series of androids on the lam. What is the name used for these androids in the film?",
                answers: [
                    {
                        key: "A",
                        value: "Pseudo-humans"
                    },
                    {
                        key: "B",
                        value: "Synthoids"
                    },
                    {
                        key: "C",
                        value: "Cybots"
                    },
                    {
                        key: "D",
                        value: "Replicants"
                    }
                ],
                correctAnswer: "D",
                imagePath: "assets/images/blade-runner.gif"
            },

        ]
    };

    var gameController = {
        init: function () {
            gameData.questionIndex = 0;
            uiController.displayQuestion(gameData.questions[gameData.questionIndex]);
            gameController.startTimer();
        },

        onAnswerClick: function () {
            console.log(this);
        },

        startTimer: function () {
            gameData.timeLeft = 30;
            gameData.intervalId = setInterval(gameController.countDown, 1000);
        },

        stopTimer: function () {
            clearInterval(gameData.intervalId);
        },

        countDown: function () {
            gameData.timeLeft--;

            if (gameData.timeLeft == 0) {
                gameController.stopTimer();

                if (gameData.questionIndex < gameData.questions.length) {
                    gameData.questionIndex++;
                    uiController.displayQuestion(gameData.questions[gameData.questionIndex]);
                }
            } else {
                uiController.updateTimer(gameData.timeLeft);
            }
        }
    };

    var uiController = {
        displayQuestion: function (question) {
            console.log("Display Question");
        },

        updateTimer: function (time) {
            $("#timer-text").text(time + " seconds.");
        }
    };

    gameController.init();

    // Bind the click events.
    $(".answers > li").on("click", gameController.onAnswerClick);
})();


