import { useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  
    const s1 = {
        "name": "sumanta",
        "class": "5b"
    }
    const[state, setState] = useState(s1)

   const update = ()=>{
        setTimeout(() => {
            setState({
                "name": "susanta",
                "class": "10b"
            })
        }, 1000);
    }
    return(
        <NoteContext.Provider value ={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;