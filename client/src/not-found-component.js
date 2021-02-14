export class NotFoundComponent extends HTMLElement {
	// We are using `route` property, which is defined by the router
	connectedCallback() {
		this.innerHTML = `
		<div style="min-height: 80vh">
			<h1>Page not found</h1>
			The pathname was: ${this.location.pathname}
		</div>
		`;
	}
}
customElements.define("not-found-component", NotFoundComponent);
