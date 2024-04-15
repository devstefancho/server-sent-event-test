# Server Sent Event Test
this is the senario that students are not allowed to enter the room before teacher enter the room

## Start Frontend Server
```bash
cd fe
http-server -p 5500
```

## Start Backend Server
```bash
cd be
node server.js
```

## How to Test

1. open `localhost:5500/student.html`
1. open `localhost:5500/teacher.html`
1. first time, You can see that `Go to Room` button is disabled. This is waiting for teacher's send action
1. If you click `Send ID` button in teacher.html
1. `Go to Room` button will be enabled in student.html
1. Now any person who open the student.html can click `Go to Room` button, because teacher already entered the room



https://github.com/devstefancho/server-sent-event-test/assets/61320923/1ee29d01-92b4-4532-9c0f-bd472e5271b8

