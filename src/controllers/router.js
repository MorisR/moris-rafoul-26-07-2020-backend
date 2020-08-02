const express = require("express")
const router = express.Router();

const messagesRoutes = require("./routes/messages")
const authRoutes = require("./routes/auth")
const errorHandlingRoutes = require("./routes/errorHandling")

const requireLogin = require("./middleware/requireLogin")
const requireLoggedOut = require("./middleware/requireLoggedOut")

const loadUserIdFromSession = require("./middleware/loadUserIdFromSession")
const updateSessionExpDate = require("./middleware/updateSessionExpDate")


router.get("/",(req,res)=>
    res.send(`<h1>welcome to the backend!😊😎</h1>
              <h3>more info on how to use the api could be found <a href='https://github.com/MorisR/moris-rafoul-26-07-2020-backend'>here</a>!</h3>`))



router.use(loadUserIdFromSession)
router.use(updateSessionExpDate)



const messagesRouter = express.Router();
messagesRouter.get("/received", messagesRoutes.getReceived)
messagesRouter.get("/sent", messagesRoutes.getSent)
messagesRouter.get("/trash", messagesRoutes.getInTrash)
messagesRouter.post("/",messagesRoutes.addMessage)
messagesRouter.post("/delete/:messageId", messagesRoutes.deleteMessage)
messagesRouter.post("/trash/:messageId/:isTrash",messagesRoutes.setTrashState)
messagesRouter.post("/markAsRead/:messageId/:isRead",messagesRoutes.setMarkAsRead)
messagesRouter.get("/:messageId", messagesRoutes.getMessage)
router.use("/messages",requireLogin, messagesRouter)



const authRouter = express.Router();
authRouter.post("/login",requireLoggedOut,authRoutes.login)
authRouter.get("/currentUser",requireLogin,authRoutes.getCurrentUserData )
authRouter.get("/logout",requireLogin,authRoutes.logout )
authRouter.post("/register",requireLoggedOut,authRoutes.register)
authRouter.post("/deleteAccount",requireLogin,authRoutes.deleteAccount)
router.use("/auth",authRouter)

router.post("/users",requireLogin,authRoutes.getUser)


router.use(errorHandlingRoutes.notFound)
router.use(errorHandlingRoutes.serverError)


module.exports = router;