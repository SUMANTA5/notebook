import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "624e86e002377e5f953ee0fd",
      user: "624e7d2902377e5f953ee0fb",
      title: "my note",
      description: "my note description",
      tag: "personal",
      date: "2022-04-07T06:38:24.171Z",
      __v: 0,
    },
    {
      _id: "624e8d1802377e5f953ee0ff",
      user: "624e7d2902377e5f953ee0fb",
      title: "my note in 2",
      description: "my note description in 2",
      tag: "personal",
      date: "2022-04-07T07:04:56.576Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
