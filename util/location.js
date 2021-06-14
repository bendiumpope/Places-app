const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = '';

async function getCoordsForAddress(address) {
    return {
        lat: 40.7484474,
        lng: -73.9871516
    }

    // const API_KEY = 'AIzaSyAShfNH-cEVgemSma5H77N-0Uf1oE_RdRI';

    // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyAShfNH-cEVgemSma5H77N-0Uf1oE_RdRI`);

    // if (!data || data.status === 'ZERO_RESULT') {
    //     const error = new HttpError('could not find location for the specified address.', 422);

    //     throw error;
    // }

    // const coordinates = data.results[0].geometry.location;

    // return coordinates;
}


module.exports = getCoordsForAddress;