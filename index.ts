import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path"; //! thằng path này là 1 thư viện cs sẵn trong nodejs rồi nên chỉ cần import là xong
import methodOverride from "method-override";
import bodyParser from "body-parser";
import * as database from "./config/database";

import adminRoutes from "./routes/admin/index.route";
import clientRoutes from "./routes/client/index.route";
import { systemConfig } from "./config/config";

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//@ TinyMCE
app.use(
    "/tinymce",
    express.static(path.join(__dirname, "node_modules", "tinymce"))
);

//@ End TinyMCE

//@ APP Local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//% Admin Route
adminRoutes(app);

//% Client Route
clientRoutes(app);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
