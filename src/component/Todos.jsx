import { updateTodoState } from "../service/TodoService";

function Todos({ todos, fetchTodos }) {
  async function completeStateChange(id, state) {
    try {
      const response = await updateTodoState(id, state);
      if (response.status === 200) {
        // console.log(data);
        fetchTodos();
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (<section className="mt-4 max-h-40 min-h-40 overflow-y-auto">
    {todos.map(todo =>
      <div className="flex gap-4 items-center hover:bg-gray-100" key={todo.id} onClick={() => completeStateChange(todo.id, !todo.completed)}
      role="button">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeStateChange(todo.id, !todo.completed)}
        />
        <p className={todo.completed ? "line-through" : ""} >{todo.title}</p>
      </div>
    )}
  </section>)

}

export default Todos;






























