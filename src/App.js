import React from 'react';
import './App.css';
import TodoForm from './components/todoForm'

function App() {

  return (
    <div className="Todo-List">
      <h1>Todo List</h1>
        <TodoForm/>
    </div>
  );
}

export default App;
