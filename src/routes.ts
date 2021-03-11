import * as express from "express";
const swaggerUi = require("swagger-ui-express");
import * as specs from "./config/swagger";

import auth from "./controllers/auth"

let router = express.Router();

router.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs.specs, { explorer: true })
);

router.get("/", (req, res) => res.send(`WELCOME TO API ${process.env.NAME_PROGRAM}`))
router.use("/api/v1/auth",auth)

export default router