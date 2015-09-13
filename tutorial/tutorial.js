var CommentBox = React.createClass({
  loadCommentsFromServer () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false
    })
    .done(data => {
      this.setState({data: data});
    })
    .error((xhr, status, err) => {
      console.error(this.props.url, status, err);
    });
  },

  handleCommentSubmit (comment) {
    console.log(comment);
  },

  getInitialState () {
    return { data: [] };
  },

  componentDidMount () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render () {
    return (
      <div className="commentBox">
        <h3>Comments</h3>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render () {
    var commentNodes = this.props.data.map(comment => {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit (e) {
    var domNode = React.findDOMNode,
        author,
        text;

    e.preventDefault();

    author = domNode(this.refs.author).value.trim();
    text   = domNode(this.refs.text).value.trim();

    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({author: author, text: text});
    domNode(this.refs.author).value = '';
    domNode(this.refs.text).value = '';

    return;
  },

  render () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var Comment = React.createClass({
  render () {
    var rawMarkup = marked(this.props.children.toString());

    return (
      <div className="comment">
        <h4 className="commentAuthor">
          {this.props.author}
        </h4>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}}></span>
      </div>
    );
  }
});

React.render(
  <CommentBox url="./comments.json"  pollInterval={2000} />,
  document.getElementById('content')
);
