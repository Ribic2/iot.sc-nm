const express = require('express');
const path = require('path');
const config = require('./config.json')
const conn = require('./model/connection');
const multer = require('multer');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Session
app.use(session({ resave: true, secret: config.secret, maxAge: 3600000, saveUninitialized: true }));

//Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/views/img/link_pictures/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('slika');


//Set engine and directories
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/views/css')));
app.use(express.static(path.join(__dirname, '/views/js')));
app.use(express.static(path.join(__dirname, '/views/img')));

app.set('views', path.join(__dirname, 'views/pug'));

//Home root 
app.get('/', (req, res) => {
    //Checks if users wants to log out
    if (req.query.logout) {
        req.session.IfLogged = false;
        conn.query("SELECT * FROM links", (err, results, fields) => {
            if (err) throw err;
            else {
                res.render('index', { results: results });
            }

        });
    }
    //Checks if Ajax sent request to delete certain data
    else if (req.query.post_to_delete != null) {
        console.log(req.query.post_to_delete);
        //Removes image
        conn.query("SELECT LinkImgName FROM links where linkTitle = ?", [req.query.post_to_delete], (err, results, fields) => {
            console.log(results);
            if (err) throw err;
            else {
                fs.unlink('./views/img/link_pictures/' + results[0].LinkImgName, () => {
                    console.log("Link")
                });
                //Then row it self in database
                conn.query("DELETE FROM links where linkTitle = ?", [req.query.post_to_delete], (err) => {
                    if (err) throw err;

                    conn.query("SELECT * FROM links", (err, results, fields) => {
                        if (err) throw err;
                        else {
                            res.render('admin_panel', { results: results, user: req.session.NickName });
                        }

                    });
                });
            }
        });
    }
    //Check if user is logged in
    else if (req.session.IfLogged) {
        conn.query("SELECT * FROM links", (err, results, fields) => {
            if (err) throw err;
            else {
                res.render('admin_panel', { results: results, user: req.session.NickName });
            }

        });
    }
    //Else render normal template
    else {
        conn.query("SELECT * FROM links", (err, results, fields) => {
            if (err) throw err;
            else {
                res.render('index', { results: results });
            }

        });
    }
});

//Adds new post to db, only from admin_panel.pug
app.post('/', upload, (req, res) => {
    var naslov = req.body.title;
    var opis = req.body.description;
    var link = req.body.link;

    //verification
    conn.query("SELECT * FROM links where linkTitle = ?", [naslov], (err, results1, fields1) => {
        if (results1.length > 0) {
            conn.query("SELECT * FROM links", (err, results2, fields2) => {
                if (err) throw err;
                else {
                    res.render('admin_panel', { results: results2, error: "Link z istim imenom ze obstaja!" });
                }

            });
        }
        else {
            conn.query("INSERT INTO links (linkTitle, LinkDescription, link, LinkImgName) values (?, ?, ?, ?)", [naslov, opis, link, req.file.filename], (err, results, fields) => {
                if (err) throw err;
                else {
                    //Requests new data from db and displays it
                    conn.query("SELECT * FROM links", (err, results, fields) => {
                        if (err) throw err;
                        else {
                            res.render('admin_panel', { results: results }, (err) => {
                                if (err) throw err;
                                else {
                                    res.status(200).redirect('/')
                                }
                            });
                        }

                    });
                }
            });
        }
    });

});
//Login root
app.get('/Prijava', (req, res) => {
    res.render('login');
});
//Login post data
app.post('/Prijava', (req, res) => {
    conn.query("SELECT * FROM admins WHERE Username = ? and Password = ?", [req.body.username, req.body.password], (err, fields, results) => {
        if (err) throw err;
        else if (fields.length > 0) {
            console.log(fields.Nickname);
            req.session.IfLogged = true;
            req.session.NickName = fields[0].Nickname;
            res.redirect('/');

        }
        else {
            res.render('login', { error: "Napacno uporabniško ime ali geslo!" });
            req.session.IfLogged = false;
        }
    });
});

//Chaange password root
app.get('/Spremeni-geslo', (req, res)=>{
    res.render('ChangePassword')
});

app.post('/Spremeni-geslo', (req, res)=>{
    if(req.body.password != req.body.passwordAgain){
        res.render('ChangePassword', { results: "Gesli se ne ujemata !"});
    }
    else{
        conn.query("UPDATE admins SET password = ? WHERE Nickname = ? ", [req.body.password,  req.session.NickName], (err, results, fields)=>{
            if(err) throw err;
            else{
                res.redirect('/')
            }
        });
    }
});

//Sends 404 if path was not found
app.get('*', (req, res) => {
    res.status(404).send("404");
});

app.listen(80, () => {
    console.log("Connected on port 80");
});