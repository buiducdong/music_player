var playlist = [
  {
      name: 'song1',
      singer: 'singer1',
      path: './assets/music/listsong1/song1.mp3',
      image: './assets/image/music/listimg1/song1.jpg',
  },
  {
      name: 'song2',
      singer: 'singer2',
      path: './assets/music/listsong1/song2.mp3',
      image: './assets/image/music/listimg1/song2.jpg',
  },
  {
      name: 'song3',
      singer: 'singer3',
      path: './assets/music/listsong1/song3.mp3',
      image: './assets/image/music/listimg1/song3.jpg',
  },
  {
      name: 'song4',
      singer: 'singer4',
      path: './assets/music/listsong1/song4.mp3',
      image: './assets/image/music/listimg1/song4.jpg',
  },
  {
      name: 'song5',
      singer: 'singer5',
      path: './assets/music/listsong1/song5.mp3',
      image: './assets/image/music/listimg1/song5.jpg',
  },
  {
      name: 'song6',
      singer: 'singer6',
      path: './assets/music/listsong1/song6.mp3',
      image: './assets/image/music/listimg1/song6.jpg',
  },
  {
      name: 'song7',
      singer: 'singer7',
      path: './assets/music/listsong1/song7.mp3',
      image: './assets/image/music/listimg1/song7.jpg',
  },
  {
      name: 'song8',
      singer: 'singer8',
      path: './assets/music/listsong1/song8.mp3',
      image: './assets/image/music/listimg1/song8.jpg',
  },
  {
      name: 'song9',
      singer: 'singer9',
      path: './assets/music/listsong1/song9.mp3',
      image: './assets/image/music/listimg1/song9.jpg',
  },
  {
      name: 'song10',
      singer: 'singer10',
      path: './assets/music/listsong1/song10.mp3',
      image: './assets/image/music/listimg1/song10.jpg',
  },
];

const PLAYLIST_STORAGE_KEY = 'PLAYLIST';

localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify(playlist));