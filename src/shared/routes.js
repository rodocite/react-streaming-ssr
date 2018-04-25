import PageOne from '../client/PageOne'
import PageTwo from '../client/PageTwo'

const routes =  [
  {
    path: '/pageOne',
    exact: true,
    component: PageOne,
    getInitialProps: () => Promise.resolve(2)
  },
  {
    path: '/pageTwo',
    exact: true,
    component: PageTwo
  }
]

export default routes