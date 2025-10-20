const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');

// Fetch chat history between two users
router.get('/history', async (req, res) => {
  try {
    const { user1, user2 } = req.query; // Emails or IDs
    const chats = await Chat.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 }); // Sort by time
    res.json({ success: true, chats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save a new chat message (optional, if using Socket.IO server-side persistence)
router.post('/send', async (req, res) => {
  try {
    const { sender, receiver, message, type } = req.body; // type: 'text' or 'file'
    const chat = new Chat({ sender, receiver, message, type });
    await chat.save();
    res.json({ success: true, chat });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
