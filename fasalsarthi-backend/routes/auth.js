import exp from "express";
const Express = exp;
import {
	getOTP,
	getService,
	setService,
	signin,
	signup,
	updatePassword,
} from "../controller/auth.js";
const router = Express.Router();

router.post("/signup", signup);
router.post("/login", signin);
router.post("/get-otp", getOTP);
router.post("/password/update", updatePassword);
router.get("/service/get", getService);
router.post("/service/set", setService);

export default router;
