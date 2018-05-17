musicdb.init();

var id = decodeURI(location.search.slice(1));
if(id) {
  musicdb.get(id).then(function(data) {
    if(data != null) {
      if(data.name != null) {
        document.title = data.name;
        var nameView = document.getElementById("name");
        nameView.innerHTML = "";
        nameView.appendChild(document.createTextNode(data.name));
      }
    }
  });
  
  musicdb.getAudio(id).then(function(data) {
    if(data) {
      var audioView = document.getElementById("audio");
      audioView.src = data;
      document.getElementById("audio-box").style.display = 'block';
    }
  });
}
