import Backbone from 'backbone';
import $ from 'jquery';

import {
  People as PeopleCollection
} from './resources';

import {
  People as PeopleView, 
  Person as PersonView, 
  Spinner
} from './views';

export default Backbone.Router.extend({

  routes: {
    ""            : "redirectToPeople",
    "people"      : "showPeople",
    "person/:id"  : "showPerson"
  },

  initialize(appElement) {
    this.$el = appElement;
    this.collection = new PeopleCollection();

    this.$el.on('click', '.person-list-item', (event) => {
      let $li = $(event.currentTarget);
      let personId = $li.data('person-id');
      this.navigate(`person/${personId}`, {trigger: true});
    });

    this.$el.on('click', '.back-button', (event) => {
      let $button = $(event.currentTarget);
      let route = $button.data('to');
      this.navigate(route, {trigger: true});
    });
  },

  start() {
    Backbone.history.start();
    return this;
  },

  showSpinner() {
    this.$el.html( Spinner() );
  },

  redirectToPeople() {
    this.navigate('people', {
      replace: true,
      trigger: true
    });
  },

  showPeople() {
    //console.log("tony, tiger");

    this.showSpinner();
    //console.log(spinner);

    // this.collection.fetch().then(function() {
    //   this is equivalent to below
    //   only below has `this` auto bound
    //   // `this` would be either null or window
    // });
    this.collection.fetch().then(() => {
      // `this` === the router instance

      this.$el.html(
        PeopleView(
          this.collection.toJSON()
        )
      );
    });
  },

  showPerson(id) {
    let person = this.collection.get(id);
        

    if (person) {
      // we found the person from the collection
      this.$el.html(
        PersonView(
          person.templateData()
        )
      );
    } else {
      this.showSpinner();
      person = this.collection.add({objectId: id});
      person.fetch().then(() => {
        this.$el.html(
          PersonView(
            person.templateData()
          )
        );
      });
    }
  }


});