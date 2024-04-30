let tweets = [
    {
        id: '1',
        text: '안녕하세요!',
        createdAt: Date.now().toString(),
        name: '김사과',
        username: 'apple',
        url: 'https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45-966x1024.jpg'
    },

    {
        id: '2',
        text: '안녕하세요!',
        createdAt: Date.now().toString(),
        name: '반하나',
        username: 'banana',
        url: 'https://i.pinimg.com/originals/69/ac/02/69ac028b9320e4d49b8265f2d7983ff3.jpg'
    }
];

// 모든 트윗을 리턴
export async function getAll(){
    return tweets;  
}

// 해당 유저명에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return tweets.filter( (tweet) => tweet.username === username);
}

// 글번호에 대한 트윗을 리턴
export async function getByID(id){
    return tweets.find( (tweet) => tweet.id === id);
}

// 트윗을 작성
export async function create(text, name, username){
    const tweet = {
        id: '10',
        text,
        createdAt: Date.now().toString(),
        name, // 키값과 변수값이 같으면 한번만 써도 됨 name: name,
        username // usernmae: username
    };
    tweets = [tweet, ...tweets];
    return tweets;
}

// 트윗을 변경
export async function update(id, text){
    const tweet = tweets.find( (tweet) => tweet.id === id);
    if (tweet){
        tweet.text = text;
    }
    return tweet;
}

// 트윗을 삭제
export async function remove(id){
    tweets = tweets.filter( (tweet) => tweet.id !== id);
}