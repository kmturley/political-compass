(function() {
  var dot = document.getElementById('dot');
  var number = document.getElementById('number');
  var title = document.getElementById('title');
  var answers = document.getElementById('answers');
  var answerEls = document.querySelectorAll('.answer');
  var questions = [
    {
      flip: true,
      title: 'People need welfare support to combat inequality',
      type: 'economic',
    },
    {
      flip: false,
      title: 'Freedom of big business is better for the economy',
      type: 'economic'
    },
    {
      flip: true,
      title: 'Companies need regulating by the government',
      type: 'economic'
    },
    {
      flip: false,
      title: 'Wages are always fair, as companies will match market rates',
      type: 'economic'
    },
    {
      flip: true,
      title: 'Government may spy on citizens to combat terrorism',
      type: 'social'
    },
    {
      flip: false,
      title: 'Government should be less involved in the day to day life of its citizens',
      type: 'social'
    },
    {
      flip: true,
      title: 'Government must project strength to succeed',
      type: 'social'
    },
    {
      flip: false,
      title: 'The smaller the government, the freer the people',
      type: 'social'
    }
  ];
  var questionNum = 0;

  function setup() {
    answerEls.forEach(function(answerEl) {
      answerEl.addEventListener('click', onClick);
    });
    load(0);
  }

  function load(num) {
    console.log('questions.load', num);
    var question = questions[num];
    number.innerText = `Question ${num + 1}`;
    title.innerText = question.title;
    questionNum = num;
  }

  function onClick(e) {
    var num = Number(e.target.getAttribute('data-num'));
    console.log('questions.answer', e.target, num);
    questions[questionNum].answer = num;
    update();
    e.target.blur();
    if (questionNum < questions.length - 1) {
      answers.style.display = 'block';
      load(questionNum + 1);
    } else {
      answers.style.display = 'none';
      number.innerText = `Complete!`;
      title.innerText = 'All questions answered';
    }
  }

  function update() {
    var results = {};
    questions.forEach(function(question, index) {
      if (question.answer) {
        var average = true;
        if (!results[question.type]) {
          results[question.type] = 0;
          average = false;
        }
        if (question.flip) {
          results[question.type] = results[question.type] - question.answer;
        } else {
          results[question.type] = results[question.type] + question.answer;
        }
        if (average === true) {
          results[question.type] = results[question.type] / 2;
        }
      }
    });
    console.log('results', results);
    dot.style.left = ((results['economic'] + 1) / 2) * 100 + '%';
    dot.style.top = ((results['social'] + 1) / 2) * 100 + '%';
  }

  setup();
}());
