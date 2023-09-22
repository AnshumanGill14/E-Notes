import React, { useState, useRef } from 'react';

const EditNote = ({ note, onUpdate, closeRef }) => {
    const [editedNote, setEditedNote] = useState({ etitle: note.etitle, edescription: note.edescription, etag: note.etag });

    
    const handleClick = (e) => {
        e.preventDefault();
        onUpdate(editedNote);
        
        
    };
   

    const onChange = (e) => {
        setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
    };

    return (
        <>
            <button
                type="button"
                
                className="btn btn-dark mx-2"
                data-bs-toggle="modal"
                data-bs-target="#editModal" // Use the correct modal ID here
            >
                Edit Note
            </button>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeRef}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={editedNote.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={editedNote.etag} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name="edescription" value={editedNote.edescription} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-dark" data-bs-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-dark" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditNote;
