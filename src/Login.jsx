import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotesContext } from "./provider.jsx";

function Login() {
    const a = useContext(NotesContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        a.refetchUsers();
    }, []);

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={(e)=>{
                e.preventDefault();
                if (a.logInUser(username, password)) navigate('/home');
            }}>
                <input
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                ></input>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
                <button type='submit'>Log In</button>
                <button
                    type='button'
                    onClick={(e)=>{
                        if (a.addUser(username, password)) navigate('/home');
                    }}
                >Sign Up</button>
            </form>
        </>
    )
}

export default Login
