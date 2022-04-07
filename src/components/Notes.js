import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext";
export const Notes = () => {
    const context = useContext(noteContext);
    const {notes,setNotes} = context;
  return (
    <div>
        <div className="container my-3">
      <h2>You Notes</h2>
      {notes.map((note)=>{
        return note.title;
      })}
      </div>
    </div>
  )
}
