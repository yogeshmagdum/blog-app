import { useState } from "react"
import { Navigate } from "react-router-dom";

export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(e){
        const newPostData = {};
        newPostData['title']= title;
        newPostData['description'] = description;
        e.preventDefault();
        console.log('newPostData', newPostData);
        const response = await fetch('http://localhost:4000/post', {
            method: 'Post',
            body: JSON.stringify(newPostData),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });

        if(response.ok){
            setRedirect(true);
        }

    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
        <form className="create-post-wrapper" onSubmit={createNewPost}>
            <div className="form-control">
                <label className="label">Blog Header</label>
                <input type="title" className="form-text" placeholder="Add blog header here"
                value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className="form-control">
                <label className="label">Blog Description</label>
                <textarea type="textarea" className="form-text" rows="4" placeholder="Add blog description here"
                value={description} onChange={e => setDescription(e.target.value)}/>
            </div>
            <button type="submit" className="create-post-button">Create New Post</button>
        </form>
    )
}