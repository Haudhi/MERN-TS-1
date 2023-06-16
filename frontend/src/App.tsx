
import { Container } from 'react-bootstrap';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import styles from "./styles/NotesPage.module.css";
import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedinView from './components/NotesPageLoggedinView';
import NotesPageLoggedOutView from './components/NotePageLoggedOutView';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error)
      }
    }
    fetchLoggedInUser();
  }, []);


  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginUpClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>

        <>
          {loggedInUser
            ? <NotesPageLoggedinView />
            : <NotesPageLoggedOutView />
          }
        </>


      </Container>
      {showSignUpModal &&
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false)
          }}
        />

      }
      {showLoginModal &&
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccesful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      }
    </div>
  );
}

export default App;
