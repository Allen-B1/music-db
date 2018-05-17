musicdb.init();

var nameView = document.getElementById("name");
var addView = document.getElementById("add");
addView.addEventListener("click", function(e) {
  if(nameView.value.trim().length) {
    musicdb.add(nameView.value);
    nameView.value = "";
  }
});

musicdb.on(musicdb.on.NEW, function(id, data) {
  var div = document.createElement("a");
  div.href = "view.html?" + encodeURI(id);
  div.classList.add("list-item");
  if(data.name == null)
    data.name = "Untitled";
  div.appendChild(document.createTextNode(data.name));

  var content = document.getElementById(data.composer === "Beethoven" ? "beethoven-content" : "content");
  content.style.display = "block";
  content.appendChild(div);
});
