import React from 'react'
import styled from 'styled-components'
import routes from '../shared/routes'
import { Route, Switch } from 'react-router-dom'
import Nav from './Nav'

const Container = styled.div`
  *, *:before, *:after {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 100;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }
`

class App extends React.Component {
  render() {
    return (
      <Container>
        <Nav />
        <Switch>
         {routes.map(({ path, exact, component: C, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={(props) => (
                <C {...props} {...rest} />
              )}
            />
          ))}
        </Switch>
      </Container>
    )
  }
}

export default App