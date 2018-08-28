//                 Created & maintained by Zalán Valkó
//                    Last modification: 2018.03.19
//                  Sudoku puzzle generator functions

Sudoku.prototype.randomSolve = function(){
    let cell, num;
    if(cell = this.findUnassigned()){ //combined assignment and evaluation:
                                //if there are no empty cells, returns false
      let usedNumbers = [0,0,0,0,0,0,0,0,0];
      do{ // repeat until every num from 1 - 9 have been tried
        do{ // repeat until random num is an untried num
          num = Math.floor((Math.random() * 9) +1);
          if(usedNumbers[num-1] == 0){
            usedNumbers[num-1] = 1;
            break;
          }
        }while(1);
        if(this.isSafe(num, cell)){
          this.grid[cell.row][cell.col] = num;
          if(this.randomSolve()){
            return true;
          }
        }
      }while(usedNumbers.includes(0));
        this.grid[cell.row][cell.col] = 0;
        return false;         //triggers backtracking
  }else{
    return true;
  }
};

Sudoku.prototype.removeNumbers = function(){
  for(i=1; i<=46; i++){
    let row = Math.floor((Math.random() * 9));
    let col = Math.floor((Math.random() * 9));
    if(this.grid[row][col] == 0){
      i--;
      continue;
    }
    this.grid[row][col] = 0;
    let cell = document.getElementById(`r${row}c${col}`);
    cell.readOnly = false;
    cell.style.backgroundColor = "";
  }
};
