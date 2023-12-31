import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@material-ui/core";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import moment from "moment";

import useStyles from "./styles";

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.profile);

	const Likes = () => {
		if (post.likes.length > 0) {
			const isLikedByUser = post.likes.some(
				(like) => like === user?.result?.googleId || like === user?.result?._id
			);

			if (isLikedByUser) {
				return (
					<>
						<ThumbUpAltIcon fontSize="small" />
						&nbsp;
						{post.likes.length > 2
							? `You and ${post.likes.length - 1} others`
							: `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
					</>
				);
			} else {
				return (
					<>
						<ThumbUpAltOutlinedIcon fontSize="small" />
						&nbsp;{post.likes.length}&nbsp;
						{post.likes.length === 1 ? "Like" : "Likes"}
					</>
				);
			}
		} else {
			return (
				<>
					<ThumbUpAltOutlinedIcon fontSize="small" />
					&nbsp;Like
				</>
			);
		}
	};

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={post.selectedFile}
				title={post.title}
			/>
			<div className={classes.overlay}>
				<Typography variant="h6">{post.name}</Typography>
				<Typography variant="body2">
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			<div className={classes.overlay2}>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						style={{ color: "white" }}
						size="small"
						onClick={() => setCurrentId(post._id)}
					>
						<EditIcon fontSize="medium" />
					</Button>
				)}
			</div>
			<div className={classes.details}>
				<Typography variant="body2" color="textSecondary">
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
				<Typography className={classes.title} variant="h5" gutterBottom>
					{post.title}
				</Typography>
				<CardContent>
					<Typography variant="body2" color="textSecondary" component="p">
						{post.message}
					</Typography>
				</CardContent>
				<CardActions className={classes.cardActions}>
					<Button
						size="small"
						color="primary"
						disabled={!user?.result}
						onClick={() => dispatch(likePost(post._id))}
					>
						<Likes />
					</Button>
					{(user?.result?.googleId === post?.creator ||
						user?.result?._id === post?.creator) && (
						<Button
							size="small"
							color="primary"
							onClick={() => dispatch(deletePost(post._id))}
						>
							<DeleteIcon fontSize="small" />
							Delete
						</Button>
					)}
				</CardActions>
			</div>
		</Card>
	);
};

export default Post;
