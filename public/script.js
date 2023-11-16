const dateContainer = document.querySelector('.date');
const listContainer = document.getElementById('list-container');
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const wrapper = document.querySelector('.wrapper');

function todoObject(num, value) {
    return {
        num: num,
        todo: value,
        finish: false,
    };
}

function finishedTodo () {
    
}

function saveLocalStorage() {
    let localArray = JSON.parse(localStorage.getItem('todos')) || [];
    let todoObj = todoObject(localArray.length, todoInput.value);
    localArray.push(todoObj);
    localStorage.setItem('todos', JSON.stringify(localArray));
}

function removeTodoFromLocalStorage(index) {
    let localArray = JSON.parse(localStorage.getItem('todos')) ;
    localArray.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(localArray));
}

function renderTodo() {
    const localArray = JSON.parse(localStorage.getItem('todos')) || [];
    listContainer.innerHTML = localArray
        .map((todo, index) => `<li class="list-item" data-index="${index}"><span class="check"><i class="fa-regular fa-clock ${todo.finish ? 'hide' : ''}"></i><i class="fa-solid fa-check ${todo.finish ? '' : 'hide'}"></i></span><p class="${todo.finish ? 'done' : ''}">${todo.todo}</span></p><i class="fa-solid fa-x"></i></li>`)
        .join('');
}

function dateAndTime() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
    dateContainer.innerHTML = `<p>${formattedDate}</p>`;
}

function addList() {
    const localArray = JSON.parse(localStorage.getItem('todos')) || [];
    const index = localArray.length;
    let listHTML = `<li class="list-item" data-index="${index} "><span class="check"><i class="fa-regular fa-clock"></i><i class="fa-solid fa-check hide"></i></span><p>${todoInput.value}</p><i class="fa-solid fa-x"></i></li>`;
    listContainer.insertAdjacentHTML('beforeend', listHTML);
    saveLocalStorage();
    todoInput.value = '';
}

function scrollToAddedList() {
    wrapper.scrollIntoView({ behavior: 'smooth' });
}

function deleteList(index) {
    removeTodoFromLocalStorage(index);
    renderTodo();
}

dateAndTime();
setTimeout(() => {
    renderTodo();
}, 2500);

addBtn.addEventListener('click', () => {
    if (todoInput.value) {
        addList();
        scrollToAddedList();
    } else {
        alert('Please write something');
    }
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInput.value) {
        addList();
        scrollToAddedList();
    }
});

listContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-x')) {
        let index = e.target.closest('.list-item').dataset.index;
        deleteList(index);
    }

    if (e.target.classList.contains('fa-check') || e.target.classList.contains('fa-clock')) {
        const iTags = e.target.closest('.check')
        console.log(iTags);
        const todoIndex = e.target.closest('.list-item').dataset.index;
        let localArray = JSON.parse(localStorage.getItem('todos'))
        localArray.forEach((todo, index) => {
            if(todoIndex == index) {
                todo.finish = !todo.finish
                localStorage.setItem('todos', JSON.stringify(localArray))
                renderTodo()
            }
        });
        

        // iTags.forEach((i) => {
        //     i.classList.toggle('hide');

        // });
        // e.target.closest('.list-item').querySelector('p').classList.toggle('done');

        
    }
});

todoInput.addEventListener('focus', () => {
    todoInput.placeholder = '';
});

todoInput.addEventListener('blur', () => {
    todoInput.placeholder = 'Add your task';
});
