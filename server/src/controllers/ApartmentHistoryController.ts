import * as cron from 'node-cron'
import { firebaseInstance } from '../firebase/FirebaseInstance';
import { Scraper } from "../utility/Scraper";

/**
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
second	0-59
minute	0-59
hour	0-23
day of month	1-31
month	1-12 (or names)
day of week	0-7 (or names, 0 or 7 are sunday)
 */


import * as express from 'express';
import { asyncForEach } from '../utility/AyncForeach';
// import Post from './post.interface';

export interface ApartmenHistory {

}

export interface ApartmentUrl {
    id: string,
    url: string
}

export default class ApartmentHistoryController {
    public path = '/apartment';
    public router = express.Router();
    private updateCron: any;
    private scraper: Scraper;

    constructor() {
        this.intializeRoutes();
        this.initializeUpdateCron();
        this.scraper = new Scraper();
    }

    public initializeUpdateCron() {
        this.updateCron = cron.schedule("* * 1 * * *", async () => {
            console.log(new Date())
            this.takeSnapshotsOfUrls()
        }, { scheduled: false });
    }

    public async takeSnapshotsOfUrls() {
        const urls = await this._getAllUrls();
        urls.forEach((urlObject, index) => {
            const { url } = urlObject;
            setTimeout(() => {
                this.scraper.getDataFromURL(url).then(data => {
                    firebaseInstance.storeApartmentSnapshot(data)
                });
            }, 2000 * index)

        })
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAll);
        this.router.get(`${this.path}/:apartment-history-id`, this.getHistoryById);
        this.router.get(`${this.path}/:url-id`, this.getUrlById);
        this.router.get(`${this.path}/start-update`, this.startUpdateCron);
        this.router.get(`${this.path}/stop-update`, this.stopUpdateCron);

        this.router.get(`${this.path}/:url-id`, this.getUrlById);
        this.router.get(`${this.path}/apartment-urls`, this.getAllUrls);
        this.router.post(`${this.path}/add-url`, this.addApartmentUrl);
        this.router.post(`${this.path}/add-apartment-history`, this.addApartmentUrl);
        this.router.get(`${this.path}/take-snapshots`, () => this.takeSnapshotsOfUrls());
    }

    getAll = async (request: express.Request, response: express.Response) => {
        const data = await firebaseInstance.getAllData();
        response.send(JSON.stringify(data));
    }

    private _getAllUrls = async () => {
        const urls = await firebaseInstance.getAllUrls();
        return Object.keys(urls).map(key => ({
            id: key,
            url: urls[key]
        }))
    }


    getAllUrls = async (request: express.Request, response: express.Response) => {
        const returnUrls = await this._getAllUrls();
        response.send(JSON.stringify(returnUrls));
    }


    getUrlById = (request: express.Request, response: express.Response) => {
        console.log("Getting by id")
        response.send("Getting by id");

    }

    startUpdateCron = (request: express.Request, response: express.Response) => {
        this.updateCron.start();
        response.send("Starting cron")
    }

    stopUpdateCron = (request: express.Request, response: express.Response) => {
        this.updateCron.stop();
        response.send("stopping cron")
    }

    getHistoryById = (request: express.Request, response: express.Response) => {
        console.log("Get history by id")
        response.send(JSON.stringify(request));

        console.log(request)
        console.log(response)
    }

    addApartmentUrl = (request: express.Request, response: express.Response) => {
        firebaseInstance.addUrl(request.body.apartmentUrl).then(() => {
            response.send("Great job adding that url ");
        }).catch(e => {
            response.send(e);
        });

    }
}
