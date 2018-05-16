var musicdb = (function() {
  var app = null;

  /* init()
   * Initializes app
   */ 
  function init() {
    app = firebase.initializeApp({
      apiKey: "AIzaSyCrjDPPAz0REniPtrs4FzlzPcnwGAKA8yQ",
      authDomain: "something-8dccd.firebaseapp.com",
      databaseURL: "https://something-8dccd.firebaseio.com",
      projectId: "something-8dccd",
      storageBucket: "something-8dccd.appspot.com",
      messagingSenderId: "684904810173"
    });
  }

  // TODO: add "audio" field
  function addSong(name /*string*/, audio /*string*/) {
    var songlist = app.database().ref("songs/");
    var ref = songlist.push();
    var obj = {};
    obj.name = name || "Untitled";
    if(audio) {
      obj.audio = audio;
    }
    ref.set(obj);
    return ref;
  }

  /* add(name: string)
   *
   * Returns: id
   */
  function add(name, audio) {
    return addSong(name, audio).key;
  }

  /* add(nickname: string, no: number)
   * Add a B. sonata 
   */
  function addSonata(nickname, num, audio) {
    num = num | 0;
    var ref = addSong("Sonata No. " + num + ' "' + nickname + '"', audio);
    ref.update({
      num: num,
      nick: nickname
    });
    return ref.key;
  }

  /* get(id: string)
   *
   * Returns: Promise that fullfills with data.
   */
  function getSong(id /*string*/) {
    return app.database().ref("songs/" + id).once("value").then(function(data) {
      return data.val();
    });
  }

  /* Listen for events.
   *
   * Arguments:
   *    event    - one of the events
   *    listener - should be in the form of (id, data) -> {...}
   */
  function on(event, listener) {
    var songlist = app.database().ref("songs/");
    switch(event) {
      case on.NEW:
        songlist.on("child_added", function(data) {
          listener(data.key, data.val());
        });
        break;
      case on.CHANGE:
        songlist.on("child_changed", function(data) {
          listener(data.key, data.val());
        });
        break;
      case on.REMOVE:
        songlist.on("child_removed", function(data) {
          listener(data.key, data.val());
        });
        break;
      default:
        throw new TypeError("Event " + event + " is not a valid event.")
    }
  }
  on.NEW = "new_song";
  on.CHANGE = "song_updated";
  on.REMOVE = "song_removed";
  
  return {
    init: init,
    add: add,
    addSonata: addSonata,
    get: getSong,
    on: on
  }
})();