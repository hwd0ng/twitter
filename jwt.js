// npm i jsonwebtoken
import jwt from 'jsonwebtoken';

const secret = 'abcdefg1234';
const token = jwt.sign(
    {
        id: 'apple',
        isAdmin: false  // 일반사람
    },
    secret,
    { expiresIn: 2 }    // 얼마나 이 토큰이 유지될 것인가
);

setTimeout( () => {
    jwt.verify(token, secret, (error, decoded) => {
        console.log(error, decoded);
    });
}, 3000 );

console.log(token);