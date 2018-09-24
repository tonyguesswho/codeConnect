import express from "express";
import bodyParser from "body-parser";
// import morgan from "morgan";
import todo from './routes/todo';

const app = express();

// app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/todo',todo);

app.get('/', (req, res) => res.send({ name: 'Anthony U.'}));


const port = process.env.PORT || 3200;

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));