import { LitElement, html, css } from "lit-element";
import { ProfileHeaderComponent } from "./profile-header-component.js";
import { NavbarComponent } from "../nav-bar-component/nav-bar-component.js";
import "@vaadin/vaadin-icons/vaadin-icons.js";

export class ProfilePageComponent extends LitElement {
	static get styles() {
		return css``;
	}

	constructor() {
		super();
	}

	render() {
		return html`
<section class="about-section text-center mt-0 pt-5" id="about">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <h2 class="text-white mt-0">User Profile Page</h2>
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
                  <h3 class="text-uppercase mt-2 mb-0">Profile page information</h3>
                </div>
                <div class="mb-5 p-0">
                  <hr class="" />
                </div>
                <p class="mt-5 mb-0 text-left">Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                  ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                  quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque
                  porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                  velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
                  ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
                  autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
                  consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <p class="mt-5 mb-0 text-left">Sed ut perspiciatis unde omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                  ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                  quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque
                  porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                  velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
                  ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
                  autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
                  consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <div class="mb-5 mt-5">
                  <hr class="" />
                </div>
                <div class=" mb-0 pb-0 text-left">
                  <h3 class="text-uppercase mt-2 mb-0">Posts created - clickable?</h3>
                </div>
                <a>
                  <ul class="list-group text-left mt-2">
                    <div class="container">
                      <li class="list-group-item">
                        <div class="row mb-0 pb-0 text-left">
                          <img class="rounded-circle z-depth-1" alt="100x100"
                              src="../../assets/img/sample-profile.png" data-holder-rendered="true"
                              style="width: 40px; height: 40px;" />
                          <p class="text-uppercase m-3">Post name</p>
                        </div>
                        <p class="mb-4">A few words about the post. Maybe the beginning of the actual post, and
                          then some dots to emulate that the post is longer...
                        </p>
                        <div class="container row mt-5">
                          <div class="text-left col-md-6 m-0 p-0">
                            <span class="mb-0 pb-0 small"><iron-icon style="color: #64A19D;" icon="vaadin:thumbs-up"></iron-icon><span class="ml-2">12</span></span>
                            <span class="text-left mb-0 pb-0 ml-3 small"><iron-icon style="color: #64A19D;" icon="vaadin:comments"></iron-icon><span class="ml-2">5</span></span>
                          </div>
                          <div class="text-right col-md-6 m-0 p-0">
                            <span class="mb-0 pb-0 small">Date <span>11</span>.<span>11</span>.<span>20</span></span>
                          </div>
                        </div>
                      </li>
                      <br />
                    </div>
                  </ul>
                </a>
                <div class=" mb-0 pb-0 text-left">
                  <h3 class="text-uppercase mt-5 mb-0">Comments created - clickable?</h3>
                </div>
                <a>
                  <ul class="list-group text-left mt-2">
                    <div class="container">
                      <li class="list-group-item">
                        <div class="row mb-0 pb-0 text-left">
                          <img class="rounded-circle z-depth-1" alt="100x100"
                              src="../../assets/img/sample-profile.png" data-holder-rendered="true"
                              style="width: 40px; height: 40px;" />
                          <p class="text-uppercase m-3">Name of the post commented</p>
                        </div>
                        <p class="mb-4">Beginning the comment, it can fit whatever text we think is ok. And if the
                          comment is long we can have dots to emulate that there is more...
                        </p>
                        <div class="container row mt-5">
                          <div class="text-left col-md-6 m-0 p-0">
                            <span class="mb-0 pb-0 small"><iron-icon style="color: #64A19D;" icon="vaadin:thumbs-up"></iron-icon><span class="ml-2">12</span></span>
                          </div>
                          <div class="text-right col-md-6 m-0 p-0">
                            <span class="mb-0 pb-0 small">Date <span>11</span>.<span>11</span>.<span>20</span></span>
                          </div>
                        </div>
                      </li>
                      <br />
                    </div>
                  </ul>
                </a>
                <div class=" mb-0 pb-0 text-left">
                  <h3 class="text-uppercase mt-5 mb-0">List of Forum Users</h3>
                </div>
                  <ul class="list-group text-left mt-2">
                    <div class="container">
                      <a>
                      <li class="list-group-item">
                        <div class="row">
                          <div>
                            
                            <img class="rounded-circle z-depth-1" alt="100x100"
                              src="../../assets/img/sample-profile.png" data-holder-rendered="true"
                              style="width: 40px; height: 40px;" />
                              
                          </div>
                          <p class="text-uppercase ml-5 mt-2 mb-0">Name of the user</p>
                          <p class="text-uppercase ml-5 mt-2 mb-0">Status of user</p>
                        </div>
                      </li>
                      </a>
                      <br />
                    </div>
                    <div class="container">
                      <a>
                      <li class="list-group-item">
                        <div class="row">
                          <div>
                            
                            <img class="rounded-circle z-depth-1" alt="100x100"
                              src="../../assets/img/sample-profile.png" data-holder-rendered="true"
                              style="width: 40px; height: 40px;" />
                              
                          </div>
                          <p class="text-uppercase ml-5 mt-2 mb-0">Name of the user</p>
                          <p class="text-uppercase ml-5 mt-2 mb-0">Status of user</p>
                        </div>
                      </li>
                      </a>
                      <br />
                    </div>
                  </ul>
                  <div class=" mb-0 pb-0 text-left">
                  <h3 class="text-uppercase mt-5 mb-0">Request forms</h3>
                </div>
                  <ul class="list-group text-left mt-2">
                    <div class="container">
                      <a>
                      <li class="list-group-item">
                        <div class="row">
                          <div>
                            <img class="rounded-circle z-depth-1" alt="100x100"
                              src="../../assets/img/sample-profile.png" data-holder-rendered="true"
                              style="width: 40px; height: 40px;" />
                          </div>
                          <p class="text-uppercase ml-5 mt-2 mb-0">Title of request form</p>
                          <p class="text-uppercase ml-5 mt-2 mb-0">Status requested</p>
                        </div>
                      </li>
                      </a>
                      <br />
                    </div>
                    <div class="container">
                      <a>
                      <li class="list-group-item">
                        <div class="row">
                          <div>
                            <img class="rounded-circle z-depth-1" alt="100x100"
                              src="../../assets/img/sample-profile.png" data-holder-rendered="true"
                              style="width: 40px; height: 40px;" />
                          </div>
                          <p class="text-uppercase ml-5 mt-2 mb-0">Title of request form</p>
                          <p class="text-uppercase ml-5 mt-2 mb-0">Status requested</p>
                        </div>
                      </li>
                      </a>
                      <br />
                    </div>
                  </ul>
                  <div class=" mb-0 pb-0 text-left">
                  <h3 class="text-uppercase mt-2 mb-0">Posts Blocked</h3>
                </div>
                <a>
                  <ul class="list-group text-left mt-2">
                    <div class="container">
                      <li class="list-group-item">
                        <div class="row mb-0 pb-0 text-left">
                          <img class="rounded-circle z-depth-1" alt="100x100"
                              src="../../assets/img/sample-profile.png" data-holder-rendered="true"
                              style="width: 40px; height: 40px;" />
                          <p class="text-uppercase m-3">Post name</p>
                        </div>
                        <p class="mb-4">A few words about the post. Maybe the beginning of the actual post, and
                          then some dots to emulate that the post is longer...
                        </p>
                        <div class="container row mt-5">
                          <div class="text-left col-md-6 m-0 p-0">
                            <span class="mb-0 pb-0 small"><iron-icon style="color: #64A19D;" icon="vaadin:thumbs-up"></iron-icon><span class="ml-2">12</span></span>
                            <span class="text-left mb-0 pb-0 ml-3 small"><iron-icon style="color: #64A19D;" icon="vaadin:comments"></iron-icon><span class="ml-2">5</span></span>
                          </div>
                          <div class="text-right col-md-6 m-0 p-0">
                            <span class="mb-0 pb-0 small">Date <span>11</span>.<span>11</span>.<span>20</span></span>
                          </div>
                        </div>
                      </li>
                      <br />
                    </div>
                  </ul>
                </a>
                  <div class=" mb-0 pb-0 text-left">
                  <h3 class="text-uppercase mt-5 mb-0">Comments blocked</h3>
                </div>
                <a>
                  <ul class="list-group text-left mt-2">
                    <div class="container">
                      <li class="list-group-item">
                        <div class="row mb-0 pb-0 text-left">
                          <img class="rounded-circle z-depth-1" alt="100x100"
                              src="../../assets/img/sample-profile.png" data-holder-rendered="true"
                              style="width: 40px; height: 40px;" />
                          <p class="text-uppercase m-3">Name of the post commented</p>
                        </div>
                        <p class="mb-4">Beginning the comment, it can fit whatever text we think is ok. And if the
                          comment is long we can have dots to emulate that there is more...
                        </p>
                        <div class="container row mt-5">
                          <div class="text-left col-md-6 m-0 p-0">
                            <span class="mb-0 pb-0 small"><iron-icon style="color: #64A19D;" icon="vaadin:thumbs-up"></iron-icon><span class="ml-2">12</span></span>
                          </div>
                          <div class="text-right col-md-6 m-0 p-0">
                            <span class="mb-0 pb-0 small">Date <span>11</span>.<span>11</span>.<span>20</span></span>
                          </div>
                        </div>
                      </li>
                      <br />
                    </div>
                  </ul>
                </a>
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
}

customElements.define("profile-page-component", ProfilePageComponent);
