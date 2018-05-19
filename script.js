musicdb.init();
musicdb.list().then(function(list) {
  list.forEach(function(id) {
    var div = document.createElement("a");
    div.href = "view.html?" + encodeURI(id);
    div.classList.add("list-item");
    musicdb.get(id).then(function(data) {
      if(data.name == null)
        data.name = "Untitled";
      div.appendChild(document.createTextNode(data.name));
      var content = document.getElementById(data.composer === "Beethoven" ? "beethoven-content" : "content");
      content.style.display = "block";
      content.appendChild(div);
    });
  });
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
     .register('./service-worker.js')
     .then(function() { console.log('Service Worker Registered'); });
}
