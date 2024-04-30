import * as authRepository from '../data/auth.js'

// 유저명으로 검색하거나 유저명 없을 시 전체 정보를 가져오는 함수
export async function getUsers(req, res){
    const username = req.query.username;
    const data = await (username ? authRepository.getAllByUsername(username)
                                    : authRepository.getAll());
    res.status(200).json(data);
}

// ID로 검색해서 정보를 가져오는 함수
export async function getUser(req, res, next) {
    const id = req.params.id   // 요청 URL에서 트윗 ID 추출
    const user = await authRepository.getByID(id);
    if(user){
        res.status(200).json(user);
    }else{
        res.status(404).json({message:`${id}의 정보가 없습니다`})
    }
}

// 회원가입(id, password, username 입력) 함수 (데이터를 추가)
export async function signup(req, res, next){
    const {username, password, name, email} = req.body;
    const users = await authRepository.createUser(username, password, name, email);
    if(users){
        res.status(201).json(users);
    }
}

export async function login(req, res, next){
    const {username, password} = req.body;
    const user = await authRepository.login(username);
    if(user){
        res.status(201).json(`${username} 로그인 완료`);
    }else{
        res.status(404).json({message: `${username}의 아이디 또는 비밀번호 확인해주세요`})
    }
}