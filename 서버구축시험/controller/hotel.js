import * as hotelRepository from '../data/hotel.js'

// 호텔 리스트 API : controller
export async function getHotels(req, res){
    const data = await hotelRepository.getAll();
    res.status(200).json(data);
}

// 호텔정보확인 API : controller
export async function getInfo(req, res){
    const code = req.params.code;
    const hotel = await hotelRepository.getByCode(code);
    if(hotel){
        res.status(200).json(hotel)
    }else{
        res.status(404).json({message:`코드:${code}의 호텔정보가 없습니다.`});
    }
}


// 호텔예약 API : controller
// export async function createReservation(req, res, next){
//     let {user, code, room, reserveDate, date, checkin, checkout} = req.body;
//     const found = await hotelRepository.findByCode(code);
//     if(found){
//         return res.status(409).json({message:`호텔${code}이(가) 이미 예약되어있습니다`});
//     }
//     const userId = await hotelRepository.createUser({user, code, room, reserveDate,
//         date, checkin, checkout});
//     res.status(201).json({message:'예약 성공', user});
// }
