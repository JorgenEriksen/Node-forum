import { css, html, LitElement } from "lit-element";
import { createResource } from "../fetch.js";

export class LandingRegisterComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			username: { type: String },
			email: { type: String },
			password: { type: String },
			passwordConfirm: { type: String },
		};
	}

	constructor() {
		super();
		this.username = "";
		this.email = "";
		this.password = "";
		this.passwordConfirm = "";
	}

	changeUsername(e) {
		e.preventDefault();
		this.username = e.target.value;
	}

	changeEmail(e) {
		e.preventDefault();
		this.email = e.srcElement.value;
	}

	changePassword(e) {
		e.preventDefault();
		this.password = e.srcElement.value;
	}

	confirmPassword(e) {
		e.preventDefault();
		this.passwordConfirm = e.srcElement.value;
	}

	async submit(e) {
		e.preventDefault();

		const form = e.target;

		console.log("Submit!");

		// Make sure the two passwords match
		if (this.password !== this.passwordConfirm) {
			form.reset();
			return;
		}

		const user = {
			username: this.username,
			email: this.email,
			password: this.password,
		};

		const res = await createResource("users", user);

		// Check response status code
		// If .ok then status code is 2XX
		if (res.ok) {
			// Redirect
			window.location.href = "http://localhost:8080/login";
		} else {
			form.reset();
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
										Register your email and password
									</h2>
									<form @submit="${(e) => this.submit(e)}">
										<input
											class="form-control flex-fill mt-2"
											name="username"
											id="username"
											type="username"
											placeholder="Username"
											@change="${(e) => {
												this.changeUsername(e);
											}}"
										/>

										<input
											class="form-control flex-fill mt-2"
											name="email"
											id="email"
											type="email"
											placeholder="Email"
											@change="${(e) => {
												this.changeEmail(e);
											}}"
										/>

										<input
											class="form-control flex-fill mt-2"
											name="password"
											id="password"
											type="password"
											placeholder="Password"
											@change="${(e) => {
												this.changePassword(e);
											}}"
										/>

										<input
											class="form-control flex-fill mt-2"
											name="password-confirm"
											id="password-confirm"
											type="password"
											placeholder="Confirm password"
											@change="${(e) => {
												this.confirmPassword(e);
											}}"
										/>

										<button
											class="btn btn-primary mx-auto mt-3"
											type="submit"
										>
											Register
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

customElements.define("landing-register-component", LandingRegisterComponent);
