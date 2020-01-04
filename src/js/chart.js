(function() {
  var canvas = document.getElementById('chart');
  var context = canvas.getContext('2d');

  function setup() {
    var height = canvas.height = canvas.parentNode.clientWidth; // use width for square aspect ratio
    var width = canvas.width = canvas.parentNode.clientWidth;
    context.clearRect(0, 0, width, height);
    drawLine(
      { x: 0, y: height / 2},
      { x: width, y: height / 2}
    );
    drawLine(
      { x: width / 2, y: 0},
      { x: width / 2, y: height}
    );
  }

  function drawLine(start, end) {
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  }

  window.addEventListener('resize', function() {
    setup();
  });

  setup();
}());
