import React from 'react'
import styled from 'styled-components'

const Text = styled.p`
  font-size: 2.4rem;
  font-weight: 200;
`

class PageOne extends React.Component {
  render() {
    return (
      <Text>Page One</Text>
    )
  }
}

export default PageOne