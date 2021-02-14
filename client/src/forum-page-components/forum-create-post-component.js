import { LitElement, html, css } from "lit-element";
import { createResource, readResource } from "../fetch.js";

export class ForumCreatePostComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			categories: { type: Array },
			catid: { type: Number },
			title: { type: String },
			content: { type: String },
		};
	}

	get button() {
		return this.shadowRoot.querySelector("form");
	}

	constructor() {
		super();
		(this.categories = []), (this.catid = 2);
		this.title = "";
		this.content = "";
	}

	changeCategory(e) {
		e.preventDefault();
		this.catid = e.srcElement.value;
	}

	changeTitle(e) {
		e.preventDefault();
		this.title = e.srcElement.value;
	}

	changeContent(e) {
		e.preventDefault();
		this.content = e.srcElement.value;
	}

	async submit(e) {
		console.log(this.catid);
		e.preventDefault();

		const form = e.target;

		console.log("Submit!");

		const post = {
			catid: this.catid,
			title: this.title,
			content: this.content,
		};

		const res = await createResource("posts", post);

		// Check response status code
		// If .ok then status code is 2XX
		if (res.ok) {
			// Redirect
			window.location.href =
				"http://localhost:8080/category/" + this.catid;
		} else {
			form.reset();
		}
	}

	render() {
		return html`
			<section class="about-section text-center pb-1" id="about">
				<div class="row">
					<div class="col-lg-8 mx-auto">
						<h2 class="text-white mt-0">Create a Post</h2>
					</div>
				</div>
				<profile-header-component></profile-header-component>
				<nav-bar-component></nav-bar-component>
				<section class="mb-4">
					<div class="container">
						<!--Grid column-->
						<div class="col-md-12 mb-md-0 mb-5">
							<form
								id="submit-post-form"
								name="submit-post-form"
								@submit="${(e) => {
									this.submit(e);
								}}"
								#shadow-root
							>
								<!--Grid row-->

								<!--Grid row-->
								<div class="row mt-5">
									<div class="col-md-12">
										<div class="md-form mb-0">
											<label
												for="category"
												class="position-static"
												>Category</label
											>
											<br />
											<div>
												<select
													class="browser-default custom-select"
													@change="${(e) =>
														this.changeCategory(e)}"
												>
													${this.categories.map(
														(category, idx) => {
															if (
																category.catid ==
																this.catid
															) {
																return html`<option
																	selected
																	value=${category.catid}
																>
																	${category.title}
																</option>`;
															} else {
																return html`<option
																	value=${category.catid}
																>
																	${category.title}
																</option>`;
															}
														}
													)}
												</select>
											</div>
										</div>
									</div>
								</div>
								<!--Grid row-->

								<!--Grid row-->
								<div class="row mt-5">
									<div class="col-md-12">
										<div class="md-form mb-0">
											<input
												@change="${(e) =>
													this.changeTitle(e)}"
												required
												type="text"
												id="title"
												name="title"
												class="form-control"
												placeholder="Post Title"
											/>
											<label
												for="category"
												class=""
											></label>
										</div>
									</div>
								</div>
								<!--Grid row-->

								<!--Grid row-->
								<div class="row mt-5">
									<!--Grid column-->
									<div class="col-md-12">
										<div class="md-form">
											<textarea
												type="text"
												id="message"
												name="message"
												rows="11"
												@change="${(e) =>
													this.changeContent(e)}"
												class="form-control md-textarea"
												placeholder="Post Text"
												required
											></textarea>
											<label for="message"></label>
										</div>
									</div>
								</div>
								<!--Grid row-->
								<div class="text-right">
									<input
										class="btn btn-primary"
										type="submit"
										value="Create Post"
									/>
								</div>
							</form>

							<div class="status"></div>
						</div>
						<!--Grid column-->
					</div>
				</section>
			</section>
		`;
	}

	async update(changed) {
		this.categories = await readResource("categories");
		console.log(this.categories);

		super.update(changed);
	}
}

customElements.define("forum-create-post-component", ForumCreatePostComponent);
