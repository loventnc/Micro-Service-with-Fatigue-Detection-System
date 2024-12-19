const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");
const app = require("express")();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


const uploadDir = path.join(__dirname, "../../public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
console.log("Upload directory set to:", uploadDir);

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);


  socket.on("image", (data) => {
    console.log("Received image:", data.filename);


    const imageBuffer = Buffer.from(data.data, "base64");
    const filePath = path.join(uploadDir, data.filename);

    fs.writeFile(filePath, imageBuffer, (err) => {
      if (err) {
        console.error("Error saving image:", err);
      } else {
        console.log(`Image saved as ${filePath}`);
      }
    });


    socket.emit("imageSaved", { message: `Image ${data.filename} saved successfully` });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on http://localhost:${PORT}`);
});