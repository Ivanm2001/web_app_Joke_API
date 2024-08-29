import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

//seteo el puerto
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

//utilizo bodyparser para poder leer formularios
app.use(bodyParser.urlencoded({ extended: true }));

//indico que los styles se encuentran en la carpeta public.
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("main.ejs")
})

app.post("/get-joke", async (req, res) => {
    console.log(req.body);
    let categoria = req.body.categorias;
    let nombre = req.body.id;
    try {
        let url = "https://v2.jokeapi.dev/joke/" + categoria;
        if (nombre) {
            url += "?contains=" + nombre;
        }
        let result = await axios.get(url);
        console.log(result.data);
        res.render("main.ejs", { data : result.data });
    } catch (error) {
        console.error("Error fetching joke:", error.response ? error.response.data : error.message);
        res.render("main.ejs", { content: JSON.stringify(error.response ? error.response.data : error.message) });
    }
})