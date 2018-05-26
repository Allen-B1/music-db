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
      if(data.key_long != null) {     
        var keyView = document.getElementById("key");
        keyView.innerHTML = "";
        keyView.appendChild(document.createTextNode(data.key_long));
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

      if(data.movements instanceof Array) {
        var movementsList = document.getElementById("mvmt-list");
        movementsList.parentNode.style.display = "block";
        for(var i = 0; i < data.movements.length; i++) {
          var div = document.createElement("li");
          var mvmt = data.movements[i];
          var labels = {"minuet": "Menuetto", "sonata": null,
            "rondo": "Rondo",
            "scherzo": "Scherzo"};


          var str;
          if(labels[mvmt.form] != null) 
            str = labels[mvmt.form] + ": " + mvmt.name;
          else
            str = mvmt.name;
          div.appendChild(document.createTextNode(str));
          movementsList.appendChild(div);
        }
      }

      if(data.type === "nocturne") {
        var toolbar = document.getElementById("toolbar");
        toolbar.style.background = "#607d8b";
         
        // change theme-color
        var meta = document.head.querySelector("meta[name=theme-color]");
        if(meta)
          meta.content = "#607d8b";
      }
    }
  });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
     .register('./service-worker.js')
     .then(function() { console.log('Service Worker Registered'); });
}
