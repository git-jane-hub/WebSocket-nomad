// http package 사용을 위한 import
import http from "http";

import WebSocket from "ws";

// express를 import 해서 express 어플리케이션을 구성
import express from "express";

const app = express();

// pug 페이지를 렌더하기 위한 view engine을 Pug로 설정
app.set("view engine", "pug");
// views 디렉토리 설정
app.set("views", __dirname + "/public/views");
// home.pug에서 script가 작동하기 위한 static 작업
// user가 /public 으로 가면 __dirname + "/public" 폴더를 보여줌
app.use("/public", express.static(__dirname + "/public"));
// home.pug 로 이동할 경우 사용될 템플릿을 render 헤주는 route handler
app.get("/", (req, res) => res.render("home"));
// user가 어느 url로 이동하든지 홈으로 보내는 로직
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

// app.listen(3000, handleListen); // port

// http 서버: node.js에 내장된 http package 사용, server 라는 변수에 저장해 webSocket을 생성할 수 있게함
const server = http.createServer(app);

// we 서버: 중괄호 내부에 server 를 작성해 서버를 전달, 같은 포트번호로 http 서버와 ws 서버를 모두 사용할 수 있게함(http 서버 위에 wss 서버를 생성)
const wss = new WebSocket.Server({ server });

server.listen(3000, handleListen);
