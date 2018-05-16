musicdb.init();

var id = decodeURI(location.search.slice(1));
if(id)
  musicdb.get(id).then(function(data) {
    if(data != null) {
      document.title = data.name;
      var nameView = document.getElementById("name");
      nameView.innerHTML = "";
      nameView.appendChild(document.createTextNode(data.name));

      if(data.audio) {
        var audioView = document.getElementById("audio");
        audioView.src = data.audio;
        audioView.style.display = 'block';
      }
    } else {
      
    }
  });