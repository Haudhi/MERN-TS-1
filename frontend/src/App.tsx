import React, { useEffect, useState } from 'react';

import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Note as NoteModel } from "./models/note";
import Note from './components/Notes';
import styles from "./styles/NotesPage.module.css"
import stylesUtils from "./styles/utils.module.css"
import * as NotesApi from "./network/notes_api"
import AddNoteDialog from './components/AddEditNotesDialog';
import {FaPlus} from "react-icons/fa";
import AddEditNoteDialog from './components/AddEditNotesDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowAddNoteDialog(false);
        setNotesLoading(true);
       const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true)
      } finally {
        setNotesLoading(false);
      }
      
    }
    loadNotes()
   
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
    } catch (error) {
      console.error(error)
      alert(error)
      
    }
  }

  const notesGrid =
  <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
     {notes.map(note => (
      <Col key={note._id}>
      <Note 
      note={note}
      onNoteClicked={setNoteToEdit}
      onDeleteNoteClicked={deleteNote}
      className={styles.note} />
      </Col>
     ))}
     </Row>

  return (
    <div>
      <Container className={styles.notesPage}>
        <Button 
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}>
          <FaPlus />
          Add new note
        </Button>
        {notesLoading && <Spinner animation='border' variant='primary' />}
        {showNotesLoadingError && <p>Something went wrong, please refresh the page.</p>}
        {!notesLoading && !showNotesLoadingError &&
        <>
        { notes.length > 0
        ? notesGrid
        : <p>You dont have any notes yet</p>
        }
        </>
        }
     { showAddNoteDialog &&
      <AddNoteDialog
      onDismiss={() => setShowAddNoteDialog(false)}
      onNoteSaved={(newNote) => {
        setNotes([...notes, newNote])
        setShowAddNoteDialog(false);
      }}
      />
     }
     {noteToEdit &&
     <AddEditNoteDialog
     noteToEdit={noteToEdit}
     onDismiss={() => setNoteToEdit(null)}
     onNoteSaved={(updatedNote) => {
      setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
      setNoteToEdit(null)
     }} 
     />
     }
     </Container>
    </div>
  );
}

export default App;
