var React        = require('react'),
    CartStore    = require('../stores/CartStore'),
    ProductStore = require('../stores/ProductStore'),
    FluxProduct  = require('./FluxProduct.react.jsx'),
    FluxCart     = require('./FluxCart.react.jsx');

// Method to retrieve state from Stores
function getCartState() {
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
    return getCartState();
  },

  // Add change listeners to stores
  componentDidMount() {
    ProductStore.addChangeListener(this._onChange);
    CartStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount() {
    ProductStore.removeChangeListener(this._onChange);
    CartSto.removeChangeListener(this._onChange);
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
    this.setState(getCartState());
  }

});

module.exports = FluxCartApp;
