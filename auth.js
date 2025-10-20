const express = require('express');
const User = require('../models/user');

module.exports = (upload)=>{
  const router = express.Router();

  router.post('/register', upload.fields([
    { name: 'profilePic', maxCount:1 },
    { name: 'certificates', maxCount:5 }
  ]), async (req,res)=>{
    try{
      const { name,email,password,teachSkills,learnSkills } = req.body;
      const profilePic = req.files['profilePic'] ? req.files['profilePic'][0].path : null;
      const certificates = req.files['certificates'] ? req.files['certificates'].map(f=>f.path) : [];
      const user = new User({ name,email,password,teachSkills: teachSkills.split(','), learnSkills: learnSkills.split(','), profilePic, certificates });
      await user.save();
      res.json({ success:true, user });
    }catch(err){ res.status(500).json({ success:false, error:err.message }); }
  });

  return router;
}
