import express, {request} from "express";
import path, {dirname} from "path";
import fs from "fs";
import {fileURLToPath} from "url";
import {sha256} from "js-sha256";
import {WebSocketServer} from "ws";

const salt = "d0fjb2dn8fsl5bkm7ds3bds";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const port = 7780;
const pathUsers = path.join(__dirname, "users.json");

const wsPort = 7781;
const wsServer = new WebSocketServer({port: wsPort});
const arrayMessages = [
  "My name Bob",
  "How are you?",
  "What is your name?",
  "Who are you?",
  "That would be great",
  "Don't be angry with me",
  "I must go",
  "I am here",
  "Everyone should admit one's mistakes",
  "Ask me another",
  "????"
];
server.options('/*', (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");
  res.send("");
});


wsServer.on("connection", connection => {
  connection.on("message", message => {

    const randomMessage = arrayMessages[Math.round(Math.random() * 10)];
    if (JSON.parse(message).email) {
      fs.readFile(pathUsers, "utf8", (err, data) => {
        if (err) {
          connection.send(JSON.stringify({error: err}));
        } else {
          const userData = JSON.parse(data).filter(user => user.email === JSON.parse(message).email)[0];

          if (userData.messages) {
            const myUserMessages = userData.messages.filter(user => user.userEmail === JSON.parse(message).myEmail);
            if (myUserMessages.length) {
              myUserMessages[0].messages.push({name: "my", message: JSON.parse(message).message});
              myUserMessages[0].messages.push({name: JSON.parse(message).name, message: randomMessage});
              userData.messages.map(user => {
                if (user.email === JSON.parse(message).email) {
                  return myUserMessages;
                } else {
                  return user;
                }
              });
            } else {
              userData.messages.push({
                userEmail: JSON.parse(message).myEmail, messages: [
                  {name: "my", message: JSON.parse(message).message},
                  {name: JSON.parse(message).name, message: randomMessage}
                ]
              });
            }
          } else {
            userData.messages = [{
              userEmail: JSON.parse(message).myEmail, messages: [
                {name: "my", message: JSON.parse(message).message},
                {name: JSON.parse(message).name, message: randomMessage}
              ]
            }];
          }
          const usersArray = JSON.parse(data).map(user => {
            if (user.email === JSON.parse(message).email) {
              return userData;
            } else {
              return user;
            }
          });
          fs.writeFile(pathUsers, JSON.stringify(usersArray), err => {
            if (err) {
              connection.send(JSON.stringify({error: err}));
            } else {
              const messageArray = usersArray.filter(user => user.email === JSON.parse(message).email)[0]
                .messages.filter(ar => ar.userEmail === JSON.parse(message).myEmail)[0].messages;
              connection.send(JSON.stringify(messageArray));
            }
          });
        }
      });
    }
  });
});

server.post("/getMessage", express.json({type: '*/*'}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");

  fs.readFile(pathUsers, "utf8", (err, data) => {
    if (err) {
      response.send({error: err});
    } else {
      let messageArray = JSON.parse(data).filter(user => user.email === request.body.userEmail)[0].messages
      if (messageArray) {
        messageArray = messageArray.filter(ar => ar.userEmail === request.body.myEmail)[0].messages;
        if (!messageArray.length) {
          messageArray = [{name: "", message: ""}];
        }
      } else {
        messageArray = [{name: "", message: ""}];
      }
      response.send({messages: messageArray});
    }
  });
});

server.get("/user/:name", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");

  const name = request.params.name;

  fs.readFile(pathUsers, "utf8", (err, data) => {
    if (err) {
      response.send({error: err});
    } else {
      const users = JSON.parse(data).filter(user => new RegExp(name, "i").test(user.name))
      response.send({users: users});
    }
  });
});

server.get("/users", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");

  fs.readFile(pathUsers, "utf8", (err, data) => {
    if (err) {
      response.send({error: err});
    } else {
      response.send(data);
    }
  });
});

server.post("/registration", express.json({type: '*/*'}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  const password = sha256.hmac(request.body.password, salt);
  if (request.body.name.trim() && request.body.email.trim() && request.body.password.trim()) {
    const dataUser = {name: request.body.name, email: request.body.email, password: password};
    fs.readFile(pathUsers, "utf8", (err, data) => {
      if (err) {
        response.send({error: err});
      } else {
        let dataFile;
        if (data === "") {
          dataFile = [dataUser];
        } else {
          dataFile = [...JSON.parse(data), dataUser];
        }
        fs.writeFile(pathUsers, JSON.stringify(dataFile), err => {
          if (err) {
            response.send({error: err});
          } else {
            response.send({name: request.body.name, email: request.body.email});
          }
        });
      }
    });
  } else {
    response.send({error: "empty fields"});
  }
});

server.post("/login", express.json({type: '*/*'}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  const password = sha256.hmac(request.body.password, salt);
  fs.readFile(pathUsers, "utf8", (err, data) => {
    if (err) {
      response.send({error: err});
    } else {
      const user = JSON.parse(data).filter(user => user.password === password && user.email === request.body.email);
      if (user.length) {
        response.send({name: user[0].name, email: user[0].email});
      } else {
        response.send({error: "not users"});
      }
    }
  });
});

server.put("/changeName", express.json({type: '*/*'}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  response.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");

  fs.readFile(pathUsers, "utf8", (err, data) => {
    if (err) {
      response.send({error: err});
    } else {
      const users = JSON.parse(data).map(user => {
        if (user.email === request.body.email) {
          user.name = request.body.newName;
        }
        return user;
      });
      fs.writeFile(pathUsers, JSON.stringify(users), err => {
        if (err) {
          response.send({error: err});
        } else {
          response.send({name: request.body.newName, users: users});
        }
      });
    }
  });
});

server.delete("/deleteUser", express.json({type: '*/*'}), (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");
  response.setHeader("Access-Control-Allow-Methods", "GET,DELETE,POST,PUT");

  fs.readFile(pathUsers, "utf8", (err, data) => {
    if (err) {
      response.send({error: err});
    } else {
      const users = JSON.parse(data).filter(user => user.email !== request.body.email);
      fs.writeFile(pathUsers, JSON.stringify(users), err => {
        if (err) {
          response.send({error: err});
        } else {
          response.send({users: users});
        }
      });
    }
  });
});

server.listen(port, () => {
  console.log("server working...");
});