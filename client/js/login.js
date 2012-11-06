Template.login.flashMessage = function (type) {
  return Session.equals('flash', type);
};

Template.login.events({
  'click button.submit': function () {
    Meteor.loginWithPassword($('input#username').val(), $('input#password').val(), function () {
      if (Meteor.userId() !== null) {
        BlogRouter.navigate('admin', {trigger: true});
      } else {
        Session.set('flash', 'error');
      }
    });
  }
});