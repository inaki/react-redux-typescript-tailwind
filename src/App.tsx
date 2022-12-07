import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, editTodo, removeTodo } from "./features/todosSlice";

export default function App() {
  const [todo, setTodo] = useState("");
  const [todoInput, setTodoInput] = useState("");
  const [editing, setEditing] = useState({ id: "", status: false });
  const todos = useSelector((state: any) => state.todos.todos);
  const dispatch = useDispatch();

  const handleEdit = (id: string) => {
    setEditing({ id, status: true });
    // dispatch(edittodo(id));
  };

  return (
    <div className="container m-auto w-1/2 p-6">
      <h1 className="mb-4">todos</h1>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a todo"
      />
      <button
        className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
        onClick={() => {
          dispatch(
            addTodo({ id: `${Date.now()}`, content: todo, checked: false })
          );
          setTodo("");
        }}
      >
        Add todo
      </button>

      <hr className="mb-4 mt-4" />

      {todos &&
        todos.map((todo: { id: string; content: string; checked: boolean }) => {
          return (
            <div
              key={todo.id}
              className="group flex justify-between items-center my-5"
            >
              {editing && editing.id === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    placeholder={todo.content}
                  />
                  <button
                    className="text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
                    onClick={() => {
                      dispatch(
                        editTodo({
                          id: todo.id,
                          content: todoInput,
                          checked: false,
                        })
                      );
                      setEditing({ id: "", status: false });
                      setTodoInput("");
                    }}
                  >
                    update
                  </button>
                </div>
              ) : (
                <div className="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    onChange={() =>
                      dispatch(
                        editTodo({
                          id: todo.id,
                          content: todo.content,
                          checked: !todo.checked,
                        })
                      )
                    }
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className={`ml-2 text-sm font-medium text-gray-900 ${
                      todo.checked && "line-through"
                    }`}
                  >
                    {todo.content}
                  </label>
                </div>
              )}
              {!editing.status && (
                <span className="hidden group-hover:block">
                  <button
                    className="text-yellow-600"
                    onClick={() => handleEdit(todo.id)}
                  >
                    Edit
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    className="text-red-600"
                    onClick={() => dispatch(removeTodo(todo.id))}
                  >
                    Delete
                  </button>
                </span>
              )}
            </div>
          );
        })}
    </div>
  );
}
