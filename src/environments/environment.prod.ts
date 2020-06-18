export const environment = {
  production: true,
  api_url: 'https://vll.floris.amsterdam',
  guestMenu: {
    upper: [
      {
        text: 'Home',
        url: '/home'
      }
    ],
    lower: [
      {
        text: 'Login',
        url: '/login'
      },
      {
        text: 'Register',
        url: '/register'
      }
    ]
  },
  userMenu: {
    upper: [
      {
        text: 'Home',
        url: '/home'
      },
      {
        text: 'Profile',
        url: '/user/me'
      },
      {
        text: 'Settings',
        url: '/settings'
      },
      {
        text: 'Upload',
        url: '/upload'
      }
    ],
    lower: [
      {
        text: 'Logout',
        url: '/login',
        query: {
          action: 'logout'
        }
      }
    ]
  }
};
