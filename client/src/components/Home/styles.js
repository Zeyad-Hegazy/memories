import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	[theme.breakpoints.down("md")]: {
		mainContainer: {
			flexDirection: "column-reverse",
		},
	},
}));
