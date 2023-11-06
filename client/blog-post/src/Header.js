import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
    // const [username, setUserName] = useState('');
    const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/profile', {credentials: 'include'}).then(
            response => {
                console.log('response', response);
                response.json().then( userInfo => {
                    console.log('userInfo', userInfo);
                    // setUserName(userInfo.username);
                    setUserInfo(userInfo);
                })
            }
        )
    }, []);

    function logout(){
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo(null)
    }

    const username = userInfo?.username;

    return(
        <header>
            <Link to="/" className="logo" >MyBlog App</Link>
            <nav>
                {username && (
                    <>  
                        <Link to="/myblog">My Blogs</Link>
                        <Link to="/create" >Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}

                { !username && (
                    <>
                        <Link to="/login" className="login">Login</Link>
                        <Link to="/register" className="Register">Register</Link>
                    </>
                )}
                
            </nav>
        </header>
    )
}