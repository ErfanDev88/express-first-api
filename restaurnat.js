import express from "express";
import router from './src/routes/index.js'
import c from "config"

const app = express();
const port = c.get("port") || 3000

app.use(express.json());

app.use('/api', router)

app.listen(port, () => console.log(`App is running on port ${port}`));
