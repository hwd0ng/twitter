import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userSchema = new Mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    name: {type: String, require: true},
    gender: {type: String, require: true}
}, {timestamps: true});

useVirtualId(userSchema);

const Member = Mongoose.model('Member', userSchema); // 자동으로 Users라고 만들어짐
                                                   // 스키마에 맞춰서 넣지 않으면 에러

// 아이디(username) 중복검사
export async function findByUsername(username){
    return Member.findOne({username});
}

// id 중복검사
export async function findById(id){
    return Member.findById(id);
}

// id 생성
export async function createUser(member){
    return new Member(member).save().then((data) => data.id); 
}

// 회원정보수정
export async function update(id, username, password, name, gender){
    return Member.findByIdAndUpdate(id, {username, password, name, gender}, {returnDocument: 'after'});
}
