/* namespace */ var windows = {}

// the array is in order of recent interaction
windows.array = []

windows.windowExists = function(label) {
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].label === label) {
      return true
    }
  }
}

windows.getIndexFromLabel = function(label) {
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].label === label) {
      return i
    }
  }
}

windows.drawAll = function() {
  gui_kit.clearScreen()

  for (var i = 0; i < this.array.length; i++) {
    var win = this.array[i]

    // draw window background
    graphics.fillStyle = constants.bgColor
    graphics.fillRect(win.position.x, win.position.y,
                      win.width, win.height)
    // draw window outline
    // the 'current' window gets a darker outline
    if (i === this.array.length - 1) {
      graphics.strokeStyle = 'black'
    } else {
      graphics.strokeStyle = win.borderColor
    }
    graphics.strokeRect(win.position.x, win.position.y,
                        win.width, win.height)
    // draw window title
    graphics.fillStyle = constants.textColor
    graphics.fillText('(' + win.label + ')',
                      win.position.x + 10,
                      win.position.y + 17)
    // draw title underline
    graphics.strokeStyle = constants.labelUlColor
    graphics.strokeRect(win.position.x,
                        win.position.y + constants.fontSize + 8,
                        win.width,
                        0)
    // draw window text content
    if (win.body) {
      for (var j = 0; j < win.body.length; j++) {
        graphics.fillText(
          win.body[j],
          win.position.x + 10,
          win.position.y + 22 + ((j + 1) * constants.fontSize)
        )
      }
    }
    // draw the text field if it is a prompt
    if (win.isPrompt) {
      graphics.fillStyle = 'white'
      graphics.fillRect(win.position.x + constants.padding,
                        win.position.y + (constants.padding * 3),
                        win.width - (constants.padding * 2),
                        win.height - (constants.padding * 6))
    }
  }
}

windows.moveWindow = function(index, x, y) {
  var newX = x - (this.array[index].width / 2)
  var newY = y - (this.array[index].height / 2)

  if (newX > 1
   && newX < constants.width - this.array[index].width
   && newY > constants.menuHeight
   && newY < constants.height - this.array[index].height) {

    // move window
    this.array[index].position.x = newX
    this.array[index].position.y = newY

    // save position for next time window is opened
    menu.bar[ this.array[index].menuLabel ].windowPosition.x = newX
    menu.bar[ this.array[index].menuLabel ].windowPosition.y = newY

    // ... and redraw
    this.drawAll()
  }
}
