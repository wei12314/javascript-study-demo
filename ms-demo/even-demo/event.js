listener = {};

function test() {
  console.log("test");
}

listener["hhh"] = [];
listener["hhh"].push(test);
window.addEventListener("click", () => {
  listener["hhh"].forEach((h) => h("123"));
});
