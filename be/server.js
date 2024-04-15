const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let clients = []; // 클라이언트 연결을 관리하기 위한 배열
let hasValidId = false; // id 유효성 검사완료 여부

// SSE 엔드포인트 설정
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  if (hasValidId) {
    res.write(`data: room-ready\n\n`);
  } else {
    // 클라이언트 저장
    clients.push(res);
  }

  // 클라이언트 연결이 끊어졌을 때 처리
  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
    res.end();
  });
});

// /events/called 경로에 대한 POST 요청 처리
app.post("/events/called", (req, res) => {
  const { id } = req.body; // POST 요청의 본문에서 id 값을 가져옴

  if (Number(id) !== 12345) {
    res.status(400).send("Invalid ID");
    return;
  }

  // 모든 클라이언트에게 id 값 전송
  clients.forEach((client) => {
    client.write(`data: room-ready\n\n`);
  });

  hasValidId = true;

  res.status(200).send("ID sent to all clients");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
