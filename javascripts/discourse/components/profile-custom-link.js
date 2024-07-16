import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { service } from "@ember/service";

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default class ProfileCustomLink extends Component {
  @service site;
  @tracked customLinkUrl;
  @tracked customLinkFieldId;
  @tracked customLinks = [];
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

      let customLinkFieldValue = this.userFields[customLinkField.id];
      let parsingBuffer = "";
      while (customLinkFieldValue.length > 0) {
        if (digits.includes(customLinkFieldValue[0])) {
          parsingBuffer += customLinkFieldValue[0];
          customLinkFieldValue = customLinkFieldValue.slice(1);
        } else {
          if (parsingBuffer.length > 0) {
            this.customLinks.push({
              customLinkUrl:
                settings.profile_custom_link_prefix + parsingBuffer,
              customLinkFieldId: parsingBuffer,
            });
            parsingBuffer = "";
          }
          customLinkFieldValue = customLinkFieldValue.slice(1);
        }
      }
    }
  }
}
