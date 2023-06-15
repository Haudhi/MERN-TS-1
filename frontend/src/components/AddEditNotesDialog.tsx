import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/note"
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
    noteToEdit?: Note,
    onDismiss: () => void,
    onNoteSaved: (note: Note) => void
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved}: AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState : {errors, isSubmitting} } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || "",
        }
    });

    async function onSubmit(input: NoteInput) {

        try {
            let noteResponse: Note;
            if (noteToEdit) {
                noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
            } else {
                noteResponse = await NotesApi.createNotes(input)
            }
            onNoteSaved(noteResponse)
        } catch (error) {
            console.error(error)
            alert(error)
        }
        
    }

    return ( 
        <Modal show onHide={onDismiss}>
<Modal.Header>
    <Modal.Title>
        {noteToEdit ? "Edit note" : "Add note"}
    </Modal.Title>
</Modal.Header>
<Modal.Body>
    <Form id="addEditNoteFrom" onSubmit={handleSubmit(onSubmit)}>
        <TextInputField 
        name="title"
        label="Title"
        type="text"
        placeholder="Title"
        register={register}
        registerOptions={{ required: "Required" }}
        error={errors.title}
        />

        <TextInputField 
        name="text"
        label="text"
        as="textarea"
        rows={5}
        placeholder="Text"
        register={register}
        />

       
    </Form>
</Modal.Body>
<Modal.Footer>
    <Button 
    type="submit"
    form="addEditNoteFrom"
    disabled={isSubmitting}
    >
        Save
    </Button>
</Modal.Footer>
        </Modal>
     );
}
 
export default AddEditNoteDialog;

