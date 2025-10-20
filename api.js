const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Trending Skills API (top taught/learned skills)
router.get('/trending', async(req,res)=>{
  try{
    const users = await User.find();
    const skillCount = {};
    users.forEach(u=>{
      u.teachSkills.forEach(s=> skillCount[s] = (skillCount[s]||0)+1 );
    });
    const trending = Object.entries(skillCount).sort((a,b)=>b[1]-a[1]).map(e=>e[0]).slice(0,10);
    res.json({ trending });
  }catch(err){ res.status(500).json({error:err.message}); }
});

// Skill Matching API
router.post('/match', async(req,res)=>{
  const { teachSkills, learnSkills, email } = req.body;
  try{
    const users = await User.find({ email: { $ne: email } });
    const matches = users.filter(u=>{
      const canTeach = u.teachSkills.some(skill => learnSkills.includes(skill));
      const canLearn = teachSkills.some(skill => u.learnSkills.includes(skill));
      return canTeach && canLearn;
    });
    res.json({ matches });
  }catch(err){ res.status(500).json({error:err.message}); }
});

module.exports = router;
