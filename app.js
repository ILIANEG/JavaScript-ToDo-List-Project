const addForm = document.querySelector('.addForm');
var originalTodos = [];

addForm.addEventListener('submit', e => {
    e.preventDefault();
    let newTodo = addForm.addTodo.value;
    let todos = document.querySelector('.todos');
    if (document.querySelector('#placeholder') != null) {
        document.querySelector('#placeholder').remove();
    }
    todos.innerHTML += '<li class="list-group-item">' +newTodo + 
            '<i style="float: right" class="fas fa-trash-alt"></i></li>';
    const deleteTodo = Array.from(document.querySelectorAll('i'));
    //attaching event listener to delete elements in to-do list
    deleteTodo.forEach(todo => {
        todo.addEventListener('click', e => {
            e.target.parentElement.remove();
            if (document.querySelector('i') === null && originalTodos.length === 0) {
                document.querySelector('.todos').innerHTML = 
                '<p id="placeholder" class="text-center my-3 text-muted"><em>Add some Todos</em></p>'; 
            } else if (document.querySelector('i') === null && originalTodos.length != 0) {
                originalTodos = originalTodos.filter(todo => {
                    return !(todo === e.target.parentElement)
                });
                document.querySelector('.todos').innerHTML = 
                '<p id="placeholder" class="text-center my-3 text-muted"><em>Found no match</em></p>';
            }
            });
    });
    //delete the string in add new todo field
    addForm.addTodo.value = '';
    });

const searchForm = document.querySelector('.search');

//saves the original list of elementa in todo listconsole.log("here");
function updateMem() {
    if (originalTodos.length === 0) {
        originalTodos = Array.from(document.getElementsByClassName('list-group-item'));
    }
}

function searchUp() {
    if (originalTodos.length != 0) {
        var val = document.getElementById('searchField').value;
        let newTodoList = originalTodos.filter(todo => {
            return todo.innerText.slice(0, val.length) === val
        });
        if (newTodoList.length <= 0) {
            document.querySelector('.todos').innerHTML = 
                '<p id="placeholder" class="text-center my-3 text-muted"><em>Found no match</em></p>';
        } else {
            document.querySelector('.todos').innerHTML = '';
            newTodoList.forEach(newTodo => {
                document.querySelector('.todos').appendChild(newTodo);
            });
        }
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('.todos').innerHTML = '';
    originalTodos.forEach(originalTodo => {
        document.querySelector('.todos').appendChild(originalTodo);
    });
    originalTodos = [];
    document.querySelector('#searchField').value = '';
    document.querySelector('.newTodo').focus();
});

window.onbeforeunload = function() {
    document.querySelector('.search').reset();
    document.querySelector('.addForm').reset();
}