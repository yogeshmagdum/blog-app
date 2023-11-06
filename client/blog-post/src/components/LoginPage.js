import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [username, setUserName] = useState('');
    const [password, setUserPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(e){
        e.preventDefault();

        const res = await fetch('http://localhost:4000/login', {
            method: 'Post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
            credentials: 'include'
        })

        if(res.ok){
            res.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        }else{
            alert('Wrong Credentials');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }
    return(
        <form className="login" onSubmit={login}>
            <h2 className="center-align">Login</h2>
            <div className="form-control">
                <label className="label" >User Name</label>
                <input type="text" placeholder="User name" 
                value={username} onChange={e => setUserName(e.target.value)}/>
            </div>
            <div className="form-control">
                <label className="label" >Password</label>
                <input type="password" placeholder="Enter password"
                value={password} onChange={e => setUserPassword(e.target.value)}/>
            </div>
            <button type="submit" >Login</button>
        </form>
    )
}