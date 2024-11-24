require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/connectDB")

// const http = require("http");
// const { Server } = require("socket.io");

const app = express()
const PORT = process.env.PORT || 1234

// const server = http.createServer(app); // יצירת שרת HTTP
// const io = new Server(server, {
//     cors: {
//         origin: corsOptions.origin,
//         methods: ["GET", "POST", "PUT", "DELETE"],
//     },
// });

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))

connectDB()

app.use("/api/auth", require("./routes/AuthRoute"))
app.use("/api/family", require("./routes/FamilyRoute"))
app.use("/api/employee", require("./routes/EmployeeRoute"))
app.use("/api/conversation", require("./routes/ConversationRoute"))

app.get("/", (req, res) => {
    res.send("home page")
})


// WebSocket לוגיקה
// io.on("connection", (socket) => {
//     console.log("Client connected:", socket.id);

    // הצטרxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // socket.on("joinConversation", (conversationId) => {
    //     console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
    //     socket.join(conversationId); // הצטרxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxדר השיחה
    // });

    // שליחת הודעה
    // socket.on("sendMessage", (message) => {
    //     console.log("New message received:", message);
    //     io.to(message.conversationId).emit("newMessage", message); // שידור ההודעה לכל המשתמשים בחדר
    // });

    // ניתוק
    // socket.on("disconnect", () => {
    //     console.log("Client disconnected:", socket.id);
    // });
// });

// הפעלת השרת
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})