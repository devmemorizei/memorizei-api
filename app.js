import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { userRouter } from './routes/userRouter.js';
import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado com sucesso na base de dados');
    app.listen(process.env.PORT || 8090, () => {
      console.log('Server rodando');
    });

  } catch (error) {
    console.log('deu ruim pra conectar na base de dados');
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    //origin: 'https://nameless-inlet-45234.herokuapp.com',
  })
);

app.use('/api/user/', userRouter);

app.get('/api/', (req, res) => {
  res.send('API em execucao');
});
