import { LitElement, html, css } from "lit-element";
import { createResource } from "../fetch.js";

export class ForumRequestFormComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			title: { type: String },
			status: { type: String },
			text: { type: String },
		};
	}
	constructor() {
		super();
		this.title = "";
		this.text = "";
	}

	async changeTitle(e) {
		e.preventDefault();
		this.title = e.srcElement.value;
	}

	async changeText(e) {
		e.preventDefault();
		this.text = e.srcElement.value;
	}

	async submit(e) {
		console.log("asdasd");
		e.preventDefault();

		const form = e.target;

		const post = {
			title: this.title,
			text: this.text,
		};

		console.log("asdasd");

		const res = await createResource("moderatorrequests", post);

		console.log("asdasd");

		// Check response status code
		// If .ok then status code is 2XX
		if (res.ok) {
			// Redirect
			window.location.href = "http://localhost:8080/profile";
		} else {
			form.reset();
		}
	}

	render() {
		return html`
			<section class="about-section text-center pb-1" id="about">
				<div class="row">
					<div class="col-lg-8 mx-auto">
						<h2 class="text-white mt-0">Create a Request</h2>
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
							>
								<!--Grid row-->

								<!--Grid row-->
								<div class="row mt-5">
									<div class="col-md-12">
										<div class="md-form mb-0">
											<input
												type="text"
												id="subject"
												name="subject"
												class="form-control"
												style="color: black;"
												@change="${(e) =>
													this.changeTitle(e)}"
												placeholder="Request form title"
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
												class="form-control md-textarea"
												placeholder="Request text"
												@change="${(e) =>
													this.changeText(e)}"
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
										value="Send Request"
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
		super.update(changed);
	}
}

customElements.define(
	"forum-request-form-component",
	ForumRequestFormComponent
);
