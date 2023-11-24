import { useState } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch,useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postsSlice";

const AddPostForm=()=>{
    
    const dispatch:AppDispatch=useDispatch()
    
    const[title,setTitle]=useState<string>("");
    const[content,setContent]=useState<string>("");
    const [userId, setUserId] = useState<string>('');

    const users = useSelector(selectAllUsers)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const onSavePostClicked=()=>{
        if(title && content){
            dispatch(
                postAdded({
                    id:nanoid(),
                    title,
                    content,
                    userId,
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                })
            )
            setTitle("");
            setContent("");
        }
         
    }
    
    return(
      <section>
         <h2>Add a New Post</h2>
            <form >
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    autoComplete="off"
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={(e)=>setUserId(e.target.value)}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={(e)=>setContent(e.target.value)}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
      </section>
    )
}

export default AddPostForm