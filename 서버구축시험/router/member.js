import express from 'express';
import * as memberController from '../controller/member.js';
import { body } from 'express-validator';
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/member.js";

const router = express.Router();


const validateLogin = [
    body('username').trim().notEmpty().withMessage('username을 입력하세요'),
    body('password').trim().isLength({min:4}).withMessage('password는 최소 4자 이상 입력하세요'), validate
];

const validateSignup = [
    ... validateLogin,  // 로그인 먼저 체크한 후에 넘어감
    body('name').trim().notEmpty().withMessage('name을 입력하세요'),
    body('gender').trim().notEmpty().withMessage('성별을 입력하세요'),
    validate
];

// 회원가입
router.post('/regist', validateSignup, memberController.regist);

// 로그인
router.post('/login', validateLogin, memberController.login);

// 회원정보수정
router.put('/info/:id', isAuth, memberController.updateMember);

export default router;