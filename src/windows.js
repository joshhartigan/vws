/* namespace */ var windows = {}

// this array is to be filled by vws,
// unless any startup window is to
// be created
windows.array = [
  /*
  example: {
    position: {
      x: [x-coord of top-left corner],
      y: [y-coord of top-left corner]
    },
    size: {
      width: [width in pixels],
      height: [height in pixels]
    },
    borderColor: [hex code of the border color],
    titlestr: [the title of the window],
    lines: [an array of lines of text to be written]
  }
  */
]

/**
 * =============================================================
 * createWindow():
 *   forms a window object from the
 *   arguments supplied, and adds it
 *   to the `windows.array` array.
 * =============================================================
 */
windows.createWindow = function(x, y, width, height, titlestr, lines) {
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].titlestr === titlestr) {
      this.array.splice(i, 1)
    }
  }

  this.array.push({
    position: {
      x: x,
      y: y
    },
    size: {
      width: width,
      height: height
    },
    borderColor: 'black',
    titlestr: titlestr,
    lines: lines
  })
}

/**
 * =============================================================
 * drawAll():
 *   draw all of the windows
 *   from the `windows` array
 *   onto the screen
 * =============================================================
 */
windows.drawAll = function() {
  // clear screen
  graphics.fillStyle = 'white'
  graphics.fillRect(1, constants.menuHeight,
                    constants.width - 2, constants.height - constants.menuHeight - 1)

  for (var i = 0; i < this.array.length; i++) {
    // draw window background
    graphics.fillStyle = constants.bgColor
    graphics.fillRect(this.array[i].position.x, this.array[i].position.y,
                      this.array[i].size.width, this.array[i].size.height)
    // draw window outline
    graphics.strokeStyle = this.array[i].borderColor
    graphics.strokeRect(this.array[i].position.x, this.array[i].position.y,
                      this.array[i].size.width, this.array[i].size.height)
    // draw window title
    graphics.fillStyle = 'black'
    graphics.fillText(this.array[i].titlestr,
                      this.array[i].position.x + 10,
                      this.array[i].position.y + 17)
    // draw title underline
    graphics.strokeStyle = 'grey'
    graphics.strokeRect(this.array[i].position.x,
                        this.array[i].position.y + constants.fontSize + 8,
                        this.array[i].size.width,
                        0)
    // draw window text content
    for (var j = 0; j < this.array[i].lines.length; j++) {
      graphics.fillText(
        this.array[i].lines[j],
        this.array[i].position.x + 10,
        this.array[i].position.y + 22 + ((j + 1) * constants.fontSize)
      )
    }
  }
}

windows.moveWindow = function(index, x, y) {
  this.array[index].position.x = x
  this.array[index].position.y = y
  this.drawAll()
}

