import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function MyBlogs(){
    const [myPosts, setMyPosts] = useState([]);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        fetch('http://localhost:4000/myblogs', {
            method: 'Get',
            credentials: 'include'
        }).then( response => {
            response.json().then(posts => {
                console.log(posts);
                setMyPosts(posts)
                setRedirect(true);
            });
        });
    }, [])

    // function deletePost(id){
    //     fetch('http://localhost:4000/deletepost', {
    //         method: 'Delete',
    //         headers: {'Content-Type': 'application/json'},
    //         body: id
    //     }).then( response => {
    //         response.json().then(posts => {
    //             console.log(posts);
    //             setMyPosts(posts)
    //         });
    //     });
    // }
    // if(redirect){
    //     return <Navigate to={'/login'} />
    // }

    return(
        <>
            {myPosts.length > 0 && myPosts.map( posts => (
                <div key={posts._id} className="post">
                    {/* <a className="delete-post" onClick={e => deletePost(posts._id)}>  
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a> */}

                    <h2 className="title">{posts.title}</h2>
                    <label className="created-post">Created By: {posts.author.username}</label>
                    <p className="description">{posts.description}</p>
                </div>
            ))}
        </>
    )
}