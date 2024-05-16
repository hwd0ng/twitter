import { config } from '../config.js';
import Mongoose from 'mongoose';

let db;

export async function connectDB(){
    return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema){
    schema.virtual('id').get(function(){
        return this._id.toString()
    });
    schema.set('toJSN', {virtuals:true});     // 통신
    schema.set('toObject', {virtuals:true})   // 객체
}

export function getMembers(){
    return db.collection('members');
}
