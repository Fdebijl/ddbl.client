// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Menu item signature:
// {
//   text: 'Text to be displayed',
//   url: 'relative url to link to, e.g. /home'
//   query: {
//     // Object with query params that should be appended, e.g:
//     action: 'logout'
//   }
// }
//
// Items in guestMenu will be shown to users not logged in. Items in userMenu will be shown to authenticated user.
// Items in the upper array for each menu will be layed out towards the top of the sidebar, items in lower will be put towards the bottom of the sidebar

export const environment = {
  production: false,
  api_url: 'CHANGE_ME',
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
