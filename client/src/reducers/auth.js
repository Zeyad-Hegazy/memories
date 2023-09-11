import { AUTH, LOGOUT } from "./../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (
	state = { profile: JSON.parse(localStorage.getItem("profile")) },
	action
) => {
	switch (action.type) {
		case AUTH:
			localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
			return { ...state, profile: action?.data };
		case LOGOUT:
			localStorage.clear();
			return { ...state, profile: null };
		default:
			return state;
	}
};
