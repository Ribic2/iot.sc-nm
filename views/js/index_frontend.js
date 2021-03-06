//Log out 
function log_out() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("body").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "/?logout=true", true);
    xhttp.send();
}

//AJAX call to delete selected post
function delete_data(e) {

    var title_name = document.getElementsByClassName('title_name');
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "/?post_to_delete=" + title_name[e].innerHTML, true);
    xhttp.send();
}

function change_data(e){
    console.log(e)
    
  
    var title = document.getElementsByClassName('newTitle')[e].value;
    var link = document.getElementsByClassName('newLink')[e].value;
    var descr = document.getElementsByClassName('newDescription')[e].value;
    var id = document.getElementsByClassName('newDescription')[e].dataset.id;
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("body").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "/?newTitle=" + title + "&newLink="+link+"&newDescription="+descr+"&change_post=1&id="+id, true);
    xhttp.send();
}