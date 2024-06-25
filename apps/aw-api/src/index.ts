import { newApp } from "./app";
import { init } from "./init";
import { registerV1Zen } from "./v1/zen";

const app = newApp();

app.use("*", init());

registerV1Zen(app);

export default app;
