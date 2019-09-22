import { Scraper } from "./scraper";
import { firebaseInstance } from './firebase/FirebaseInstance';


const scraper: Scraper = new Scraper();
const url = "https://www.apartments.com/mountain-view-town-center-i-apartments-mountain-view-ca/415th9j/";
// const url: string = "https://www.apartments.com/eaves-creekside-mountain-view-ca/dgfjmql/";

scraper.getDataFromURL(url).then(data => {
    // firebaseInstance.storeApartmentSnapshot(data)
});
// firebaseInstance.getDataById(`history`)
// tslint:disable-next-line:typedef
// scraper.getDataFromURL(url);


