const express = require("express")
const router = express.Router();

const messagesRoutes = require("./routes/messages")
const authRoutes = require("./routes/auth")
const requireLogin = require("./middleware/requireLogin")
const loadUserIdFromSession = require("./middleware/loadUserIdFromSession")
const updateSessionExpDate = require("./middleware/updateSessionExpDate")


router.use(loadUserIdFromSession)
router.use(updateSessionExpDate)


const messagesRouter = express.Router();
messagesRouter.get("/received", messagesRoutes.getReceived)
messagesRouter.get("/sent", messagesRoutes.getSent)
messagesRouter.get("/trash", messagesRoutes.getInTrash)
messagesRouter.post("/",messagesRoutes.addMessage)
messagesRouter.post("/delete/:messageId", messagesRoutes.deleteMessage)
messagesRouter.post("/trash/:messageId/:isTrash",messagesRoutes.setTrashState)
messagesRouter.get("/:messageId", messagesRoutes.getMessage)
router.use("/messages",requireLogin, messagesRouter)



const authRouter = express.Router();
authRouter.post("/login",authRoutes.login)
authRouter.get("/currentUser",requireLogin,authRoutes.getCurrentUserData )
authRouter.get("/logout",authRoutes.logout )
authRouter.post("/register",authRoutes.register)
router.use("/auth",authRouter)



module.exports = router;