




var http = require('http');
var fs = require('fs'); // 디렉토리 파일 읽는 모듈
var socketio = require('socket.io'); // 소켓 통신 할수 있게 할수있는 모듈
var express = require('express');
var app = express();


//  static  디렉토리 로 변경
app.use(express.static(__dirname + '/../public'));


//  파일 업로드 를 도와주는 multer : Node.js 모듈
var multer = require('multer');
// File 저장 및 디렉토리 경로 지정
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime().toString()+file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
});
// input File 받음
var upload = multer({ storage: storage });



// 웹서버 생성
var server = http.createServer(app);
app.get('/', (request, response) => {
  fs.readFile('../HTMLPage.html', (error, data) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(data);
  });
});
server.listen(52273, () => {
  console.log('Server Running at http://127.0.0.1:52273');
});

//
var io = socketio.listen(server);
io.sockets.on('connection', (socket) => {
  // message 
  var roomName = null;


  /*
  * join : 채팅창 방만들기
  */
  socket.on('join', (data) => {
    roomName = data;
    socket.join(data);
  });

  /*
  *  채팅 데이터 내용
  *  name,message
  *  파라미터 전송
  */
  socket.on('message', (data) => {
    io.sockets.in(roomName).emit('message', data);
    console.log(data.name);
    console.log(data.message);

  });


    socket.on('image', (data)=>{
        // 데이터를 리턴 해줌
        io.sockets.in(roomName).emit('image', data);

    });

});




app.post('/image', upload.single("image"), function(req, res, next) {

  try {

      console.log(req.file.filename);
      var data = req.file.filename;
      res.send(data);



  } catch (error) {
    console.error(error);
    next(error);
  }
});

