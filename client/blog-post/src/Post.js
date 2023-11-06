export default function Post({title, description, author}){
    return(
        <div className="post">
            <h2 className="title">{title}</h2>
            <label className="created-post">Created By: {author.username}</label>
            <p className="description">{description}</p>
        </div>
    )
}