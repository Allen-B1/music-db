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
  function addSong(obj /*object*/, audio /*string*/) {
    var database = app.database();
    var songlist = database.ref("songs/");
    var audiolist = database.ref("audio/");
    var ref = songlist.push();
    ref.set(obj);
    if(audio) {
      var obj = {};
      obj[ref.key] = audio;
      audiolist.update(obj);
    }
    return ref;
  }

  /* add(name: string, composer: string)
   *
   * Returns: id
   */
  function add(name, composer, audio) {
    var obj = {name:name || null};
    if(composer) {
      obj.composer = composer;
    }
    return addSong(obj, audio).key;
  }

  /* add(nickname: string, no: number)
   * Add a B. sonata 
   */
  function addSonata(nickname, num, audio) {
    num = num | 0;
    return addSong({
      num: num,
      nick: nickname,
      name: "Sonata No. " + num + ' "' + nickname + '"',
      composer: "Beethoven"}, audio).key;
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

  /* getAudio(id: string)
   *
   * Returns: Promise that fullfills with the audio link
   */
  function getAudio(id /*string*/) {
    return app.database().ref("audio/" + id).once("value").then(function(data) {
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
    getAudio: getAudio,
    on: on
  }
})();
