const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  MARKER: 'marker',
  GET_MARKERS: 'getMarkers',
  POST: 'post',
  GET_POST: 'getPost',
  GET_POSTS: 'getPosts',
  FAVORITE: 'favorite',
  GET_FAVORITE_POSTS: 'getFavoritePosts',
  GET_CALENDAR_POSTS: 'getCalendarPosts',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  THEME_MODE: 'themeMode',
  THEME_SYSTEM: 'themeSystem',
  SHOW_LEGEND: 'ShowLegend',
} as const;

export {queryKeys, storageKeys};