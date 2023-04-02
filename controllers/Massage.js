const router = require("express").Router();
const Massage = require('../models/Message')


//add
router.post('/Massage', async (req, res) => {
    const newMessage = new Massage(req.body)
    try {
        console.log('newMessage',newMessage)
        await newMessage.save();
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/Massage', async (req, res) => {
    console.log('conversation', req.body.Massages[0].conversationId)
    console.log('Massages', req.body.Massages)
    await Massage.deleteMany({ conversationId: req.body.Massages[0].conversationId });
    try {
        await Massage.insertMany(req.body.Massages).then(massages => {
            console.log(massages)
            res.status(200).send(massages)
        })
    } catch (err) {
        res.status(500).json(err)
    }



})
router.get('/Massage/:conversationId', async (req, res) => {
    try {
        const massages = await Massage.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).send(massages)
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;