import { Container } from "react-bootstrap";
import NotesPageLoggedinView from "../components/NotesPageLoggedinView";
import NotesPageLoggedOutView from "../components/NotePageLoggedOutView";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface NotesPagesProps {
    loggedInUser: User | null,
}

const NotesPage = ({ loggedInUser }: NotesPagesProps) => {
    return (
        <Container className={styles.notesPage}>

            <>
                {loggedInUser
                    ? <NotesPageLoggedinView />
                    : <NotesPageLoggedOutView />
                }
            </>


        </Container>
    );
}

export default NotesPage;