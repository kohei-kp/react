window.React = require('react');

var ProductData = require('./ProductData'),
    CartAPI     = require('./utils/CartAPI'),
    FluxCartApp = require('./components/FluxCartApp.react');

// Load Mock Product Data into localStorage
ProductData.init();

// Load Mock API Call
CartAPI.getProductData();

// Render FluxCartApp Controller view
React.render(
  <FluxCartApp />,
  document.getElementById('flux-cart')
);
