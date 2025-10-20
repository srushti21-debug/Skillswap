const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'html')));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

// File upload storage
const storage = multer.diskStorage({
  destination: function(req, file, cb){ cb(null, 'uploads/'); },
  filename: function(req, file, cb){ cb(null, Date.now()+'-'+file.originalname); }
});
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/skillswap', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>console.log("MongoDB connected")).catch(err=>console.log(err));

// Routes
app.use('/auth', authRoutes(upload));
app.use('/chat', chatRoutes);
app.use('/api', apiRoutes);

// Socket.IO for real-time chat
io.on('connection', socket=>{
  console.log('User connected');
  socket.on('chat message', (data)=>{
    io.emit('chat message', data);
  });
  socket.on('disconnect', ()=>console.log('User disconnected'));
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

io.on('connection', socket => {
  console.log('User connected');

  socket.on('chat message', async (data) => {
    // Broadcast to everyone
    io.emit('chat message', data);

    // Optional: save to DB
    if(data.sender && data.receiver) {
      const chat = new Chat({
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        type: data.type
      });
      await chat.save();
    }
  });

  socket.on('disconnect', ()=>console.log('User disconnected'));
});
