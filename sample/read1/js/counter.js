var Counter = React.createClass({
  incrementCount() {
    this.setState({
      count: this.state.count + 1
    });
  },

  decrementCount() {
    var count = this.state.count;

    if (count === 0) {
      return;
    }

    this.setState({
      count: count - 1
    });
  },

  getInitialState() {
    return {
      count: 0
    }
  },

  render() {
    return (
      <div className="counter">
      <h1>Count: {this.state.count}</h1>
      <button type="button" className="add" onClick={this.incrementCount}>Increment</button>
      <button type="button" className="sub" onClick={this.decrementCount}>Decrement</button>
      </div>
    );
  }
});

React.render(
  <Counter/>,
  document.getElementById('mount-point')
);
