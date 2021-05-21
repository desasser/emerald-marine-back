const express = require('express');
const shippo = require('shippo')(`${process.env.SHIPPO_TOKEN}`)
require('dotenv').config();

const router = express.Router();


router.post('/shippo', (req, res) => {
    const createShipment = (data) => {
        const addressFrom = {
            "name": 'Emerald Marine Products',
            "street1": '811 Alder St',
            "city": 'Edmonds',
            "state": 'WA',
            "zip": '98020',
            "country": 'US'
        };

        const addressTo = {
            "name": `${data.name}`,
            "street1": `${data.street}`,
            "city": `${data.city}`,
            "state": `${data.state}`,
            "zip": `${data.zip}`,
            "country": `${data.country}`
        };

        const parcel = {
            "length": `${data.length}`,
            "width": `${data.width}`,
            "height": `${data.height}`,
            "distance_unit": 'in',
            "weight": `${data.weight}`,
            "mass_unit": 'lb'
        };

        shippo.shipment.create({
            "address_from": addressFrom,
            "address_to": addressTo,
            "parcels": [parcel],
            "async": false
        }, function (err, shipment) {
            err ? res.send(err) : res.json(shipment)
        });
    }
    createShipment(req.body)
});

module.exports = router;
