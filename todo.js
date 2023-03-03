//variaveis
let todoItems = []
const todoInput = document.querySelector('.todo-input')
const completedTodosDiv = document.querySelector('.completed-todos')
const uncompletedTodosDiv = document.querySelector('.uncompleted-todos')
const audio = new Audio ('sound-task.mp3')

// funcao de obter a lista de tarefas

window.onload = () => {
    let storageTodoItems = localStorage.getitem('todoItems')
    if (storageTodoItems !== null){
        todoItems = JSON.parse (storageTodoItems)
    }

    render()
}

//Recebe info da entrada de texto
todoInput.onkeyup = ((e)=> {
    let value = e.target.value.replace(/^\s+/,"")
    if (value && e.keyCode === 13){ //enter
        addTodo(value)
        todoInput.value = ''
        todoInput.focus()

    }
})

//adicionar tarefa
 function addTodo(text){
 todoItems.push({
    id: Date.now(),
    text,
    completed: false
 })

saveAndRender()

}

//remover tarefa
function removetodo(id){}

//selecionar  tarefa completa
function markAscompleted(id){}

//selecionar  tarefa nao feita
function markAsUncompleted(id){}

//save das tarefas
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
    completedTodosDiv.append(createTodoElement(todo))
})
}else{
    
}

}




//save and render
function saveAndRender(){
    save()
    render()
}

//criar tarefa

function createTodoElement(todo){}