/* namespace */ var debug = {}

debug.showWindows = function() {
  for (var i = 0; i < windows.array.length; i++) {
    console.log(i + ': ' + windows.array[i].label)
  }
}
