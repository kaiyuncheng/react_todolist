import TodoItem from './TodoItem';

const Todos = ({
  todos,
  handleIsDone,
  handleDelete,
  handleIsEdit,
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
            handleIsEdit={handleIsEdit}
            handleEditDone={handleEditDone}
          />
        );
      })}
    </div>
  );
};

export default Todos;
