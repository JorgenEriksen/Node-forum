/*-- The forum category component --*/
/*-- Will list all the posts in   --*/
/*-- category as buttons to view  --*/

import { css, LitElement, html } from "lit-element";
import { readResource } from "../fetch.js";
import "@vaadin/vaadin-icons/vaadin-icons.js";

export class ForumCategoryComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			posts: { type: Array },
			searchText: { type: String },
		};
	}

	constructor() {
		super();
		this.posts = [];
		this.searchText = [];
	}

	filterByValue(array, string) {
		return array.filter(
			(o) =>
				o.title.toLowerCase().includes(string.toLowerCase()) ||
				o.content.toLowerCase().includes(string.toLowerCase())
		);
	}

	changeSort(e) {
		console.log(this.posts);
		if (e.srcElement.value == "date") {
			this.posts = this.posts.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			});
		} else if (e.srcElement.value == "name") {
			this.posts = this.posts.sort((a, b) => {
				if (a.title.toLowerCase() < b.title.toLowerCase()) {
					return -1;
				}
				if (a.title.toLowerCase() > b.title.toLowerCase()) {
					return 1;
				}
				return 0;
			});
		}

		console.log(this.posts);
		this.requestUpdate();
	}

	render() {
		return html`
			<section class="about-section text-center" id="about">
				<div class="container">
					<div class="row">
						<div class="col-lg-8 mx-auto">
							<h2 class="text-white mt-0">
								Forum View Post Page
							</h2>
						</div>
					</div>
					<profile-header-component></profile-header-component>
					<section class="contact-section text-center pb-5">
						<div class="center text-center"></div>
						<nav-bar-component></nav-bar-component>
						${this.searchText != "" &&
						html`<h2 class="text-white">
							Search result of <em>${this.searchText}</em>:
						</h2>`}
						<div class="d-flex flex-row-reverse">
							<select
								style="width: 100px; margin: 0px 15px 15px 0px"
								class="browser-default custom-select"
								@change="${(e) => this.changeSort(e)}"
							>
								<option selected value="date">Date</option>
								<option value="name">Name</option>
							</select>
						</div>

						${this.posts.map((post) => {
							return html`
								<a
									href="/forum-post/${post.pid}"
									style="text-decoration: none; display: block;"
								>
									<div class="container mb-0 pb-0">
										<div class="row mb-0">
											<div class="col-md-12 center">
												<div class="card mb-5">
													<div
														class="card-body text-center"
													>
														<i
															class="fas fa-map-marked-alt text-primary mb-0"
														></i>
														<h3
															class="text-uppercase m-0"
														>
															${post.title}
														</h3>
														<hr class="my-4" />
														<div
															class="mt-5 mb-0 text-black"
														>
															${post.content
																.length > 20
																? html`${post.content.slice(
																		0,
																		20
																  )}..`
																: html`${post.content}`}
														</div>
													</div>
													<div class="row mb-0 pb-0">
														<span
															class="text-left mb-1 pb-0 ml-4"
															><iron-icon
																icon="vaadin:thumbs-up"
															></iron-icon>
															<span class="ml-2"
																>${post.upvotes}</span
															></span
														>
														<span
															class="text-left mb-0 pb-0 ml-4"
															><iron-icon
																icon="vaadin:comments"
															></iron-icon>
															<span class="ml-2"
																>${post.numComments}</span
															></span
														>
													</div>
												</div>
											</div>
										</div>
									</div>
								</a>
							`;
						})}
					</section>
				</div>
			</section>
		`;
	}

	async update(changed) {
		if (this.posts.length == 0) {
			if (this.location.params.catId) {
				const catId = this.location.params.catId;
				this.posts = await readResource(`categories/${catId}/posts`);

				if (this.posts == null) {
					this.posts = [];
				}
			}

			if (this.location.params.searchText) {
				this.searchText = this.location.params.searchText;
				this.posts = await readResource("posts");
				this.posts = this.filterByValue(this.posts, this.searchText);
				if (this.posts == null) {
					this.posts = [];
				}
			}
		}

		console.log(this.posts);

		super.update(changed);
	}
}

customElements.define("forum-category-component", ForumCategoryComponent);
