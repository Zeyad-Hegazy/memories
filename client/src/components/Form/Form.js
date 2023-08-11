import React, { useState } from "react";
import { Typography, TextField, Button, Paper } from "@material-ui/core";

import FileBase64 from "react-file-base64";

import { createPost } from "../../actions/posts";
import { useDispatch } from "react-redux";

import useStyles from "./styles";

const Form = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [postDate, setPostData] = useState({
		creator: "",
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});

	const submitHandler = (e) => {
		e.preventDefault();
		console.log("submitted");
		dispatch(createPost(postDate));
		setPostData({
			creator: "",
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	const clear = () => {
		console.log("cleard");
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={submitHandler}
			>
				<Typography variant="h6" className={classes.headingText}>
					Creating a Memory
				</Typography>

				<TextField
					name="creator"
					variant="outlined"
					label="Creator"
					fullWidth
					value={postDate.creator}
					onChange={(e) =>
						setPostData({ ...postDate, creator: e.target.value })
					}
				/>
				<TextField
					name="title"
					variant="outlined"
					label="Title"
					fullWidth
					value={postDate.title}
					onChange={(e) => setPostData({ ...postDate, title: e.target.value })}
				/>

				<TextField
					name="message"
					variant="outlined"
					label="Message"
					fullWidth
					value={postDate.message}
					onChange={(e) =>
						setPostData({ ...postDate, message: e.target.value })
					}
				/>
				<TextField
					name="tags"
					variant="outlined"
					label="Tags"
					fullWidth
					value={postDate.tags}
					onChange={(e) => setPostData({ ...postDate, tags: e.target.value })}
				/>
				<div className={classes.fileInput}>
					<FileBase64
						type="file"
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({ ...postDate, selectedFile: base64 })
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="primary"
					size="large"
					type="submit"
					fullWidth
				>
					Submit
				</Button>
				<Button
					className={classes.buttonSubmit}
					variant="contained"
					color="secondary"
					size="small"
					onClick={clear}
					fullWidth
				>
					Clear
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
