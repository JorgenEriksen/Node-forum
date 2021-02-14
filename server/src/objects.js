/**
 * Create a new user.
 * @param {Number} uid User ID.
 * @param {String} username Username.
 * @param {String} email Email address.
 * @param {String} password Hashed password.
 * @param {String} userType User type ("user", "moderator" or "admin").
 * @return {Object} User object.
 */
export function User(uid, username, email, password, userType = "user") {
	return {
		uid: uid,
		username: username,
		email: email,
		password: password,
		userType: userType,
	};
}
