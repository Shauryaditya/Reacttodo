import React, {useState,useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputText,setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  },[])
  useEffect (() => {
    filterHandler();
    saveLocalTodos();
  }, [todos,status]);

  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
        case 'uncompleted':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
          default:
            setFilteredTodos(todos);
            break;
    }
  }

  const saveLocalTodos = () =>{
  
      localStorage.setItem("todos", JSON.stringify(todos));
    
  };

  const getLocalTodos =() => {
    if (localStorage.getItem("todos") ===null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
     let todoLocal= JSON.parse(localStorage.getItem("todos"));
     setTodos(todoLocal);
    }
  }

 // Inside your App component
const startTimer = (todoId) => {
  // Update the todo's elapsed time every second
  const timerInterval = setInterval(() => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? { ...todo, elapsedTime: (todo.elapsedTime || 0) + 1 }
          : todo
      )
    );
  }, 1000);

  // Save the timer interval ID in the todo object
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === todoId ? { ...todo, timerInterval } : todo
    )
  );
};

// Inside your useEffect to clean up the timer intervals
useEffect(() => {
  return () => {
    todos.forEach((todo) => {
      if (todo.timerInterval) {
        clearInterval(todo.timerInterval);
      }
    });
  };
}, []);

  return (
    <div className="App">
      <header>
    <h1>TODO APP</h1>
    </header>
    <Form 
    inputText={inputText} 
    todos={todos}
     setTodos = {setTodos} 
     setInputText={setInputText} 
     setStatus={setStatus} />
    <TodoList 
    setTodos={setTodos} 
    todos={todos} 
    filteredTodos={filteredTodos}
    startTimer={startTimer} />
    </div>
  );
}

export default App;
