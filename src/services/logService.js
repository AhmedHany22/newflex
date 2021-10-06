import Raven from "raven-js";

export function init() {
  Raven.config(
    "https://6d04d3995e2a449ea8765434fa40fdfc@o1025941.ingest.sentry.io/5992418",
    { release: "1-0-0", environment: "development-test" }
  ).install();
}
export function log(error) {
  Raven.captureException(error);
}
export default { init, log };
