/** When your routing table is too long, you can split it into small modules**/

/**
 * asyncRoutes
 * 图书馆管理路由
 */
import Layout from '@/layout'
const LibraryRouter = {
  path: '/administrator',
  component: Layout,
  alwaysShow: true, // will always show the root menu
  name: 'Administrator',
  redirect: '/administrator/library',
  meta: {
    title: 'Administrator',
    icon: 'component',
  },
  children: [
    {
      path: 'library',
      component: () => import('@/views/Administrator/library/library'),
      name: 'library',
      meta: {
        title: 'library'
      }
    },
    {
      path: 'communityLibrariesList',
      component: () => import('@/views/Administrator/community/communityLibrariesList'),
      name: 'communityLibrariesList',
      meta: {
        title: 'communityLibrariesList'
      }
    },
    {
      path: 'editcommunityLibraries/:id(\\d+)',
      component: () => import('@/views/Administrator/community/editcommunityLibraries'),
      name: 'editcommunityLibraries',
      meta: { title: 'editcommunityLibraries', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'LibraryAudit',
      component: () => import('@/views/Administrator/community/Libraryaudit'),
      name: 'LibraryAudit',
      meta: { title: 'LibraryAudit', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'setFloorPrice',
      component: () => import('@/views/Administrator/setfloorprice'),
      name: 'setFloorPrice',
      meta: {
        title: 'setFloorPrice'
      }
    },
    {
      path: 'addSetFloorPrice',
      component: () => import('@/views/Administrator/setfloorprice/add'),
      name: 'addSetFloorPrice',
      meta: { title: 'addSetFloorPrice', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'addlibrary',
      component: () => import('@/views/Administrator/library/addLibrary'),
      name: 'libraryedit',
      meta: { title: 'libraryedit', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'editlibrary/:id(\\d+)',
      component: () => import('@/views/Administrator/library/editLibary'),
      name: 'editlibrary',
      meta: { title: 'editlibrary', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'vip/:id(\\d+)',
      component: () => import('@/views/Administrator/library/vip'),
      name: 'vip',
      meta: { title: 'vip', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'addVip',
      component: () => import('@/views/Administrator/library/addvip'),
      name: 'addVip',
      meta: { title: 'addVip', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'schoolbag/:id(\\d+)',
      component: () => import('@/views/Administrator/library/schoolbag'),
      name: 'schoolbag',
      meta: { title: 'schoolbag', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'Addschoolbag',
      component: () => import('@/views/Administrator/library/addschoolbag'),
      name: 'Addschoolbag',
      meta: { title: 'Addschoolbag', noCache: true, activeMenu: '/example/list' },
      hidden: true
    },
    {
      path: 'Bulkimport',
      component: () => import('@/views/Administrator/library/bulkimport'),
      name: 'Bulkimport',
      meta: { title: 'Bulkimport', noCache: true, activeMenu: '/example/list' },
      hidden: true
    }
  ]
}

export default LibraryRouter
