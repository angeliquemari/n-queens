var getNRookCombinations = function (n, array, xCoordinates) {
  var results = [];

  if (array === undefined) {
    array = [[]];
  }
  if (n === undefined) {
    n = 3;
  }

  if (xCoordinates === undefined) {
    xCoordinates = Array(n).fill(0).map(function(item, index) { return index; });
  }

  for (var j = 0; j < array.length; j++) {
    for (var i = 0; i < xCoordinates.length; i++) {

      if ( !array[j].includes(xCoordinates[i]) ) {
        var round = array[j].concat(xCoordinates[i]);
        results.push(round);
      }
    }
  }

  // recursive case
  if (n > 1) {
    results = getNRookCombinations(n - 1, results, xCoordinates);
  }

  return results;
};

var nRooks = function (n) {
  var nRookCombinations = getNRookCombinations(n);
  return nRookCombinations.length;
};

nRooks(4);
