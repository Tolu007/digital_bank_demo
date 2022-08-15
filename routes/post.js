const express = require('express');
const router = express.Router();
const users = require('../models/userSchema');

// //GETS BACK ALL THE POSTS
// router.get('/', async (req, res) => {
//     try {
//         const posts = await user.find();
//         res.json({ reponse: "ok" });
//     } catch (err) {
//         res.json({ message: err });
//     }
// });
// const updateFromTransfer = await fromUser.updateOne({ number: fromAccount }, { $set: { balance: fromNewAmount } });
//         const updateToHistory = await toUser.updateOne({ number: toAccount }, {
//             $push: {
//                 "transactions": {
//                     "type": "credit",
//                     "amount": amount,
//                     "fromAccount": fromAccount,
//                     "toAccount": toAccount,
//                     "description": description
//                 }
//             }
//         });
//         const updateFromHistory = await fromUser.updateOne({ number: fromAccount }, {
//             $push: {
//                 "transactions": {
//                     "type": "debit",
//                     "amount": amount,
//                     "fromAccount": fromAccount,
//                     "toAccount": toAccount,
//                     "description": description
//                 }
//             }
//         });
//         res.send(updateToTransfer);


//DELETE SPECIFIC POST
router.delete('/:postId', async (req, res) => {
    try {
        const removedPosts = await user.deleteOne({ _id: req.params.postId });
        res.json(removedPosts);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;