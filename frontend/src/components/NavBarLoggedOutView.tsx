import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignupClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignupClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button onClick={onSignupClicked}>Sign Up </Button>
            <Button onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;