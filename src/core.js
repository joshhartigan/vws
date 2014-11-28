window.onload = function() {
  initialise()
  drawMenuBar()
  clickListener()
}

var canvas,   // the canvas element that the graphics are drawn onto.
    graphics  // container of graphics methods for drawing things.

var WIDTH,    // the dimensions of the
    HEIGHT    // canvas element.

var constants = {
  menuHeight: 30,         // how tall the menu bar should be
  menuColor: 'blue',      // the color of the menu bar
  textColor: 'white',     // the text color for the majority of the GUI
  fontSize: 14,           // size of font for all GUI
  font: '14px monospace', // actual font for all GUI
  padding: 10             // a value used for whitespace in some areas
}

/**
 * initialise():
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

  graphics.font = constants.font

  // there is a border around vws to distinguish it from
  // the rest of the page
  graphics.strokeRect(0, 0, WIDTH, HEIGHT)
}

var menuBar = {
  /*
  'example': {
    position: {
      start: [x-coord of where the button starts - default 0],
      end: [x-coord of where the button ends - default 0]
    },
    call: [whichever function 'example' should call]
    active: true // whether or not 'example' can be selected
  }
  */
  'open': {
    position: { start: 0, end: 0 },
    call: function() {
      alert('you can\'t open anything yet...')
    }
  },
  'help': {
    position: { start: 0, end: 0 },
    call: function() {
      alert('what?! help yourself!')
    }
  }
}

/**
 * drawMenuBar():
 *   put the menu bar on the canvas
 *   and fill it with text for each
 *   item.
 */
function drawMenuBar() {
  graphics.fillStyle = constants.menuColor
  graphics.fillRect(0, 0, WIDTH, constants.menuHeight)

  graphics.fillStyle = constants.textColor
  var textLengthSoFar = constants.padding
  for (item in menuBar) {
    graphics.fillText(item, textLengthSoFar, 20)
    menuBar[item].position.start = textLengthSoFar
    textLengthSoFar += item.length * constants.fontSize
    menuBar[item].position.end = textLengthSoFar
  }
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
      menuClickListener(x)
    }

  })
}

/**
 * menuClickListener():
 *   carry out events after clicking
 *   on the menu bar, depending on
 *   the x coord of the cursor.
 */
function menuClickListener(x) {
  for (item in menuBar) {
    if (x >= menuBar[item].position.start && x <= menuBar[item].position.end) {
      menuBar[item].call()
    }
  }
}

