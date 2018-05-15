musicdb.init({
    apiKey: "AIzaSyCrjDPPAz0REniPtrs4FzlzPcnwGAKA8yQ",
    authDomain: "something-8dccd.firebaseapp.com",
    databaseURL: "https://something-8dccd.firebaseio.com",
    projectId: "something-8dccd",
    storageBucket: "something-8dccd.appspot.com",
    messagingSenderId: "684904810173"
});

var nameView = document.getElementById("name");
var addView = document.getElementById("add");
addView.addEventListener("click", function(e) {
  musicdb.add(nameView.value);
  nameView.value = "";
});

musicdb.on(musicdb.on.NEW, function(id, data) {
  var div = document.createElement("div");
  div.classList.add("song");
  if(data.name == null)
    data.name = "Untitled";
  div.appendChild(document.createTextNode(data.name));
  document.body.appendChild(div);
});