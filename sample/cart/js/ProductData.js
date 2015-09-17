module.exports = {
  // Load Mock Product Data Into localStorage
  init() {
    localStorage.clear();
    localStorage.setItem('product', JSON.stringify([
      {
        id: '0011001',
        name: 'Anco',
        image: 'anco.png',
        description: "This is Anco's Maximin Liebkne",
        variants: [
          {
            sku: '123123',
            type: 'test1',
            price: 4.99,
            inventory: 1
          }, {
            sku: '123124',
            type: 'test2',
            price: 12.99,
            inventory: 5
          }, {
            sku: '123125',
            type: 'test3',
            price: 19.99,
            inventory: 3
          }
        ]
      }
    ]));
  }
};
