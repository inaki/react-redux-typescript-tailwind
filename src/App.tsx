import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNote, editNote, removeNote } from "./features/notesSlice";

export default function App() {
  const [note, setNote] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [editing, setEditing] = useState({ id: "", status: false });
  const notes = useSelector((state: any) => state.notes.notes);
  const dispatch = useDispatch();

  const handleEdit = (id: string) => {
    setEditing({ id, status: true });
    // dispatch(editNote(id));
  };

  return (
    <div className="container m-auto w-1/2 p-6">
      <h1 className="mb-4">Notes</h1>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note"
      />
      <button
        className="text-blue-500 hover:text-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          dispatch(addNote({ id: `${Date.now()}`, content: note }));
          setNote("");
        }}
      >
        Add Note
      </button>

      <hr className="mb-4 mt-4" />

      {notes &&
        notes.map((note: { id: string; content: string }) => {
          return (
            <div
              key={note.id}
              className="group flex justify-between items-center my-5"
            >
              {editing && editing.id === note.id ? (
                <div>
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder={note.content}
                  />
                  <button
                    className="text-blue-500 hover:text-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      dispatch(editNote({ id: note.id, content: noteInput }));
                      setEditing({ id: "", status: false });
                      setNoteInput("");
                    }}
                  >
                    update
                  </button>
                </div>
              ) : (
                <div>{note.content}</div>
              )}
              {!editing.status && (
                <span className="hidden group-hover:block">
                  <button
                    className="text-yellow-600"
                    onClick={() => handleEdit(note.id)}
                  >
                    Edit
                  </button>
                  <span className="mx-2">|</span>
                  <button
                    className="text-red-600"
                    onClick={() => dispatch(removeNote(note.id))}
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
