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
        var composerView = document.getElementById("composer");
        composerView.innerHTML = "";
        composerView.appendChild(document.createTextNode(data.composer));
        composerView.parentNode.style.display = "block";
      }
      if(data.key != null) {     
        var keyView = document.getElementById("key");
        keyView.innerHTML = "";
        keyView.appendChild(document.createTextNode(data.key));
        keyView.parentNode.style.display = "block";
      }
      if(data.audio != null && data.audio.length) {
        var audioBox = document.getElementById("audio-box");
        for(var i = 0; i < data.audio.length; i++) {
          var audioView = document.createElement("audio");
          audioView.src = data.audio[i];
          audioView.controls = true;
          audioBox.appendChild(audioView);
        }
        if(data.audio_credits || data.audio_credits_link) {
          var creditsView = document.createElement("div");
          creditsView.classList.add("credits");
          if(data.audio_credits)
            creditsView.appendChild(document.createTextNode(data.audio_credits + " "));
          if(data.audio_credits_link) {
            var link = document.createElement("a");
            link.href = data.audio_credits_link;
            link.target = "_blank";
            link.innerHTML = "Source";
            creditsView.appendChild(link);
          }
          audioBox.appendChild(creditsView);
        }
        audioBox.style.display = 'block';
      }
    }
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
     .register('./service-worker.js')
     .then(function() { console.log('Service Worker Registered'); });
}
