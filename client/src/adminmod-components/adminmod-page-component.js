import { LitElement, html, css } from "lit-element";
import { ProfileHeaderComponent } from "../profile-page-components/profile-header-component";
import { NavbarComponent } from "../nav-bar-component/nav-bar-component.js";
import { readResource, updateResource, deleteResource } from "../fetch.js";
import "@vaadin/vaadin-icons/vaadin-icons.js";

export class AdminmodPageComponent extends LitElement {
	static get styles() {
		return css``;
	}

	static get properties() {
		return {
			moderatorRequests: { type: Array },
		};
	}

	constructor() {
		super();
		this.moderatorRequests = [];
	}

	async acceptRequest(uid) {
		console.log("ACCEPT BUTTON");
		const res = await updateResource("users/" + uid);

		if (res.ok) {
			// Redirect
			window.location.href = "http://localhost:8080/admin";
		}
	}

	async declineRequest(uid) {
		console.log("DECLINE BUTTON");
		const res = await deleteResource("moderatorrequests/" + uid);

		if (res.ok) {
			// Redirect
			window.location.href = "http://localhost:8080/admin";
		}
	}

	render() {
		return html`
      <section class="about-section text-center mt-0 pt-5" id="about">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <h2 class="text-white mt-0">Admin/moderator page</h2>
            </div>
          </div>
          <profile-header-component></profile-header-component>
          <section class="contact-section text-center pb-5">
            <div class="center text-center">

              <!-- <span><a class="btn btn-primary mb-5" href="/forum-create">Create Post</a></span> -->
              <!-- <h3 class="mb-5" style="color: white;">Here the information about the user will go</h3> -->
            </div>
            <nav-bar-component></nav-bar-component>
            <div class="container mb-0 pb-0">
              <div class="row mb-0">
                <div class="col-md-12 center">
                  <div class="card mb-5">
                    <div class="card-body text-center">
                      <i class="fas fa-map-marked-alt text-primary mb-0 pb-0"></i>
                      <div class=" mb-0 pb-0 text-center">
                        <h3 class="text-uppercase mt-2 mb-0">Moderator requests</h3>
                      </div>
                      <div class="mb-5 p-0">
                        <hr class="" />
                      </div>
                    

                      <div class=" mb-0 pb-0 text-left">
                      <table class="table">
                        <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">username</th>
                          <th scope="col">title</th>
                          <th scope="col">text</th>
                          <th scope="col"></th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.moderatorRequests.map((request, idx) => {
							return html`
								<tr>
									<th scope="row">${request.userInfo.uid}</th>
									<td>${request.userInfo.username}</td>
									<td>${request.title}</td>
									<td>${request.text}</td>
									<td
										@click=${() =>
											this.acceptRequest(
												request.userInfo.uid
											)}
									>
										accept
									</td>
									<td
										@click=${() =>
											this.declineRequest(
												request.userInfo.uid
											)}
									>
										decline
									</td>
								</tr>
								<tr></tr>
							`;
						})}
                        </tbody>
                        </table>
                      </div>
                      <div class="mb-5 mt-5">
                      <hr class="" />
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>
      </div>
      </section>`;
	}

	async update(changed) {
		this.moderatorRequests = await readResource(`moderatorrequests`);
		if (this.moderatorRequests == null) {
			this.moderatorRequests = [];
		}

		for (let i = 0; i < this.moderatorRequests.length; i++) {
			this.moderatorRequests[i].userInfo = await readResource(
				`users/${this.moderatorRequests[i].uid}`
			);
		}

		super.update(changed);
	}
}

customElements.define("adminmod-page-component", AdminmodPageComponent);
