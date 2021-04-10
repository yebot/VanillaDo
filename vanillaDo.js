const SERVER = 'http://localhost:3000'

const fetchTodos = async function() {

  //console.log(domList);
  const getResp = await fetch(SERVER + '/api',
    {
      method: 'get',
      mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //Select the list container fromt he DOM
      domList = document.getElementById('list');
      // Remove domlists's children if there are any
      while (domList.firstChild) {
        domList.removeChild(domList.lastChild);
      }

      //iterate over the rows of todos from server
      data.rows.forEach(row => {
        
        // Create a div for the todo
        let div = document.createElement('div');
        div.className = 'todo';
        console.log(div.className);
        if (row.done === true) div.className += ' done';
        div.id = row.id;
        div.innerHTML = `${row.name}`;

        // Create a done button for this todo
        let doneButton = document.createElement('button');
        doneButton.id = 'mark-done-' + row.id;
        doneButton.className = 'mark-done';
        doneButton.innerHTML = 'mark done';

        // Create a delete button for this todo
        let deleteButton = document.createElement('button');
        deleteButton.id = 'delete-' + row.id;
        deleteButton.className = 'delete';
        deleteButton.innerHTML = 'delete';

        // append buttons, then append the todo div
        div.appendChild(doneButton);
        div.appendChild(deleteButton);
        console.log(div);
        domList.appendChild(div);
        div = null;
        // add event listeners for the done and delete buttons on this todo
        doneButton.addEventListener('click', markTodoDone, false);
        deleteButton.addEventListener('click', deleteTodo, false);

      }); // End of todo rows looping
      

      // Mark Done (patch) handler
      function markTodoDone(e) {
        console.log('we will makr this done!');
        let id = e.target.id;
        id = id.replace('mark-done-', '');
        fetch(SERVER + '/api/' + id,
            {
              method: 'PATCH',
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ done: true})
            })
          .then(response => response.json())
          .then(data => {
            console.log(`we patched a todo and got this back ${data.rowCount}`);
            fetchTodos();
          });
      }

      // Delete handler
      function deleteTodo(e) {
        let id = e.target.id;
        id = id.replace('delete-', '');
        fetch(SERVER + '/api/' + id,
        {
          method: 'delete',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => {
            console.log(`we deleted a todo and got this back ${data.rowCount}`);
            if (data.rowCount > 0 ) {
              // hide the todo from the dom
              const deDomTodo = document.getElementById(id);
              deDomTodo.remove();
            }
          });
      }


      var createButton = document.querySelector('button#create');

      createButton.addEventListener('click', (e) => {
        // Create a new Todo
        var createTodoContainer = document.getElementById('create-todo');
        while (createTodoContainer.firstChild) {
          createTodoContainer.removeChild(createTodoContainer.lastChild);
        }
        var createInput = document.createElement('input');
        var createSaveButton = document.createElement('button');
        createSaveButton.id = 'create-new-todo';
        createSaveButton.innerHTML = 'Save';
        createInput.id = 'create-new-todo-name';
        createTodoContainer.appendChild(createInput);
        createTodoContainer.appendChild(createSaveButton);
        createSaveButton.addEventListener('click', e => {
          var saveTodoName = document.getElementById('create-new-todo-name');
          console.log(`now we are saving the new todo ${saveTodoName.value}`);
          const postTodo = fetch(SERVER + '/api',
            {
              method: 'post',
              mode: 'cors',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name: saveTodoName.value, done: false})
            })
          .then(response => response.json())
          .then(data => {
            console.log(`we saved a todo and got this back ${data.rowCount}`);
            // Here is where we will remove the new todo field and save button
            createSaveButton.remove();
            createInput.remove();
            //domList.innerHTML = '';
            fetchTodos();
          });
        });
        console.log(`this is us creating a todo`);
      });
    



    })
    .catch(err => {
      console.log(`Error - ${err}`);
    });
};




document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded!');
  fetchTodos();
});
