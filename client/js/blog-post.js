Template.blogPost.blogpost = function () {
  var postSlugArray = window.location.pathname.split('/');
  var postSlug = postSlugArray[1];
  return Posts.find({slug: postSlug}, {sort: {date: -1}});
};