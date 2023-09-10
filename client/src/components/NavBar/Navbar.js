import React, { useEffect, useState } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import memories from "../../assets/images/memories.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
	const classes = useStyles();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// const token = user?.token;
		// JWT...
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const logout = () => {
		dispatch({ type: LOGOUT });

		setUser(null);

		navigate("/");
	};

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link to="/" style={{ textDecoration: "none" }}>
				<div className={classes.flex}>
					{/* <Typography className={classes.heading} variant="h2" align="center">
						Memories
					</Typography> */}
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
