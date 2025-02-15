import express, {Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';

const app = express();
const client = new PrismaClient();


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.post("/identify", async (req: Request, res: Response) => {
  const {email, phone} = req.body;
  const response = await client.user.update({
    where: {
      id: 1
    },
    data: {
      email: email,
      phone: phone
    }
  })

  res.send(response);
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});