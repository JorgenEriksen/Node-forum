import { Router } from "@vaadin/router";

const outlet = document.getElementById("outlet");
const router = new Router(outlet);

router.setRoutes([
	{ path: "/", component: "landing-page-component" },
	{ path: "/login", component: "landing-login-component" },
	{ path: "/register", component: "landing-register-component" },
	{ path: "/category", component: "forum-landing-component" },
	{ path: "/category/:catId", component: "forum-category-component" },
	{ path: "/search/:searchText", component: "forum-category-component" },
	{ path: "/forum-post/:postId", component: "forum-view-post-component" },
	{ path: "/forum-request", component: "forum-request-form-component" },
	{ path: "/forum-create", component: "forum-create-post-component" },
	{ path: "/forum-comm", component: "forum-comment-component" },
	{ path: "/profile", component: "profile-page-component" },
	{ path: "/admin", component: "adminmod-page-component" },
	{ path: "/(.*)", component: "not-found-component" },
]);
