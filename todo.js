//variaveis
let todoItems = []
const todoInput = document.querySelector('.todo-input')
const completedTodosDiv = document.querySelector('.completed-todos')
const uncompletedTodosDiv = document.querySelector('.uncompleted-todos')
const audio = new Audio ('sound-task.mp3')

// Get todo list

window.onload = () => {
    let storageTodoItems = localStorage.getItem('todoItems')
    if (storageTodoItems !== null){
        todoItems = JSON.parse(storageTodoItems)
    }

    render()
}

//Get the type input
todoInput.onkeyup = ((e)=> {
    let value = e.target.value.replace(/^\s+/, "")
    if (value && e.keyCode === 13){ //enter
        addTodo(value)

        todoInput.value = ''
        todoInput.focus()

    }
})

//add todo

 function addTodo(text){
    todoItems.push({
    id: Date.now(),
    text,
    completed: false
 })

saveAndRender()

}

//remove todo

function removetodo(id){
    todoItems = todoItems.filter(todo => todo.id !== Number(id))
    saveAndRender()
}

//mark as completed

function markAscompleted(id){
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = true
    }
        return todo
    })
    audio.play()

    saveAndRender()
}

//mark as uncompleted

function markAsUncompleted(id){
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)){
            todo.completed = false
    }
        return todo
    })


    saveAndRender()
}

//save in localstorage

function save(){
    localStorage.setItem('todoItems', JSON.stringify(todoItems))
}

//render
function render(){
 let unCompletedTodos = todoItems.filter(item => !item.completed)
 let completedTodos = todoItems.filter(item => item.completed)

completedTodosDiv.innerHTML = ''
uncompletedTodosDiv.innerHTML = ''

if(unCompletedTodos.length > 0) {
    unCompletedTodos.forEach(todo => {
    uncompletedTodosDiv.append(createTodoElement(todo))
})
}
else{
    uncompletedTodosDiv.innerHTML = `<div class = 'empty'>No uncompleted mission</div>`
}

if(completedTodos.length > 0) {
    completedTodosDiv.innerHTML =`<div class='completed-title'>Completed (${completedTodos.length} / ${todoItems.length})</div>`
    
    completedTodosDiv.forEach(todo => {
        completedTodosDiv.append(createTodoElement(todo))
    })

}
}




//save and render
function saveAndRender(){
    save()
    render()
}

//create todo list item

function createTodoElement(todo){
//criar container tarefa
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id', todo.id)
    todoDiv.className = 'todo-item'

    //criar  texto
    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text

    //criar  checkbox
    const todoInputCheckbox = document.createElement('input')
    todoInputCheckbox.type = 'checkbox'
    todoInputCheckbox.checked = todo.completed
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked?markAscompleted(id) : markAsUncompleted(id)
}






//fechar tarefa

const todoRemoveBtn = document.createElement('a')
todoRemoveBtn.href = '#'
todoRemoveBtn.innerHTML = `<svg fill="#808080" 
height="100px"
width="100px" 
version="1.1"
id="Capa_1" 
xmlns="http://www.w3.org/2000/svg" 
xmlns:xlink="http://www.w3.org/1999/xlink" 
viewBox="0 0 460.775 460.775" 
xml:space="preserve" 
stroke="#808080">
<g id="SVGRepo_bgCarrier" 
stroke-width="0">
</g>
<g id="SVGRepo_tracerCarrier" 
stroke-linecap="round"
stroke-linejoin="round"
stroke="#CCCCCC" 
stroke-width="0.9215500000000001"></g>
<g id="SVGRepo_iconCarrier"> 
<path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z">
</path></g>
</svg>`


todoRemoveBtn.onclick = (e) => {
    let id = e.target.closest('.todo-item').dataset.id
    removetodo(id)
}



todoDiv.prepend(todoInputCheckbox)
todoDiv.appendChild(todoTextSpan)
todoDiv.appendChild(todoRemoveBtn)

return todoDiv
}