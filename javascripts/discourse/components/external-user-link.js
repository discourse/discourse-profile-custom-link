import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { ajax } from "discourse/lib/ajax";

export default class ExternalUserLink extends Component {
  // @service settings;
  @service currentUser;
  @service site;
  @tracked externalUserLinkUrl;

  constructor() {
    super(...arguments);
    const siteUserFields = this.site.user_fields; //gives me all custom user fields

    //gets me the corresponding custom user field and its ID based on theme setting ==> Github username + 1
    const externalLinkField = siteUserFields.filterBy(
      "name",
      settings.external_user_field
    )[0];

    console.log("ext field", externalLinkField);

    this.getUserField().then((data) => {
      const userFields = data.user.user_fields;
      console.log("userfields", userFields);
      const externalUserLinkField = userFields[externalLinkField.id]; //gets the value of the custom user field "mygithubusername"
      console.log("ext user link info", externalUserLinkField);

      if (externalUserLinkField) {
        const url = settings.external_profile_url + externalUserLinkField;
        const link = "<a href='" + url + "' target='_blank'>" + url + "</a>";
        this.externalUserLinkUrl = Object.create({
          link,
          name: settings.external_profile_label + " " + externalUserLinkField,
        });
      }
      // else {
      //   return null;
      // }
    });
  }

  getUserField() {
    let url = `/u/${this.currentUser.username}.json`;
    return ajax(url);
  }

  //   api.modifyClass('model:user', {
  //   externalSiteLink: function() {
  //       const siteUserFields = Site.currentProp('user_fields');
  //       if (!Ember.isEmpty(siteUserFields)) {
  //         const externalUserIdField = siteUserFields.filterBy('name', 'User Profile')[0]
  //         if (!externalUserIdField) {
  //           return null;
  //         }
  //         const userFieldId = externalUserIdField.get('id');
  //         const userFields = this.get('user_fields');
  //         if (userFields && userFields[userFieldId]) {
  //           const url = "http://myawesomewebsite.com/user/" + userFields[userFieldId];
  //           const link = "<a href='"+url+"' target='_blank'>"+url+"</a>";
  //           return Ember.Object.create({ link, name: externalUserIdField.get('name') });
  //         } else {
  //           return null;
  //         }
  //       }
  //   }.property('user_fields.@each.value')
  // });
}
