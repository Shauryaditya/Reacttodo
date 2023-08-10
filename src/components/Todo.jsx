import React from 'react'

const Todo = ({text,todo,todos,setTodos,startTimer}) => {

    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id))
    }
    const completeHandler = () => {
      setTodos(todos.map((item) => {
        if(item.id === todo.id){
          return {
            ...item, completed: !item.completed
          };
       }
       return item;
      }))
    }

    const handleStartTimer = () => {
      startTimer(todo.id, todo.timer);
    };

    const getFormattedTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };
  return (
    <div className="todo">
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
        <button onClick={completeHandler} className='complete-btn'><i className='fas fa-check'></i></button>
        <button onClick={deleteHandler} className='trash-btn'><i className='fas fa-trash'></i></button>
        <button onClick={handleStartTimer}>Start Timer</button>
      
        <div className="stopwatch">{getFormattedTime(todo.elapsedTime)}</div>
   
    </div>
  )
}

export default Todo