import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const postAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postAdapter.getInitialState();

// Extended Api Slice which is a replacement for postSlice
// This means we are extending the apiSlice here by injecting endpoints from here in the apiSlice using the injectEndpoints method to the apiSlice and it will return us the new apiSlice with the logic for new endpoints attached
export const extendedApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => {
		return {
			getPosts: builder.query({
				query: () => "/posts",
				transformResponse: (responseData) => {
					let min = 1;
					const loadedPosts = responseData.map((post) => {
						if (!post?.date)
							post.date = sub(new Date(), {
								minutes: min++,
							}).toISOString();
						if (!post?.reactions)
							post.reactions = {
								thumbsUp: 0,
								wow: 0,
								heart: 0,
								heart: 0,
								rocket: 0,
								coffee: 0,
							};
						return post;
					});
					return postAdapter.setAll(initialState, loadedPosts);
				},
				providesTags: (result, error, arg) => [
					{ type: "Post", id: "LIST" }, // adding the tag for the whole list
					...result.ids.map((id) => ({ type: "Post", id })), // adding the tag for each id in the post in this provideTags array.
					// By doing this, if any one of these post id get invalidated, then this will make this query to be refetched.
				],
			}),
			getPostsByUserId: builder.query({
				query: (id) => `/posts/?userId=${id}`,
				transformResponse: (responseData) => {
					let min = 1;
					const loadedPosts = responseData.map((post) => {
						if (!post?.date)
							post.date = sub(new Date(), {
								minutes: min++,
							}).toISOString();
						if (!post?.reactions)
							post.reactions = {
								thumbsUp: 0,
								wow: 0,
								heart: 0,
								rocket: 0,
								coffee: 0,
							};
						return post;
					});
					return postAdapter.setAll(initialState, loadedPosts);
				},
				providesTags: (result, error, arg) => [
					...result.ids.map((id) => ({ type: "Post", id })),
				],
			}),
			addNewPost: builder.mutation({
				query: (initialPost) => ({
					url: "/posts",
					method: "POST",
					body: {
						...initialPost,
						userId: Number(initialPost.userId),
						date: new Date().toISOString(),
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0,
						},
					},
				}),
				invalidatesTags: [{ type: "Post", id: "LIST" }],
			}),
			updatePost: builder.mutation({
				query: (initialPost) => ({
					url: `/posts/${initialPost.id}`,
					method: "PUT",
					body: {
						...initialPost,
						date: new Date().toISOString(),
					},
				}),
				invalidatesTags: (result, error, arg) => [
					{ type: "Post", id: arg.id },
				],
			}),
			deletePost: builder.mutation({
				query: ({ id }) => ({
					url: `/posts/${id}`,
					method: "DELETE",
					body: { id },
				}),
				invalidatesTags: (result, error, arg) => [
					{ type: "Post", id: arg.id },
				],
			}),
			addReaction: builder.mutation({
				query: ({ postId, reactions }) => ({
					url: `posts/${postId}`,
					method: "PATCH",
					// In a real app, we'd probably need to base this on user ID somehow
					// so that a user can't do the same reaction more than once
					body: { reactions },
				}),
				// For Optimistic Update - In an optimistic update the UI behaves as though a change was successfully completed before receiving confirmation from the server that it actually was - it is being optimistic that it will eventually get the confirmation rather than an error. This allows for a more responsive user experience
				async onQueryStarted(
					{ postId, reactions },
					{ dispatch, queryFulfilled } //  queryFulfilled -> promise
				) {
					// Basically, what we are doing here is - we are updating the reaction before hand on our post which we find using posts.entities which is draft here, so that is can reflect on our UI first as it might take time to reflect the reaction update over the api. But if it fails for any reason to update on the api then in the catch block we will undo this patchResult and then reaction update will be undo from the UI also.
					const patchResult = dispatch(
						// `updateQueryData` requires the endpoint function name and cache key arguments,
						// so it knows which piece of cache state to update
						extendedApiSlice.util.updateQueryData(
							"getPosts", // endPoint function name
							undefined, // cache key which is undefined in this case
							(draft) => {
								// The `draft` is Immer-wrapped and can be "mutated" like in createSlice
								const post = draft.entities[postId];
								if (post) post.reactions = reactions;
							}
						)
					);
					try {
						await queryFulfilled;
					} catch {
						patchResult.undo();
					}
				},
			}),
		};
	},
});

// custom hook for endpoints functions from the extendedApiSlice
export const {
	useGetPostsQuery,
	useGetPostsByUserIdQuery,
	useAddNewPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
	useAddReactionMutation,
} = extendedApiSlice;

// A function that accepts a cache key argument, and generates a new memoized selector for reading cached data for this endpoint using the given cache key. The generated selector is memoized using Reselect's createSelector.
// .select(someCacheKey) returns a new selector function instance. In order for memoization to work correctly, you should create a given selector function once per cache key and reuse that selector function instance, rather than creating a new selector instance each time.
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
	selectPostsResult, // input selector
	(postsResult) => postsResult.data // normalized state object with ids & entities
	// output selector
);

// getSelectors will give us already created selectors from createEntityAdapter and we can rename them with aliases using destructring
export const {
	selectAll: selectAllPosts,
	selectById: getPostById,
	selectIds: selectPostIds,
} =
	// Pass in a selector that returns the state for postsSlice.
	postAdapter.getSelectors((state) => selectPostsData(state) ?? initialState);
