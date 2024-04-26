import express from "express";

const router = express.Router();

router.use((req, res, next) => {            // 라우터 등록
    console.log('tweets 존재하는 미들웨어');
    next();
});

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

// 해당 아이디에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets?username=:username
router.get('/', (req, res, next) => { 
    const username = req.query.username;
    const data = username
        ? tweets.filter((tweet) => tweet.username == username)
        : tweets;
    res.status(200).json(data);
});

// 글번호에 대한 트윗 가져오기
// GET
// http://localhost:8080/tweets/:id
router.get('/:id', (req, res, next) => { 
    const id = req.params.id;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `${id}의 해당 트윗이 없습니다.`});
    }
});


// 트윗하기
// POST
// http://localhost:8080/tweets
// name, username, text
// json형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/', (req, res, next) => {
    const {text, name, username } = req.body;
    const tweet = {
        id: '10',
        text: text,
        createdAt: Date.now().toString(),
        name: name,
        usernmae: username,
        url: 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2020/01/urbanbrush-20200119235121619953.jpg'
    };
    tweets = [tweet, ...tweets];
    res.status(201).json(tweets);
})

// 트윗 수정하기
// PUT
// http://localhost:8080/tweets/:id
// id, username, text
// json 형태로 입력 후 변경된 데이터까지 모두 json으로 출력]
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet) => tweet.id === id);
    if(tweet){
        tweet.text = text;
        res.status(201).json(tweet);
    }else{
        res.status(404).json({message: `${id}의 해당 트윗이 없습니다.`});
    }
})

// 트윗 삭제하기
// DELETE
// http://localhost:8080/tweets/:id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter((tweet) => tweet.id !== id);  // 이 번호만 제외
    res.sendStatus(204).json(tweets);
});

export default router;

