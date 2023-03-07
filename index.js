import express, { json } from "express";
import cors from "cors";
import recordRoutes from "./src/routers";
import Print from "./src/helpers/endPointPrinter";
const port = process.env.PORT || 6677;
const app = express();
app.use(json());
app.use(cors());
app.use(Print, recordRoutes);

app.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`);
});
