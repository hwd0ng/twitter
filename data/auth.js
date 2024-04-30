let users = [
    {        
        id: '1',
        username: 'apple',
        password: '1111',
        name: '김사과',
        email: 'apple@apple.com',
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45-966x1024.jpg'
    },
    {
        id: '2',
        username: 'banana',
        password: '2222',
        name: '반하나',
        email: 'banana@banana.com',
        url: 'https://i.pinimg.com/originals/69/ac/02/69ac028b9320e4d49b8265f2d7983ff3.jpg'
    }
]

// 모든 유저를 리턴
export async function getAll(){
    return users;  
}

// ID에 대한 정보를 리턴
export async function login(username){
    return users.find( (user) => user.username === username);
}

// id, password, username 입력 후 회원가입
export async function createUser(username, password, name, email){
    const user = {
        id: '10',
        username,    // username: username
        password,    // 키값과 변수값이 같으면 한번만 써도 됨 password: password,
        name,
        email,
        url: 'https://i.pinimg.com/originals/69/ac/02/69ac028b9320e4d49b8265f2d7983ff3.jpg'
    };
    users = [user, ...users];
    return users;
}