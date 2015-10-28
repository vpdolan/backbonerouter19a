import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';
import './ajax_setup';

import Router from './router';

console.log('Hello, World');

let $app = $('.app');
new Router($app).start();

// import {People} from './resources';
// import {PeopleView} from './views';

// let people = new People();

// people.fetch().then(function() {

//   console.log('got data', people.toJSON());

//   let firstPerson = people.first();

//   $('body').html(
//     PeopleView(people.toJSON())
//   );

// });


