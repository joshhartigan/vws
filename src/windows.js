/* namespace */ var windows = {}

// this array is to be filled by vws,
// unless any startup window is to
// be created
windows.array = [
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

/**
 * =============================================================
 * createWindow():
 *   forms a window object from the
 *   arguments supplied, and adds it
 *   to the `windows.array` array.
 * =============================================================
 */
windows.createWindow = function(xPos, yPos, width, height, titlestr, lines) {
  for (var i = 0; i < this.array.length; i++) {
    if (this.array[i].titlestr === titlestr) {
      this.array.splice(i, 1)
    }
  }

  this.array.push({
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
    graphics.fillStyle = 'black'
    graphics.strokeRect(this.array[i].position.x, this.array[i].position.y,
                      this.array[i].size.width, this.array[i].size.height)
    // draw window title
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

