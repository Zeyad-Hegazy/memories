import React, { useState, useEffect } from "react";
import { Typography, TextField, Button, Paper } from "@material-ui/core";
// import { Link } from "react-router-dom";

import FileBase64 from "react-file-base64";

import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
	const [postDate, setPostData] = useState({
		title: "",
		message: "",
		tags: "",
		selectedFile: "",
	});

	const classes = useStyles();
	const user = useSelector((state) => state.auth.profile);
	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (post) {
			setPostData(post);
		}
	}, [post]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (currentId) {
			dispatch(
				updatePost(currentId, { ...postDate, name: user?.result?.name })
			);
		} else {
			dispatch(createPost({ ...postDate, name: user?.result?.name }));
		}

		clear();
	};

	const clear = () => {
		setCurrentId(null);
		setPostData({
			title: "",
			message: "",
			tags: "",
			selectedFile: "",
		});
	};

	if (!user?.result) {
		return (
			<Paper className={classes.paper} align="center">
				<Typography variant="h6">
					Please sign In to create your own memories and like other's memories
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete="off"
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={submitHandler}
			>
				<Typography variant="h6" className={classes.headingText}>
					{`${currentId ? "Editing" : "Creating"} `}a Memory
				</Typography>

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
					onChange={(e) =>
						setPostData({ ...postDate, tags: e.target.value.split(",") })
					}
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
