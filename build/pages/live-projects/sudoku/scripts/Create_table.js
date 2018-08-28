//                Created & maintained by Zalán Valkó
//                   Last modification: 2018.03.19.
//        Draws the grid and assigns unique id to input fields

let tableString = "<table>";
let div = document.createElement("div");
let row = 0, col = 0;
for(i=1; i<=11; i++){
  if((i % 4) == 0){
    tableString += '<tr class = "divider">';
    continue;
  }
  tableString += "<tr>";
  for(j=1; j<=11; j++){
    if((j % 4) == 0){
      tableString += '<td class = "divider"></td>';
    }else{
      tableString += '<td><input type = "text" id = "'+ `r${row}c${col}`
                  + '" maxlength = "1" onkeydown = "sudoku.getInput(event); sudoku.checkIfSolved()"></td>';
      col++;
    }
  }
  tableString += "</tr>";
  col = 0;
  row++;
}
tableString += "</table>";
div.innerHTML = tableString;
document.body.appendChild(div);
