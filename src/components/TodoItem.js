import clsx from 'clsx';
const TodoItem = ({
  todo,
  handleIsDone,
  handleDelete,
  inputUpdate,
  handleInputUpdate,
  handleEditable,
  handleEditDone
}) => {
  return (
    <div
      className={clsx('task-item', { done: todo.isDone, edit: todo.editable })}
    >
      <div className="task-item-checked">
        <span className="icon icon-checked" onClick={handleIsDone(todo.id)} />
      </div>
      <div className="task-item-body" onDoubleClick={handleEditable(todo.id)}>
        <span className="task-item-body-text">{todo.title}</span>
        <input
          className="task-item-body-input"
          type="text"
          placeholder={`修改 ${todo.title}`}
          value={inputUpdate}
          onChange={handleInputUpdate}
          onKeyUp={handleEditDone(todo.id)}
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
