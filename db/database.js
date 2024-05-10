import { config } from '../config.js';
import Mongoose from 'mongoose';

let db;

export async function connectDB(){
    // console.log(config.db.host);
    // return MongoDb.MongoClient.connect(config.db.host).then((client) => db = client.db());
    return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema){
    schema.virtual('id').get(function(){
        return this._id.toString()
    });
    schema.set('toJSN', {virtuals:true});     // 통신
    schema.set('toObject', {virtuals:true})   // 객체
}

export function getUsers(){
    return db.collection('users');
}

export function getTweets(){
    return db.collection('tweets');
}