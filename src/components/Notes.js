import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';
import Addnote from './Addnote';
import EditNote from './EditNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();
    } else {
      navigate('/login');
    }
  }, []);

  // State for controlling the Edit Note modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Ref to control modal closing
  const closeRef = useRef();

  // Function to open the Edit Note modal
  const updateNote = (currentNote) => {
    
    setSelectedNote(currentNote);
    setShowEditModal(true);
  };

  // Function to close the Edit Note modal
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  // Function to update the note
  const handleEditNote = (editedNote) => {
    console.log('Updating the note', editedNote);
    editNote(selectedNote._id, editedNote.etitle, editedNote.edescription, editedNote.etag);
    closeRef.current.click(); // Close the modal using closeRef
    closeEditModal(); // Close the modal using state
  };

  return (
    <>
      

      {/* Rest of your Notes component JSX */}
      <div className='container row my-2' >
        <h2>Your Notes</h2>
        <div className='mx-1'>
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((notes) => {
          return <Notesitem key={notes._id} updateNote={updateNote} notes={notes} />;
        })}
      </div>
      <div className='mx-3'>
      <Addnote />

      {/* Add Edit Note modal */}
      {showEditModal && (
        <EditNote note={selectedNote} onUpdate={handleEditNote} closeRef={closeRef} />
        
      )}
      </div>
    </>
  );
};

export default Notes;
