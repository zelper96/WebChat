

    const fs = require('fs');
    var multer = require('multer');

    //====================================================================================================================

    app.get('/',function(){
       fs.readFile
    });

    //====================================================================================================================



    //====================================================================================================================

    // 파일생성
    // filediectoryCheck();

    function filediectoryCheck(){

        var fifleLocation = 'D:/ViewJS/';
        var fileName ='text';
        var fileExtensions = '.txt';
        var fileDataContent='데이터 넣음 !!';

        var file = fifleLocation+fileName+fileExtensions;
            fs.writeFile(file,fileDataContent,function(err){
           if (err ==null){
               console.log("file생성");
           }  else{
               console.log("똑같은 file 존재함")
           }
        });
    }

    //====================================================================================================================

    // 폴더 생성
    // fileDirectoryCreation();
    function fileDirectoryCreation() {
        const fileDirectoryLocation ='./'
        const fileDirectoryName = 'NexgridFiles'
        var savedir = fileDirectoryLocation+"/"+fileDirectoryName;

        if(!fs.existsSync(savedir)){
            //폴더 생성
            fs.mkdirSync(savedir);
        }else{
            console.log('폴더가 존재합니다');
        }
    }

    //====================================================================================================================


    // urlPageReading('https://papago.naver.com/');
    // Url Data 읽어오기
    function urlPageReading(url){
        // 모듈 사용 : npm i html-metadata-parser/
        // meta og 데이터만 파싱
        // html metaOg 태그 일기
        var Meta = require('html-metadata-parser');
        Meta.parser(url, function (err, result) {

            console.log(result.og.title);
            console.log(result.og.images[0].url);

        })
    }

    //====================================================================================================================


