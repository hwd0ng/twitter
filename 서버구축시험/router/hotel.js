import express from 'express';
import * as hotelController from '../controller/hotel.js'
import { isAuth } from "../middleware/member.js";
const router = express.Router();

// 호텔리스트 API
router.get('/list', hotelController.getHotels);

// 호텔정보확인 API (로그인 후 사용가능)
router.get('/info/:code', isAuth, hotelController.getInfo);

// 호텔예약정보확인 API (로그인 후 사용가능)

// 호텔예약 API (로그인 후 사용가능)
// router.post('/reservation/:code', isAuth, hotelController.createReservation)

// 호텔예약취소 API (로그인 후 사용가능)

export default router;