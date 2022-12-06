import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Note {
  id: string;
  content: string;
}

export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [{ id: "1", content: "This is a note" }],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      state.notes[index] = action.payload;
    },
  },
});

export const { addNote, removeNote, editNote } = notesSlice.actions;

export default notesSlice.reducer;
