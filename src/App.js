import './App.css';
import React, { useState } from 'react';

function App() {
  const [todolist, setTodolist] = useState([]);

  const saveToDoList = (event) => {
    event.preventDefault();
    let toname = event.target.toname.value.trim();

    if (toname === '') {
      alert('Please enter a todo name.');
      return;
    }

    if (!todolist.includes(toname)) {
      let finalDoList = [...todolist, toname];
      setTodolist(finalDoList);
    } else {
      alert('Todo Name Already exists....');
    }

    event.target.toname.value = ''; 
  };

  const list = todolist.map((value, index) => (
    <ToDoListItems
      value={value}
      key={index}
      indexNumber={index}
      todolist={todolist}
      setTodolist={setTodolist}
    />
  ));

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={saveToDoList} >
        <textarea type="text" name="toname" placeholder="Enter todo..." className="textarea"></textarea>
        <br />
        <button>Save</button>
      </form>
      <div className="outerDiv">
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

function ToDoListItems({ value, indexNumber, todolist, setTodolist }) {
  const [status, setStatus] = useState(false);

  const deleteRow = (index) => {
    const finalData = todolist.filter((_, i) => i !== index);
    setTodolist(finalData);
  };

  const checkStatus = () => {
    setStatus(!status);
  };

  return (
    <li
      className={status ? 'completetodo' : ''}
      onClick={checkStatus}
      style={{ cursor: 'pointer' }}
    >
      {indexNumber + 1}. {value}
      <span
        onClick={(e) => {
          e.stopPropagation(); 
          deleteRow(indexNumber);
        }}
        style={{
          marginLeft: '10px',
          color: 'red',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        &times;
      </span>
    </li>
  );
}

export default App;
