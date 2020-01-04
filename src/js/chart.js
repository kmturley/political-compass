(function() {
  var canvas = document.getElementById('chart');
  var context = canvas.getContext('2d');
  var textHeight = 0;

  function setup() {
    var height = canvas.height = canvas.parentNode.clientWidth; // use width for square aspect ratio
    var width = canvas.width = canvas.parentNode.clientWidth;
    var padding = 100;
    context.clearRect(0, 0, width, height);
    context.font = '16px sans-serif';
    textHeight = context.measureText('M').width;
    drawGrid(width, height, 40, padding, '#eee', 1);
    drawGrid(width, height, 10, padding, '#eee', 2);
    drawLine(
      { x: padding, y: height / 2},
      { x: width - padding, y: height / 2}
    );
    drawLine(
      { x: width / 2, y: padding},
      { x: width / 2, y: height - padding}
    );
    var labels = [
      { text: 'Communism', horizontal: 'left', vertical: 'top', x: 0, y: 0 },
      { text: 'Authoritarianism', horizontal: 'center',vertical: 'top', x: width / 2, y: 0 },
      { text: 'Fascism', horizontal: 'right', vertical: 'top', x: width, y: 0 },
      { text: 'Socialism', horizontal: 'left', vertical: 'middle', x: 0, y: height / 2 },
      // { text: 'Centerism', horizontal: 'center', vertical: 'middle', x: width / 2, y: height / 2 },
      { text: 'Capitalism', horizontal: 'right', vertical: 'middle', x: width, y: height / 2 },
      { text: 'Collectivism', horizontal: 'left', vertical: 'bottom', x: 0, y: height },
      { text: 'Libertarianism', horizontal: 'center', vertical: 'bottom', x: width / 2, y: height },
      { text: 'Individualism', horizontal: 'right', vertical: 'bottom', x: width, y: height },
    ];
    labels.forEach(function(label) {
      drawText(label, padding);
    });
  }

  function drawGrid(bw, bh, lines, pad, color, lineWidth) {
    var gap = (bw - (pad * 2)) / lines;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    for (var x = pad; x <= bw - pad; x += gap) {
      context.moveTo(x, pad);
      context.lineTo(x, bh - pad);
    }
    for (var y = pad; y <= bh - pad; y += gap) {
      context.moveTo(pad, y);
      context.lineTo(bw - pad, y);
    }
    context.stroke();
    context.closePath();
  }

  function drawLine(start, end) {
    context.beginPath();
    context.strokeStyle = '#333';
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
    context.closePath();
  }

  function drawText(item, pad) {
    var textWidth = context.measureText(item.text).width;
    if (item.horizontal === 'center') {
      item.x -= textWidth / 2;
    }
    if (item.horizontal === 'right') {
      item.x -= textWidth;
    }
    if (item.vertical === 'top') {
      item.y += pad - textHeight;
    }
    if (item.vertical === 'middle') {
      item.y += textHeight / 2;
    }
    if (item.vertical === 'bottom') {
      item.y -= pad - textHeight * 2;
    }
    // var padding = 10;
    // context.fillStyle = '#fff';
    // context.fillRect(item.x - padding, item.y - textHeight - padding, textWidth + (padding * 2), textHeight + (padding * 2));
    context.fillStyle = '#454545';
    context.fillText(item.text, item.x, item.y);
  }

  window.addEventListener('resize', function() {
    setup();
  });

  setup();
}());
