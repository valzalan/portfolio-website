
let localStorage = window.localStorage;
let taskList = [];

(function init() {

  if( localStorage.taskList === undefined ) {

    localStorage.setItem( "taskList", "" );

  } else {

    taskList = JSON.parse( localStorage.getItem( "taskList" ) );

    for( let task of taskList ) {

      appendToList( task );

    }
  }
})();

function getInput(event) {

  if( event.target.id == "button" || event.keyCode == 13 ) {

    const inputField = document.getElementById( "task-input" ),
          task = inputField.value;

    if( task != "" && task != undefined ) {

      appendToList( task );
      addToLocalStorage( task );

    }

    inputField.value = "";
  }
}

function appendToList( task ) {

  const list = document.getElementById( "task-list" ),
        newListItem = document.createElement( "li" );

  newListItem.innerHTML = task;
  newListItem.id = `task-${list.children.length + 1}`;
  newListItem.addEventListener( "click", function(){ removeFromList( event ); });
  list.appendChild( newListItem );
}

function removeFromList( event ) {

  targetItem = document.getElementById( event.target.id );
  removeFromLocalStorage( event.target.id );

  targetItem.addEventListener("animationend", function(){

    targetItem.parentNode.removeChild( targetItem );
  });

  targetItem.style.animation = "scaleDown 0.2s ease";
}

function addToLocalStorage( task ) {

  taskList.push( task );
  localStorage.setItem( "taskList", JSON.stringify( taskList ) );
}

function removeFromLocalStorage( task ) {

  taskIndex = Number( task.substring( 5 ) );
  taskList.splice( taskIndex - 1, 1 );
  localStorage.setItem( "taskList", JSON.stringify( taskList ) );
}
