import { chain } from "./middlewares/Chain"
import { AuthGuard } from "./middlewares/AuthGuard"
import { PremiumGuard } from "./middlewares/PremiumGuard"

export default chain([AuthGuard, PremiumGuard])