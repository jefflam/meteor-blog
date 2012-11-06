Template.editPost.post = function () {
  postSlugArray = window.location.pathname.split('/');
  postSlug = postSlugArray[2];
  return Posts.find({slug: postSlug});
};

Template.editPost.events({
  'click button.submit': function () {
    var postSlugArray = window.location.pathname.split('/');
    var postSlug = postSlugArray[2];
    var isDraft = null;
    if ($('input#post-draft').attr('checked') === "checked") {
      isDraft = false;
    } else {
      isDraft = true;
    }

    Posts.update({slug: postSlug},
      { $set:
        {
          title: $('textarea#post-title').val(),
          body: $('textarea#post-body').val(),
          date: $('input#post-date').val(),
          draft: isDraft,
          slug: $('input#post-slug').val()
        }
      });

    BlogRouter.navigate('admin', {trigger: true});
  },
  'click div#menu-button': function () {
    if ($('#menu').css('display') === "none") {
      $('#menu').css('display', 'block');
      $('#menu-button .circle').css('background-color', '#dddddd');
    } else {
      $('#menu').css('display', 'none');
      $('#menu-button .circle').css('background-color', '#ececec');
    }
  },
  'click button.cancel': function () {
    BlogRouter.navigate('admin', {trigger: true});
  }
});