require('dotenv').config()
const Airtable = require('airtable')
let base = new Airtable({ apiKey: process.env.AIRTABLE }).base('app1wgNrtXerw50QX')

console.log(process.env.AIRTABLE);
module.exports = () => {
    return new Promise((resolve, reject) => {
        let allCerts = []
        base('data')
            .select({
                view: 'Grid view',
            })
            .eachPage(
                function page(records, fetchNextPage) {
                    records.forEach((record) => {
                        allCerts.push({
                            last: record.get('Last Name'),
                            first: record.get('First Name'),
                            cert: record.get('Certification Type'),
                            date: record.get('Date of Certification'),
                        })
                    })
                    fetchNextPage()
                },
                function done(err) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(allCerts)
                    }
                }
            )
    })
}
