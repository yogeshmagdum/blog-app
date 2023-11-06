import {useState} from 'react'
import { Navigate } from 'react-router-dom';

export default function RegisterPage(){
    const [username, setUserName] = useState(''); // create variables for username
    const [password, setUserPassword]= useState(''); // create variables for password
    const [redirect, setRedirect] = useState(false);

    async function register(e){
        e.preventDefault();

        // API call for register the user
        const res = await fetch('http://localhost:4000/register', {
            method: 'Post',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        })

        // User register status
        if(res.status === 200){
            alert('Register successful!')
            setRedirect(true);
        }else{
            alert('Register failed!')
        }
    }

    if(redirect){
        return <Navigate to={'/login'} />
    }

    return(
        // User Register form
        <form className="register" onSubmit={register}>
            <h2 className="center-align">Register</h2>
            <div className="form-control">
                <label className="label" >User Name</label>
                <input type="text" placeholder="User name"
                value={username} onChange={e => setUserName(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label className="label" >Password</label>
                <input type="password" placeholder="Enter password"
                value={password} onChange={e => setUserPassword(e.target.value)}
                />
            </div>
            <button type="submit" >Register</button>
        </form>
    )
}