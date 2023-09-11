import React from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import memories from "../../assets/images/memories.png";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
	const user = useSelector((state) => state.auth.profile);
	const classes = useStyles();
	const dispatch = useDispatch();

	const logout = () => {
		dispatch({ type: LOGOUT });
	};

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link to="/" style={{ textDecoration: "none" }}>
				<div className={classes.flex}>
					<img
						className={classes.image}
						src={memories}
						alt="memories"
						height="60"
					/>
				</div>
			</Link>
			<Toolbar className={classes.toolbar}>
				{user ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							src={user.result.imageUrl}
							alt={user.result.name}
						>
							{user.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant="h6">
							{user.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="secondary"
							onClick={logout}
						>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to="/auth"
						variant="contained"
						color="primary"
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
