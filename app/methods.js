var app = (function() {
  function init() {
    var config = {
      apiKey: "AIzaSyCrjDPPAz0REniPtrs4FzlzPcnwGAKA8yQ",
      authDomain: "something-8dccd.firebaseapp.com",
      databaseURL: "https://something-8dccd.firebaseio.com",
      projectId: "something-8dccd",
      storageBucket: "something-8dccd.appspot.com",
      messagingSenderId: "684904810173"
    };
    init.app = firebase.initializeApp(config);
  }

  function add(name) {
      var database = init.app.database();
      var posts = database.ref("posts/");
      var ref = database.ref("posts/").push();
      ref.set(name);
  }
  
  return {
    init: init,
    add: add
  }
})();