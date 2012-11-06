Posts = new Meteor.Collection("posts");

Posts.allow({
  insert: function (userId, post) {
    return userId && post.owner === userId;
  },
  update: function (userId, posts, fields, modifier) {
    return _.all(posts, function (post) {
      return userId && post.owner === userId;
    });
  },
  remove: function (userId, posts) {
    return userId && post.owner === userId;
  },
  fetch: ['owner', 'title', 'body', 'date', 'draft', 'slug']
});