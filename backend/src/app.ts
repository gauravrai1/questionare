import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import { setupSwagger } from './swagger';
var cors = require('cors')

const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', routes);

// Setup Swagger
setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});