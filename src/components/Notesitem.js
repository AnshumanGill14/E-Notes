import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Notesitem = (props) => {
    const context= new useContext(noteContext)
  const {deleteNote}= context
    const { notes, updateNote } = props
    return (
        <div className='col-md-3 my-2 '>
            <div className="card" >
                <div className="card-body">
                        <h5 className="card-title">{notes.title}</h5>
                        <p className="card-text">{notes.description} </p>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(notes._id)}}></i>
                        <i className="fa-sharp fa-solid fa-pen-to-square " onClick={()=>{updateNote(notes)}}></i>
                    </div>
            </div>
        </div>
    )
}

export default Notesitem
