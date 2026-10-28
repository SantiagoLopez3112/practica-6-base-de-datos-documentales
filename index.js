const express = require("express");
const app = express();
const port = 3000;
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

// URI de conexión configurada para esta práctica.
const uri = "mongodb+srv://santiagolopezg_db_user:ZQ1R7UCqWpwmeC0L@cluster0.dswxuup.mongodb.net/";

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Conectado a la base de datos");
    const database = client.db("tutorial10");

    app.use(express.json());

    app.get("/sensores", (req, res) => {
      database.collection("sensores").find().toArray()
        .then((sensors) => res.status(200).send(sensors))
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "No fue posible consultar los sensores" });
        });
    });

    app.post("/sensores", (req, res) => {
      const sensor = req.body;
      database.collection("sensores").insertOne(sensor)
        .then((result) => {
          console.log(sensor);
          res.status(201).send(result.ops[0]);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "No fue posible crear el sensor" });
        });
    });

    app.get("/sensores/:sensorId", (req, res) => {
      const sensorId = req.params.sensorId;
      if (!ObjectId.isValid(sensorId)) {
        return res.status(400).send({ error: "El id del sensor no es válido" });
      }

      database.collection("sensores").findOne({ _id: new ObjectId(sensorId) })
        .then((sensor) => {
          if (sensor) res.status(200).send(sensor);
          else res.status(404).send({ error: "El sensor con id: " + sensorId + " no existe" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "No fue posible consultar el sensor" });
        });
    });

    app.post("/sensores/:sensorId/mediciones", (req, res) => {
      const sensorId = req.params.sensorId;
      const measurement = req.body;
      if (!ObjectId.isValid(sensorId)) {
        return res.status(400).send({ error: "El id del sensor no es válido" });
      }

      database.collection("sensores").updateOne(
        { _id: new ObjectId(sensorId) },
        { $addToSet: { mediciones: measurement } }
      )
        .then((result) => {
          if (result.matchedCount > 0) {
            console.log(result);
            res.status(201).send(measurement);
          } else {
            res.status(404).send({ error: "El sensor con id: " + sensorId + " no existe" });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({ error: "No fue posible agregar la medición" });
        });
    });

    app.listen(port, () => {
      console.log("Servidor escuchando en el puerto: " + port);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
  });
