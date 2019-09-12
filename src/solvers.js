/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {  //for a given n return ONE valid config
  var bigArray = [];
  for (var i = 0; i < n; i++) {
    var innerArray = Array(n).fill(0);
    innerArray.splice(i, 1, 1);
    bigArray.push(innerArray);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(bigArray));
  return bigArray;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { //return the number of valid config for a given n
  // helper function
  var getValidColumnIndexCombos = function (n, prevValidCombos = [[]], colIndexOptions) {  //parameters, colIndexOptions always same
    var currColumnIndexCombos = [];

    if (colIndexOptions === undefined) { //so only build array of options once (like [r,p,s])
      // var colIndexOptions = Array(n).fill(0).map(function (el, index) { return index; });
      var colIndexOptions = Array(n).fill(0).map((el, index) => index); // cleaner version of line above
    }

    for (var i = 0; i < prevValidCombos.length; i++) {
      for (var j = 0; j < colIndexOptions.length; j++) {
        // if prevValidCombos[i] (AB) does not include (A) colIndexOptions[j], then compare with B etc. only add if not includes
        //validity check with our other functions
        if ( !prevValidCombos[i].includes(colIndexOptions[j]) ) {
          var combo = prevValidCombos[i].concat(colIndexOptions[j]);
          currColumnIndexCombos.push(combo);
        }
      }
    }

    if (n > 1) { //recurseion. if 1 then stop
      currColumnIndexCombos = getValidColumnIndexCombos(n - 1, currColumnIndexCombos, colIndexOptions); //arguments
    }

    return currColumnIndexCombos;  //all valid combinations
  }; //helper ends here

  var validColumnIndexCombos = getValidColumnIndexCombos(n); // returns array of combination of column indexes of each rook
  console.log('Number of solutions for ' + n + ' rooks:', validColumnIndexCombos.length);
  return validColumnIndexCombos.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
