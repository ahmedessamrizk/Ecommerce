import express from "express"
import cors from 'cors'
import { userRouter, productRouter } from "./modules/index.router.js";

const app = express();
const port = 3001, baseURL = '/cruds';

app.get('/', (req, res, next) => {
    res.json({message: "Welcome Home Page"});
})

app.use(cors());
app.use(express.json());
app.use(`${baseURL}/user`,userRouter);
app.use(`${baseURL}/product`,productRouter);

app.get('*', (req, res, next) => {
    res.send("404 Not Found");
})


app.listen(port, () => {
    console.log("Running.....");
})