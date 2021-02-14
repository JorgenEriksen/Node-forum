import { LitElement, html, css } from "lit-element";
import { readResource } from "../fetch.js";

export class ProfileHeaderComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			user: { type: Object },
		};
	}

	constructor() {
		super();
		this.user = {};
	}

	render() {
		return html` <a href="/profile">
				<img
					class="rounded-circle z-depth-2 mt-4"
					alt="100x100"
					src="../../assets/img/sample-profile.png"
					data-holder-rendered="true"
					style="width: 200px; height: 200px;"
			/></a>
			<h3 class="text-white mt-4 mb-5">${this.user.username}</h3>`;
	}

	async update(changed) {
		console.log("ASD:");
		this.user = await readResource("user");
		console.log(this.user);
		super.update(changed);
	}
}

customElements.define("profile-header-component", ProfileHeaderComponent);
