//                 Created & maintained by Zalán Valkó
//                    Last modification: 2018.03.19
//      Solves the sudoku using a recursive backtracking algorithm


function Sudoku(){

  this.grid = [[0,0,0, 0,0,0, 0,0,0,],
               [0,0,0, 0,0,0 ,0,0,0,],
               [0,0,0, 0,0,0, 0,0,0,],

               [0,0,0, 0,0,0 ,0,0,0,],
               [0,0,0, 0,0,0, 0,0,0,],
               [0,0,0, 0,0,0 ,0,0,0,],

               [0,0,0, 0,0,0, 0,0,0,],
               [0,0,0, 0,0,0 ,0,0,0,],
               [0,0,0, 0,0,0, 0,0,0]];

  this.findUnassigned = function(){
    for(row=0; row<9; row++){
      for(col=0; col<9; col++){
        if(this.grid[row][col] == 0){
          let cell = new Cell(row, col);
          return cell;
        }
      }
    }
    return false; //no empty Cells found, we're finished

    function Cell(row, col){
      this.row = row;
      this.col = col;
    }
  };

  this.solve = function(){
    let cell
    if(cell = this.findUnassigned()){ //combined assignment and evaluation:
                                      //if there are no empty cells, returns false
      let num;
      for(num=1; num<=9; num++){
        if(this.isSafe(num, cell)){
          this.grid[cell.row][cell.col] = num;
          if(this.solve()){
            return true;
          }
        }
      }
      this.grid[cell.row][cell.col] = 0;
      return false;         //triggers backtracking
    }else{
      return true;
    }
  };

  this.isSafe = function(num, cell){
    //scanning row and column
    for(i=0; i<9; i++){
      if((this.grid[cell.row][i] == num && i != cell.col) ||
         (this.grid[i][cell.col] == num && i != cell.row)){
        return false;
      }
    }
    //scanning box
    boxStartRow = (cell.row >= 3) ? (cell.row >= 6 ? 6 : 3) : 0;
    boxStartCol = (cell.col >= 3) ? (cell.col >= 6 ? 6 : 3) : 0;

    for(row=boxStartRow; row<(boxStartRow + 3); row++){
      for(col=boxStartCol; col<(boxStartCol + 3); col++){
        if((this.grid[row][col] == num) && (row != cell.row) && (col != cell.col)){
          return false;
        }
      }
    }
    return true;
  };
}
