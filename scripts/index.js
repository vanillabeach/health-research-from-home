class HealthDataGatewayPrototype {
  constructor() {
    const pageId = document.body.getAttribute("id");

    if (pageId === undefined) {
      throw Error("pageId cannot be found");
    }

    switch (pageId) {
      case "collection":
        new CollectionScreen();
        break;

      default:
        console.log("pageId cannot be found");
    }
  }
}

(function () {
  new HealthDataGatewayPrototype();
})();
