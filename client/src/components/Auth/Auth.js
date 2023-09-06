import React, { useState } from "react";
import {
	Container,
	Paper,
	Avatar,
	Typography,
	Grid,
	Button,
} from "@material-ui/core";
import Input from "../../UI/Input";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import useStyles from "./styles";

const Auth = () => {
	const calsses = useStyles();
	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setIsSignup] = useState(false);

	const handleSubmit = () => {
		console.log("form submited");
	};

	const handleChange = () => {};

	const handleShowPassword = () => {
		setShowPassword((prevShowPasswrd) => !prevShowPasswrd);
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
