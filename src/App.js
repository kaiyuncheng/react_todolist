import './App.scss';
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import { v4 as uuidV4 } from 'uuid';

let defaultTodos = [
  {
    id: uuidV4(),
    title: 'Eat',
    isDone: false,
    editable: false,
  },
  {
    id: uuidV4(),
    title: 'Sleep',
    isDone: false,
    editable: false,
  },
  {
    id: uuidV4(),
    title: 'Study',
    isDone: true,
    editable: false,
  },
];

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [inputValue, setInputValue] = useState('');
  const [inputUpdate, setInputUpdate] = useState('');

  const numOfRemaining = todos.filter(todo => !todo.isDone).length;

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleAdd = () => {
    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: uuidV4(),
          title: inputValue,
          isDone: false,
          editable: false,
        },
      ];
    });

    setInputValue('');
  };

  const handleKeyUpAdd = (e) => {
    if (inputValue.length && e.keyCode === 13) {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleIsDone = id => () => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id !== id) {
          return todo;
        } else {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
      });
    });
  };

  const handleInputUpdate = e => {
    setInputUpdate(e.target.value);
  };

  const handleEditable = id => () => {

    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          setInputUpdate(todo.title);
          return {
            ...todo,
            editable: !todo.editable,
          };
        } else {
          return {
            ...todo,
            editable: false,
          };
        }
      });
    });

  };
  const handleEditDone = id => (e) => {
    if (inputUpdate.length && e.keyCode === 13) {
      e.preventDefault();
      setTodos(prevTodos => {
        return prevTodos.map(todo => {
          if (todo.id !== id) {
            return todo;
          } else {
            return {
              ...todo,
              title: inputUpdate,
              editable: false,
            };
          }
        });
      });

      setInputValue('');
    }
  };

  const handleDelete = id => () =>{
    setTodos((prevTodos)=>{
      return prevTodos.filter(todo => todo.id !== id)
    });
  };

  const handleDeleteDone = () => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.isDone === false);
    });
  };

  const handleDeleteAll = () => {
    setTodos(prevTodos => {
      return prevTodos = [];
    });
  };

  return (
    <div className="app">
      <Header />
      <AddTodo
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        handleAdd={handleAdd}
        handleKeyUpAdd={handleKeyUpAdd}
      />
      <Todos
        todos={todos}
        handleIsDone={handleIsDone}
        handleDelete={handleDelete}
        inputUpdate={inputUpdate}
        handleInputUpdate={handleInputUpdate}
        handleEditable={handleEditable}
        handleEditDone={handleEditDone}
      />
      <Footer
        numOfRemaining={numOfRemaining}
        handleDeleteAll={handleDeleteAll}
        handleDeleteDone={handleDeleteDone}
      />
    </div>
  );
}

export default App;
