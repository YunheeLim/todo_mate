var express = require('express');
var router = express.Router();

const auth=require('../controller/auth.js');
const db=require('../config/db.js');
const sess=require('../controller/sessionChecker.js');


// 회원 가입 요청 처리
router.post('/signup',(req, res) => {
  const { id,name, email,password } = req.body;
  const user = { id,name,email, password };
  console.log(user)
  if(!auth.isValidInput(user)){ // 서버에서 입력 폼의 데이터 검사
    console.log('user: ',req.body.id+' - sign up fail: invalid input data');
    res.send({result:'유효하지 않은 입력입니다.'});
  }
  db.query('SELECT * FROM User WHERE id=?',[id],(err,data)=>{
    if(data.length==0){ // DB에 해당 id에 대한 정보가 없을 경우
      db.query('INSERT INTO User SET ?',user,(err,result)=>{
        if(err){
          throw err;
        }
      })
      console.log('user: ',req.body.id+' - sign up success');
      res.send({result:'success'});
    }else{ // DB에 중복된 id가 있을 경우
      console.log('user: ',req.body.id+' - sign up fail: ID already exist');
      res.send({result:'이미 사용중인 ID 입니다.'});
    }
  })
});

module.exports = router;
