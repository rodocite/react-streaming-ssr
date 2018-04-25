import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: blue;
  color: white;
`

class PageTwo extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <Container>Page Two</Container>
    )
  }
}

export default PageTwo