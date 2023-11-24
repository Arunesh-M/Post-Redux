import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

interface props {
    userId:string | undefined;
}

const PostAuthor:React.FC<props>=({userId})=>{
    
    const users=useSelector(selectAllUsers)
    const author = users.find(user => user.id === userId);
    
    return(
        <span>by {author ? author.name : 'Unknown author'}</span>
    )
}

export default PostAuthor