musicdb.init();
musicdb.list().then(function(list) {
  list.forEach(function(id) {
    musicdb.get(id).then(function(data) {
      var div = document.createElement("a");
      div.href = "view.html?" + encodeURI(id);

      if(data.type === "sonata" && data.composer === "Beethoven") {
        div.classList.add("composition");
        div.appendChild(document.createTextNode(data.num | 0));

        var content = document.getElementById("beethoven-sonata-content");
        content.parentNode.style.display = "block";
        content.appendChild(div);
      } else if(data.type === "nocturne" && data.composer === "Chopin") {
        div.classList.add("composition");
        div.appendChild(document.createTextNode(data.num | 0));

        var content = document.getElementById("chopin-nocturne-content");
        content.parentNode.style.display = "block";
        content.appendChild(div);
      }
    });
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
     .register('./service-worker.js')
     .then(function() { console.log('Service Worker Registered'); });
}
