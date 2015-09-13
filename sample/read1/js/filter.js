var List = React.createClass({
  render() {
    return (
      <ul>
      {
        this.props.items.map(item => {
          return <li key={item}>{item}</li>
        })
      }
      </ul>
    );
  }
});

var FilteredList = React.createClass({
  filterList(event) {
    var updatedList = this.state.initialItems;

    updatedList = updatedList.filter(item => {
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  },

  getInitialState() {
    return {
      initialItems: [
        'Apples',
        'Broccoli',
        'Chicken',
        'Duck',
        'Eggs',
        'Fish',
        'Granola',
        'Hash Browns'
      ],
      items: []
    };
  },

  componentWillMount() {
    this.setState({items: this.state.initialItems});
  },

  render() {
    return (
      <div className="filter-list">
      <input type="text" placeholder="Search" onChange={this.filterList}/>
      <List items={this.state.items}/>
      </div>
    );
  }
});

React.render(<FilteredList/>, document.getElementById('mount-point'));
