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



window.findNRooksSolution = function(n) { // return a valid configuration
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
window.countNRooksSolutions = function(n) {
  // helper function
  var getValidColumnIndexCombos = function (n, prevValidCombos, colIndexOptions) {
    var currColumnIndexCombos = [];
    for (var i = 0; i < prevValidCombos.length; i++) {
      for (var j = 0; j < colIndexOptions.length; j++) {
        // if prevValidCombos[i] (AB) does not include (A) colIndexOptions[j], then compare with B etc. only add if not includes
        if ( !prevValidCombos[i].includes(colIndexOptions[j]) ) {
          var combo = prevValidCombos[i].concat(colIndexOptions[j]);
          currColumnIndexCombos.push(combo);
        }
      }
    }
    if (n > 1) {
      currColumnIndexCombos = getValidColumnIndexCombos(n - 1, currColumnIndexCombos, colIndexOptions);
    }
    return currColumnIndexCombos;
  };

  var indexOptions = Array(n).fill(0).map((item, index) => index); // array filled with 0 to n
  var validColumnIndexCombos = getValidColumnIndexCombos(n, [[]], indexOptions); // returns array of combination of column indexes of each rook
  console.log('Number of solutions for ' + n + ' rooks:', validColumnIndexCombos.length);
  return validColumnIndexCombos.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var validComboFound = false;
  var getValidBoardMatrix = function (n, board = new Board({n: n}), colIndex = 0) {
    for (var i = 0; i < n; i++) {
      if (validComboFound) {
        return board;
      }
      board.togglePiece(i, colIndex);
      if (!board.hasAnyQueenConflictsOn(i, colIndex)) {
        if (colIndex < n - 1) {
          board = getValidBoardMatrix(n, board, colIndex + 1);
        } else {
          validComboFound = true;
          return board;
        }
      }
      if (!validComboFound) {
        board.togglePiece(i, colIndex);
      }
    }
    return board;
  };

  var validBoardMatrix = getValidBoardMatrix(n).rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(validBoardMatrix));
  return validBoardMatrix;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0; // keep track of valid board configurations
  // helper function to iterate through possible configurations
  var countCombos = function (n, board = new Board({n: n}), colIndex = 0) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(i, colIndex);
      if (!board.hasAnyQueenConflictsOn(i, colIndex)) {
        if (colIndex < n - 1) {
          board = countCombos(n, board, colIndex + 1);
        } else {
          solutionCount++;
        }
      }
      board.togglePiece(i, colIndex);
  
    }
    return board;
  };
  countCombos(n); // call helper function
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
