import { LitElement, html, css } from "lit-element";

export class NavbarComponent extends LitElement {
	static styles() {
		return css``;
	}

	static get properties() {
		return {
			searchText: { type: String },
		};
	}

	constructor() {
		super();
		this.searchText = "";
	}

	async submit(e) {
		e.preventDefault();
		window.location.href =
			"http://localhost:8080/search/" + this.searchText;
	}

	changeSearchText(e) {
		e.preventDefault();
		this.searchText = e.srcElement.value;
	}

	render() {
		return html` <!--Navbar START-->
			<nav
				class="navbar navbar-dark navbar-expand-lg bg-darkgrey container"
			>
				<a class="btn btn-outline-primary btn-sm ml-2" href="#"
					>Log out</a
				>
				<a class="btn btn-outline-primary btn-sm ml-2" href="/category"
					>Forum</a
				>
				<a
					class="btn btn-outline-primary btn-sm ml-2"
					href="/forum-create"
					>Create Post</a
				>
				<a
					class="btn btn-outline-primary btn-sm ml-2"
					href="/forum-request"
					>Request form</a
				>
				<a class="btn btn-outline-primary btn-sm ml-2" href="/admin"
					>admin/moderator</a
				>
				<form
					class="form-inline ml-auto"
					@submit="${(e) => {
						this.submit(e);
					}}"
				>
					<div class="md-form my-0">
						<input
							class="form-control"
							type="text"
							required
							@change="${(e) => this.changeSearchText(e)}"
							placeholder="Press Enter for search.."
							aria-label="Search"
						/>
					</div>
					<!-- <button
						href="#!"
						class="btn btn-outline-primary btn-sm ml-2"
						type="submit"
					>
						Search
					</button> -->
				</form>
			</nav>
			<!--Navbar END-->`;
	}
}

customElements.define("nav-bar-component", NavbarComponent);
