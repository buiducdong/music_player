const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const btnTogleSidebar = $('.togle-sidebar');
const sidebar = $('.app__sidebar');
const headerApp = $('.app__header');

const tabSidebars = $$('.nav__list-item');
const tabContainers = $$('.app__container');

const tabPersonSong = $$('.tab__song-item');
const tabPersonSongContainer = $$('.tab--person--songs')

// toggle sidebar
btnTogleSidebar.onclick = function() {
    sidebar.classList.toggle("change");
}

// scroll content
tabContainers.forEach((appContent, index) => {
    appContent.addEventListener("scroll", function() {
        headerApp.classList.toggle("sticky", appContent.scrollTop > 1);
    })
})

// tab sidebar
tabSidebars.forEach((tab, index) => {
    const tabContent = tabContainers[index];
    tab.onclick = function () {
        $('.nav__list-item.active').classList.remove('active');
        $('.app__container.active').classList.remove('active');
        this.classList.add('active');
        tabContent.classList.add('active');
    }
});

// tab song person
tabPersonSong.forEach((tab, index) => {
    const tabContentSong = tabPersonSongContainer[index];
    tab.onclick = function () {
        $('.tab__song-item.active').classList.remove('active');
        $('.tab--person--songs.active').classList.remove('active');
        this.classList.add('active');
        tabContentSong.classList.add('active');
    }
});

// handle playlist
	const nameSong = $('.song-name');
	const nameSinger = $('.singer-name');
	const songImg = $('.song-img');
	const audio = $('#audio');
	const player = $('.player-bar__actions');
	const playBtn = $('.toggle-play');
const app = {  
	currentIndex: 0,
	isPlaying:false,
	songs: [
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
					name: 'song1',
					singer: 'singer1',
					path: './assets/music/listsong1/song1.mp3',
					image: './assets/image/music/listimg1/song1.jpg',
			},
			{
					name: 'song1',
					singer: 'singer1',
					path: './assets/music/listsong1/song1.mp3',
					image: './assets/image/music/listimg1/song1.jpg',
			},
			{
					name: 'song1',
					singer: 'singer1',
					path: './assets/music/listsong1/song1.mp3',
					image: './assets/image/music/listimg1/song1.jpg',
			},
			{
					name: 'song1',
					singer: 'singer1',
					path: './assets/music/listsong1/song1.mp3',
					image: './assets/image/music/listimg1/song1.jpg',
			},
			{
					name: 'song1',
					singer: 'singer1',
					path: './assets/music/listsong1/song1.mp3',
					image: './assets/image/music/listimg1/song1.jpg',
			},
	],
	render: function() {
			const htmls = this.songs.map(song => {
				return `
					<li class="song--item">
						<div class="song--item--section">
							<div class="song--item__detail">
								<img src="${song.image}" alt="song1" class="song--item__img">
								<div class="song--item--title">
									<h3 class="song__name">${song.name}</h3>
									<p class="song__singer">${song.singer}</p>
								</div>
							</div>
							<p class="song--item__time">04:35</p>
						</div>
						<div class="song--item__icon">
							<p>heart</p>
							<p>...</p>
						</div>
					</li>
				`
			});
			$('.song-list').innerHTML = htmls.join('');
	},
	defineProperties: function() {
		Object.defineProperty(this, "currentSong", {
			get: function() {
				return this.songs[this.currentIndex];
			}
		})
	},
	handleEvent: function() {
		const _this = this;
		// xu ly khi click play icon
		playBtn.onclick = function() {
			if(_this.isPlaying) {
				_this.isPlaying = false;
				audio.pause();
				player.classList.remove('playing');
			} else {

				_this.isPlaying = true;
				audio.play();
				player.classList.add('playing');
			}
		}


	},
	loadCurrenSong: function() {

		nameSong.textContent = this.currentSong.name;
		nameSinger.textContent = this.currentSong.singer;
		songImg.src = this.currentSong.image;
		audio.src = this.currentSong.path;
	},
	start: function() {
		//Dinh nghia thuocj tinh cho object
		this.defineProperties();

		// xu lys su kien
		this.handleEvent();

		//load thong tin bai hat dau tien
		this.loadCurrenSong();

		//render playlist
		this.render();
	}

}

app.start();



