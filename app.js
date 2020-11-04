import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotEnv from 'dotenv-safe';

import { userRouter } from './routes/userRouter.js';
import { loginRouter } from './routes/loginRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect('mongodb+srv://adminMemorizei:admin733@memorizei.nzwcl.mongodb.net/memorizei?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado com sucesso na base de dados');
    app.listen(process.env.PORT || 8090, () => {
      console.log('Server rodando');
    });

  } catch (error) {
    console.log('deu ruim pra conectar na base de dados');
    console.log(error);
    process.exit();
  }
})();

const app = express();
const initUrlApi = '/api';

dotEnv.config();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    //origin: 'http://localhost:3000/',
  })
);

app.use(`${initUrlApi}/user/`, userRouter);

app.use(`${initUrlApi}/`, loginRouter);

app.get(`${initUrlApi}/`, (_req, res) => {
  res.send('API em execucao');
});
