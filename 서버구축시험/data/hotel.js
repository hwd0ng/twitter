import Mongoose from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userSchema = new Mongoose.Schema({
    code: {type: String, require: true},
    name: {type: String, require: true},
    location: {type: String, require: true},
    hp: {type: String, require: true},
    url: String
});

// const userSchema2 = new Mongoose.Schema({
//     user: {type: String, require: true},
//     code: {type: String, require: true},
//     room: {type: String, require: true},
//     reserveDate: {default: Date.now},
//     date: {type: String, require: true},
//     checkin: {type: String, require: true},
//     checkout: {type: String, require: true}
// });

useVirtualId(userSchema);

const Hotel = Mongoose.model('Hotel', userSchema);
// const Reservation = Mongoose.model('Reservation', userSchema2)

// 호텔 리스트 API : data
export async function getAll() {
    return Hotel.find();
}

// 호텔정보확인 API : data
export async function getByCode(code){
    const hotel = await Hotel.findOne({ code });
    if (hotel) {
      return hotel;
    } else {
      return {message:`코드[${code}]의 호텔정보가 없습니다.`};
    }
  }

// // 호텔코드 중복검사
// export async function findByCode(code){
//     return Reservation.findOne({code});
// }

// // 예약 생성 
// export async function createUser(room){
//     return new Reservation(room).save().then((data) => data.id); 
// }