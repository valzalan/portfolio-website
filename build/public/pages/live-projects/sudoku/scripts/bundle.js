(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require("./util.js");

module.exports = function () {
	function Sudoku() {
		_classCallCheck(this, Sudoku);

		//TODO: Maybe make it "private", and add set()?
		this.grid = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
	}

	_createClass(Sudoku, [{
		key: "solve",
		value: function solve() {

			var cell = this.findUnAssigned();

			if ((typeof cell === "undefined" ? "undefined" : _typeof(cell)) === "object") {

				for (var num = 1; num <= 9; num++) {

					if (this.isSafe(num, cell)) {
						this.grid[cell.row][cell.col] = num;
						if (this.solve()) {
							return true;
						}
					}
				}

				this.grid[cell.row][cell.col] = 0;

				//  Triggers backtracking
				return false;
			} else {
				return true;
			}
		}
	}, {
		key: "findUnAssigned",
		value: function findUnAssigned() {
			for (var row = 0; row < 9; row++) {
				for (var col = 0; col < 9; col++) {

					if (this.grid[row][col] == 0) {
						return { row: row, col: col };
					}
				}
			}
			return false;
		}
	}, {
		key: "isSolvable",
		value: function isSolvable() {
			for (var row = 0; row < 9; row++) {
				for (var col = 0; col < 9; col++) {

					var num = this.grid[row][col];
					if (num == 0) continue;

					if (!this.isSafe(num, { row: row, col: col })) {
						return false;
					}
				}
			}
			return true;
		}
	}, {
		key: "isSafe",
		value: function isSafe(num, cell) {

			//  Scanning row and column
			for (var i = 0; i < 9; i++) {
				if (this.grid[cell.row][i] == num && i != cell.col || this.grid[i][cell.col] == num && i != cell.row) {
					return false;
				}
			}

			//  Scanning box
			var boxStartRow = cell.row >= 3 ? cell.row >= 6 ? 6 : 3 : 0,
			    boxStartCol = cell.col >= 3 ? cell.col >= 6 ? 6 : 3 : 0;

			for (var row = boxStartRow; row < boxStartRow + 3; row++) {
				for (var col = boxStartCol; col < boxStartCol + 3; col++) {

					if (this.grid[row][col] == num && row != cell.row && col != cell.col) {
						return false;
					}
				}
			}
			return true;
		}
	}, {
		key: "isSolved",
		value: function isSolved() {

			//  There are no empty cells & no contradictions
			if (!this.findUnAssigned() && this.isSolvable()) {
				return true;
			} else {
				return false;
			}
		}
	}, {
		key: "randomSolve",
		value: function randomSolve() {
			var cell = this.findUnAssigned();

			if ((typeof cell === "undefined" ? "undefined" : _typeof(cell)) === "object") {

				var usedNumbers = [0, 0, 0, 0, 0, 0, 0, 0, 0];

				//	Repeat until every number from 1 - 9 have been tried
				do {
					var num = void 0;

					//	Repeat until random number is an untried one
					do {

						num = Math.floor(Math.random() * 9 + 1);

						if (usedNumbers[num - 1] == 0) {
							usedNumbers[num - 1] = 1;
							break;
						}
					} while (1);

					if (this.isSafe(num, cell)) {
						this.grid[cell.row][cell.col] = num;
						if (this.randomSolve()) {
							return true;
						}
					}
				} while (usedNumbers.includes(0));

				this.grid[cell.row][cell.col] = 0;

				// Triggers backtracking
				return false;
			} else {
				return true;
			}
		}
	}, {
		key: "removeNumbers",
		value: function removeNumbers(count) {
			for (var i = 1; i <= count; i++) {

				var row = Math.floor(Math.random() * 9),
				    col = Math.floor(Math.random() * 9);

				if (this.grid[row][col] == 0) {
					i--;
					continue;
				}

				this.grid[row][col] = 0;

				util.unlockCell({ row: row, col: col });
			}
		}
	}, {
		key: "clearGrid",
		value: function clearGrid() {
			for (var row = 0; row < 9; row++) {
				for (var col = 0; col < 9; col++) {

					this.grid[row][col] = 0;

					var cell = document.getElementById("r" + row + "c" + col);
					cell.value = "";
					util.unlockCell(cell);
				}
			}
		}
	}, {
		key: "writeGrid",
		value: function writeGrid() {
			for (var row = 0; row < 9; row++) {
				for (var col = 0; col < 9; col++) {

					if (this.grid[row][col] == 0) {
						continue;
					}

					var cell = document.getElementById("r" + row + "c" + col);
					cell.value = this.grid[row][col];
				}
			}
		}
	}]);

	return Sudoku;
}();

},{"./util.js":4}],2:[function(require,module,exports){
"use strict";

//TODO: Add hotkey tips on loading page
var createGrid = require("./createGrid.js"),
    Sudoku = require("./Sudoku.js"),
    util = require("./util.js");

(function () {

	createGrid();

	var sudoku = new Sudoku();

	//----------------------
	//    Event handlers
	//----------------------

	var cellElements = document.getElementsByTagName("input");

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = cellElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var elem = _step.value;

			elem.addEventListener("keydown", function (event) {

				var cell = {
					row: Number(event.target.id.charAt(1)),
					col: Number(event.target.id.charAt(3))
				};

				//  Numbers 1 - 9(+numPad), arrows, tab, delete, backspace
				var allowedKeys = [8, 9, 37, 38, 39, 40, 46, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103, 104, 105];

				if (!allowedKeys.includes(event.keyCode)) {
					event.preventDefault();
					return;
				}

				//  Arrow keys and tab
				if ([37, 38, 39, 40, 9].includes(event.keyCode)) {
					event.preventDefault();
					var nextCell = util.moveFocus(cell.row, cell.col, event.keyCode);

					document.getElementById("r" + nextCell.row + "c" + nextCell.col).focus();
				}

				//  Numbers 1-9 & Numpad 1-9
				if (event.keyCode >= 49 && event.keyCode <= 57 || event.keyCode >= 97 && event.keyCode <= 105) {
					util.assignNumber(event.key, sudoku, cell);
					if (sudoku.isSolved()) {
						util._modal.set("win");
						util._modal.show();
					}
				}

				//  Backspace & Del
				if (event.keyCode == 8 || event.keyCode == 46) {
					event.preventDefault();
					sudoku.grid[cell.row][cell.col] = 0;
					event.srcElement.value = "";
				}
			});
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	window.addEventListener("keydown", function () {
		//  Enter
		if (event.keyCode == 13) {
			initSolve();
		}

		//  Space
		if (event.keyCode == 32) {
			sudoku.clearGrid();
		}
	});

	var solveButton = document.getElementById("btn-solve");
	solveButton.addEventListener("click", function () {
		initSolve();
	});

	var clearButton = document.getElementById("btn-clear");
	clearButton.addEventListener("click", function () {
		sudoku.clearGrid();
	});

	var makeButton = document.getElementById("btn-make");
	makeButton.addEventListener("click", function () {
		//	Generates a puzzle

		sudoku.clearGrid();
		sudoku.randomSolve();

		//	Using regex would make it more bloated. Selects all input, whose id begins with "r"
		var cells = document.querySelectorAll("input[id^=\"r\"]");

		cells.forEach(function (cell) {
			util.lockCell(cell);
		});

		sudoku.removeNumbers(46);
		sudoku.writeGrid();
	});

	var modalClose = document.getElementById("close");
	modalClose.addEventListener("click", function () {
		util._modal.hide();
	});

	//=========================

	function initSolve() {

		if (sudoku.isSolvable()) {
			if (sudoku.solve()) {
				sudoku.writeGrid();
			} else {
				util._modal.set("error");
				util._modal.show();
			}
		} else {
			util._modal.set("error");
			util._modal.show();
		}
	}
})();

},{"./Sudoku.js":1,"./createGrid.js":3,"./util.js":4}],3:[function(require,module,exports){
"use strict";

module.exports = function () {

	var tableString = "<table>",
	    container = document.createElement("div");

	for (var row = 0; row < 9; row++) {

		if (row == 3 || row == 6) {
			tableString += "<tr class='divider'></tr>";
		}

		tableString += "<tr>";

		for (var col = 0; col < 9; col++) {

			if (col == 3 || col == 6) {
				tableString += "<td class='divider'></td>";
			}
			tableString += "<td><input type = \"text\" id = \"" + ("r" + row + "c" + col) + "\" maxlength = \"1\"></td>";
		}

		tableString += "</tr>";
	}

	tableString += "</table>";

	container.className = "grid-container";
	container.innerHTML = tableString;
	document.getElementById("title").insertAdjacentElement("afterend", container);
};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = {

	moveFocus: function moveFocus(row, col, key) {
		do {
			switch (key) {

				//  Left Arrow
				case 37:

					if (col == 0 && row == 0) {
						row = 8;
						col = 8;
					} else if (col == 0 && row != 0) {
						row--;
						col = 8;
					} else {
						col--;
					}
					break;

				//  Up Arrow
				case 38:
					if (row == 0) {
						row = 8;
					} else {
						row--;
					}
					break;

				//  Tab & Right Arrow
				case 9:
				case 39:
					if (col == 8 && row == 8) {
						row = 0;
						col = 0;
					} else if (col == 8 && row != 8) {
						row++;
						col = 0;
					} else {
						col++;
					}
					break;

				//  Down Arrow
				case 40:
					if (row == 8) {
						row = 0;
					} else {
						row++;
					}
					break;

				default:
					// Shouldn't happen, but...
					console.error("Unallowed keycode");
					return undefined;
			}
		} while (document.getElementById("r" + row + "c" + col).readOnly);

		return { row: row, col: col };
	},

	assignNumber: function assignNumber(key, sudoku, cell) {

		//  Prevent overrides
		if (isNaN(key) || sudoku.grid[cell.row][cell.col] != 0) {
			return;
		}

		sudoku.grid[cell.row][cell.col] = parseInt(key, 10);
		return;
	},

	lockCell: function lockCell(cell) {

		var elem = void 0;
		//	If cell is of form {row: row, col: col}
		if (Object.keys(cell).length == 2) {
			elem = document.getElementById("r" + cell.row + "c" + cell.col);

			//	Cell is from a querySelector
		} else {
			elem = cell;
		}

		elem.readOnly = true;
		elem.style.backgroundColor = "#D0D6E2"; //TODO: Convert to hsl
	},

	unlockCell: function unlockCell(cell) {

		var elem = void 0;
		if (Object.keys(cell).length == 2) {
			elem = document.getElementById("r" + cell.row + "c" + cell.col);

			//	Cell is from a querySelector
		} else {
			elem = cell;
		}

		elem.readOnly = false;
		elem.style.backgroundColor = "hsl(215, 25%, 90%)";
	},

	_modal: {
		set: function set(type, text) {
			var modal = document.getElementById("modal");
			modal.className = type;

			var textElem = document.getElementById("modal-text");
			if (type == "win") {
				textElem.innerHTML = "Congratulations, you solved the puzzle!";
				textElem.style.color = "green";
			} else if (type == "error") {
				textElem.innerHTML = "There is no solution.";
				textElem.style.color = "red";
			}
		},

		show: function show() {
			var modal = document.getElementById("modal");

			//	Remove hiding animation
			modal.classList.remove("animOut");

			modal.style.display = "block";
		},

		hide: function hide() {
			var modal = document.getElementById("modal");

			//	Add hiding animation
			modal.classList.add("animOut");
			modal.addEventListener("animationend", function hideModal() {
				modal.style.display = "none";
				modal.removeEventListener("animationend", hideModal);
			});
		}
	}
};

},{}]},{},[2]);
