// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const fs = require("fs");
// const path = require("path");
// const app = require("express")();

// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

// const uploadDir = path.join(__dirname, "../../public/uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// console.log("Upload directory set to:", uploadDir);

// io.on("connection", (socket) => {
//   console.log("A user connected: " + socket.id);

//   socket.on("CO2Data", (data) => {
//     console.log("Received CO2 data from Raspberry Pi:", data);
//     io.emit("updateCO2Data", data); // ส่งผ่านอีเวนต์เฉพาะสำหรับ CO2
//   });

//   socket.on("AlcoholData", (data2) => {
//     console.log("Received Alcohol data from Raspberry Pi:", data2);
//     io.emit("updateAlcoholData", data2); // ส่งผ่านอีเวนต์เฉพาะสำหรับ Alcohol
//   });

//   socket.on("image", (data) => {
//     console.log("Received image:", data.filename);

//     const imageBuffer = Buffer.from(data.data, "base64");
//     const filePath = path.join(uploadDir, data.filename);

//     fs.writeFile(filePath, imageBuffer, (err) => {
//       if (err) {
//         console.error("Error saving image:", err);
//       } else {
//         console.log(`Image saved as ${filePath}`);
//       }
//     });

//     socket.emit("imageSaved", { message: `Image ${data.filename} saved successfully` });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//   console.log(`WebSocket server is running on http://localhost:${PORT}`);
// });

const { createServer } = require("http");
const { Server } = require("socket.io");
const sqlite3 = require("sqlite3").verbose(); // เพิ่ม SQLite
const app = require("express")();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("Error connecting to SQLite database:", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS CO2Data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`CREATE TABLE IF NOT EXISTS AlcoholData (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("CO2Data", (data) => {
    console.log("Received CO2 data from Raspberry Pi:", data);

    db.run("INSERT INTO CO2Data (value) VALUES (?)", [data], (err) => {
      if (err) {
        console.error("Error saving CO2 data:", err);
      } else {
        console.log("CO2 data saved:", data);
      }
    });

    io.emit("updateCO2Data", data);
  });

  socket.on("AlcoholData", (data2) => {
    console.log("Received Alcohol data from Raspberry Pi:", data2);

    db.run("INSERT INTO AlcoholData (value) VALUES (?)", [data2], (err) => {
      if (err) {
        console.error("Error saving CO2 data:", err);
      } else {
        console.log("Alcohol data saved:", data2);
      }
    });

    io.emit("updateAlcoholData", data2);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${PORT}`);
});
