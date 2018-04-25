import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Text = styled.p`
  font-size: 2.4rem;
  font-weight: 200;
`

class PageOne extends React.Component {
  render() {
    __isBrowser__ ? console.log(this.props.data, 'browser') : console.log(this.props.data, 'server')

    return (
      <Text>{this.props.data}</Text>
    )
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  }
}

export default connect(mapStateToProps)(PageOne)