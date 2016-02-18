class ProtipHeart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hearted: false,
      count: this.props.initialCount,
    }
  }

  componentDidMount() {
    const userLikes = JSON.parse($('#signed-in-user-liked-payload').html() || '[]')
    console.log(userLikes)
    if (userLikes.indexOf(this.props.id) > -1) {
      this.setState({hearted: true})
    }
  }

  render() {
    return (
      <Heart count={this.state.count}
             hearted={this.state.hearted}
             onClick={() => this.handleClick()}
             layout={this.props.layout} />
    )
  }

  handleClick() {
    if (this.state.hearted) { return }

    this.setState({
      hearted: true,
      count: this.props.initialCount + 1
    })
    $.ajax({
      url: this.props.href,
      method: 'POST',
      error: () => this.setState({hearted: false, count: this.props.initialCount})
    })
  }
}

ProtipHeart.propTypes = {
  initialCount: React.PropTypes.number,
  protipId: React.PropTypes.string,
}