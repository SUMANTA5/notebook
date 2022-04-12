import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Add note
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZTdkMjkwMjM3N2U1Zjk1M2VlMGZiIn0sImlhdCI6MTY0OTMxMTAxN30.LqgaTmZ2jtTmuT7aOBGJKS_dkpdHs1ArxLh7YTY90g8",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // gat all note
  const gatNotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchallnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZTdkMjkwMjM3N2U1Zjk1M2VlMGZiIn0sImlhdCI6MTY0OTMxMTAxN30.LqgaTmZ2jtTmuT7aOBGJKS_dkpdHs1ArxLh7YTY90g8",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Delete note
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZTdkMjkwMjM3N2U1Zjk1M2VlMGZiIn0sImlhdCI6MTY0OTMxMTAxN30.LqgaTmZ2jtTmuT7aOBGJKS_dkpdHs1ArxLh7YTY90g8",
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI0ZTdkMjkwMjM3N2U1Zjk1M2VlMGZiIn0sImlhdCI6MTY0OTMxMTAxN30.LqgaTmZ2jtTmuT7aOBGJKS_dkpdHs1ArxLh7YTY90g8",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    //logic to edit in client

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, gatNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
