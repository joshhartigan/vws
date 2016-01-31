/* namespace */ var gui_kit = {};

gui_kit.clearScreen = function() {
  graphics.fillStyle = 'white';
  graphics.fillRect(1, constants.menuHeight,
    constants.width - 2, constants.height - constants.menuHeight - 1);
};

gui_kit.dialog = function(x, y, width, height, label, body, menuLabel) {
  if (windows.windowExists(label)) {
    windows.array.splice(windows.getIndexFromLabel(label), 1);
  }

  windows.array.push({
    position: { x: x, y: y },
    width: width,
    height: height,
    label: label,
    body: body,
    menuLabel: menuLabel
  });
};

gui_kit.prompt = function(x, y, width, height, label, menuLabel) {
  if (windows.windowExists(label)) {
    windows.array.splice(windows.getIndexFromLabel(label), 1);
  }

  windows.array.push({
    position: { x: x, y: y },
    width: width,
    height: height,
    label: label,
    menuLabel: menuLabel,
    isPrompt: true,
    input: '',
    maxInputLength: Math.floor((width - (constants.padding * 2)) / constants.fontSize) * 2
  });
};
