import PageOne from '../client/PageOne'
import PageTwo from '../client/PageTwo'

const routes =  [
  {
    path: '/pageOne',
    exact: true,
    component: PageOne
  },
  {
    path: '/pageTwo',
    exact: true,
    component: PageTwo
  }
]

export default routes