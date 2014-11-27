window.onload = main

function main() {
  var canvas = document.getElementById('v')
  var ctx = canvas.getContext('2d')

  canvas.width = 800
  canvas.height = 600

  initDraw(ctx, canvas.width, canvas.height)
}

function initDraw(ctx, W, H, menuBar) {
  var FONT_SIZE = 14
  ctx.font = String(FONT_SIZE) + 'px monospace' // this should remain constant

  ctx.strokeRect(0, 0, W, H)

  menuBar = menuBar || {
    color: 'blue',
    items: [ 'open', 'help' ],
    clickAreas: {}
  }

  // draw menu bar
  ctx.fillStyle = menuBar.color
  ctx.fillRect(0, 0, W, 30)

  // fill menu bar with text
  var textLengthSoFar = 10;
  for (var i = 0; i < menuBar.items.length; i++) {
    var text = menuBar.items[i]
    ctx.fillStyle = 'white'
    ctx.fillText(text, textLengthSoFar, 20)

    // we must define a sub-area of the menu bar on which
    // the user can click to 'activate' that menu item
    menuBar.clickAreas[text] = { from: textLengthSoFar, to: text.length * FONT_SIZE }

    textLengthSoFar += text.length * FONT_SIZE
  }

}

