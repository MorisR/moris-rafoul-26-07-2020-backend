const express = require("express")
const router = express.Router();

const messagesRoutes = require("./routes/messages")


router.get("/messages/received", messagesRoutes.getReceived)
router.get("/messages/sent", messagesRoutes.getSent)
router.route("/messages/trash")
    .get(messagesRoutes.getInTrash)










module.exports = router;