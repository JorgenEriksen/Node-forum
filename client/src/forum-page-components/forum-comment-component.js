/*-- The forum comment category component --*/
import { css, html, LitElement } from "lit-element";

export class ForumCommentElement extends LitElement {
	static get styles() {
		return css`
			:host {
				margin: 20px;
			}
		`;
	}

	render() {
		return html` <ul class="list-group text-left mt-2">
			<li class="list-group-item">
				<div class="row">
					<div>
						<img
							class="rounded-circle z-depth-1"
							alt="100x100"
							src="../../assets/img/sample-profile.png"
							data-holder-rendered="true"
							style="width: 40px; height: 40px;"
						/>
					</div>
					<div>
						<p class="ml-3 mb-0" style="font-size: small;">
							Jens Jensen
						</p>
						<p class="ml-3 mb-4" style="font-size: small;">
							Moderator
						</p>
					</div>
				</div>
				<p class="mb-3">
					Sed ut perspiciatis unde omnis iste natus error sit
					voluptatem accusantium doloremque laudantium, totam rem
					aperiam, eaque ipsa quae ab illo inventore veritatis et
					quasi architecto beatae vitae dicta sunt explicabo. Nemo
					enim ipsam voluptatem quia voluptas sit aspernatur aut odit
					aut fugit, sed quia consequuntur magni dolores eos qui
					ratione voluptatem sequi nesciunt.
				</p>
				<div class="row m-0 p-0">
					<span class="text-left mb-0 pb-0"
						>Likes <span>2</span></span
					>
				</div>
			</li>
			<li class="list-group-item">
				<div class="row">
					<div>
						<img
							class="rounded-circle z-depth-1"
							alt="100x100"
							src="../../assets/img/sample-profile.png"
							data-holder-rendered="true"
							style="width: 40px; height: 40px;"
						/>
					</div>
					<div>
						<p class="ml-3 mb-0" style="font-size: small;">
							Mads Madsen
						</p>
						<p class="ml-3 mb-4" style="font-size: small;">
							Regular user
						</p>
					</div>
				</div>
				<p class="mb-3">
					Sed ut perspiciatis unde omnis iste natus error sit
					voluptatem accusantium doloremque laudantium, totam rem
					aperiam, eaque ipsa quae ab illo inventore veritatis et
					quasi architecto beatae vitae dicta sunt explicabo.
				</p>
				<div class="row m-0 p-0">
					<span class="text-left mb-0 pb-0"
						>Likes <span>4</span></span
					>
				</div>
			</li>
			<li class="list-group-item">
				<div class="row">
					<div>
						<img
							class="rounded-circle z-depth-1"
							alt="100x100"
							src="../../assets/img/sample-profile.png"
							data-holder-rendered="true"
							style="width: 40px; height: 40px;"
						/>
					</div>
					<div>
						<p class="ml-3 mb-0" style="font-size: small;">
							Kristian Kristiansen
						</p>
						<p class="ml-3 mb-4" style="font-size: small;">
							Regular user
						</p>
					</div>
				</div>
				<p class="mb-3">
					Sed ut perspiciatis unde omnis iste natus error sit
					voluptatem accusantium doloremque laudantium, totam rem
					aperiam, eaque ipsa quae ab illo inventore veritatis et
					quasi architecto beatae vitae dicta sunt explicabo. Nemo
					enim ipsam voluptatem quia voluptas sit aspernatur aut odit
					aut fugit, sed quia consequuntur magni dolores eos qui
					ratione voluptatem sequi nesciunt. Neque porro quisquam est,
					qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
					velit, sed quia non numquam eius modi tempora incidunt ut
					labore et dolore magnam aliquam quaerat voluptatem.
				</p>
				<div class="row m-0 p-0">
					<span class="text-left mb-0 pb-0"
						>Likes <span>18</span></span
					>
				</div>
			</li>
			<li class="list-group-item">
				<div class="row">
					<div>
						<img
							class="rounded-circle z-depth-1"
							alt="100x100"
							src="../../assets/img/sample-profile.png"
							data-holder-rendered="true"
							style="width: 40px; height: 40px;"
						/>
					</div>
					<div>
						<p class="ml-3 mb-0" style="font-size: small;">
							Mari Martinsen
						</p>
						<p class="ml-3 mb-4" style="font-size: small;">Admin</p>
					</div>
				</div>
				<p class="mb-3">
					Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
					odit aut fugit, sed quia consequuntur magni dolores eos qui
					ratione voluptatem sequi nesciunt.Sed ut perspiciatis unde
					omnis iste natus error sit voluptatem accusantium doloremque
					laudantium, totam rem aperiam, eaque ipsa quae ab illo
					inventore veritatis et quasi architecto beatae vitae dicta
					sunt explicabo.
				</p>
				<div class="row m-0 p-0">
					<span class="text-left mb-0 pb-0"
						>Likes <span>22</span></span
					>
				</div>
			</li>
			<li class="list-group-item">
				<div class="row">
					<div>
						<img
							class="rounded-circle z-depth-1"
							alt="100x100"
							src="../../assets/img/sample-profile.png"
							data-holder-rendered="true"
							style="width: 40px; height: 40px;"
						/>
					</div>
					<div>
						<p class="ml-3 mb-0" style="font-size: small;">
							Kari Karinsen
						</p>
						<p class="ml-3 mb-4" style="font-size: small;">Admin</p>
					</div>
				</div>
				<p class="mb-3">
					Sed ut perspiciatis unde omnis iste natus error sit
					voluptatem accusantium doloremque laudantium, totam rem
					aperiam.
				</p>
				<div class="row m-0 p-0">
					<span class="text-left mb-0 pb-0"
						>Likes <span>1</span></span
					>
				</div>
			</li>
		</ul>`;
	}
}

customElements.define("forum-comment-component", ForumCommentElement);
