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
const progress = $('#progress');
const nextSongBtn = $('.next-icon');
const prevSongBtn = $('.prev-icon');


const app = {  
	currentIndex: 0,
	isPlaying:false,
	playlist: JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY)),
	render: function() {
			const htmls = this.playlist.map(song => {
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
				return this.playlist[this.currentIndex];
			}
		})
	},
	handleEvent: function() {
		const _this = this;
		// xu ly khi click play icon
		playBtn.onclick = function() {
			if(_this.isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
		}
		//song duoc chay
		audio.onplay = function() {
			_this.isPlaying = true;
			player.classList.add('playing');
		}

		//pauser song
		audio.onpause = function() {
			_this.isPlaying = false;
			player.classList.remove('playing');
		}

		//xu ly khi bai hat chay
		audio.ontimeupdate = function() {
			if(audio.duration) {
				const progressPersent = Math.floor(this.currentTime / this.duration * 100);
				progress.value = progressPersent;
			}
		}

		//xu ly khi tua
		progress.onchange = function(e) {
			audio.currentTime = audio.duration / 100 * e.target.value;
		}

		//xu ly khi next bai hat
		nextSongBtn.onclick = function() {
			_this.nextSong();
			audio.play();
		}

		//xu ly khi prev bai hat
		prevSongBtn.onclick = function() {
			_this.prevSong();
			audio.play();
		}
		
	},
	loadCurrenSong: function() {

		nameSong.textContent = this.currentSong.name;
		nameSinger.textContent = this.currentSong.singer;
		songImg.src = this.currentSong.image;
		audio.src = this.currentSong.path;
	},
	nextSong: function() {
		this.currentIndex++;
		if(this.currentIndex >= this.playlist.length) {
			this.currentIndex = 0;
		}
		this.loadCurrenSong();
	},
	prevSong: function() {
		this.currentIndex--;
		if(this.currentIndex <= 0) {
			this.currentIndex = this.playlist.length - 1;
		}
		this.loadCurrenSong();
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



