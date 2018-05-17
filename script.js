musicdb.init();

var nameView = document.getElementById("name");
var addView = document.getElementById("add");
addView.addEventListener("click", function(e) {
  musicdb.add(nameView.value);
  nameView.value = "";
});

musicdb.on(musicdb.on.NEW, function(id, data) {
  var div = document.createElement("a");
  div.href = "view.html?" + encodeURI(id);
  div.classList.add("song");
  if(data.name == null)
    data.name = "Untitled";
  div.appendChild(document.createTextNode(data.name));
  document.getElementById("content").appendChild(div);
});
