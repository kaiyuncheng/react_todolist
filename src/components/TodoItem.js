import clsx from 'clsx';
import React, { useState } from 'react';

const TodoItem = ({
  todo,
  handleIsDone,
  handleDelete,
  handleIsEdit,
  handleEditDone
}) => {

  const [tempInput, setTempInput] = useState(todo.title);

  const handleChange = e => {
    setTempInput(e.target.value);
  };

  const handleKeyUp = e => {
    const trimInput = tempInput.trim();
    if (e.keyCode === 13 && trimInput.length !== 0) {
      handleEditDone({
        id: todo.id,
        title: trimInput,
      });
      setTempInput(trimInput);
    } 
    
    if (e.keyCode === 27) {
      setTempInput(todo.title);
      handleIsEdit({ id: todo.id, isEdit: false })();
    }
  };

  return (
    <div
      className={clsx('task-item', { done: todo.isDone, edit: todo.isEdit })}
    >
      <div className="task-item-checked">
        <span className="icon icon-checked" onClick={handleIsDone(todo.id)} />
      </div>
      <div
        className="task-item-body"
        onDoubleClick={handleIsEdit({ id: todo.id, isEdit: true })}
      >
        <span className="task-item-body-text">{todo.title}</span>
        <input
          className="task-item-body-input"
          type="text"
          placeholder={`修改 ${todo.title}`}
          value={tempInput}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
      <div className="task-item-action">
        <button
          className="btn-reset btn-destroy icon"
          onClick={handleDelete(todo.id)}
        >
          {' '}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
