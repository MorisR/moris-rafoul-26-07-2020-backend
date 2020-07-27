const express = require("express")
const router = express.Router();

const messagesRoutes = require("./routes/messages")


router.get("/messages/:messageId", messagesRoutes.getMessage)
router.get("/messages/received", messagesRoutes.getReceived)
router.get("/messages/sent", messagesRoutes.getSent)
router.get("/messages/trash",messagesRoutes.getInTrash)
router.post("/messages/delete/:messageId", messagesRoutes.deleteMessage)
router.post("/messages/trash/:messageId/:isTrash",messagesRoutes.setTrashState)











module.exports = router;