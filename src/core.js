window.onload = function() {
  initialise()
  drawMenuBar()
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

var menuBar = { // {{{
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
  'close': {
    position: { start: 0, end: 0 },
    call: function() {
      windows.splice(windows.length - 1, 1)
      drawWindows()
    }
  },
  'open': {
    position: { start: 0, end: 0 },
    call: function() { createWindow(
      10, 40, 600, 240,
      'a window',
      [ 'a window has been',
        'opened up onto your',
        'screen. that\'s it.' ]
    ); drawWindows() }
  },
  'help': {
    position: { start: 0, end: 0 },
    call: function() { createWindow(
      (constants.width / 2) - 100,
      (constants.height / 2) - 50,
      200,
      100,
      'help',
      [ 'i cannot help you.',
        'there is no help left',
        'in this world.',
        'goodbye.' ]
    ); drawWindows() }
  }
} // }}}

/**
 * =============================================================
 * drawMenuBar():
 *   put the menu bar on the canvas
 *   and fill it with text for each
 *   item.
 * =============================================================
 */
function drawMenuBar() {
  graphics.fillStyle = constants.menuColor
  graphics.fillRect(0, 0, constants.width, constants.menuHeight)

  graphics.fillStyle = constants.textColor
  var textLengthSoFar = constants.padding
  for (item in menuBar) {
    graphics.fillText(item, textLengthSoFar, 20)
    menuBar[item].position.start = textLengthSoFar
    textLengthSoFar += item.length * constants.fontSize
    menuBar[item].position.end = textLengthSoFar
  }
}

var windows = [
  /*
  example: {
    position: {
      xPos: [x-coord of top-left corner],
      yPos: [y-coord of top-left corner]
    },
    size: {
      width: [width in pixels],
      height: [height in pixels]
    },
    titlestr: [the title of the window],
    lines: [an array of lines of text to be written]
  }
  */
]

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
 * =============================================================
 * menuClickListener():
 *   carry out events after clicking
 *   on the menu bar, depending on
 *   the x coord of the cursor.
 * =============================================================
 */
function menuClickListener(x) {
  for (item in menuBar) {
    if (x >= menuBar[item].position.start && x <= menuBar[item].position.end) {
      menuBar[item].call()
    }
  }
}

/**
 * =============================================================
 * createWindow():
 *   forms a window object from the
 *   arguments supplied, and adds it
 *   to the `windows` array.
 * =============================================================
 */
function createWindow(xPos, yPos, width, height, titlestr, lines) {
  for (var i = 0; i < windows.length; i++) {
    if (windows[i].titlestr === titlestr) {
      windows.splice(i, 1)
    }
  }

  windows.push({
    position: {
      x: xPos,
      y: yPos
    },
    size: {
      width: width,
      height: height
    },
    titlestr: titlestr,
    lines: lines
  })
}

/**
 * =============================================================
 * drawWindows():
 *   draw all of the windows
 *   from the `windows` array
 *   onto the screen
 * =============================================================
 */
function drawWindows() {
  // clear screen
  graphics.fillStyle = 'white'
  graphics.fillRect(1, constants.menuHeight,
                    constants.width - 2, constants.height - constants.menuHeight - 1)

  for (var i = 0; i < windows.length; i++) {
    // draw window background
    graphics.fillStyle = constants.bgColor
    graphics.fillRect(windows[i].position.x, windows[i].position.y,
                      windows[i].size.width, windows[i].size.height)
    // draw window outline
    graphics.fillStyle = 'black'
    graphics.strokeRect(windows[i].position.x, windows[i].position.y,
                      windows[i].size.width, windows[i].size.height)
    // draw window title
    graphics.fillText(windows[i].titlestr,
                      windows[i].position.x + 10,
                      windows[i].position.y + 17)
    // draw title underline
    graphics.strokeStyle = 'grey'
    graphics.strokeRect(windows[i].position.x,
                        windows[i].position.y + constants.fontSize + 8,
                        windows[i].size.width,
                        0)
    // draw window text content
    for (var j = 0; j < windows[i].lines.length; j++) {
      graphics.fillText(
        windows[i].lines[j],
        windows[i].position.x + 10,
        windows[i].position.y + 22 + ((j + 1) * constants.fontSize)
      )
    }
  }
}
