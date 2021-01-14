import TodoItem from './TodoItem';

const Todos = ({
  todos,
  handleIsDone,
  handleDelete,
  inputUpdate,
  handleInputUpdate,
  handleEditable,
  handleEditDone,
}) => {
  return (
    <div className="todos">
      {todos.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleIsDone={handleIsDone}
            handleDelete={handleDelete}
            inputUpdate={inputUpdate}
            handleInputUpdate={handleInputUpdate}
            handleEditable={handleEditable}
            handleEditDone={handleEditDone}
          />
        );
      })}
    </div>
  );
};

export default Todos;
