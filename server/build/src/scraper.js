"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio = require("cheerio");
class Scraper {
    constructor() {
    }
    getDataFromURL(url) {
        return axios_1.default(url)
            .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);
            const statsTable = $("#availabilitySection .tabContent.active .rentalGridRow");
            const propertyName = $(".propertyName").first().text().trim();
            const address = $(".propertyAddress")
                .text()
                .trim()
                .replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]/g, "").replace(/ +(?= )/g, "");
            const data = [];
            const rating = parseFloat($(".rating > span")
                .attr("content")) ||
                parseInt($(".rating")
                    .attr("title").replace(/[^\d]/g, ""));
            statsTable.each((_idx, row) => {
                const bedString = $(row).find(".beds .shortText").text().trim().replace(/[^\d]/g, "");
                const beds = !bedString.length ? 0 : parseInt(bedString);
                const baths = parseInt($(row).find(".baths .shortText").text().trim().replace(/[^\d]/g, ""));
                const squareFootage = parseInt($(row).find(".sqft").text().trim().replace(/[^\d]/g, ""));
                const name = $(row).find(".name").text().trim();
                const id = `${$("main").first().data("listingid")}-${$(row).data("rentalkey")}`;
                const leaseLength = $(row).find(".leaseLength").text().trim();
                const available = $(row).find(".available").text().trim();
                const deposit = parseInt($(row).find(".deposit").text().trim().replace(/[^\d]/g, ""));
                const rent = $(row).find(".rent").text().trim();
                const timeStamp = new Date().toString();
                const realRent = [...rent.split("-")].map((r) => parseInt(r.trim().replace(/[^\d]/g, "")) || "N/A");
                const dataObject = {
                    id,
                    propertyName,
                    unitName: name,
                    address,
                    rent: realRent,
                    deposit,
                    available: available === "Not Available" ? false : true,
                    leaseLength,
                    squareFootage,
                    numberOfBedrooms: beds,
                    numberOfBaths: baths,
                    url,
                    timeStamp,
                    rating,
                };
                data.push(dataObject);
            });
            return data;
        })
            .catch(console.error);
    }
}
exports.Scraper = Scraper;
//# sourceMappingURL=scraper.js.map