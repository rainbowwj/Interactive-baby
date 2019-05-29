/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: 'noRedirect',
  name: 'User',
  meta: {
    title: 'User',
    icon: 'chart'
  },
  children: [
    {
      path: 'userlist',
      component: () => import('@/views/user/userlist'),
      name: 'Userlist',
      meta: { title: 'Userlist', noCache: true }
    },
    {
      path: 'userviplist',
      component: () => import('@/views/user/userviplist'),
      name: 'Userviplist',
      meta: { title: 'Userviplist', noCache: true }
    }
  ]
}

export default userRouter
