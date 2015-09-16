var React           = require('react'),
    FluxCartActions = require('../actions/FluxCartActions');

// Flux product view
var FluxProduct = React.createClass({

  // Add item to cart via Actions
  addToCart(event) {
    var sku = this.props.selected.sku,
        update = {
          name: this.props.product.name,
          type: this.props.selected.type,
          price: this.props.selected.price
        };

    FluxCartActions.addToCart(sku, update);
    FluxCartActions.updateCartVisible(true);
  },

  // Select product variation via Actions
  selectVariant(event) {
    FluxCartActions.selectProduct(event.target.value);
  },

  // Render product View
  render() {
    var props = this.props;

    var ats = (props.selected.sku in props.cartitems) ?
        props.selected.inventory - props.cartitems[props.selected.sku].quantity :
        props.selected.inventory;

    return (
      <div className="flux-product">
        <img src={"img/" + props.product.image}/>
        <div className="flux-product-detail">
          <h1 className="name">{props.product.name}</h1>
          <p className="description">{props.product.description}</p>
          <p className="price">{props.product.price}</p>
          <select onChange={this.selectVariant}>
          {props.product.variants.map((variant, index) => {
            return (
              <option key={index} value={index}>{variant.type}</option>
            );
          })}
          </select>
          <button type="button" onClick={this.addToCart} disabed={ats > 0 ? '' : 'disabed'}>
            {ats > 0 ? 'Add To Cart' : 'Sold Out'}
          </button>
        </div>
      </div>
    );
  }
});

module.exports = FluxProduct;
