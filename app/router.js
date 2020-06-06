module.exports = function(app) {
    var mysql = require('mysql');
    const bodyParser = require("body-parser");

    app.use(bodyParser.urlencoded({
        extends: true
    }));

    app.use(bodyParser.json());

    var db = mysql.createPool({
        connectionLimit : 10,  
        host:     'localhost',
        user:     'root',
        password: '',
        database: 'banco'
      });

    app.get('/', function(req, res){
        res.send("Index");
    });

    app.get('/banco/', function(req, res){
        db.query('select * from Clientes', function(err,result) {
            if(err) {
                    throw err;
            } else {
                  res.send(result);
            }
        });
    });

    app.get('/banco/:email', function(req, res){
        db.query('select * from Clientes where email=?', [req.params.email], function(err,result) {
            if(err) {
                    throw err;
            } else {
                  res.send(result);
            }
        });
    });

    app.post('/banco',  function(req, res) {
        db.query("insert into Clientes (nome, email) VALUES (?,?)" ,[req.body.nome,req.body.email], 
            function(err,result) {
                if (err) {
                    console.log(err)
                    return res.status(502).send('Error');
                 }
                 return res.status(200).send('OK');
            })  
     
    });
}