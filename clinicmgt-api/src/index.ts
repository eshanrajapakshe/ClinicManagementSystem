import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import router from "./routes/index.js";
import "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

app.use((req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
      };
      req.user = { id: decodedToken.id };
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
