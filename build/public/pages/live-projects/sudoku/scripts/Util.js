//                 Created & maintained by Zalán Valkó
//                    Last modification: 2018.03.19
//                          Utility functions:
// getInput(); clearGrid(); writeGrid(); isSolvable(); checkIfSolved();

Sudoku.prototype.getInput = function(input){
  let allowedKeys = [8, 9, 37, 38, 39, 40, 46, 49,
                    50, 51, 52, 53, 54, 55, 56, 57,
                    97, 98, 99, 100, 101, 102, 103,
                    104, 105];

  if(!allowedKeys.includes(input.keyCode)){
    input.preventDefault();
    return;
  }

  let cell = {
    row: Number(input.target.id.charAt(1)),
    col: Number(input.target.id.charAt(3))
  };

  //Arrow keys
  if(input.keyCode == 37 || input.keyCode == 38 ||
     input.keyCode == 39 || input.keyCode == 40){
    let count = 0;
    do{
      count++;   //safeguard if somehow all cells are readOnly
    }while((moveFocus(cell, input.keyCode) == true) && count <= 81);  //skip uneditable cells
    return;
  }

  //Backspace or delete
  if(input.keyCode == 8 || input.keyCode == 46){
    this.grid[cell.row][cell.col] = 0;
    input.srcElement.value = "";
    return;
  }

  if(isNaN(input.key)) return;       //Don't try to assign if NaN

  if((this.grid[cell.row][cell.col]) != 0) return; //Although input fields are limited to one char, key is still read in
                                                   //so we need to prevent overrides
  this.grid[cell.row][cell.col] = parseInt(input.key, 10);
  return;

  //allows to move focus using the arrow keys
  function moveFocus(cell, key){
    switch(key){
      //leftArrow
      case 37:
        if(cell.col == 0 && cell.row == 0){
          cell.row = 8;
          cell.col = 8;
        }else if(cell.col == 0 && cell.row != 0){
          cell.row--;
          cell.col = 8;
        }else{
          cell.col--;
        }
        document.getElementById(`r${cell.row}c${cell.col}`).focus();
        break;

      //upArrow
      case 38:
        if(cell.row == 0){
          cell.row = 8;
        }else{
          cell.row--;
        }
        document.getElementById(`r${cell.row}c${cell.col}`).focus();
        break;

      //rightArrow
      case 39:
        if(cell.col == 8 && cell.row == 8){
          cell.row = 0;
          cell.col = 0;
        }else if(cell.col == 8 && cell.row != 8){
          cell.row++;
          cell.col = 0;
        }else{
          cell.col++;
        }
        document.getElementById(`r${cell.row}c${cell.col}`).focus();
        break;

      //downArrow
      case 40:
        if(cell.row == 8){
          cell.row = 0;
        }else{
          cell.row++;
        }
        document.getElementById(`r${cell.row}c${cell.col}`).focus();
        break;

      default:
        console.log("Error at moveFocus()");
        break;
      }
    return document.getElementById(`r${cell.row}c${cell.col}`).readOnly   //returns true if cell is readOnly
  }
};

Sudoku.prototype.clearGrid = function(){
  for(let row=0; row<9; row++){
    for(let col=0; col<9; col++){
      let cell = document.getElementById(`r${row}c${col}`);
      cell.value = "";
      cell.readOnly = false;
      cell.style.backgroundColor = "";
      this.grid[row][col] = 0;
    }
  }
};

Sudoku.prototype.writeGrid = function(){
  for(let row=0; row<9; row++){
    for(let col=0; col<9; col++){
      if(this.grid[row][col] == 0) continue;
      let cell = document.getElementById(`r${row}c${col}`);
      cell.value = this.grid[row][col];
    }
  }
};

//returns true if there's no contradiction in the grid
Sudoku.prototype.isSolvable = function(){
  for(let row=0; row<9; row++){
    for(let col=0; col<9; col++){
      let cell = new Cell(row, col);
      let num = this.grid[row][col];
      if(num == 0) continue;
      if(!this.isSafe(num, cell)) return false;
    }
  }
  return true;

  function Cell(row, col){
    this.row = row;
    this.col = col;
  }
};

Sudoku.prototype.checkIfSolved = function(){
  if(!this.findUnassigned() && this.isSolvable()){  //There's no empty cell & no contradictions
    alert("Congratulations, you solved it!");
  }
  return;
};
