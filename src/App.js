import './App.scss';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AddTodo from './components/AddTodo';
import Todos from './components/Todos';
import { v4 as uuidV4 } from 'uuid';
import { getTodos, createTodo, deleteTodo, patchTodo } from './api/todo';

let defaultTodos = [
  {
    id: uuidV4(),
    title: 'Eat',
    isDone: false,
    isEdit: false,
  },
  {
    id: uuidV4(),
    title: 'Sleep',
    isDone: false,
    isEdit: false,
  },
  {
    id: uuidV4(),
    title: 'Study',
    isDone: true,
    isEdit: false,
  },
];

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [inputValue, setInputValue] = useState('');

  const numOfRemaining = todos.filter(todo => !todo.isDone).length;

  useEffect(()=>{
    // getTodos().then((data)=>console.log('data', data));


    createTodo().then((data)=>console.log('data', data));

    getTodos().then(data => console.log('data', data));

    getTodos().then(data => console.log('data', data));
  },[]);

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
          isEdit: false,
        },
      ];
    });

    setInputValue('');
  };

  const handleKeyUpAdd = (e) => {
    if (inputValue.length && e.keyCode === 13) {
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

  const handleIsEdit = ({id, isEdit}) => () => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, isEdit };
      });
    });
  };
  // const handleEditDone = id => (e) => {
  //   if (inputUpdate.length && e.keyCode === 13) {
  //     e.preventDefault();
  //     setTodos(prevTodos => {
  //       return prevTodos.map(todo => {
  //         if (todo.id !== id) {
  //           return todo;
  //         } else {
  //           return {
  //             ...todo,
  //             title: inputUpdate,
  //             editable: false,
  //           };
  //         }
  //       });
  //     });
  //   }
  // };

  const handleEditDone = payload => {
    const { id, title } = payload;

    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id !== id) {
          return todo;
        }
        return { ...todo, title, isEdit: false };
      }),
    );
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
    setTodos([]);
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
        handleIsEdit={handleIsEdit}
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
