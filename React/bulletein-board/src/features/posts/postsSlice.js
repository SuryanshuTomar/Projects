import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
	{
		id: "1",
		title: "Learning Redux Toolkit",
		content: "I've heard good things.",
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0,
		},
	},
	{
		id: "2",
		title: "Slices...",
		content: "The more I say slice, the more I want pizza.",
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0,
		},
	},
];

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		postAdded: {
			// seprately defining the reducer method and the prepare method so that we can
			// abstract the structure of the state from the main UI component and directly
			// provide the values to the reducer.
			// the prepare method will take the states content and return the action payload
			// as it needs to be formatted and then it will be passed to the reducer
			prepare: (title, content, userId) => {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						userId,
						date: new Date().toISOString(),
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				};
			},
			reducer: (state, action) => {
				state.push(action.payload);
				// directly mutating the state because immerjs will handle it.
			},
		},
		reactionAdded: (state, action) => {
			const { postId, reaction } = action.payload;
			const existingPost = state.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
	},
});

export default postsSlice.reducer; // reducer for posts
export const { postAdded, reactionAdded } = postsSlice.actions; // posts actions
export const selectAllPosts = (state) => state.posts; // selector for useSelector hook
