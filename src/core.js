window.onload = function() {
  initialise()
  menu.drawBar()
  clickListener()
}

var canvas,   // the canvas element that the graphics are drawn onto.
    graphics  // container of graphics methods for drawing things.

var constants = {
  width: 800,             // x dimension of the screen
  height: 600,            // y dimension of the screen
  menuHeight: 30,         // how tall the menu bar should be
  menuColor: 'blue',      // the color of the menu bar
  bgColor: 'lightgrey',   // the background color for windows
  textColor: 'white',     // the text color for the majority of the GUI
  fontSize: 14,           // size of font for all GUI
  font: '14px monospace', // actual font for all GUI
  padding: 10,            // a value used for whitespace in some areas
}

/**
 * =============================================================
 * initialise():
 *   set up the constants for vws
 *   and get things ready for
 *   interaction.
 * =============================================================
 */
function initialise() {
  canvas = document.getElementById('v')
  graphics = canvas.getContext('2d')

  canvas.width = constants.width
  canvas.height = constants.height

  graphics.font = constants.font

  // there is a border around vws to distinguish it from
  // the rest of the page
  graphics.strokeRect(0, 0, constants.width, constants.height)
}

function clickListener() {
  // it's best to have one event listener on to
  // the canvas element, and feed the values of
  // the events into seperate functions once
  // certain conditions are met.
  canvas.addEventListener( 'click', function(event) {
    var x = event.clientX,
        y = event.clientY

    if (y > 0 && y < constants.menuHeight) {
      menu.clickListener(x)
    }

  })
}

