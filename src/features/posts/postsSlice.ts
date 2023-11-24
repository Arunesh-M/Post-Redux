import { createSlice,PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";

interface Reaction {
    thumbsUp: number ;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  }

interface data {
    id:number | string;
    title:string;
    content:string;
    userId?:string;
    date:string;
    reactions:Reaction;
}



const initialState:data[] = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        // userId:'2'
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title:'Completed Tasks',
        content:"It took more than 10 hours.",
        // userId:"1"
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    }
]


const postsSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{
      postAdded(state,action :PayloadAction<data>){
        state.unshift(action.payload)
      },
      reactionAdded(state, action:PayloadAction<{ postId: number | string; reaction: keyof Reaction }>) {
        const { postId, reaction } = action.payload
        const existingPost = state.find(post => post.id === postId)
        if (existingPost) {
            existingPost.reactions[reaction]++
        }
      }
    }
})

export const selectAllPosts=(state:RootState)=>state.posts
export const {postAdded,reactionAdded}=postsSlice.actions
export default postsSlice.reducer