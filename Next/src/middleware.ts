import { chain } from "./middlewares/Chain"
import { AuthGuard } from "./middlewares/AuthGuard"
export default chain([AuthGuard])