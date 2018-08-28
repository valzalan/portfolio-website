//                 Created & maintained by Zalán Valkó
//                    Last modification: 2018.03.10
//      Solves the sudoku using a recursive backtracking algorithm

let grid = [[0,0,0, 0,0,0, 0,0,0,],
            [0,0,0, 0,0,0 ,0,0,0,],
            [0,0,0, 0,0,0, 0,0,0,],

            [0,0,0, 0,0,0 ,0,0,0,],
            [0,0,0, 0,0,0, 0,0,0,],
            [0,0,0, 0,0,0 ,0,0,0,],

            [0,0,0, 0,0,0, 0,0,0,],
            [0,0,0, 0,0,0 ,0,0,0,],
            [0,0,0, 0,0,0, 0,0,0]];
let rowArray = [];
let colArray = [];
let boxArray = [];

function sudokuSolver(){
  if(isSolvable()){ //if there's an illegal number, don't attempt to solve
    if(solve()){
      write();
    }else{
      alert("There is no solution");
    }
  }else{
    alert("There is no solution");
  }
}

  function findUnAssigned(){
    for(i=0; i<9; i++){
      for(j=0; j<9; j++){
        if(grid[i][j] == 0){
          let cell = new Cell(i, j);
          return cell;
        }
      }
    }
    return false; //no empty Cells found, we're finished

    function Cell(row, col){
      this.row = row;
      this.col = col;
    }
  }

  function solve(){
    let cell
    if(cell = findUnAssigned()){ //combined assignment and evaluation:
                                //if there are no empty cells, returns false
      let num;
      for(num=1; num<=9; num++){
        if(isSafe(num, cell)){
          grid[cell.row][cell.col] = num;
          if(solve()){
            return true;
          }
        }
      }
      grid[cell.row][cell.col] = 0;
      return false;         //triggers backtracking
    }else{
      return true;
    }
  }

  function isSafe(num, cell){
    //scanning row and column
    for(i=0; i<9; i++){
      if((grid[cell.row][i] == num && i != cell.col) ||
         (grid[i][cell.col] == num && i != cell.row)){
        return false;
      }
    }
    //scanning box
    boxStartRow = (cell.row >= 3) ? (cell.row >= 6 ? 6 : 3) : 0;
    boxStartCol = (cell.col >= 3) ? (cell.col >= 6 ? 6 : 3) : 0;

    for(i=boxStartRow; i<(boxStartRow + 3); i++){
      for(j=boxStartCol; j<(boxStartCol + 3); j++){
        if((grid[i][j] == num) && (i != cell.row) && (j != cell.col)){
          return false;
        }
      }
    }
    return true;
  }

  // utility function to print the numbers
  function write(){
    let cell, c;
    for(i=0; i<9; i++){
      for(j=0; j<9; j++){
        if(grid[i][j] == 0) continue;
        cell = `r${i}c${j}`;
        c = document.getElementById(cell);
        c.value = grid[i][j];
      }
    }
  }

//utility function -- assigns 0 to every cell
function clearGrid(){
  let cell, c;
  for(i=0; i<9; i++){
    for(j=0; j<9; j++){
      cell = `r${i}c${j}`;
      grid[i][j] = 0;
      c = document.getElementById(cell);
      c.value = "";
      c.readOnly = false;
      c.style.backgroundColor = "";
    }
  }
}

//utility function to assign input to grid and delete if del or bckspc pressed
function loadNumber(cell, input, field){
  let key = input.keyCode;
  let temp = cell.split("");
  let row = temp[1];
  let col = temp[3];
  if(key == 8 || key == 46){    //user pressed backspace or delete
    grid[row][col] = 0;
    field.value = "";
    return;
  }
  if((grid[row][col]) != 0) return;
  if(!isNaN(input.key)){
    let num = parseInt(input.key, 10);
    grid[row][col] = num;
    record(row, col, num);
    if(checkIfSolved()){
      alert("Congratulations! You solved it!");
    }
    return;
  }else{                          //input was not a number
    grid[row][col] = 0;           //previously entered number might still be assigned, avoid confusion
    field.value = "";
  }
}

/*
function record(row, col, num){
  let box;

        if(row < 3 && col < 3){ box = 1;
  }else if(row < 3 && col < 6){ box = 2;
  }else if(row < 3 && col < 9){ box = 3;
  }else if(row < 6 && col < 3){ box = 4;
  }else if(row < 6 && col < 6){ box = 5;
  }else if(row < 6 && col < 9){ box = 6;
  }else if(row < 9 && col < 3){ box = 7;
  }else if(row < 9 && col < 6){ box = 8;
  }else{                        box = 9;}

  rowArray[row] = new Row();
  colArray[col] = new Col();
  boxArray[box] = new Box();

  rowArray[row].push(num);
  rowArray[row].check();
  rowArray[col].push(num);
  rowArray[row].check();
  rowArray[box].push(num);
  rowArray[row].check();

  function Row(){
    this.array = [];
    this.notLegal = false;
    this.check = function(){
      for(i=0; i<array.length; i++){
        for(j=0; j<array.length; j++){
          if((array[i] == array[j]) && (i != j)) notLegal = true;
        }
      }
    }
  }
  function Col(){
    this.array = [];
    this.notLegal = false;
    this.check = function(){
      for(i=0; i<array.length; i++){
        for(j=0; j<array.length; j++){
          if((array[i] == array[j]) && (i != j)) notLegal = true;
        }
      }
    }
  }
  function Box(){
    this.array = [];
    this.notLegal = false;
    this.check = function(){
      for(i=0; i<array.length; i++){
        for(j=0; j<array.length; j++){
          if((array[i] == array[j]) && (i != j)) notLegal = true;
        }
      }
    }
  }
}
*/
//searches for illegalities
function isSolvable(){
  let row = 0; col = 0;
  let i, j;
  let num, boxStartRow, boxStartCol;

  //scanning rows
  for(row = 0; row<9; row++){
    for(i=0; i<9; i++){
      num = grid[row][i];
      if(num == 0) continue;
      for(j=0; j<9; j++){
        if(grid[row][j] == num && j != i){
          return false;
        }
      }
    }
  }

  //scanning columns
  for(col = 0; col<9; col++){
    for(i=0; i<9; i++){
      num = grid[i][col];
      if(num == 0) continue;
      for(j=0; j<9; j++){
        if(grid[j][col] == num && j != i){
          return false;
        }
      }
    }
  }

  //scanning boxes
  for(row=0; row<9; row++){
    for(col=0; col<9; col++){
      num = grid[row][col];
      if(num == 0) continue;
      boxStartRow = (row >= 3) ? (row >= 6 ? 6 : 3) : 0;
      boxStartCol = (col >= 3) ? (col >= 6 ? 6 : 3) : 0;
      for(i=boxStartRow; i<(boxStartRow + 3); i++){
        for(j=boxStartCol; j<(boxStartCol + 3); j++){
          if((grid[i][j] == num) && (i != row) && (j != col)){
            return false;
          }
        }
      }
    }
  }
  return true;
}

function checkIfSolved(){
  let num;
  for(row=0; row<9; row++){
    for(col=0; col<9; col++){
      if(grid[row][col] == 0) return false;
      num = grid[row][col];
      let cell = new Cell(row, col);
      if(!isSafe(num, cell)) return false;
    }
  }
  return true;

  function Cell(row, col){
    this.row = row;
    this.col = col;
  }
}
