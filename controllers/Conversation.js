const router = require("express").Router();
const Conversation = require('../models/Conversation')
const Massage = require('../models/Message')
//new conversation

router.post('/conversation', async (req, res) => {
    const newConverstion = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        await newConverstion.save();
    } catch (err) {
        res.status(500).json(err)
    }
    res.redirect('/');
})

router.get('/conversation/:userId', async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        
        res.status(200).json(conversation)
    } catch (err) {
        res.status(200).json(err)
    }
})

router.get('/conversation',async (req, res) => {
    try {
       await Conversation.find({}).then((data) => {
            res.status(200).send(data)
            console.log(data)
        })
    } catch (err) {
        res.status(500).json(err)
    }
})





//get conversation a user

//db.inventory.deleteMany({status:'D'})

router.delete("/Deleteconversation/:id", async (req, res) => {

    console.log(req.params.id)
    const id = req.params.id;
    
    Conversation.findByIdAndRemove({ _id: id }).then(await Massage.deleteMany({conversationId:id}))
      .then((results) => {
        res.status(200).json(results).redirect('/');
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
    res.redirect('/');
  });


module.exports = router;