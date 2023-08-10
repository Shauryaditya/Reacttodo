import React from 'react'
import Todo from './Todo'
const TodoList = ({todos,setTodos, filteredTodos,startTimer}) => {

   console.log("Todos >>>", filteredTodos);
  return (
    <div className="todo-container">
    <ul className="todo-list">
     {
      filteredTodos?.map((todo) =>(
       <Todo 
       key={todo.id}
       setTodos={setTodos}
       todos={todos}
       todo={todo} 
       text={todo.text} 
       startTimer={startTimer}/> 
      )
     )}
    </ul>
  </div>
  )
}

export default TodoList