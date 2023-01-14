// 1) Elements selection

const todoForm = document.querySelector("#todo-form"); // is the whole form
const todoInput = document.querySelector("#todo-input"); //input field for the new tasks
const todoList = document.querySelector("#todo-list"); // list of all todos
const editForm = document.querySelector("#edit-form"); //it is a hiden form that edits the todos 
const editInput = document.querySelector("#edit-input"); //hiden form that edits the todos 
const cancelEditBtn = document.querySelector("#cancel-edit-btn"); //the button that cancel the edit

let oldInputValue;

//2) Functions
// the function bellow is a arrow function
const saveTodo = (text) => {
    const todo = document.createElement("div");  //create the external div of your todo
    todo.classList.add("todo");   //add the class todo to this div

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;  //todo text coming from input 
    todo.appendChild(todoTitle);

    //console.log(todo)

    //add the buttons
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    //add the current todo to the list of all todos 
    todoList.appendChild(todo);

    //clean the input field after the todo was added
    todoInput.value = "";

    //use the focus method for the user to be able to start typing in the input field immediately, without having to click on it first.
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

//function to update the todo. it receives as input the editInputValue.
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");  //get the content(title) of the todo

        console.log(todoTitle, text);

        //compare the old value with the new one. If it is the same content, it means it is the one that should be modified
        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
};

//3) Events 

todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); //formular is not going to be sent when btn is pressed

    const inputValue = todoInput.value;

    //validation to make sure the user is not creating a task without a title
    if (inputValue) {
        //console.log(inputValue);
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;   //those should be the button icons (finish, edit or remove)
    const parentEl = targetEl.closest("div"); //finds the closest div from this button
    let todoTitle;   //let` is a signal that the variable may be reassigned, such as a counter in a loop,


    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    //check class name from the closest div to know which kind of button i was clicking on
    if (targetEl.classList.contains("finish-todo")) {
        //console.log("Done button was clicked");
        parentEl.classList.toggle("done");  //here instead of add i use the "toggle", if the element has the class it will take it out, with it does not have it will add it 
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        //when you click in edit, you have to use the toggleForms to hide the input field
        toggleForms();

        editInput.value = todoTitle;  //change the value displayed in the input field
        oldInputValue = todoTitle; //save this value in the memory
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    //the preventDefault prevents that the default action that belongs to the event will occur.
    e.preventDefault();

    toggleForms();
});

//Event to save the changes made in an specific the todo 
editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const editInputValue = editInput.value;  //saves what is in the input field in a variable

    //check if the input field is not empty
    if (editInputValue) {
        //function to update the curret todo
        updateTodo(editInputValue);
    }

    toggleForms();

});