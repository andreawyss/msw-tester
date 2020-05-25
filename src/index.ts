import { main } from "./main";

async function init() {
  // Setup mock service worker
  const { worker } = require("./api/mocks");

  await worker.start({
    // quiet: true,
  });

  main();
}

init();
