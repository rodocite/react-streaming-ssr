import React from 'react'
import styled from 'styled-components'
import routes from '../shared/routes'
import { Route, Switch } from 'react-router-dom'
import NoMatch from './404'
import Nav from './Nav'

const Container = styled.div`
  padding: 1.4rem;

  *, *:before, *:after {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.5;
    margin: 0;
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
          <Route render={(props) => <NoMatch {...props} />} />
        </Switch>
      </Container>
    )
  }
}

export default App