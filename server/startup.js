Meteor.startup(function () {
  if (Meteor.users.find({}).count() === 0) {
    console.log("Created admin");
    Accounts.createUser(
      {
        email: 'jefflamth@gmail.com',
        password: '87#Tdee78'
      }
    );
  }
});