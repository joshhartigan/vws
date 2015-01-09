/* namespace */ var menu = {}

menu.bar = {
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
      windows.array.splice(windows.array.length - 1, 1)
      windows.drawAll()
    }
  },
  'open': {
    position: { start: 0, end: 0 },
    call: function() { windows.createWindow(
      10, 40, 600, 240,
      'a window',
      [ 'a window has been',
        'opened up onto your',
        'screen. that\'s it.' ]
    ); windows.drawAll() }
  },
  'help': {
    position: { start: 0, end: 0 },
    call: function() { windows.createWindow(
      (constants.width / 2) - 100,
      (constants.height / 2) - 50,
      200,
      100,
      'help',
      [ 'i cannot help you.',
        'there is no help left',
        'in this world.',
        'goodbye.' ]
    ); windows.drawAll() }
  }
}

/**
 * =============================================================
 * drawBar():
 *   put the menu bar on the canvas
 *   and fill it with text for each
 *   item.
 * =============================================================
 */
menu.drawBar = function() {
  graphics.fillStyle = constants.menuColor
  graphics.fillRect(0, 0, constants.width, constants.menuHeight)

  graphics.fillStyle = constants.textColor
  var textLengthSoFar = constants.padding
  for (item in menu.bar) {
    graphics.fillText(item, textLengthSoFar, 20)
    menu.bar[item].position.start = textLengthSoFar
    textLengthSoFar += item.length * constants.fontSize
    menu.bar[item].position.end = textLengthSoFar
  }
}

/**
 * =============================================================
 * clickListener():
 *   carry out events after clicking
 *   on the menu bar, depending on
 *   the x coord of the cursor.
 * =============================================================
 */
menu.clickListener = function(x) {
  for (item in menu.bar) {
    if (x >= menu.bar[item].position.start &&
        x <= menu.bar[item].position.end) {
      menu.bar[item].call()
    }
  }
}

