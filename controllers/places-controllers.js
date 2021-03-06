const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');


exports.getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    let place

    try {
        
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong.', 500);

        return next(error);
    }

    if(!place){

        return next(
            new HttpError('Could not find a place for the provided id.', 404)
            );
    }

    res.json(
        {
            place: place.toObject({ getters: true })
        }
    );
}


exports.getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let places
    
    try {
        
        places = await Place.find({ creator: userId });
    } catch (err) {
        const error = new HttpError('Something went wrong.', 500);

        return next(error);
    }

    if(!places || places.length === 0){
         
        return next(
            new Error('Could not find a place for the provided user id.')
            );
    }

    res.json(
        {
            places: places.map(place => place.toObject({ getters: true }))
        });
}

exports.createPlace =async (req, res, next) => {

    const { title, description, address } = req.body;

    let coordinates;

    try {
        
        coordinates = await getCoordsForAddress(address);

    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: req.file.path,
        creator: req.userData.userId
    });

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError('Creating place failed, please try again.', 500);

        return next(error);
    }
    
    if (!user) {
        const error = new HttpError('Could not find user provided, please try again.', 404);

        return next(error);
    }


    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess })
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Creating place failed, please try again.', 500);

        return next(error);
    }
    

    res.status(200).json({
        place: createdPlace
    })
}

exports.updatePlace = async (req, res, next) => {
    
    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong.', 500);

        return next(error);
    }

    if (place.creator.toString() !== req.userData.userId){
        const error = new HttpError('You are not allowed to edit this place.', 401);

        return next(error);
    }
    place.title = title;
    place.description = description;
    
    try { 
        await place.save()
    } catch (err) {
        const error = new HttpError('Something went wrong.', 500);

        return next(error);
    }

    res.status(200).json({
        place: place.toObject({ getters: true })
    })

}

exports.deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    
    let place;

    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong populate', 500);

        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find place with this Id', 404);

        return next(error);
    }

    if (place.creator.id !== req.userData.userId){
        const error = new HttpError('You are not allowed to delete this place.', 401);

        return next(error);
    }

    const imagePath = place.image;
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();

    } catch (err) {
        const error = new HttpError('Something went wrong from delete', 500);

        return next(error);   
    }

    fs.unlink((imagePath, err) => {
        console.log(err);
    });

    res.status(200).json({
        message: 'place Deleted'
    });  
}