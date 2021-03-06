import express from 'express';
import cartItemsRoutes from './cart-items';
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors());

const port = 3000;

app.use("/", cartItemsRoutes);

app.listen(port, () => {
    console.log(` server listening on port: ${port}`);
})