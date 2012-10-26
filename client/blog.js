// Declaration of Collections
Posts = new Meteor.Collection("Posts");

// Declaration of Template Reactivity Variables
Template.content.currentPage = function (type) {
  return Session.equals('page', type);
};
Template.blog.posts = function () {
  return Posts.find({draft: false}, {sort: {date: -1}});
};
Template.blogPost.blogpost = function () {
  var postSlugArray = window.location.pathname.split('/');
  var postSlug = postSlugArray[1];
  return Posts.find({slug: postSlug}, {sort: {date: -1}});
};
Template.admin.drafts = function () {
  return Posts.find({draft: true}, {sort: {date: -1}});
};
Template.admin.published = function () {
  return Posts.find({draft: false}, {sort: {date: -1}});
};
Template.editPost.post = function () {
  postSlugArray = window.location.pathname.split('/');
  postSlug = postSlugArray[2];
  return Posts.find({slug: postSlug});
};

Template.admin.events({
  'keyup input#post-title': function (keypress) {
    if (keypress.which === 13) {
      var postTitle = $('input#post-title').val();
      var postSlug = "";
      var postSlugArray = postTitle.toLowerCase().split(' ');
      

      for (var i=0; i<postSlugArray.length; i++) {
        if (i === postSlugArray.length-1) {
          postSlug += postSlugArray[i];
        } else {
          postSlug += postSlugArray[i]+"-";
        }
      }
      if (Posts.find({slug: postSlug}).fetch().length > 0) {
        // console.log(postSlug + ' duplicate');
        BlogRouter.navigate('edit/'+postSlug, {trigger: true});
      } else {
        // console.log(postSlug + ' not duplicate');
        Posts.insert({
          title: postTitle,
          body: "",
          date: Date(),
          draft: true,
          slug: postSlug
        });
        BlogRouter.navigate('edit/'+postSlug, {trigger: true});
      }
    }
  }
});

Template.editPost.events({
  'click button.submit': function () {
    var postSlugArray = window.location.pathname.split('/');
    var postSlug = postSlugArray[2];
    var isDraft = null;
    if ($('input#post-draft').val() === "true") {
      isDraft = true;
    } else {
      isDraft = false;
    }

    Posts.update({slug: postSlug},
    {
      title: $('textarea#post-title').val(),
      body: $('textarea#post-body').val(),
      date: $('input#post-date').val(),
      draft: isDraft,
      slug: $('input#post-slug').val()
    });

    BlogRouter.navigate('admin', {trigger: true});
  }
});