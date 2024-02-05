import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { ajax } from "discourse/lib/ajax";

export default class ExternalUserLink extends Component {
  @service currentUser;
  @service site;
  @tracked externalUserLinkUrl;
  @tracked externalLinkUserFieldId;

  constructor() {
    super(...arguments);
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

    this.getUserFields().then((data) => {
      const userFields = data.user.user_fields;

      this.externalLinkUserFieldId = userFields[externalLinkField.id];
      if (!this.externalLinkUserFieldId) {
        return;
      } else {
        const url = settings.external_link_url + this.externalLinkUserFieldId;
        this.externalUserLinkUrl = url;
      }
    });
  }

  getUserFields() {
    let url = `/u/${this.currentUser.username}.json`;
    return ajax(url);
  }
}
