import mongoose from 'mongoose';

import '../models/User';

const User = mongoose.model('User');

export function setUpConnection() {
    mongoose.connect('mongodb://localhost/diploma');
}

export function listOfUsers(){
    return User.find();
}

export function createUser(data){
    const user = new User({
        title: data.title,
        image: data.image,
        description: data.description,
        price: data.price,
        averageResponse: data.averageResponse
    });

    return user.save();
}

export function deleteUser(id){
    return User.findById(id).remove();
}