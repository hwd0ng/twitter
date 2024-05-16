import * as memberRepository from '../data/member.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';


function createJwtToken(id){
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec});
}

// 회원가입 API
export async function regist(req, res, next){
    let {username, password, name, gender} = req.body;
    const found = await memberRepository.findByUsername(username);
    if(found){
        return res.status(409).json({message:`${username}이(가) 이미 있습니다`});
    }
    password = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await memberRepository.createUser({username, password, name, gender});
    const token = createJwtToken(userId);
    res.status(201).json({message:'회원가입 성공', username});
}

// 로그인 API
export async function login(req, res, next){
    const {username, password} = req.body;
    // const user = await memberRepository.login(username);
    const member = await memberRepository.findByUsername(username);
    console.log(member);
    if(!member){
        return res.status(401).json({message: `아이디를 찾을 수 없음`});
    }
    const isValidpassword = await bcrypt.compareSync(password, member.password);
    if(!isValidpassword){
        return res.status(401).json({message: `비밀번호가 틀렸음`});
    }
    const token = createJwtToken(member.id);
    res.status(200).json({message:'로그인 성공', token, username});
}

//회원정보수정 API
export async function updateMember(req, res, next){
    const id = req.params.id;
    const username = req.body.username;
    let password = req.body.password;
    password = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const name = req.body.name;
    const gender = req.body.gender;
    console.log(`id: ${id}`);
    console.log(username, password, name, gender);
    const member = await memberRepository.update(id, username, password, name, gender);
    if(member){
        res.status(201).json(member);
    }else{
        res.status(404).json({message : '회원정보를 찾을 수 없습니다.'})
    }
}