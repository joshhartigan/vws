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
    // draw window background
    graphics.fillStyle = constants.bgColor
    graphics.fillRect(this.array[i].position.x, this.array[i].position.y,
                      this.array[i].width, this.array[i].height)
    // draw window outline
    graphics.strokeStyle = this.array[i].borderColor
    graphics.strokeRect(this.array[i].position.x, this.array[i].position.y,
                        this.array[i].width, this.array[i].height)
    // draw window title
    graphics.fillStyle = constants.textColor
    graphics.fillText(this.array[i].label,
                      this.array[i].position.x + 10,
                      this.array[i].position.y + 17)
    // draw title underline
    graphics.strokeStyle = constants.labelUlColor
    graphics.strokeRect(this.array[i].position.x,
                        this.array[i].position.y + constants.fontSize + 8,
                        this.array[i].width,
                        0)
    // draw window text content
    if (this.array[i].body) {
      for (var j = 0; j < this.array[i].body.length; j++) {
        graphics.fillText(
          this.array[i].body[j],
          this.array[i].position.x + 10,
          this.array[i].position.y + 22 + ((j + 1) * constants.fontSize)
        )
      }
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
