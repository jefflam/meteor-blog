// Router for Pages
var Router = Backbone.Router.extend({
  routes: {
    "":               "main",
    "admin":          "admin",
    ":slug":           "blogpost",
    "edit/:slug":      "editpost"
  },
  main: function () {
    Session.set('page', 'blog');
  },
  admin: function () {
    Session.set('page', 'admin');
  },
  blogpost: function () {
    Session.set('page', 'blog-post');
  },
  editpost: function () {
   Session.set('page', 'edit-post');
   Template.editPost.rendered = function () {
     $('textarea').autosize();
   };
  }
});

var BlogRouter = new Router;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});