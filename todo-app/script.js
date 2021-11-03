const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todos = document.querySelector('.todos');
loadtodo();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
})

function addTodo(tod) {
    let todo = input.value;
    if (tod) {
        todo = tod.text;
    }

    if (todo) {
        const todoEl = document.createElement('li');
        if (tod && tod.completed) {
            todoEl.classList.add('completed');
        }
        todoEl.innerHTML = `<div class="text">
                                <i class="far fa-check-circle"></i>
                                <p class="todo-text">${todo}</p>
                            </div>
                            <i class="fas fa-times"></i>
                            `
        if (tod && tod.completed) {
            const tt = todoEl.querySelector('.todo-text');
            const ic = todoEl.querySelector('.far.fa-check-circle');
            ic.classList.toggle('view');
            tt.classList.toggle('completed');
        }
        todoEl.addEventListener("click", (e) => {
            e.preventDefault();
            const tt = todoEl.querySelector('.todo-text');
            const ic = todoEl.querySelector('.far.fa-check-circle');
            ic.classList.toggle('view');
            tt.classList.toggle('completed');
            todoEl.classList.toggle('completed');
            updateLS();
        })
        todoEl.addEventListener("mouseenter", (e) => {
            e.preventDefault();
            const icon = todoEl.querySelector('.fas.fa-times')
            icon.classList.toggle('view');
            icon.addEventListener("click", (e) => {
                e.preventDefault();
                todoEl.remove()
                updateLS();
            })
        })
        todoEl.addEventListener("mouseleave", (e) => {
            e.preventDefault();
            const icon = todoEl.querySelector('.fas.fa-times')
            icon.classList.toggle('view');
        })
        todos.appendChild(todoEl);
        input.value = "";
        updateLS();
    }
}

function updateLS() {
    const todoEls = document.querySelectorAll('li');
    const tdarray = [];
    todoEls.forEach((todoEL) => {
        tdarray.push({
            text: todoEL.innerText,
            completed: todoEL.classList.contains('completed'),
        });
    });
    localStorage.setItem("todos", JSON.stringify(tdarray));
}

function loadtodo() {
    const alltodos = JSON.parse(localStorage.getItem('todos'));
    if (alltodos){
        alltodos.forEach(td => {
            addTodo(td)
        })
    }
}