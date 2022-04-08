import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "624e86e0023727e5f953ee0fd",
      user: "624e7d2902377e5f953ee0fb",
      title: "my note",
      description: "my note description",
      tag: "personal",
      date: "2022-04-07T06:38:24.171Z",
      __v: 0,
    },
    {
      _id: "624e8d18023778e5f953ee0ff",
      user: "624e7d2902377e5f953ee0fb",
      title: "my note in 2",
      description: "my note description in 2",
      tag: "personal",
      date: "2022-04-07T07:04:56.576Z",
      __v: 0,
    },
    {
      _id: "624e86e002377e53f953ee0fd",
      user: "624e7d2902377e5f953ee0fb",
      title: "my note",
      description: "my note description",
      tag: "personal",
      date: "2022-04-07T06:38:24.171Z",
      __v: 0,
    },
    {
      _id: "624e8d1802377e785f953ee0ff",
      user: "624e7d2902377e5f953ee0fb",
      title: "my note in 2",
      description: "my note description in 2",
      tag: "personal",
      date: "2022-04-07T07:04:56.576Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add note

  const addNote = (title, description, tag) => {
    console.log("adding a note");
    const note = {
      _id: "624e8d1802377e785f953ee0ff",
      user: "624e7d2902377e5f953ee0fb",
      title: title,
      description: description,
      tag: tag,
      date: "2022-04-07T07:04:56.576Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  // Delete note

  const deleteNote = () => {};
  // Edit note

  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
