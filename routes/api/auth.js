const express = require("express");
const { validateBody } = require("../../helpers/validateBody");
const {
  schemas: { regisSchema, authSchema, emailSchema },
} = require("../../models/user");

const {
  registration,
  authorization,
  getCurrentUser,
  logout,
  subscriptionUpdate,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/index");
const { authenticate } = require("../../middlewares/authenticate");
const { upload } = require("../../middlewares/upload");

const router = express.Router();

router.post("/register", validateBody(regisSchema), registration);
router.post("/login", validateBody(authSchema), authorization);
router.post("/logout", authenticate, logout);
router.post("/verify", validateBody(emailSchema), resendVerifyEmail);

router.get("/current", authenticate, getCurrentUser);
router.get("/verify/:verificationToken", verifyEmail);

router.patch("/", authenticate, subscriptionUpdate);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
