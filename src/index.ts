import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
const client = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/identify", async (req: Request, res: Response) => {
  try {
    const { email, phone } = req.body;
    const response = await client.user.update({
      where: { id: 1 },
      data: {
        email: email ? { create: [{ email }] } : undefined,
        phone: phone ? { create: [{ phone }] } : undefined,
      },
      include: {
        email: true,
        phone: true,
      },
    });
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
