import { LitElement, html, css } from "lit-element";
import { readResource } from "../fetch.js";

export class ForumLandingComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			categories: { type: Array },
		};
	}

	constructor() {
		super();
		this.categories = [];
	}

	render() {
		return html`
			<section class="about-section text-center" id="about">
				<div class="row">
					<div class="col-lg-8 mx-auto">
						<h2 class="text-white mt-0 mb-4">Forum Categories</h2>
					</div>
				</div>
				<profile-header-component></profile-header-component>
				<div class="contact-section text-center pb-5">
					<nav-bar-component></nav-bar-component>
					${console.log(this.categories)}
					${this.categories.map((category) => {
						console.log(category);
						return html`
							<div class="col-md-12">
								<a
									class="btn"
									href="/category/${category.catid}"
									style="width: 100%;"
								>
									<div class="container">
										<div class="row">
											<div class="col-md-12 center">
												<div class="card py-4 h-100">
													<div
														class="card-body text-center"
													>
														<i
															class="fas fa-map-marked-alt text-primary mb-2"
														></i>
														<h4
															class="text-uppercase m-0"
														>
															${category.title}
														</h4>
													</div>
												</div>
											</div>
										</div>
									</div>
								</a>
							</div>
						`;
					})}
				</div>
			</section>
		`;
	}

	async update(changed) {
		this.categories = await readResource("categories");
		super.update(changed);
	}
}

customElements.define("forum-landing-component", ForumLandingComponent);
