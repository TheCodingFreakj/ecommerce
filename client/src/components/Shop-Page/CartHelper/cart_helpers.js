//https://github.com/kaloraat/ecommerce
//https://github.com/kaloraat/ecommerce-front

// // it contains
// // ["sumit","amit","anil","anish"]
// var set1 = new Set(["sumit","sumit","amit","anil","anish"]);

// // it contains 'f', 'o', 'd'
// var set2 = new Set("fooooooood");

// // it contains [10, 20, 30, 40]
// var set3 = new Set([10, 20, 30, 30, 40, 40]);

//  // it is an  empty set
// var set4 = new Set();

// console.log(Array.from('foo'));
// // expected output: Array ["f", "o", "o"]

// console.log(Array.from([1, 2, 3], x => x + x));
// // expected output: Array [2, 4, 6]

export const addItem = (product, quant) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({
      product,
      quant,
    });

    // let nonduplicate = new Set(cart.map((p) => p.id));
    // console.log(nonduplicate);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};


//https://github.com/kaloraat/ecommerce
//https://github.com/kaloraat/ecommerce-front
//https://stackoverflow.com/questions/55366389/prevent-duplicate-products-to-be-removed-from-cart
