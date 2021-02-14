/**
 * This module exports functions for interacting with a CRUD backend.
 */

// FIXME: Should not be localhost
const backend = "http://localhost:8081/api/";

/**
 * Create a resource on the server.
 * @param {String} resource Path to resource.
 * @param {Object} body Body of resource.
 * @return {Promise} Response from the server.
 */
export async function createResource(resource, body) {
	const url = backend + resource;
	const params = {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};

	return await innerFetch(url, params);
}

/**
 * Read a resource on the server.
 * @param {String} resource Path to resource.
 * @return {Promise} Response from the server.
 */
export async function readResource(resource) {
	const url = backend + resource;
	const params = {
		method: "GET",
		credentials: "include",
		headers: {
			Accept: "application/json",
		},
	};

	const res = await innerFetch(url, params);
	return res.json(); // Parse as JSON
}

/**
 * Update a preexisting resource on the server.
 * @param {String} resource Path to resource.
 * @param {Object} body Body of resource.
 * @return {Promise} Response from the server.
 */
export async function updateResource(resource, body) {
	const url = backend + resource;
	const params = {
		method: "PUT",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	};

	return await innerFetch(url, params);
}

/**
 * Delete a resource on the server.
 * @param {String} resource Path to resource.
 * @return {Promise} Response from the server.
 */
export async function deleteResource(resource) {
	const url = backend + resource;
	const params = {
		credentials: "include",
		method: "DELETE",
	};

	return await innerFetch(url, params);
}

/**
 * Fetch a resource from a server.
 * @param {String} url URL to fetch from.
 * @param {Object} params Params of fetch.
 * @return {Promise} Response from the server, or null if there was an error.
 */
async function innerFetch(url, params) {
	try {
		const res = await fetch(url, params);
		return res;
	} catch (err) {
		console.log(err);
		return null;
	}
}
