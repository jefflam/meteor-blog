Template.admin.drafts = function () {
  return Posts.find({draft: true}, {sort: {date: -1}});
};
Template.admin.published = function () {
  return Posts.find({draft: false}, {sort: {date: -1}});
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
        BlogRouter.navigate('edit/'+postSlug, {trigger: true});
      } else {
        var currentDate = new Date();
        var currentDay = currentDate.getDate() < 10 ? "0"+currentDate.getDate() : currentDate.getDate();
        var currentMonth = parseInt(currentDate.getMonth(),10) + 1 < 10 ? "0"+parseInt(currentDate.getMonth(),10) + 1 : parseInt(currentDate.getMonth(),10) + 1;
        var currentYear = currentDate.getFullYear();
        var currentDateFormatted = currentYear + "-" + currentMonth + "-" + currentDay;
        Posts.insert({
          owner: Meteor.userId(),
          title: postTitle,
          body: "",
          date: currentDateFormatted,
          draft: true,
          slug: postSlug
        });
        BlogRouter.navigate('edit/'+postSlug, {trigger: true});
      }
    }
  }
});