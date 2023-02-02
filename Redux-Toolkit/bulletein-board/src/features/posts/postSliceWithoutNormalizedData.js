import {
	createSlice,
	nanoid,
	createAsyncThunk,
	createSelector,
	createDraftSafeSelector,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

// const initialState = [
// 	{
// 		id: "1",
// 		title: "Learning Redux Toolkit",
// 		content: "I've heard good things.",
// 		date: sub(new Date(), { minutes: 10 }).toISOString(),
// 		reactions: {
// 			thumbsUp: 0,
// 			wow: 0,
// 			heart: 0,
// 			rocket: 0,
// 			coffee: 0,
// 		},
// 	},
// 	{
// 		id: "2",
// 		title: "Slices...",
// 		content: "The more I say slice, the more I want pizza.",
// 		date: sub(new Date(), { minutes: 5 }).toISOString(),
// 		reactions: {
// 			thumbsUp: 0,
// 			wow: 0,
// 			heart: 0,
// 			rocket: 0,
// 			coffee: 0,
// 		},
// 	},
// ];

const initialState = {
	posts: [],
	status: "idle", // "idle" | "loading" | "succeeded" | "failed"
	error: null,
	count: 0,
};

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

// Async Action Creator Thunk to fetch data that returns that actions that pending, fulfilled or rejected
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	const response = await axios.get(POST_URL);
	return response.data;
});

// Async Action Creator Thunk to post data  that returns that actions that pending, fulfilled or rejected
export const addNewPost = createAsyncThunk(
	"posts/addNewPost",
	async (postData) => {
		const response = await axios.post(POST_URL, postData);
		return response.data;
	}
);

// Async Action Creator Thunk to update data of post with {id} that returns that actions that pending, fulfilled or rejected
export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async (postData) => {
		const { id } = postData;

		const response = await axios.put(`${POST_URL}/${id}`, postData);
		return response.data;
	}
);

// Async Action Creator Thunk to update data of post with {id} that returns that actions that pending, fulfilled or rejected
export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (postData) => {
		const { id } = postData;

		const response = await axios.delete(`${POST_URL}/${id}`);
		if (response?.status === 200) return postData;

		return `${response.status}: ${response.statusText}`;
	}
);

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
				state.posts.push(action.payload);
				// directly mutating the state because immerjs will handle it.
			},
		},
		reactionAdded: (state, action) => {
			const { postId, reaction } = action.payload;
			const existingPost = state.posts.find((post) => post.id === postId);
			if (existingPost) {
				existingPost.reactions[reaction]++;
			}
		},
		increaseCount(state, action) {
			state.count += 1;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeeded";

				// Adding date and reactions
				let min = 1;
				const loadedPosts = action.payload.map((post) => {
					post.date = sub(new Date(), { minutes: min++ }).toISOString();
					post.reactions = {
						thumbsUp: 0,
						wow: 0,
						heart: 0,
						rocket: 0,
						coffee: 0,
					};
					return post;
				});

				// Add any fetched posts to the array
				state.posts = state.posts.concat(loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				action.payload.userId = Number(action.payload.userId);
				action.payload.date = new Date().toISOString();
				action.payload.reactions = {
					thumbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0,
				};
				// console.log(action.payload);
				state.posts.push(action.payload); // directly mutating the state
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Update could not complete !");
					console.log(action.payload);
					return;
				}

				const { id } = action.payload;
				action.payload.data = new Date().toISOString();
				const posts = state.posts.filter((post) => post.id !== id);
				state.posts = [...posts, action.payload];
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				if (!action.payload?.id) {
					console.log("Delete could not complete !");
					console.log(action.payload);
					return;
				}

				const { id } = action.payload;
				const posts = state.posts.filter((post) => post.id !== id);
				state.posts = posts;
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

// reducer for posts
export default postsSlice.reducer;

// posts action creators
export const { postAdded, reactionAdded, increaseCount } = postsSlice.actions;

// selectAllPosts selector for useSelector hook
export const selectAllPosts = (state) => state.posts.posts;

// getCount selector for useSelector hook
export const getCount = (state) => state.posts.count;

// useSelector selector for useSelector hook
export const getPostsStatus = (state) => state.posts.status;

// getPostsError selector for useSelector hook
export const getPostsError = (state) => state.posts.error;

// getPostsError selector for useSelector hook
export const getPostById = (state, postId) =>
	state.posts.posts.find((post) => post.id === postId);

// selectPostByUser selector for useSelector hook
// Note: useSelector() hook will run every time an action is dispatched and it forces the useSelector to run again and it forces the component to re-render If a reference value is returned. So, if we somehow returning a new value to the useSelector hook then it will re-render the component tree. And we can fix this by creating a memoised selector using a createSelector function from @reduxjs/toolkit.
// creating this selector
// createSelector([fn1, fn2.....], cbFn) -
// The first argument is a dependency array that takes one or more selector functions whose return values will be passed as a parameter to the cbFn which is a second parameter of the createSelector and createDraftSafeSelector Method.
// The second parameter of createSelector and createDraftSafeSelector Method is a callBackFunction which will run if the return value of the selectors functions in the dependency array changes when we call our selectorFunction that is created from the createSelector method. And then this cb selector function will run when we call our selectorFuntion(so basically this cbFN is our selector function in which we can put our code into.)
// So, if the value that are returned by the functions that are in the dependency array changes  then the useSelector hook will going to run our selector function otherwise not. And this how our selector function will get memoised
export const selectPostByUser = createSelector(
	[selectAllPosts, (state, userId) => userId],
	(posts, userId) => posts.filter((post) => post.userId === userId)
);

// More safe option
// export const selectPostByUser = createDraftSafeSelector(
// 	[selectAllPosts, (state, userId) => userId],
// 	(posts, userId) => posts.filter((post) => post.userId === userId)
// );
