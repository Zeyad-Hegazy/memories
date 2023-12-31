import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCoustomeAuth = token.length < 500;

		let decodedData;

		if (token && isCoustomeAuth) {
			decodedData = jwt.verify(token, "test", { algorithm: "RS256" });
			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			console.log(decodedData);
			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
