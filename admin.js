const orderDetail = document.querySelector(".order_detail");

//種類: 服飾配件、飾品、鞋子、雜貨

//fake data
const orderData = [
  {
    orderId: "Float111",
    name: "阿偉",
    tel: "0977888999",
    address: "高雄市小港區鴻星二路7號",
    email: "weiexample@gmail.com",
    products: [
      { category: "服飾配件", itemName: "牛仔外套", quantity: 1, price: 250 },
      { category: "服飾配件", itemName: "棒球帽", quantity: 1, price: 100 },
      { category: "雜貨", itemName: "牛皮短夾", quantity: 1, price: 120 },
    ],
    orderDate: "2022/6/6",
    orderStatus: "未處理",
  },
  {
    orderId: "Float222",
    name: "金田",
    tel: "0977888999",
    address: "臺南市新化區民權街11號",
    email: "weiexample@gmail.com",
    products: [
      { category: "飾品", itemName: "平打戒指", quantity: 2, price: 100 },
      { category: "服飾配件", itemName: "棒球帽", quantity: 1, price: 100 },
    ],
    orderDate: "2022/7/7",
    orderStatus: "未處理",
  },
  {
    orderId: "Float333",
    name: "馬詩客",
    tel: "0977888999",
    address: "台北市中山區林森北路66號",
    email: "weiexample@gmail.com",
    orderDate: "2022/8/8",
    products: [
      { category: "服飾配件", itemName: "羽絨外套", quantity: 2, price: 300 },
      { category: "服飾配件", itemName: "高領毛衣", quantity: 2, price: 150 },
    ],
    orderStatus: "未處理",
  },
];

//
const renderData = () => {
  let str = "";

  orderData.forEach((item) => {
    let productsStr = "";
    item.products.map((item) => {
      productsStr += `${item.itemName}*${item.quantity}</br>`;
    });
    str += `<tr>
        <td class="border border-black px-2">${item.orderId}</td>
        <td class="border border-black px-2">
          <p>${item.name}</p>
          <p>${item.tel}</p>
        </td>
        <td class="border border-black px-2">
          ${item.address}
        </td>
        <td class="border border-black px-2">weiexample@gmail.com</td>
        <td class="border border-black px-2">
          <p>${productsStr}</p>
        </td>
        <td class="border border-black px-2">${item.orderDate}</td>
        <td class="orderStatus border border-black p-3 px-2">
          <a href="#">${item.orderStatus}</a>
        </td>
        <td class="border border-black px-2">
          <button class="delet-Order-Btn rounded-sm text-gray-100 bg-red-700 hover:bg-orange-600 px-2 py-1 ml-5">刪除</button>
        </td>
      </tr>`;
  });
  orderDetail.innerHTML = str;
};

renderData();

//依產品營業額排序，第４名後全部加總到其他
const sortProductData = (products) => {
  products.sort((a, b) => b[1] - a[1]);

  let otherIncome = 0;
  if (products.length > 3) {
    products.map((item, index) => {
      if (index > 2) {
        otherIncome += products[index][1];
      }
    });
    products.splice(3, products.length - 3);
    products.push(["其他", otherIncome]);
  }
};

// 全品項營收比重圓餅圖
const getProductChart = () => {
  const productObj = {};
  orderData.map((item) => {
    item.products.map((item) => {
      if (productObj[item.itemName] === undefined) {
        productObj[item.itemName] = item.price * item.quantity;
      } else {
        productObj[item.itemName] += item.price * item.quantity;
      }
    });
  });

  const productKeys = Object.keys(productObj);
  const newProduct = [];
  productKeys.map((item) => {
    const ary = [];
    ary.push(item);
    ary.push(productObj[item]);
    newProduct.push(ary);
  });

  //排序產品營業額
  sortProductData(newProduct);
  //畫出圖表
  const productChart = c3.generate({
    bindto: "#productChart",
    size: {
      height: 400,
      width: 350,
    },
    data: {
      columns: newProduct,
      type: "pie",
    },
    color: {
      pattern: ["#ede0d4", "#e6ccb2", "#ddb892", "#b08968"],
    },
  });
};

getProductChart();

//全產品類別營收比重圓餅圖
const getCategoryChart = () => {
  const categoryObj = {};
  orderData.map((item) => {
    item.products.map((product) => {
      if (categoryObj[product.category] === undefined) {
        categoryObj[product.category] = product.price * product.quantity;
      } else {
        categoryObj[product.category] += product.price * product.quantity;
      }
    });
  });
  const categoryKeys = Object.keys(categoryObj);
  const newCategory = [];
  categoryKeys.map((item) => {
    const ary = [];
    ary.push(item);
    ary.push(categoryObj[item]);
    newCategory.push(ary);
  });
  //排序類別營業額
  sortProductData(newCategory);
  //畫出圖表
  const categoryChart = c3.generate({
    bindto: "#categoryChart",
    size: {
      height: 400,
      width: 350,
    },
    data: {
      columns: newCategory,
      type: "pie",
    },
    color: {
      pattern: ["#d8e2dc", "#a9d6e5", "#a1cca5", "#fff3b0"],
    },
  });
};

getCategoryChart();
