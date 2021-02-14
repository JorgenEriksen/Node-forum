import { css, html, LitElement } from "lit-element";
import { createResource } from "../fetch.js";

export class LandingLoginComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			email: { type: String },
			password: { type: String },
		};
	}

	constructor() {
		super();
		this.username = "";
		this.password = "";
	}

	changeUsername(e) {
		e.preventDefault();
		this.username = e.srcElement.value;
	}

	changePassword(e) {
		e.preventDefault();
		this.password = e.srcElement.value;
	}

	async submit(e) {
		e.preventDefault();

		const form = e.target;

		console.log("Submit!");

		const user = {
			username: this.username,
			password: this.password,
		};

		const res = await createResource("login", user);

		form.reset();

		// Check response status code
		// If .ok then status code is 2XX
		if (res.ok) {
			// Redirect
			window.location.href = "http://localhost:8080/category";
		}
	}

	render() {
		return html`
			<header class="masthead mt-0">
				<div class="container d-flex h-100 align-items-center">
					<div class="mx-auto text-center mt-5">
						<h1 class="mx-auto text-uppercase mb-5 mt-5">
							The Forum
						</h1>
						<div class="row mt-5">
							<div class="container">
								<div
									class="col-md-10 col-lg-8 mx-auto text-center"
								>
									<i
										class="far fa-paper-plane fa-2x mb-2 text-white"
									></i>
									<h2 class="text-white mb-5">
										Enter your email and password
									</h2>
									<form
										@submit="${(e) => this.submit(e)}"
										class="form-inline d-flex"
									>
										<input
											class="form-control flex-fill mr-2 mr-sm-2 mb-3 mb-sm-0"
											name="username"
											id="username"
											type="username"
											placeholder="Username"
											required
											@change="${(e) =>
												this.changeUsername(e)}"
										/>

										<input
											class="form-control flex-fill ml-2 mr-sm-2 mb-3 mb-sm-0"
											name="password"
											id="password"
											type="password"
											placeholder="Password"
											required
											@change="${(e) =>
												this.changePassword(e)}"
										/>

										<button
											class="btn btn-primary mx-auto mt-5"
											type="submit"
										>
											Login
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		`;
	}
}

customElements.define("landing-login-component", LandingLoginComponent);
