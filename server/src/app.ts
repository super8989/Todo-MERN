import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes';


const app: Express = express();
const morgan = require('morgan')

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(todoRoutes);
app.use(morgan('dev'))

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@merntodo.g5pzm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('useFindAndModify', false);

mongoose
	.connect(uri, options)
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		)
	)
	.catch((error) => {
		throw error;
	});
