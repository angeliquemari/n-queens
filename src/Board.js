// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var conflictCount = 0;
      var row = this.get(rowIndex);
      for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          conflictCount++;
          if (conflictCount > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var hasRowConflict = false;
      // can also get n with `this.attributes.n` and `this.rows().length`
      for (var i = 0; i < this.get('n'); i++) {
        hasRowConflict = hasRowConflict || this.hasRowConflictAt(i);
      }
      return hasRowConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var conflictCount = 0;
      var rows = this.rows(); // matrix (array of arrays) representing the board configuration
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1) {
          conflictCount++;
          if (conflictCount > 1) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var hasColConflict = false;
      for (var i = 0; i < this.get('n'); i++) {
        hasColConflict = hasColConflict || this.hasColConflictAt(i);
      }
      return hasColConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // setting row and column indexes of where we're checking if there's a conflict at
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        var rowIndex = 0;
        var colIndex = majorDiagonalColumnIndexAtFirstRow;
      } else {
        rowIndex = -majorDiagonalColumnIndexAtFirstRow;
        colIndex = 0;
      }

      var rows = this.rows();
      var conflictCount = 0;
      for (var i = 0; i < this.get('n'); i++) {
        if (!this._isInBounds(rowIndex, colIndex)) {
          break;
        }
        var currentCell = rows[rowIndex][colIndex];
        if (currentCell === 1) {
          conflictCount++;
          if (conflictCount > 1) {
            return true;
          }
        }
        rowIndex++;
        colIndex++;
      }
      return false;
    },



    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var hasMajorDiagConflict = false;
      var n = this.get('n');
      for (var i = -n + 1; i < n; i++) { // iterating along two edges of the board
        hasMajorDiagConflict = hasMajorDiagConflict || this.hasMajorDiagonalConflictAt(i);
      }
      return hasMajorDiagConflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var n = this.get('n');
      var conflictCount = 0;
      var rows = this.rows();
      // setting row and column indexes of where we're checking if there's a conflict at 
      if (minorDiagonalColumnIndexAtFirstRow < n - 1) {
        var rowIndex = 0;
        var colIndex = minorDiagonalColumnIndexAtFirstRow;
      } else {
        var colIndex = n - 1;
        var rowIndex = minorDiagonalColumnIndexAtFirstRow - (n - 1);
      }

      for (var i = colIndex; i > -1; i--) {
        if (!this._isInBounds(colIndex, rowIndex)) {
          break;
        }
        if (rows[rowIndex][colIndex] === 1) {
          conflictCount++;
          if (conflictCount > 1) {
            return true;
          }
        }
        rowIndex++;
        colIndex--;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var hasMinorDiagConflict = false; 
      var n = this.get('n');
      for (var i = 0; i < 2 * (n - 1); i++) {
        if (this.hasMinorDiagonalConflictAt(i)) { // max combo of row and col index is (n-1)+(n-1) i.e. 2(n-1)
          hasMinorDiagConflict = true;
        }
      }
      return hasMinorDiagConflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
