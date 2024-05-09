import dotenv from 'dotenv';

dotenv.config();

function required(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue;  
    // or: 앞의 값이 true면 앞의 값 대입, false면 뒤의 값 대입
    if(value==null){
        throw new Error(`키 ${key}는 undefined!!`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),  // required함수에 JWT_SCRET를 주고 찾으라는 뜻
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800))
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 10))
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    },

    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD'),
        port: required('DB_PORT')
    }
}