import Backbone from 'backbone';
import {APP_URL} from '../parse_data';
import {md5} from 'blueimp-md5';

export default Backbone.Model.extend({

  urlRoot: APP_URL,

  idAttribute: 'objectId',

  gravatarUrl() {
    let email = this.get('Email');
    let hash = md5(email);
    return `http://gravatar.com/avatar/${hash}?s=400`;
  },
  templateData() {
    let data = this.toJSON();
    data.Gravatar = this.gravatarUrl();
    return data;
  }
});