//Log out 
function log_out() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("body").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", "http://localhost?logout=true", true);
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
    xhttp.open("GET", "http://localhost?post_to_delete=" + title_name[e].innerHTML, true);
    xhttp.send();
}
