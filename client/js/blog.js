// Declaration of Template Reactivity Variables
Template.content.currentPage = function (type) {
  return Session.equals('page', type);
};
Template.blog.posts = function () {
  return Posts.find({draft: false}, {sort: {date: -1}});
};