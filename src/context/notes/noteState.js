import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props)=>{
    const host ="http://localhost:5000"
    const initialNotes=[];
        
    const [notes, setNotes]=useState(initialNotes)
    
    const getNote=async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",

        },
       
        
      });
      const json= await response.json()
      console.log(json)
      setNotes(json)
        
    }

    const addNote = async (title, description, tag) => {
      // TODO: API Call
      // API Call 
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
       
      console.log("Adding a new note")
      const note = await response.json();
       
      setNotes(notes.concat(note))
    }
    const deleteNote=async (_id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",

        },
       
       
      });
      const json= response.json();
      console.log(json)

        console.log("Deleting the node with id"+_id)
        const newNote=notes.filter((notes=>{return notes._id!==_id} ))
        setNotes(newNote)
    }
    const editNote=async (_id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        
        headers: {
          "auth-token": localStorage.getItem('token'),
          "Content-Type": "application/json",

        },
       
        body: JSON.stringify({title,description,tag}), 
      });
      const json= await response.json(); 

        for(let index=0;index<notes.length;index++){
          const element=notes[index]
          if(element._id===_id){
            notes[index].title=title;
            notes[index].description=description
            notes[index].tag=tag;
            break;
          }
        }
        setNotes([...notes])
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;