// Router for Pages
var Router = Backbone.Router.extend({
  routes: {
    "":                 "main",
    "admin":            "admin",
    "login":            "login",
    ":slug":            "blogpost",
    "edit/:slug":       "editpost"
  },
  main: function () {
    Session.set('page', 'blog');
  },
  admin: function () {
    if (Meteor.userId() !== null) {
      Session.set('page', 'admin');
    } else {
      BlogRouter.navigate('login', {trigger: true});
      Session.set('flash', 'error-login');
    }
  },
  blogpost: function () {
    Session.set('page', 'blog-post');
  },
  editpost: function () {
    if (Meteor.userId() !== null) {
      Session.set('page', 'edit-post');
      Template.editPost.rendered = function () {
        $('textarea').autosize();
        if ($('input#post-draft').attr('value') === "true") {
          $('input#post-draft').attr('checked', false);
        } else {
          $('input#post-draft').attr('checked', true);
        }
      };
    } else {
      BlogRouter.navigate('login', {trigger: true});
      Session.set('flash', 'error-login');
    }
  },
  login: function () {
    Session.set('page', 'login');
  }
});

var BlogRouter = new Router;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});