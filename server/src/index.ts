import * as express from 'express'
import * as bodyParser from 'body-parser';

import * as path from 'path';
import { readFile } from './utility/FileReader'
import ApartmentHistoryController from './controllers/ApartmentHistoryController';

const loggerMiddleware = (request: express.Request, response: express.Response, next) => {
    console.log(`${request.method} ${request.path}`);
    next();
}

const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', router);

app.get('/', (request, response) => {
    response.send('Hello world!');
});

app.use(loggerMiddleware);

app.get('/hello', (request, response) => {
    response.send('Hello world?');
});

const apartmentHistoryController = new ApartmentHistoryController();
app.use('/api', apartmentHistoryController.router)

app.listen(5000);