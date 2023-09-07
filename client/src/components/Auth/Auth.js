import React, { useState, useEffect } from "react";

import {
	Container,
	Paper,
	Avatar,
	Typography,
	Grid,
	Button,
} from "@material-ui/core";
import Input from "../../UI/Input";
import Icon from "./Icon";
import GoogleLogin from "react-google-login";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { gapi } from "gapi-script";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../constants/actionTypes";

import useStyles from "./styles";
import { signup, signin } from "./../../actions/auth";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmpassword: "",
};

const Auth = () => {
	const calsses = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		function start() {
			gapi.client.init({
				clientId:
					"310839217382-uk26qqteqjgcaret1olst5e1oof99ndt.apps.googleusercontent.com",
				scope: "",
			});
		}
		gapi.load("client:auth2", start);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isSignup) {
			dispatch(signup(formData));
		} else {
			dispatch(signin(formData));
		}
		navigate("/");
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleShowPassword = () => {
		setShowPassword((prevShowPasswrd) => !prevShowPasswrd);
	};

	const googleSuccess = async (res) => {
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: AUTH, data: { result, token } });
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = (err) => {
		console.log(err);
		console.log("cannot sign up with google, try again later");
	};

	const switchMode = () => {
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={calsses.paper} elevation={3}>
				<Avatar className={calsses.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
				<form className={calsses.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name="firstName"
									label="First Name"
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name="lastName"
									label="Last Name"
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name="email"
							label="Emial Address"
							handleChange={handleChange}
							type="emial"
						/>
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name="confirmpassword"
								label="Repeat Password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={calsses.submit}
					>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>
					<GoogleLogin
						clientId="310839217382-uk26qqteqjgcaret1olst5e1oof99ndt.apps.googleusercontent.com"
						render={(renderProps) => (
							<Button
								calsses={calsses.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained"
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy={"single_host_origin"}
					/>
					<Grid container justifyContent="center" fullWidth>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? "Already have an account ? Sign In"
									: "Don't have an account ? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
