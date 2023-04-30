import express, { json } from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());


const db = createConnection({
  host: "localhost",
  user: 'root',
  password: "",
  database: 'miniprojet'
});



app.post('/sign', (req, res) => {
  const { name, email, password, code_barrau } = req.body;

  if (!code_barrau) {
    const sql3 = "INSERT INTO client (nom_cl,prenom_cl,email,password) VALUES (?, ?, ?,?)";
    const values3 = [
      req.body.name,
      req.body.prenom,
      req.body.email,
      req.body.password

    ];
    db.query(sql3, values3, (err, result) => {
      if (err) {
        return res.json({ Message: "Error in node.... " });
      }
      return res.json(result);
    });
  } else {
    const sql2 = "INSERT INTO avocat (code_barrau,nom_av,prenom_av,email,password) VALUES (?, ?, ?, ?)";
    const values2 = [
      req.body.code_barrau,
      req.body.name,
      req.body.prenom,
      req.body.email,
      req.body.password
    ];
    db.query(sql2, values2, (err, result) => {
      if (err) {
        return res.json({ Message: "Error in node.... " });
      }
      return res.json(result);
    });
  }
});







app.post('/log', (req, res) => {

  const sql = "SELECT * FROM avocat WHERE email= ?  and  password= ?";
  const values = [
    req.body.email,
    req.body.password
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Message: "Error in nodejjj.... " });
    if (result.length > 0) {
      return res.json({ Login: true, UserType: 'avocat' })
    }  else {
      const sql1 = "SELECT * FROM client WHERE email= ?  and  password= ?";
      db.query(sql1, values, (err, result) => {
        if (err)
          return res.json({ Message: "Error in node.... " });
        if (result.length > 0) {
          return res.json({ Login: true, UserType: 'client' });
        } else {
          const sql2 = "SELECT * FROM admin WHERE email= ?  and  password= ?";
          db.query(sql2, values, (err, result) => {
            if (err)
              return res.json({ Message: "Error in node.... " });
            if (result.length > 0) {
              return res.json({ Login: true, UserType: 'admin' });
            } else {
              return res.json({ Login: false });
            }
          });
        }
      });
    }
  });  });


  app.listen(8081, () => {
    console.log("running.........");
  });

