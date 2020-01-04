(function() {
  var canvas = document.getElementById('chart');
  var context = canvas.getContext('2d');
  var textHeight = 0;

  function setup() {
    var height = canvas.height = canvas.parentNode.clientWidth; // use width for square aspect ratio
    var width = canvas.width = canvas.parentNode.clientWidth;
    context.clearRect(0, 0, width, height);
    context.font = '16px sans-serif';
    textHeight = context.measureText('M').width;
    drawLine(
      { x: 0, y: height / 2},
      { x: width, y: height / 2}
    );
    drawLine(
      { x: width / 2, y: 0},
      { x: width / 2, y: height}
    );
    var labels = [
      { text: 'Communism', horizontal: 'left', vertical: 'top', x: 0, y: 0 },
      { text: 'Authoritarianism', horizontal: 'center',vertical: 'top', x: width / 2, y: 0 },
      { text: 'Fascism', horizontal: 'right', vertical: 'top', x: width, y: 0 },
      { text: 'Socialism', horizontal: 'left', vertical: 'middle', x: 0, y: height / 2 },
      { text: 'Centerism', horizontal: 'center', vertical: 'middle', x: width / 2, y: height / 2 },
      { text: 'Capitalism', horizontal: 'right', vertical: 'middle', x: width, y: height / 2 },
      { text: 'Collectivism', horizontal: 'left', vertical: 'bottom', x: 0, y: height },
      { text: 'Libertarianism', horizontal: 'center', vertical: 'bottom', x: width / 2, y: height },
      { text: 'Individualism', horizontal: 'right', vertical: 'bottom', x: width, y: height },
    ];
    labels.forEach(function(label) {
      drawText(label);
    });
  }

  function drawLine(start, end) {
    context.fillStyle = '#000';
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  }

  function drawText(item) {
    var padding = 10;
    var textWidth = context.measureText(item.text).width;
    console.log('drawText', textWidth, textHeight);
    if (item.horizontal === 'center') {
      item.x -= textWidth / 2;
    }
    if (item.horizontal === 'right') {
      item.x -= textWidth;
    }
    if (item.vertical === 'top') {
      item.y += textHeight;
    }
    if (item.vertical === 'middle') {
      item.y += textHeight / 2;
    }
    context.fillStyle = '#fff';
    context.fillRect(item.x - padding, item.y - textHeight - padding, textWidth + (padding * 2), textHeight + (padding * 2));
    context.fillStyle = '#000';
    context.fillText(item.text, item.x, item.y);
  }

  window.addEventListener('resize', function() {
    setup();
  });

  setup();
}());
