import mysql from "promise-mysql";
import bcrypt from "bcryptjs";
import { User } from "./objects.js";

// FIXME: How does this work? await can't be used here!?!?
const instance = await mysql.createConnection({
	host: "db",
	user: "admin",
	password: "password",
	database: "prog2053-proj",
});

/**
 * Get all the contents of a table in the database.
 * @param {String} tableName Name of the table to get.
 * @return {Promise} Database table.
 */
export async function getTable(tableName) {
	const res = await instance.query(`SELECT * FROM \`${tableName}\``);
	console.log(res);

	return res;
}

/**
 * Find and return a user by their username.
 * @param {String} username Username in the database.
 * @return {Promise} User object.
 */
export async function findUserByUsername(username) {
	const res = await instance.query(
		`SELECT \`uid\`, \`username\`, \`email\`, \`password\`, \`userType\`
		 FROM \`users\`
		 WHERE username = "${username}"`
	);

	if (res.length === 0) {
		return null;
	}

	// User found
	const user = User(
		res[0].uid,
		res[0].username,
		res[0].email,
		res[0].password,
		res[0].userType
	);
	console.log(user);

	return user;
}

/**
 * Find a user in the database by their id.
 * @param {Number} uid User ID.
 * @return {Promise} User object or null if no user was found.
 */
export async function findUserById(uid) {
	const res = await instance.query(
		`SELECT \`uid\`, \`username\`, \`email\`, \`password\`, \`userType\`
		 FROM \`users\`
		 WHERE uid = "${uid}"`
	);

	if (res.length === 0) {
		return null;
	}

	const user = User(
		res[0].uid,
		res[0].username,
		res[0].email,
		res[0].password,
		res[0].userType
	);

	return user;
}

/**
 * Get all the comments associated with one post, or null if there are no comments associated with the given post.
 * @param {Number} pid Post ID.
 * @return {Promise} Array of comment objects.
 */
export async function getCommentsByPostId(pid) {
	const res = await instance.query(
		`SELECT \`cid\`, \`post\`, \`user\`, \`comment\`
		 FROM \`comments\`
		 WHERE post = "${pid}"`
	);

	return res;
}

/**
 * Create a new comment associated to one post, and one user.
 * @param {Number} uid User ID.
 * @param {String} comment Comment body.
 * @param {Number} post Post ID.
 */
export async function createNewComment(uid, comment, post) {
	const res = await instance.query(
		`INSERT INTO \`comments\` (user, comment, post) VALUES ("${uid}", "${comment}", "${post}")`
	);
	return res.affectedRows >= 1;
}

/**
 * Upvote a post or comment from one user.
 * @param {Number} pid Post ID or comment ID.
 * @param {Number} uid User ID.
 * @param {String} table Table that contains the votes.
 * @return {Promise} Was the post actually upvote?
 */
export async function upVoteById(pid, uid, table) {
	const idName = table === "postVotes" ? "pid" : "cid";

	// Count the number of vote entries in the table
	let count = await instance.query(
		`SELECT COUNT(1)
		 FROM ${table}
		 WHERE ${idName} = "${pid}" AND uid = "${uid}"`
	);

	count = count[0]["COUNT(1)"];

	// Check if the user has already upvoted this entry
	if (count > 1) {
		console.log("Error: Too many votes on one post by user");
		return false;
	} else if (count === 1) {
		const updated = await instance.query(
			`UPDATE ${table}
			 SET value = value + 1
			 WHERE ${idName} = "${pid}" AND uid = "${uid}" AND value BETWEEN -2 AND 0`
		);

		return updated.affectedRows === 1;
	} else {
		const inserted = await instance.query(
			`INSERT INTO ${table} (${idName}, uid, value) VALUES (${pid}, ${uid}, 1)`
		);

		return inserted.affectedRows === 1;
	}
}

/**
 * Downvote a post or comment with one user.
 * @param {Number} pid Post ID or comment ID.
 * @param {Number} uid User ID.
 * @param {String} table Table that contains the votes.
 * @return {Promise} Was the post actually downvoted?
 */
export async function downVoteById(pid, uid, table) {
	const idName = table === "postVotes" ? "pid" : "cid";

	// Count the number of vote entries in the table
	let count = await instance.query(
		`SELECT COUNT(1)
		 FROM ${table}
		 WHERE ${idName} = "${pid}" AND uid = "${uid}"`
	);

	count = count[0]["COUNT(1)"];

	// Check if the user has already downvoted this entry
	if (count > 1) {
		console.log("Error: Too many votes on one post by user");
		return false;
	} else if (count === 1) {
		const updated = await instance.query(
			`UPDATE ${table}
			 SET value = value - 1
			 WHERE ${idName} = "${pid}" AND uid = "${uid}" AND value BETWEEN 0 AND 2`
		);

		return updated.affectedRows === 1;
	} else {
		const inserted = await instance.query(
			`INSERT INTO ${table} (${idName}, uid, value) VALUES (${pid}, ${uid}, 1)`
		);

		return inserted.affectedRows === 1;
	}
}

/**
 * Delete comments by post id
 * @param {Number} pid Post ID.
 * @param {Number} uid User ID.
 * @return {Promise} Was the post actually deleted?
 */
export async function deleteCommentsByPostId(pid) {
	const res = await instance.query(
		`DELETE FROM \`comments\`
		 WHERE post = ${pid}`
	);

	return res.affectedRows >= 1;
}

/**
 * Get the vote status of a post by one user
 * @param {Number} pid Post ID or comment ID.
 * @param {Number} uid User ID.
 * @param {String} table Table that contains the votes.
 * @return {Promise} -1 if downvoted, 0 if no vote, 1 if upvoted.
 */
export async function getVoteStatus(pid, uid, table) {
	const idName = table === "postVotes" ? "pid" : "cid";

	const res = await instance.query(
		`SELECT \`value\` FROM ${table} WHERE ${idName} = "${pid}" AND uid = "${uid}"`
	);

	// Checking if post has upvotes.
	if (res.length === 0) {
		throw new Error("Upvote not found");
	}

	return res[0].value;
}

export async function getVoteCount(pid, table) {
	const idName = table === "postVotes" ? "pid" : "cid";

	const res = await instance.query(
		`SELECT \`value\` FROM ${table} WHERE ${idName} = "${pid}"`
	);

	let count = 0;
	for (const row of res) {
		count += row.value;
	}

	return count;
}

/**
 * Get a post by it's id, or null if the post does not exist.
 * @param {Number} pid Post ID.
 * @return {Promise} Post object.
 */
export async function getPostById(pid) {
	const res = await instance.query(
		`SELECT *
		 FROM \`posts\`
		 WHERE pid = "${pid}"`
	);

	if (res.length === 0) {
		return null;
	}

	return res[0];
}

/**
 * Get all the posts in a given category, or null if there are no posts in the category.
 * @param {Number} catid Category ID.
 * @return {Promise} Array of posts.
 */
export async function getPostsByCategory(catid) {
	const res = await instance.query(
		`SELECT *
		 FROM \`posts\`
		 WHERE catid = "${catid}"`
	);

	if (res.length === 0) {
		return null;
	}

	return res;
}

/**
 * Create a new post in the database.
 * @param {Number} catid Category ID.
 * @param {Number} uid User ID.
 * @param {String} title Post title.
 * @param {String} content Post content.
 * @return {Promise} Was the post actually created?
 */
export async function createNewPost(catid, uid, title, content) {
	const res = await instance.query(
		`INSERT INTO \`posts\` (catid, user, title, content)
		 VALUES ("${catid}", "${uid}", "${title}", "${content}")`
	);

	return res.affectedRows >= 1;
}

/**
 * Delete a post by it's id, if, and only if, uid corresponds to the user that owns the post.
 * @param {Number} pid Post ID.
 * @param {Number} uid User ID.
 * @return {Promise} Was the post actually deleted?
 */
export async function deletePostById(pid, uid) {
	const res = await instance.query(
		`DELETE FROM \`posts\`
		 WHERE pid = ${pid} AND user = ${uid}`
	);

	return res.affectedRows >= 1;
}
/**
 * Delete comment votes by a comment id.
 * @param {Number} cid Comment ID.
 * @return {Promise} Was the post actually deleted?
 */
export async function deleteCommentVotesByPostId(cid) {
	const res = await instance.query(
		`DELETE FROM \`commentVotes\`
		 WHERE cid = ${cid}`
	);

	return res.affectedRows >= 1;
}

/**
 * Delete post votes by a post id.
 * @param {Number} pid Post ID.
 * @return {Promise} Was the post actually deleted?
 */
export async function deletePostVotesByPostId(pid) {
	const res = await instance.query(
		`DELETE FROM \`postVotes\`
		 WHERE pid = ${pid}`
	);

	return res.affectedRows >= 1;
}

/**
 * Create a new user and insert them into the database, only if the user does not already exist.
 * @param {String} username Username of the new user.
 * @param {String} email Email address of the new user.
 * @param {String} password Plaintext password of the new user.
 * @return {Promise} Was the user actually created?
 */
export async function createNewUser(username, email, password) {
	const hashedPassword = await bcrypt.hash(password, 12);

	// Check if the user already exists
	const check = await instance.query(
		`SELECT COUNT(1)
		 FROM \`users\`
		 WHERE email = "${email}" OR username = "${username}"`
	);
	if (check[0]["COUNT(1)"] != 0) {
		throw new Error("User already exists");
	}

	// Insert the new user into the database
	const insert = await instance.query(
		`INSERT INTO \`users\` (username, email, password)
		 VALUES ("${username}", "${email}", "${hashedPassword}")`
	);

	return insert.affectedRows >= 1;
}

/**
 * Compare given password to the hashed password in user.
 * @param {String} password Plaintext password.
 * @param {Object} user User object from database.
 * @return {Promise} True if password matches.
 */
export async function verifyPassword(user, password) {
	//console.log("Plaintext password:", password);
	//console.log("Hashed password:", user.password);
	return bcrypt.compare(password, user.password);
}

/**
 * Is the userType higher or equal to what is required?
 * @param {String} userType User type representing privileges ("user", "moderator", "admin").
 * @param {String} required User type representing required privileges.
 * @return {Boolean} True if userType is higher, or equal to required.
 */
export function userTypeMatches(userType, required) {
	if (required === "user") {
		return true;
	} else if (
		required === "moderator" &&
		(userType === "moderator" || userType === "admin")
	) {
		return true;
	} else if (required === "admin" && userType === "admin") {
		return true;
	} else {
		return false;
	}
}

/**
 * Block a post by it's id.
 * @param {Number} pid Post id.
 * @param {Number} blockStatus 1 should block, 0 if not block.
 * @return {Promise} True if the post has been blocked.
 */
export async function blockPost(pid, blockStatus) {
	const update = await instance.query(
		`UPDATE \`posts\`
		 SET blockStatus = "${blockStatus}"
		 WHERE pid = "${pid}"`
	);

	return update.affectedRows >= 1;
}

/**
 * Get a list of all blocked posts.
 * @param {Number} pid Post id.
 * @param {Number} blockStatus Status of the retrieved posts. 1 for blocked, 0 for not blocked.
 * @return {Promise} Array of posts.
 */
export async function getBlockedPosts(blockStatus) {
	const res = await instance.query(
		`SELECT * FROM \`posts\` WHERE blockStatus = "${blockStatus}"`
	);

	if (res.length === 0) {
		// if there are no blocked posts.
		return null;
	}

	return res;
}

/**
 * Get all moderator requests.
 * @param {Number} request ID for the user who has requested mod.
 * @return {Promise} Array of requests.
 */
export async function getModeratorRequests(request) {
	const res = await instance.query(
		`SELECT * FROM \`requests\` WHERE uid = "${request}"`
	);

	if (res.length === 0) {
		console.log("No users have sent requests");
		return null;
	}
	return res;
}

/**
 * add moderator request.
 */
export async function moderatorRequest(uid, title, text) {
	const res = await instance.query(
		`INSERT INTO \`requests\` (uid, title, text) VALUES ("${uid}", "${title}", "${text}")`
	);
	return res;
}

/**
 * deletes one moderator requests.
 */
export async function deleteModerateRequest(uid) {
	const update = await instance.query(
		`DELETE FROM \`requests\` 
		WHERE uid = "${uid}"`
	);
	//return update;
	return update.affectedRows >= 1;
}

/**
 * FIXME: Function is not finished. Add error checking?
 * @param {number} uid User id that you want to change.
 * @param {string} status Type of user.
 * @return {Promise} If the user's status was changed.
 */
export async function changeUserStatus(uid, status) {
	const update = await instance.query(
		`UPDATE \`users\` 
		SET userType = "${status}" 
		WHERE uid = "${uid}"`
	);
	//return update;
	return update.affectedRows >= 1;
}
