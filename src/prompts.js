/* namespace */ var prompts = {};

// NOTE: the functions don't take an `index` because they will
//       always be concerning the active window. (see the first
//       line of enterText() or backspace() for an example of
//       how this is managed)

/**
 * =============================================================
 * enterText():
 *   in this context, the `event` is the 'keypress' event from
 *   an event listener.
 * =============================================================
 */
prompts.enterText = function(event) {
  var win = windows.array[windows.array.length - 1];

  // is the key a letter?
  if (event.which >= 65 && event.which <= 90) {
    if (prompts.isLineFull()) win.input += "\n";
    win.input += String.fromCharCode(event.which).toLowerCase();
  }

  // is the key a spacebar?
  if (event.which === 32) {
    if (prompts.isLineFull()) win.input += "\n";
    win.input += ' ';
  }
}

/**
 * =============================================================
 * backspace():
 *   deletes the most recent character in the window's input
 * =============================================================
 */
prompts.backspace = function() {
  var win = windows.array[windows.array.length - 1];
  win.input = win.input.slice(0, -1);
}

/**
 * =============================================================
 * isLineFull():
 *   is the most bottom-most line of the given prompt window
 *   full?
 * =============================================================
 */
prompts.isLineFull = function() {
  var win = windows.array[windows.array.length - 1];
  var lines = win.input.split("\n");
  var line = lines[lines.length - 1];

  return line.length === win.maxInputLength;
}
