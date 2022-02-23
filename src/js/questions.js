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
  var questionNum = 1;

  function setup() {
    window.addEventListener('hashchange', onHash);
    answerEls.forEach(function(answerEl) {
      answerEl.addEventListener('click', onClick);
    });
    onHash();
  }

  function load(num) {
    console.log('questions.load', num);
    var question = questions[num - 1];
    number.innerText = `Question ${num}`;
    title.innerText = question.title;
    questionNum = num;
  }

  function onClick(e) {
    var num = Number(e.target.getAttribute('data-num'));
    console.log('questions.answer', questionNum, '=', num);
    questions[questionNum - 1].answer = num;
    e.target.blur();
    updateChart();
    if (questionNum < questions.length) {
      answers.style.display = 'flex';
      window.location.hash = questionNum + 1;
    } else {
      answers.style.display = 'none';
      number.innerText = `Complete!`;
      title.innerText = 'All questions answered';
    }
  }

  function onHash() {
    var num = Number(window.location.hash.slice(1));
    if (num) {
      load(num);
    } else {
      reset();
      updateChart();
      load(1);
    }
  }

  function reset() {
    answers.style.display = 'flex';
    questions.forEach(function(question) {
      delete question.answer;
    });
    console.log(questions);
  }

  function updateChart() {
    var results = {
      economic: {
        matches: 0,
        score: 0
      },
      social: {
        matches: 0,
        score: 0
      }
    };
    questions.forEach(function(question) {
      if (question.answer) {
        if (question.flip) {
          results[question.type].score = results[question.type].score - question.answer;
        } else {
          results[question.type].score = results[question.type].score + question.answer;
        }
        results[question.type].matches += 1;
      }
    });
    var economic = results['economic'].score / (results['economic'].matches || 1);
    var social = results['social'].score / (results['social'].matches || 1);
    console.log('questions', questions);
    console.log('results', results);
    console.log('economic', economic);
    console.log('social', social);
    dot.style.left = ((economic + 1) / 2) * 100 + '%';
    dot.style.top = ((social + 1) / 2) * 100 + '%';
  }

  setup();
}());
