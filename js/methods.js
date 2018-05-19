var musicdb = (function() {
  var promise = null;

  /* init()
   * Initializes app
   */ 
  function init() {
    promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE){
          if(this.status === 200)
            resolve(JSON.parse(this.responseText));
          else
            reject(this.status);
        }
      };
      xhr.responseType = "text";
      xhr.open("GET", "data.json");
      xhr.send(null);
    });
  }

  /* add(name: string, composer: string)
   *
   * Returns: id
   */
  function add(name, composer, audio) {
    throw new Error("Unsupported operation");
  }

  /* add(nickname: string, no: number)
   * Add a B. sonata 
   */
  function addSonata(nickname, num, audio) {
    throw new Error("Unsupported operation");
  }

  /* get(id: string)
   *
   * Returns: Promise that fullfills with data.
   */
  function get(id /*string*/) {
    if(promise != null)
      return promise.then(function(data) {
        var ret = data.compositions[id];
        if(typeof ret.audio === "string") {
          ret.audio = [ret.audio];
        }
        return ret;
      });
    else
      return Promise.reject("musicdb.init() not called");
  }

  /* Listen for events.
   *
   * Arguments:
   *    event    - one of the events
   *    listener - should be in the form of (id, data) -> {...}
   */
  function on(event, listener) {
    switch(event) {
      case on.ERROR:
        if(promise != null)
          promise.catch(listener);
        else
          throw new Error("musicdb.init() not called");
      case on.NEW:
      case on.CHANGE:
      case on.REMOVE:
        console.warn("Events deprecreated");
        break;
      default:
        throw new TypeError("Event " + event + " is not a valid event.")
    }
  }
  on.NEW = "new_song";
  on.CHANGE = "song_updated";
  on.REMOVE = "song_removed";
  on.ERROR  = "error";

  /* List compositions
   *
   * Returns a Promise that fullfills with list of compositions with their IDs
   */
  function list() {
    return promise.then(function(data) {
      return Object.keys(data.compositions);
    });
  }
  
  return {
    init: init,
    add: add,
    addSonata: addSonata,
    get: get,
    on: on,
    list: list
  }
})();
