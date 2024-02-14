import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class ExternalUserLink extends Component {
  @service site;
  @tracked externalUserLinkUrl;
  @tracked externalLinkUserFieldId;
  @tracked showExternalLink = false;
  @tracked user = this.args.model.username;
  @tracked userFields = this.args.model.user_fields;

  constructor() {
    super(...arguments);

    if (settings.external_link_user_field) {
      const siteUserFields = this.site.user_fields;

      if (!siteUserFields) {
        return;
      }

      const externalLinkField = siteUserFields.filterBy(
        "name",
        settings.external_link_user_field
      )[0];

      if (!externalLinkField) {
        return;
      }

      this.externalLinkUserFieldId = this.userFields[externalLinkField.id];
      if (!this.externalLinkUserFieldId) {
        return;
      } else {
        this.showExternalLink = true;
        const url =
          settings.external_link_prefix + this.externalLinkUserFieldId;
        this.externalUserLinkUrl = url;
      }
    } else {
      const url = settings.external_link_prefix + this.user;
      this.externalUserLinkUrl = url;
      this.showExternalLink = true;
    }
  }
}
