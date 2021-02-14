import { css, html, LitElement } from "lit-element";

export class LandingPageComponent extends LitElement {
	static get styles() {
		return css`
			.hmpage-btns {
				margin-top: 100px;
			}
			:host {
			}
		`;
	}

	static get properties() {
		return {
			email: { type: String },
			password: { type: String },
		};
	}

	constructor() {
		super();
		this.email = "";
		this.password = "";
	}

	changeEmail(e) {
		e.preventDefault();
		this.email = e.srcElement.value;
	}

	changePassword(e) {
		e.preventDefault();
		this.password = e.srcElement.value;
	}

	formSubmit(e) {
		e.preventDefault();
		console.log("email: " + this.email);
		console.log("password: " + this.password);
	}

	render() {
		return html`
			<header class="masthead mt-0">
				<div class="container d-flex h-100 align-items-center">
					<div class="mx-auto text-center">
						<h1 class="mx-auto text-uppercase">The Forum</h1>
						<!-- <h2 class="text-white-50 mx-auto mt-2 mb-5">A cool forum</h2> -->
						<div class="hmpage-btns">
							<a class="btn btn-primary" href="/login">Login</a>
							<a class="btn btn-primary" href="/register"
								>Register</a
							>
						</div>
					</div>
				</div>
			</header>
		`;
	}
}

customElements.define("landing-page-component", LandingPageComponent);
