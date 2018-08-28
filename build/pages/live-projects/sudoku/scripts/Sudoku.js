//                 Created & maintained by Zalán Valkó
//                    Last modification: 2018.03.19
//                            "Main functions"

let sudoku = new Sudoku();

function solveSudoku(){
  if(sudoku.isSolvable()){          //if there's a contradicting number, don't attempt to solve
    if(sudoku.solve()){
      sudoku.writeGrid();
    }else{
      alert("There is no solution"); //The algorithm couldn't find a solution
    }
  }else{
    alert("There is no solution"); //There's a contradicting number in the grid
  }
}

function generateSudoku(){
  sudoku.clearGrid();

  //prefilled cells in the puzzle will be uneditable and a darker colour
  for(i=0; i<9; i++){
    for(j=0; j<9; j++){
      cell = document.getElementById(`r${i}c${j}`);
      cell.readOnly = true;
      cell.style.backgroundColor = "#D0D6E2";
    }
  }

  sudoku.randomSolve();
  sudoku.removeNumbers();
  sudoku.writeGrid();
}
