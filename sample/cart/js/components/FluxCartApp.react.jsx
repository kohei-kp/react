var React        = require('react'),
    CartStpre    = require('../stores/CartStore'),
    ProductStore = require('../stores/ProductStore'),
    FluxProduct  = require('./FluxProduct.react.jsx'),
    FluxCart     = require('./FluxCart.react.jsx');

// Method to retrieve state from Stores
function getCartStore() {
  return {
    product: ProductStore.getProduct(),
    selectedProduct: ProductStore.getSelected(),
    cartItems: CartStore.getCartItems(),
    cartCount: CartStore.getCartCount(),
    cartTotal: CartStore.getCartTotal(),
    cartVisible: CartStore.getCartVisible()
  };
}

// Define main COntroller View
var FluxCartApp = React.createClass({

  // Get initial state from stores
  getInitialState() {
    return getCartStore();
  },

  // Add change listeners to stores
  componentDidMound() {
    ProductStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render() {
    return (
      <div className="flux-cart-app">
        <FluxCart products={this.state.cartItems} count={this.state.cartCount} total={this.state.cartTotal} visible={this.state.cartVisible} />
        <FluxProduct product={this.state.product} cartitems={this.state.cartItems} selected={this.state.selectedProduct} />
      </div>
    );
  },

  // Method to setState based upon Store change
  _onChange() {
    this.setState(getCartStore());
  }

});

module.exports = FluxCartApp;
