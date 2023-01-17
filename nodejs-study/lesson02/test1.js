// konw blocking or not bloking
// common program language is bloking process such as : java php .net ruby
// but node.js is not bloking so this demo is to let me konw what is not-bloking

// a imitate update database demo
function updb1() {
  let start = new Date().getTime();
  while (new Date().getTime() < start + 3000);
}

updb1();
//update database end
console.log("updb1 success.");
