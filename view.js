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
      if(data.composer != null) {
        var aboutView = document.getElementById("description");
        aboutView.innerHTML = "";
        var composedBy = document.createElement("span");
        composedBy.innerHTML = "Composed by ";
        composedBy.style.color = "#888";
        aboutView.appendChild(composedBy);
        aboutView.appendChild(document.createTextNode(data.composer));
      }
      if(data.audio != null && data.audio.length) {
        var audioBox = document.getElementById("audio-box");
        for(var i = 0; i < data.audio.length; i++) {
          var audioView = document.createElement("audio");
          audioView.src = data.audio[i];
          audioView.controls = true;
          audioBox.appendChild(audioView);
        }
        audioBox.style.display = 'block';
      }
    }
  });
}
