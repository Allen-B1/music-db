var songdb = (function() {
  function init(config) {
    init.app = firebase.initializeApp(config);
  }

  function addSong(name /*string*/) {
      var database = init.app.database();
      var songlist = database.ref("songs/");
      var ref = songlist.push();
      ref.set({
        name: name
      });
      return ref;
  }
  
  return {
    init: init,
    add: add
  }
})();