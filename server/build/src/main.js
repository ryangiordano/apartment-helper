"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./scraper");
const FirebaseInstance_1 = require("./firebase/FirebaseInstance");
const scraper = new scraper_1.Scraper();
const url = "https://www.apartments.com/eaves-creekside-mountain-view-ca/dgfjmql/";
scraper.getDataFromURL(url).then(data => {
    FirebaseInstance_1.firebaseInstance.storeApartmentSnapshot(data);
});
//# sourceMappingURL=main.js.map