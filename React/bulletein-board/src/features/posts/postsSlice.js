import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
	{
		id: "1",
		title: "Learning Redux Toolkit",
		content: "I've heard good things.",
	},
	{
		id: "2",
		title: "Slices...",
		content: "The more I say slice, the more I want pizza.",
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
			prepare: (title, content) => {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
					},
				};
			},
			reducer: (state, action) => {
				state.push(action.payload);
				// directly mutating the state because immerjs will handle it.
			},
		},
	},
});

export default postsSlice.reducer; // reducer for posts
export const { postAdded } = postsSlice.actions; // posts actions
export const selectAllPosts = (state) => state.posts; // selector for useSelector hook
