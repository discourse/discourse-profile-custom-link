import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";

export default class ProfileCustomLink extends Component {
  @service site;

  @tracked customLinkUrl;
  @tracked customLinkFieldId;
  @tracked showCustomLink = false;
  @tracked user = this.args.model.username;
  @tracked userFields = this.args.model.user_fields;

  constructor() {
    super(...arguments);

    if (settings.profile_custom_link_field) {
      const siteUserFields = this.site.user_fields;

      if (!siteUserFields) {
        return;
      }

      const customLinkField = siteUserFields.filterBy(
        "name",
        settings.profile_custom_link_field
      )[0];

      if (!customLinkField) {
        return;
      }

      this.customLinkFieldId = this.userFields[customLinkField.id];
      if (!this.customLinkFieldId) {
        return;
      } else {
        this.showCustomLink = true;
        const url =
          settings.profile_custom_link_prefix + this.customLinkFieldId;
        this.customLinkUrl = url;
      }
    } else {
      const url = settings.profile_custom_link_prefix + this.user;
      this.customLinkUrl = url;
      this.showCustomLink = true;
    }
  }
}
