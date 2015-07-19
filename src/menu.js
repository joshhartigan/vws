/* namespace */ var menu = {}

menu.bar = {
  /*
  'example': {
    barPosition: {
      start: [x-coord of where the button starts - default 0],
      end: [x-coord of where the button ends - default 0]
    },
    windowPosition: { x, y } [coords of window - if applicable]
    call: [whichever function 'example' should call]
  }
  */
  'close': {
    barPosition: { start: 0, end: 0 },
    call: function() {
      windows.array.splice(windows.array.length - 1, 1)
      windows.drawAll()
    }
  },
  'vws': {
    barPosition: { start: 0, end: 0 },
    windowPosition: { x: 10, y: 40 },
    call: function() { gui_kit.dialog(
      this.windowPosition.x, this.windowPosition.y, 400, 200,
      'vws',
      [ 'VWS WINDOWING SYSTEM version BETA',
        'This program has been built entirely in JavaScript',
        'so that it can be opened and used on any modern-day',
        'internet browser. It is open source and the code is',
        'split between JavaScript files in the way that desktop',
        'applications are written, for maximum readability.'],
      'vws'
    ); windows.drawAll() }
  },
  'input': {
    barPosition: { start: 0, end: 0 },
    windowPosition: { x: 110, y: 70 },
    call: function() { gui_kit.prompt(
      this.windowPosition.x, this.windowPosition.y, 250, 100,
      'input example',
      'input'
    ); windows.drawAll() }
  },
  'help': {
    barPosition: { start: 0, end: 0 },
    windowPosition: { x: 300, y: 350 },
    call: function() { gui_kit.dialog(
      this.windowPosition.x, this.windowPosition.y, 200, 100,
      'help',
      [ 'click and drag to move',
        'windows. click \'close\'',
        'in the menu to close',
        'them.' ],
      'help'
    ); windows.drawAll() },
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

  graphics.fillStyle = 'white'
  var textLengthSoFar = constants.padding
  for (item in menu.bar) {
    graphics.fillText(item, textLengthSoFar, 20)
    menu.bar[item].barPosition.start = textLengthSoFar
    textLengthSoFar += item.length * constants.fontSize
    menu.bar[item].barPosition.end = textLengthSoFar
  }
}

/**
 * =============================================================
 * clickListener():
 *   carry out events after clicking
 *   on the menu bar, depending on
 *   the x coord of the cursor.
 *   (the y coord is guaranteed to be inside,
 *   because of `core.js`'s 'master' click
 *   listener.
 * =============================================================
 */
menu.clickListener = function(x) {
  for (item in menu.bar) {
    if (x >= menu.bar[item].barPosition.start &&
        x <= menu.bar[item].barPosition.end) {
      menu.bar[item].call()
    }
  }
}
