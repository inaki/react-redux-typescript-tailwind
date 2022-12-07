import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  content: string;
  checked: boolean;
}

export interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [{ id: "1", content: "This is a note", checked: false }],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((note) => note.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (note) => note.id === action.payload.id
      );
      state.todos[index] = action.payload;
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todosSlice.actions;

export default todosSlice.reducer;
