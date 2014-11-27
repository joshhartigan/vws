window.onload = function() {
  initialise() // line 27
  drawMenuBar() // line 40
}

var canvas,   // the canvas element that the graphics are drawn onto.
    graphics  // container of graphics methods for drawing things.

var WIDTH,    // the dimensions of the
    HEIGHT    // canvas element.

var constants = {
  menuHeight: 30,         // how tall the menu bar should be
  menuColor: 'blue',      // the color of the menu bar
  textColor: 'white',     // the text color for the majority of the GUI
  font: '14px monospace'  // the font that all GUI is written in
}

/**
 * initialise:
 *   set up the constants for vws
 *   and get things ready for
 *   interaction.
 */
function initialise() {
  canvas = document.getElementById('v')
  graphics = canvas.getContext('2d')

  WIDTH = 800
  HEIGHT = 600

  canvas.width = WIDTH
  canvas.height = HEIGHT

  // there is a border around vws to distinguish it from
  // the rest of the page
  graphics.strokeRect(0, 0, WIDTH, HEIGHT)
}

function drawMenuBar() {
  graphics.fillStyle = constants.menuColor
  graphics.fillRect(0, 0, WIDTH, constants.menuHeight)
}

