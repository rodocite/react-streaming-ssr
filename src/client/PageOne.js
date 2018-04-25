import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  font-size: 2.4rem;
  font-weight: 200;
`

class PageOne extends React.Component {
  constructor(props) {
    super(props)

    let data

    if (__isBrowser__) {
      data = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      data = props.staticContext.data
    }

    this.state = {
      data
    }
  }

  componentDidMount() {
    this.props.getInitialProps()
      .then(data => {
        this.setState({ data })
      })
  }

  render() {
    return (
      <Text>{this.state.data}</Text>
    )
  }
}

PageOne.getInitialProps = () => Promise.resolve(1)


export default PageOne