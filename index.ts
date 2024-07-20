import express, { Express, Request, Response } from "express";

const app: Express = express();
const port: number = 3000;

app.get("/topics", (req: Request, res: Response) => {
    res.send("Topic Music");
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
