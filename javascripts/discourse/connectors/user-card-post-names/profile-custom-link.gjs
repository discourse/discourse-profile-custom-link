import Component from "@ember/component";
import { classNames } from "@ember-decorators/component";
import ProfileCustomLink0 from "../../components/profile-custom-link";

@classNames("user-card-post-names-outlet", "profile-custom-link")
export default class ProfileCustomLinkConnector extends Component {
  <template><ProfileCustomLink0 @model={{@outletArgs.user}} /></template>
}
