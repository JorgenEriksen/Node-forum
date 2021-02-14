import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcryptjs";
import {
	createNewUser,
	createNewPost,
	findUserByUsername,
	findUserById,
	deletePostById,
	downVoteById,
	getTable,
	getPostsByCategory,
	getPostById,
	getCommentsByPostId,
	getVoteStatus,
	getVoteCount,
	createNewComment,
	deleteCommentsByPostId,
	deletePostVotesByPostId,
	deleteCommentVotesByPostId,
	verifyPassword,
	upVoteById,
	blockPost,
	getBlockedPosts,
	userTypeMatches,
	changeUserStatus,
	deleteModerateRequest,
	moderatorRequest,
} from "./src/database.js";

const app = express();
const PORT = 8081;

// Origin should not be localhost, maybe an environment variable?
const corsParams = {
	origin: "http://localhost:8080",
	methods: "GET,PUT,POST,DELETE",
	credentials: true,
	preflightContinue: false,
	optionsSuccessStatus: 200,
};

// Session cookie should be secure = true, but we lack TLS
// Secret should actually be secret
const sessionParams = {
	secret: "very secret",
	resave: false,
	saveUninitialized: false,
	cookie: { httpOnly: true, sameSite: "strict", secure: false },
};

// Setup middleware
// **************************************************************************************************

app.use(cors(corsParams));
app.use(session(sessionParams));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Setup passport strategy
// **************************************************************************************************

passport.use(
	new passportLocal.Strategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				const user = await findUserByUsername(username);
				if (user === null)
					return done(null, null, {
						status: 1,
						message: "User not found",
					});
				if (!(await verifyPassword(user, password)))
					return done(null, null, {
						status: 2,
						message: "Password is not correct!",
					});
				else {
					console.log("User exists and password is correct");
					return done(null, user, {
						status: 0,
						message: "User exists and password is correct",
					});
				}
			} catch (err) {
				console.log(err);
				return done(err, null, { message: err });
			}
		}
	)
);

// Setup de/serialization
// **************************************************************************************************

passport.serializeUser((user, callback) => {
	console.log("Serializing user:", user);
	callback(null, user.uid);
});

passport.deserializeUser(async (uid, callback) => {
	try {
		const user = await findUserById(uid);
		console.log("Deserializing user:", user);
		callback(null, user);
	} catch (err) {
		callback(err, null);
	}
});

// Custom middleware
// **************************************************************************************************

/*
 * Middleware for checking that the user is authenticated, and refusing the request if not.
 */
function authenticate(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).send("Not authenticated");
	}
}

/*
 * Middleware for checking that the user has privileges to access this request
 */
function authLevel(required) {
	return (req, res, next) => {
		if (userTypeMatches(req.user.userType, required)) {
			next();
		} else {
			res.status(403).send("Not high enough privileges");
		}
	};
}

// Setup routes
// **************************************************************************************************

/**
 * Login the user.
 */
app.post("/api/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(403).send(info); // User not found
		}
		req.login(user, (err) => {
			if (err) {
				return next(err);
			}

			// Success
			return res.status(200).send();
		});
	})(req, res, next);
});

/**
 * Logout the user.
 */
app.get("/api/logout", (req, res) => {
	req.logout();
	res.status(200).send();
});

/*
 * Get user info for the logged in user.
 */
app.get("/api/user", authenticate, (req, res) => {
	const user = JSON.stringify(req.user);
	console.log(user);
	res.status(200).append("Content-Type", "application/json").send(user);
});

/*
 * Get user info given a user ID.
 */
app.get("/api/users/:uid", async (req, res) => {
	const userId = req.params.uid;

	try {
		const user = await findUserById(userId);
		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(user));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

/**
 * Register a new user and add them to the database.
 */
app.post("/api/users", async (req, res) => {
	console.log("Register user start...");

	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	try {
		const created = await createNewUser(username, email, password);

		res.status(created ? 201 : 500).send();
		console.log("Register user success");
	} catch (err) {
		console.log(err);
		console.log("Register user failed");
		res.status(500).send(err);
	}
});

/**
 * Get all the users in the database.
 */
app.get("/api/users", async (req, res) => {
	try {
		const table = await getTable("users");
		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(table));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Get all posts that are blocked.
 * NOTE: Notice placement of this function before any ":pid".
 */
app.get("/api/posts/blocked", async (req, res) => {
	try {
		const column = await getBlockedPosts(1);
		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(column));
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

/**
 * Get all the posts in the database.
 */
app.get("/api/posts", authenticate, async (req, res) => {
	try {
		const table = await getTable("posts");

		for (let post of table) {
			post.upvotes = await getVoteCount(post.pid, "postVotes");
			post.numComments = (await getCommentsByPostId(post.pid)).length;
		}

		console.log(table);
		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(table));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Create new post from data in body.
 */
app.post("/api/posts", authenticate, async (req, res) => {
	const uid = req.user.uid; // Get user id from logged in user.
	const catid = req.body.catid;
	const title = req.body.title;
	const content = req.body.content;

	try {
		const created = await createNewPost(catid, uid, title, content);
		console.log("Created new post");
		res.status(created ? 201 : 500).send();
	} catch (err) {
		console.log("Failed to create new post!");
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Get one post by it's id.
 */
app.get("/api/posts/:pid", async (req, res) => {
	const pid = req.params.pid;

	try {
		let post = await getPostById(pid);
		post.upvotes = await getVoteCount(post.pid, "postVotes");
		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(post));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Delete a post given it's ID.
 */
app.delete("/api/posts/:pid", async (req, res) => {
	const pid = req.params.pid;
	const uid = req.user.uid;

	try {
		console.log("Deleting post");
		let comments = await getCommentsByPostId(pid);
		if (comments) {
			for (let i = 0; i < comments.length; i++) {
				await deleteCommentVotesByPostId(comments[i].cid);
			}
			await deleteCommentsByPostId(pid);
		}
		await deletePostVotesByPostId(pid);
		const deleted = await deletePostById(pid, uid);
		res.status(deleted ? 204 : 404).send();
	} catch (err) {
		console.log("Failed to delete post");
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Get all the comments associated with one post.
 */
app.get("/api/posts/:pid/comments", async (req, res) => {
	const pid = req.params.pid;

	try {
		let comments = await getCommentsByPostId(pid);

		for (let comment of comments) {
			comment.upvotes = await getVoteCount(comment.cid, "commentVotes");
		}

		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(comments));
	} catch (err) {
		console.log("error trying to get comments by postID: ");
		console.log(err);
		res.status(500).send(err);
	}
});

/**
 * Get all the comments in the database.
 */
app.get("/api/comments", async (req, res) => {
	try {
		const comments = await getTable("comments");

		for (let comment of comments) {
			comment.upvotes = await getVoteCount(comment.cid, "commentVotes");
		}

		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(comments));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Create new comment from data in body.
 */
app.post("/api/comments", authenticate, async (req, res) => {
	const uid = req.user.uid; // Get user id from logged in user.
	const comment = req.body.comment;
	const post = req.body.post;

	try {
		const created = await createNewComment(uid, comment, post);
		console.log("Created new comment");
		res.status(created ? 201 : 500).send();
	} catch (err) {
		console.log("Failed to create new comment!");
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Retrieve the status of an upvote.
 */
app.get("/api/comments/:cid/upvote/:uid", async (req, res) => {
	const cid = req.params.cid;
	const uid = req.params.uid;

	res.status(200).append("Content-Type", "application/json");
	try {
		const status = await getVoteStatus(cid, uid, "commentVotes");
		res.send(JSON.stringify(status));
	} catch (err) {
		console.log(err);
		const status = 0;
		res.send(JSON.stringify(status));
	}
});

/*
 * Upvote any given post via the user id and the posts id.
 */
app.put("/api/comments/:cid/upvote", authenticate, async (req, res) => {
	const cid = req.params.cid;
	const uid = req.user.uid;

	try {
		const upvoted = await upVoteById(cid, uid, "commentVotes");
		res.status(upvoted ? 200 : 400).send();
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

/*
 * Downvote any given post via the user id and the posts id.
 */
app.put("/api/comments/:cid/downvote", authenticate, async (req, res) => {
	const cid = req.params.cid;
	const uid = req.user.uid;

	try {
		const downvoted = await downVoteById(cid, uid, "commentVotes");
		res.status(downvoted ? 200 : 400).send();
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

/**
 * Get all the categories in the database.
 */
app.get("/api/categories", async (req, res) => {
	try {
		const table = await getTable("categories");
		res.status(200)
			.append("Content-Type", "application/json")
			.end(JSON.stringify(table));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Get all the posts in given category.
 */
app.get("/api/categories/:catid/posts", async (req, res) => {
	const catid = req.params.catid;

	try {
		let posts = await getPostsByCategory(catid);

		for (let post of posts) {
			post.upvotes = await getVoteCount(post.pid, "postVotes");
			post.numComments = (await getCommentsByPostId(post.pid)).length;
		}

		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(posts));
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

/*
 * Retrieve the status of an upvote.
 */
app.get("/api/posts/:pid/upvote/:uid", async (req, res) => {
	const pid = req.params.pid;
	const uid = req.params.uid;

	res.status(200).append("Content-Type", "application/json");
	try {
		const status = await getVoteStatus(pid, uid, "postVotes");
		res.send(JSON.stringify(status));
	} catch (err) {
		console.log(err);
		const status = 0;
		res.send(JSON.stringify(status));
	}
});

/*
 * Upvote any given post via the user id and the posts id.
 */
app.put("/api/posts/:pid/upvote", authenticate, async (req, res) => {
	const pid = req.params.pid;
	const uid = req.user.uid;

	try {
		const upvoted = await upVoteById(pid, uid, "postVotes");
		res.status(upvoted ? 200 : 400).send();
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

/*
 * Downvote any given post via the user id and the posts id.
 */
app.put("/api/posts/:pid/downvote", authenticate, async (req, res) => {
	const pid = req.params.pid;
	const uid = req.user.uid;

	try {
		const downvoted = await downVoteById(pid, uid, "postVotes");
		res.status(downvoted ? 200 : 400).send();
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

/*
 * Block a post by it's post id.
 */
app.put(
	"/api/posts/:pid/block",
	authenticate,
	authLevel("admin"),
	async (req, res) => {
		const pid = req.params.pid;

		try {
			let status = {};
			status.changed = await blockPost(pid, 1);
			res.status(200)
				.append("Content-Type", "application/json")
				.send(JSON.stringify(status));
		} catch (err) {
			console.log(err);
			res.status(500).send();
		}
	}
);

/*
 * Unblock a post by it's post id.
 */
app.put(
	"/api/posts/:pid/unblock",
	authenticate,
	authLevel("admin"),
	async (req, res) => {
		const pid = req.params.pid;

		try {
			let status = {};
			status.changed = await blockPost(pid, 0);
			res.status(200)
				.append("Content-Type", "application/json")
				.send(JSON.stringify(status));
		} catch (err) {
			console.log(err);
			res.status(500).send();
		}
	}
);

/*
 * Get all the moderator requests.
 */
app.get("/api/moderatorrequests", async (req, res) => {
	try {
		const requests = await getTable("requests");
		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(requests));
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

/*
 * Create a request to become moderator.
 */
app.post("/api/moderatorrequests", authenticate, async (req, res) => {
	const uid = req.user.uid;
	const title = req.body.title;
	const text = req.body.text;

	try {
		const request = await moderatorRequest(uid, title, text);
		res.status(request ? 201 : 500).send();
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

/*
 * deletes a moderator request
 */
app.delete(
	"/api/moderatorrequests/:uid",
	authLevel("admin"),
	async (req, res) => {
		const uid = req.params.uid;

		try {
			const request = await deleteModerateRequest(uid);
			res.status(request ? 201 : 500).send();
		} catch (err) {
			console.log(err);
			res.status(500).send();
		}
	}
);

/*
 * Change status of a user
 */
app.put("/api/users/:uid", authLevel("admin"), async (req, res) => {
	const uid = req.params.uid;

	try {
		await deleteModerateRequest(uid);
		const request = await changeUserStatus(uid, "moderator");
		res.status(200)
			.append("Content-Type", "application/json")
			.send(JSON.stringify(request));
	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
});

/**
 * Generate a hash for the given password.
 */
app.get("/api/genHash/:password", async (req, res) => {
	const pw = req.params.password;
	const hash = await bcrypt.hash(pw, 12);
	res.status(200).send(hash);
});

// Start a listen server
app.listen(PORT, () => {
	console.log("Running...");
});
