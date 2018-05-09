//jsonの要素数
var data = {
  "商品": {
    "バナナ": {
      "単価": 100,
      "個数": 3
    },
    "ぶどう": {
      "単価": 200,
      "個数": 2
    }
  }
};

console.log(data['商品'].length); //undefined
console.log(Object.keys(data['商品']).length);
