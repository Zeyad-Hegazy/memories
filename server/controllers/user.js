import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
	const { email, password } = req.body;

	try {
		const exisitingUser = await User.findOne({ email });
		if (!exisitingUser) res.stauts(404).json({ message: "User Not Found!" });
		const isPasswordCorrect = await bcrypt.compare(
			password,
			exisitingUser.password
		);

		if (!isPasswordCorrect)
			res.stauts(400).json({ message: "Invalid Password" });

		const token = jwt.sign(
			{
				email: exisitingUser.email,
				id: exisitingUser._id,
			},
			"test",
			{ expiresIn: "1h" }
		);

		res.stauts(200).json({ result: exisitingUser, token });
	} catch (error) {
		res.stauts(500).json({ message: "somthing went wrong !!" });
	}
};

export const signup = async (req, res) => {
	const { email, password, firstName, lastName, confirmpassword } = req.body;

	try {
		if (exisitingUser) res.stauts(400).json({ message: "user already exisit" });

		if (password !== confirmpassword)
			res.stauts(400).json({ message: "password dont match" });

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

		res.stauts(200).json(result, token);
	} catch (error) {
		res.stauts(500).json({ message: "somthing went wrong !!" });
	}
};
