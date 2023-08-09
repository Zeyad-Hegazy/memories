import * as api from "../api/index";

export const getPosts = () => async (dispatch) => {
	try {
		
		const { date } = await api.fetchPosts();
		dispatch({ type: "FETCH_ALL", payload: date });

	} catch (error) {
		console.log(error.message);
	}
};
