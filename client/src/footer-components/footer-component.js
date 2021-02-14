import { css, html, LitElement } from "lit-element";

export class FooterElement extends LitElement {
	static get styles() {
		return css``;
	}

	render() {
		return html`
			<footer class="footer bg-black small text-center text-white-50">
				<div class="container">Copyright © The Forum 2020</div>
			</footer>
		`;
	}
}

customElements.define("footer-component", FooterElement);
