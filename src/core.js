window.onload = function() {
  initialise();
  menu.drawBar();
  clickListener();
  keyListener();
};

var canvas,   // the canvas element that the graphics are drawn onto.
    graphics; // container of graphics methods for drawing things.

var constants = {
  width: 800,             // x dimension of the screen
  height: 600,            // y dimension of the screen
  menuHeight: 30,         // how tall the menu bar should be
  menuColor: 'green',     // the color of the menu bar
  bgColor: '#FFFFBF',     // the background color for windows
  borderColor: 'black',   // the color for window borders
  textColor: 'black',     // the text color for the majority of the GUI
  labelUlColor: 'grey',   // the color for label underlines in windows
  fontSize: 12,           // size of font for all GUI
  font: '12px monospace', // actual font for all GUI
  padding: 10,            // a value used for whitespace in some areas
};

/**
 * =============================================================
 * initialise():
 *   set up the constants for vws
 *   and get things ready for
 *   interaction.
 * =============================================================
 */
function initialise() {
  canvas = document.getElementById('v');
  graphics = canvas.getContext('2d');

  canvas.width = constants.width;
  canvas.height = constants.height;

  graphics.font = constants.font;

  // there is a border around vws to distinguish it from
  // the rest of the page
  graphics.strokeRect(0, 0, constants.width, constants.height);
}

/**
 * =============================================================
 * clickListener():
 *   vws's different 'modules' (e.g. the menu bar)
 *   use their own click listener, so this function
 *   is the 'master' click listener that feeds into
 *   the correct listeners, dependent on mouse
 *   location.
 * =============================================================
 */
function clickListener() {
  canvas.addEventListener('click', function(event) {
    var x = event.clientX,
        y = event.clientY;

    if (y > 0 && y < constants.menuHeight) {
      menu.clickListener(x);
    }
  });

  var grabbedWindow = false,
      grabbedIndex  = null;

  canvas.addEventListener('mousedown', function(event) {
    var x = event.clientX,
        y = event.clientY;

    for (var i = 0; i < windows.array.length; i++) {
      var win = windows.array[i];
      var cursorInWindow = x > win.position.x
                        && x < win.position.x + win.width
                        && y > win.position.y
                        && y < win.position.y + win.height;
      if (cursorInWindow) {
        grabbedWindow = true;
        grabbedIndex = i;

        // make the clicked window the most recent
        // (i.e. the last item in windows.array)
        windows.array.splice(grabbedIndex, 1);
        windows.array.push(win);
      }
    }

  });

  canvas.addEventListener('mousemove', function(event) {
    if (grabbedWindow) {
      windows.moveWindow(grabbedIndex, event.clientX, event.clientY);
    }
  });

  canvas.addEventListener('mouseup', function(event) {
    if (grabbedWindow) {
      windows.drawAll();
      grabbedWindow = false;
    }
  });
}

/**
 * =============================================================
 * keyListener():
 *   the equivalent clickListener() for keys, i.e.
 *   the master 'control panel' for detecting key input.
 *   currently, the only function of this is entering text
 *   into prompt windows (win.isPrompt).
 * =============================================================
 */
function keyListener() {
  document.addEventListener('keydown', function(event) {
    // stop the browser from going back or scrolling
    if (event.which === 8 || event.which === 32) event.preventDefault();

    if (windows.array.length < 1) return;
    var win = windows.array[windows.array.length - 1];

    // is the current window an input window?
    if (!win.isPrompt) {
      return;
    }

    if (event.which === 8) { // backspace
      prompts.backspace();
    }

    else {
      prompts.enterText(event);
    }

    // lastly, draw the updated text
    windows.drawAll();
  });
}
