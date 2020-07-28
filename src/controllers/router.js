const express = require("express")
const router = express.Router();

const messagesRoutes = require("./routes/messages")
const authRoutes = require("./routes/auth")


router.get("/messages/received", messagesRoutes.getReceived)
router.get("/messages/sent", messagesRoutes.getSent)
router.get("/messages/trash",messagesRoutes.getInTrash)
router.post("/messages",messagesRoutes.addMessage)
router.post("/messages/delete/:messageId", messagesRoutes.deleteMessage)
router.post("/messages/trash/:messageId/:isTrash",messagesRoutes.setTrashState)
router.get("/messages/:messageId", messagesRoutes.getMessage)


router.post("/auth/login",authRoutes.login)
router.get("/auth/currentUser",authRoutes.getCurrentUserData )
router.get("/auth/logout",authRoutes.logout )









module.exports = router;