import React, { useState, useEffect, Suspense, lazy } from "react";
import { Grow, Container, Grid, CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";
import useStyles from "./styles";

const Posts = lazy(() => import("../Posts/Posts"));

const Home = () => {
	const classes = useStyles();

	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					className={classes.mainContainer}
					container
					justifyContent="space-between"
					alignItems="stretch"
					spacing={3}
				>
					<Grid item xs={12} sm={7}>
						<Suspense fallback={<CircularProgress />}>
							<Posts setCurrentId={setCurrentId} />
						</Suspense>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
