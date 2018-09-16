const cheerio = require('cheerio');
const jsonframe = require('jsonframe-cheerio');
const got = require('got');

async function scrapeScreenSlate(date, venue) {
    const url = 'https://www.screenslate.com/' + date
    const html = await got(url)
    const $ = cheerio.load(html.body)

    jsonframe($) // initialize the plugin

    let frame = {
        screenings: {
            _s: ".screenings__screening___2wxaa",  // the selector
            _d: [{  
                "title" : ".screening__link___1rTIP",
                "details" : [".screening__details___2yckE > span"],
                "times" : [".screening__showtime___3oJD6"],
            }]
        }
    }

    // Filter the body for the correct venue if one is entered
    if (venue !== '' && venue !== null) {
        venueSelector = $('.screenings__h3___3Mups').filter(function() {
            return $(this).text().trim() === venue;
        }).parent().parent()
        obj.screenings.push(JSON.stringify(venueSelector.scrape(frame, {
            string: false
        })))
        console.log(venueSelector.scrape(frame, {
            string: true
        }))
    } else {
        //Return all movies if no venue is entered
        $('.screenings__venue___2EEUR').each(function() {
            //fs.appendFile('movies.txt', JSON.stringify(venueSelector.scrape(frame, {
            //    string: false
            //})))
                console.log($(this).scrape(frame, {
                string: true
            }))
        })
    }
}
var today = new Date();

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

//for (i = 0; i < 14; i++) {   
    //i = 14;
    //console.log(today.addDays(i).toJSON().slice(0,10));
    //    scrapeScreenSlate(today.addDays(i).toJSON().slice(0,10));
    //}


// For DEBUG:
//scrapeScreenSlate(today.addDays(1).toJSON().slice(0,10), '')
scrapeScreenSlate('2018-09-16', null)
//scrapeScreenSlate('2018-08-06', 'Anthology Film Archives')

