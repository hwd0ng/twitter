import MongoDB from 'mongodb';
// import { getUsers } from '../db/database.js';
import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userSchema = new Mongoose.Schema({
    username: {type: String, require: true},
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    url: String
});

useVirtualId(userSchema);

const User = Mongoose.model('User', userSchema) // 자동으로 Users라고 만들어짐
                                                // 스키마에 맞춰서 넣지 않으면 에러

const ObjectID = MongoDB.ObjectId;

// 아이디(username) 중복검사
export async function findByUsername(username){
    // return getUsers().find({username}).next().then(mapOptionalUser);
    return User.findOne({username});
}

// id 중복검사
export async function findById(id){
    // return getUsers().find({_id: new ObjectID(id)}).next().then(mapOptionalUser);
    return User.findById(id);
}

export async function createUser(user){
    // return getUsers().insertOne(user).then((result) => console.log(result.insertedId.toString()));
    return new User(user).save().then((data) => data.id); 
}

// export async function login(username){
//     const user = users.find((user) => user.username === username)
//     return user;
// }

function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString() } : user;
}