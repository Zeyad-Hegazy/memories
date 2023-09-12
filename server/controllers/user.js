import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
// import { validationResult } from "express-validator";

export const signin = async (req, res) => {
	const { email, password } = req.body;

	// const errors = validationResult(req);

	try {
		const exisitingUser = await User.findOne({ email });
		if (!exisitingUser)
			return res.status(404).json({ message: "User Not Found!" });

		const isPasswordCorrect = await bcrypt.compare(
			password,
			exisitingUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid Password" });

		const token = jwt.sign(
			{
				email: exisitingUser.email,
				id: exisitingUser._id,
			},
			"test",
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result: exisitingUser, token });
	} catch (error) {
		res.status(500).json({ message: "somthing went wrong !!" });
	}
};

export const signup = async (req, res) => {
	const { email, password, firstName, lastName, confirmpassword } = req.body;

	// const errors = validationResult(req);

	try {
		const exisitingUser = await User.findOne({ email });

		if (exisitingUser)
			return res.status(400).json({ message: "user already exisit" });

		if (password !== confirmpassword)
			return res.status(400).json({ message: "password dont match" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		const token = jwt.sign(
			{
				email: result.email,
				id: result._id,
			},
			"test",
			{ expiresIn: "1h" }
		);

		res.status(200).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "somthing went wrong !!" });
	}
};
