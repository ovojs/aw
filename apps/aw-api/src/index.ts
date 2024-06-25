import { newApp } from "./pkg/app";
import { init } from "@pkg/init";
import { registerV1_zen } from "./v1/zen";
import { registerV1_keyCreate } from "v1/key.create";

const app = newApp();

app.use("*", init());

registerV1_zen(app);
registerV1_keyCreate(app);

export default app;
