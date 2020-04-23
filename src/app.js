

    const http = require('http');
    const fs = require('fs'); // 디렉토리 파일 읽는 모듈
    const socketio = require('socket.io'); // 소켓 통신 할수 있게 할수있는 모듈
    const express = require('express');
    const  multer = require('multer'); //  파일 업로드 를 도와주는 multer : Node.js 모듈
    const app = express();
    const server = http.createServer(app);
    const io = socketio.listen(server);

    const modulesList = {
        http: http,
        fs: fs,
        socketio : socketio,
        express : express,
        multer : multer,
        app:app,
        server:server,
        io:io
    };

    const config = require('./plugins/config');

    const fileUpload = require('./node/fileUpload');



    //prot : 번호
    const port = config.port;
    //  public  디렉토리 로 변경
    app.use(express.static(__dirname + '/../public'));

    //server Start
    server.listen(port, () => {
        console.log('Server Running at http://127.0.0.1:'+port);
    });



        app.get('/', (request, response) => {
            fs.readFile('./HTMLPage.html', (error, data) => {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);

            });
        });

            // POST 방식으로 파일 업로드
            fileUpload.fileUpload(modulesList);


            let roomNameStr = null;

            io.sockets.on('connection', (socket) => {


                roonNameData(socket);
                dataEventListener(socket,'message');
                dataEventListener(socket,'image');
                dataEventListener(socket,'metaOg');


            });

        function roonNameData(socket) {

            roomNameStr = '';
            socket.on('join', (data) => {
                console.log("roomName : "+data);


                roomNameStr = data;
                socket.join(roomNameStr);

            });
        }


        function dataEventListener(socket,eventStr) {
            socket.on(eventStr, (data) => {

                console.log('roomName :'+roomNameStr);
                console.log("userName    :"+data.name);
                console.log("userMessage :"+data.message);

                if (eventStr==='image'){
                    console.log("userMessage :"+data.fileType);
                }
                
                


                modulesList.io.sockets.in(roomNameStr).emit(eventStr, data);

            });


            // TODO 홈페이지 이미지 및 제목 미리 보기
            urlPageReading('https://papago.naver.com/');
            // Url Data 읽어오기
            function urlPageReading(url){
                // 모듈 사용 : npm i html-metadata-parser/
                // meta og 데이터만 파싱
                // html metaOg 태그 일기
                var Meta = require('html-metadata-parser');
                Meta.parser(url, function (err, result) {
                    console.log(result.og.title);
                    console.log(result.og.images[0].url);
                });
            }

    }


























