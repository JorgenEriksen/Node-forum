import { LitElement, html, css } from "lit-element";
import {
	readResource,
	createResource,
	updateResource,
	deleteResource,
} from "../fetch.js";
import "@vaadin/vaadin-icons/vaadin-icons.js";

export class ForumViewPostComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			post: {
				type: {
					user: Number,
					title: String,
					content: String,
					upvotes: Number,
				},
			},
			postUser: {
				type: {
					username: String,
					userType: String,
				},
			},
			currentUser: {
				type: {
					uid: Number,
					username: String,
					userType: String,
				},
			},
			comments: { type: Array },
			userComment: { type: String },
			isOwner: { type: Boolean },
		};
	}

	constructor() {
		super();
		this.post = {};
		this.postUser = {};
		this.currentUser = {};
		this.comments = [];
		this.userComment = "";
		this.isOwner = false;
	}

	changeUserComment(e) {
		this.userComment = e.srcElement.value;
	}

	async deletePost() {
		const res = await deleteResource("posts/" + this.post.pid);
		if (res.ok) {
			// Redirect
			window.location.href =
				"http://localhost:8080/category/" + this.post.catid;
		}
	}

	async submit(e) {
		e.preventDefault();

		const form = e.target;

		const comment = {
			comment: this.userComment,
			post: this.post.pid,
		};

		const res = await createResource("comments", comment);

		form.reset();

		// Check response status code
		// If .ok then status code is 2XX
		if (res.ok) {
			// Redirect
			window.location.href =
				"http://localhost:8080/forum-post/" + this.post.pid;
		}
	}

	async upvote() {
		const res = await updateResource(`posts/${this.post.pid}/upvote`);

		if (res != null && res.ok) {
			this.requestUpdate("post");
		}
	}

	async downvote() {
		const res = await updateResource(`posts/${this.post.pid}/downvote`);

		if (res != null && res.ok) {
			this.requestUpdate("post");
		}
	}

	async upvoteComment(cid) {
		const res = await updateResource(`comments/${cid}/upvote`);

		if (res != null && res.ok) {
			this.requestUpdate("comments");
		}
	}

	async downvoteComment(cid) {
		const res = await updateResource(`comments/${cid}/downvote`);

		if (res != null && res.ok) {
			this.requestUpdate("comments");
		}
	}

	render() {
		return html`
        <section class="about-section text-center" id="about">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <h2 class="text-white mt-0">View Post Page</h2>       
              </div>
            </div>
            <profile-header-component></profile-header-component>
            <section class="contact-section text-center pb-5">
			<nav-bar-component></nav-bar-component>
              <div class="container mb-0 pb-0">
                  <div class="row mb-0">
                    <div class="col-md-12 center">
                          <div class="card mb-5">
                              <div class="card-body text-center">
                                  <i class="fas fa-map-marked-alt text-primary mb-0 pb-0"></i>
                                  <div class="row mb-0 pb-0">
                                    <div class="col-md-4 text-left row mb-0 pb-0">
                                    <img class="rounded-circle z-depth-1 mt-0" alt="100x100" src="../../assets/img/sample-profile.png"
                                    data-holder-rendered="true" style="width: 75px; height: 75px;">
                                    <div class="ml-3 mt-2">
                                    <p class=" mb-0">${
										this.postUser.username
									}</p>
                                    <p class="mb-0">${
										this.postUser.userType
									}</p>
                                  </div>
                                  </div>
                                  <div class="col-md-6 text-center mb-0 pb-0">
                          
                                  <h3 class="text-uppercase mt-2 text-left mb-0">${
										this.post.title
									}</h3>
									
								</div>
								${
									this.isOwner
										? html`<div class="col-md-1">
												<button
													class="btn btn-danger text-center mr-0"
													@click="${() =>
														this.deletePost()}"
												>
													<iron-icon
														icon="vaadin:close"
													></iron-icon>
												</button>
										  </div>`
										: html`<div class="col-md-1"></div>`
								}
                              
                                  <p class="mt-5 mb-0 text-left">${
										this.post.content
									}
                                    </p>
							   </div>
							   <div class="mt-4 ml-0 container row">
								   <div class="col-md-6 text-left">
							   <span class="mb-0 pb-0 ml-1"><iron-icon @click="${() =>
									this.upvote()}" icon="vaadin:thumbs-up"></iron-icon><span class="ml-2">${
			this.post.upvotes
		}</span></span>
							   <span class="mb-0 pb-0 ml-1"><iron-icon @click="${() =>
									this.downvote()}" style="fill:red" icon="vaadin:thumbs-down"></iron-icon></span>
							   <span class="mb-0 pb-0 ml-4"><iron-icon style="color: #64A19D;" icon="vaadin:comments"></iron-icon><span class="ml-2">${
									this.comments.length
								}</span></span>
							   </div>
							   <div class="text-right col-md-6 m-0 p-0">
                            <span class="mb-0 mr-2 pb-0 small">Date <span>11</span>.<span>11</span>.<span>20</span></span>
                          </div>
                              </div>
                               <div class="mt-2 mb-3 pt-0"><hr class=""/></div>
                              <ul class="list-group text-left mt-2">
                              ${this.comments.map((comment) => {
									return html`
										<div class="container">
											<li class="list-group-item">
												<div class="row">
													<div class="col-md-1">
														<img
															class="rounded-circle z-depth-1"
															alt="100x100"
															src="../../assets/img/sample-profile.png"
															data-holder-rendered="true"
															style="width: 40px; height: 40px;"
														/>
													</div>
													<div class="col-md-8 text-left mb-5">
														<p
															class="m-0"
															style="font-size: small;"
														>
															${comment.userInfo.username}
														</p>
														<p
															class="m-0"
															style="font-size: small;"
														>
															${comment.userInfo.userType}
														</p>
														
													</div>
													<div class="col-md-2 text-right ml-5"><a ><iron-icon style="color: #DC3545;" icon="vaadin:recycle"></iron-icon></a></div>
												</div>
												<p class="mb-4 mt-2">
													${comment.comment}
												</p>
												<div class="mt-4 ml-0 row">
								   <div class="col-md-6">
							   <span class="mb-0 pb-0 ml-1"><iron-icon @click="${() =>
									this.upvoteComment(
										comment.cid
									)}" icon="vaadin:thumbs-up"></iron-icon><span class="ml-2">${
										comment.upvotes
									}</span></span>
							   <span class="mb-0 pb-0 ml-1"><iron-icon @click="${() =>
									this.downvoteComment(
										comment.cid
									)}" style="fill:red" icon="vaadin:thumbs-down"></iron-icon></span>
							   </div>
							   <div class="text-right col-md-6 m-0 p-0">
                            <span class="mb-0 mr-2 pb-0 small">Date <span>11</span>.<span>11</span>.<span>20</span></span>
                          </div>
                              </div>
											</li>
											<br />
											</div>
										</div>
									`;
								})}
								<div class="mb-5 p-0"><hr class=""/></div>
								<div class="container">
							  <div class="mb-0 pb-0 text-left">
							  <h4
								  class="text-uppercase mt-5 mb-0"
							  >
								  comment
							  </h4>
						  		</div>
								<form @submit="${(e) => this.submit(e)}">
								<div class="row mt-1">
									<div class="col-md-12">
										<div class="md-form">
											<textarea
												type="text"
												id="message"
												name="message"
												rows="4"
												required
												class="form-control md-textarea"
												@change="${(e) => this.changeUserComment(e)}
												placeholder="Post comment"
											></textarea>
											<label
												for="message"
											></label>
										</div>
									</div>
								</div>
								<div class="col-md-12 text-right mb-2">
								<input class="btn btn-primary" type="submit" value="Comment" />
								</form>
							   </div>
							   </div>
							  </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
		</section>
        `;
	}

	async update(changed) {
		const postId = this.location.params.postId;

		this.post = await readResource(`posts/${postId}`);
		this.postUser = await readResource(`users/${this.post.user}`);
		this.currentUser = await readResource("user");

		let comments = await readResource(`posts/${postId}/comments`);

		if (!comments) {
			comments = [];
		}
		for (let comment of comments) {
			comment.userInfo = await readResource(`users/${comment.user}`);
		}

		this.comments = comments;

		if (this.post.user == this.currentUser.uid) {
			this.isOwner = true;
		}

		console.log("Update");
		super.update(changed);
	}
}

customElements.define("forum-view-post-component", ForumViewPostComponent);
