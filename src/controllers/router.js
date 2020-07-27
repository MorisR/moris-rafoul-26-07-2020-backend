const express = require("express")
const router = express.Router();

const messagesRoutes = require("./routes/messages")


router.get("/messages/received", messagesRoutes.getReceived)
router.get("/messages/sent", messagesRoutes.getSent)
router.post("/messages/delete/:messageId", messagesRoutes.deleteMessage)
router.get("/messages/trash",messagesRoutes.getInTrash)
router.post("/messages/trash/:messageId/:isTrash",messagesRoutes.setTrashState)











module.exports = router;