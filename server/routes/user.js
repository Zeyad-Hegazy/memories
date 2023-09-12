import express from "express";

const router = express.Router();

import { body } from "express-validator";
import User from "../models/user.js";

import { signin, signup } from "../controllers/user.js";

router.post(
	"/signin",
	[
		body("email").custom(async (value) => {
			const existingEmail = await User.findOne({ email: value });
			if (!existingEmail) {
				throw new Error("Incorrect e-mail, This e-mail is not exisit");
			}
		}),
		body("password").custom(async (value) => {
			const existingPassword = await User.findOne({ password: value });
			if (!existingPassword) {
				throw new Error("Incorrect password");
			}
		}),
	],
	signin
);

router.post(
	"/signup",
	[
		body("email")
			.isEmail()
			.withMessage("Please write a valid e-mail address")
			.custom(async (value) => {
				const existingEmail = await User.findOne({ email: value });
				if (existingEmail) {
					throw new Error("A user already exists with this e-mail address");
				}
			}),
		body("password")
			.isLength({ min: 5 })
			.withMessage("Please choose a password minimum of 5 characters")
			.custom(async (value) => {
				const existingPassword = await User.findOne({ password: value });
				if (existingPassword) {
					throw new Error("Invalid password, try with another one");
				}
			}),
		body("confirmpassword").custom(async (value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords must match");
			}
		}),
	],
	signup
);

export default router;
