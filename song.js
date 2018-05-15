musicdb.init();

var id = decodeURI(location.search.slice(1));

musicdb.get(id).then(function(data) {
  document.title = data.name;
  var nameView = document.getElementById("name");
  nameView.innerHTML = "";
  nameView.appendChild(document.createTextNode(data.name));
});