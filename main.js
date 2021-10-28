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
const repeatSongBtn = $('.repeat-icon');
const randomSongBtn = $('.random-icon');
const listSong = $('.song-list');
const progressTrackUpdate = $('.progress-track__update');
const durationSong = $('.time-right');
const currentDurationSong = $('.time-left');
const cdThumd = $('.media-left');

const PLAYER_STORAGE_KEY = 'player';

const app = {  
	currentIndex: 0,
	isPlaying:false,
	isRandom:false,
	isRepeat:false,
	config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
	setConfig: function(key, value) {
		this.config[key] = value;
		localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
	},
	duration:["03:03", "03:18", "04:34", "04:21", "03:24", "06:05", "03:56", "03:22", "03:45", "04:15"],
	playlist: JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY) || `[]`),
	render: function() {
			const htmls = this.playlist.map((song, index) => {
				return `
					<li class="song--item ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
						<div class="song--item--section">
							<div class="song--item__detail">
								<div data-imgIndex=${index} class="song--item__thumd">
									<img src="${song.image}" alt="song1" class="song--item__img">
									<div class="actions__icons">
										<ion-icon name="play-circle-outline" class="play"></ion-icon>
										<ion-icon name="pause-circle-outline" class="playing"></ion-icon>
									</div>
								</div>
								<div class="song--item--title">
									<h3 class="song__name">${song.name}</h3>
									<p class="song__singer">${song.singer}</p>
								</div>
							</div>
							<p class="song--item__time">${this.duration[index]}</p>
						</div>
						<div class="song--item__icon">
							<i class='bx bx-heart heart' style="font-size: 2rem;"></i>
							<i class='bx bx-dots-horizontal-rounded option' style="font-size: 2rem;"></i>
						</div>
					</li>
				`
			});
			listSong.innerHTML = htmls.join('');
	},
	defineProperties: function() {
		Object.defineProperty(this, "currentSong", {
			get: function() {
				return this.playlist[this.currentIndex];
			}
		})
	},

	// su ly cac su kien
	handleEvent: function() {
		const _this = this;
		const songItem = $$('.song--item');

		//xu ly cdthumd quay
		const cdThumdAnimation = cdThumd.animate([
			{ transform: "rotate(360deg"}
		], {
			duration: 10000,
			iterations: Infinity
		})

		cdThumdAnimation.pause();

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
			const songPlaying = $('.tab--person--songs.overview .song--item.active');
			player.classList.add('playing');
			cdThumdAnimation.play();

			if($('.tab--person--songs.overview .song--item.playing')) {
				$('.tab--person--songs.overview .song--item.playing').classList.remove('playing');
			}
			songPlaying.classList.add('playing')
		}

		//pauser song
		audio.onpause = function() {
			const songPlaying = $('.tab--person--songs.overview .song--item.active.playing');
			_this.isPlaying = false;
			player.classList.remove('playing');
			cdThumdAnimation.pause();
				songPlaying.classList.remove('playing')
		}

		//xu ly khi bai hat chay
		audio.ontimeupdate = function() {
			if(audio.duration) {
				const progressPersent = Math.floor(this.currentTime / this.duration * 100);
				progress.value = progressPersent;
				progressTrackUpdate.style.width = progressPersent + '%';
				
				//cap nhat thoi gian hien tai cuar bai hat
				let minute = Math.floor(this.currentTime / 60);
				if(minute < 10) {minute = "0"+minute};
				
				let second = Math.round(this.currentTime % 60);
				if(second < 10) {second = "0"+second};
				
				currentDurationSong.textContent = `${minute}:${second}`;
				//render durationsong
				const durationn = Math.round(this.duration);
				let minuteTotal = Math.floor(durationn / 60);
				if(minuteTotal < 10){
					minuteTotal = "0"+minuteTotal;
				}
				let secondTotal = Math.round(durationn % 60);
				if(secondTotal < 10) {
					secondTotal = "0"+secondTotal;
				}
				durationSong.textContent = `${minuteTotal}:${secondTotal}`;
			}
		}

		//xu ly khi tua
		progress.onchange = function(e) {
			audio.currentTime = audio.duration / 100 * e.target.value;
		}

		//xu ly khi next bai hat
		nextSongBtn.onclick = function() {
			if(_this.isRandom) {
				_this.randomSong();
				_this.loadCurrenSong();
			} else {
				_this.nextSong();
			}
			audio.play();
			
			//active cho song dang phat
			const songItem = $$('.song--item');
			$('.song--item.active').classList.remove('active')
			songItem[_this.currentIndex].classList.add('active')

		}

		//xu ly khi prev bai hat
		prevSongBtn.onclick = function() {
			if(_this.isRandom) {
				_this.randomSong();
				_this.loadCurrenSong();
			} else {
				_this.prevSong();
			}
			audio.play();

			//active cho song dang phat
			const songItem = $$('.song--item');
			$('.song--item.active').classList.remove('active')
			songItem[_this.currentIndex].classList.add('active')

			//remove class playing cua baif truowc
			const songPlaying = $('.tab--person--songs.overview .song--item.playing');
			songPlaying.classList.remove('playing')
		}

		//xu ly khi bat/tat button random
		randomSongBtn.onclick = function() {
			_this.isRandom = !_this.isRandom
			_this.setConfig('isRandom', _this.isRandom);
			this.classList.toggle('active', _this.isRandom);
			_this.randomSong();
		}

		//xu ly khi bat button repeat
		repeatSongBtn.onclick = function() {
			_this.isRepeat = !_this.isRepeat
			_this.setConfig("isRepeat", _this.isRepeat);
			this.classList.toggle('active', _this.isRepeat);
		}

		//xu ly khi audio ended
		audio.onended = function() {
			if(_this.isRepeat) {
				audio.play();
			} else {
				nextSongBtn.click();
			}
		}

		//xu ly khi click vao play list
		listSong.onclick = function(e) {
			const nodeElement = e.target.closest('.song--item:not(.active) .song--item__thumd');
			if(nodeElement || e.target.closest('.song--item__icon')) {
				//xu ly khi click vao imgae cua song
				if(nodeElement) {
					_this.currentIndex = nodeElement.getAttribute('data-imgIndex');
					_this.loadCurrenSong();
					audio.play();

					//active cho song dang phat
					const songItem = $$('.song--item');
					$('.song--item.active').classList.remove('active')
					songItem[_this.currentIndex].classList.add('active')
				}

				if(e.target.closest('.song--item__icon')) {
					console.log('chung toi chua hoan thanh chuc nang nay')
				}
			}
		}
		
	},
	loadCurrenSong: function() {

		nameSong.textContent = this.currentSong.name;
		nameSinger.textContent = this.currentSong.singer;
		songImg.src = this.currentSong.image;
		audio.src = this.currentSong.path;
		durationSong.textContent = this.duration[this.currentIndex];
	},
	loadConfig: function() {
		this.isRandom = this.config.isRandom;
		this.isRepeat = this.config.isRepeat;
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
		if(this.currentIndex < 0) {
			this.currentIndex = this.playlist.length - 1;
		}
		this.loadCurrenSong();
	},
	randomSong: function() {
		let newCurrenIndex
		do {
			newCurrenIndex = Math.floor(Math.random() * this.playlist.length)
		} while (newCurrenIndex === this.currentIndex);

		this.currentIndex = newCurrenIndex;
	},
	start: function() {
		//load cau hinhf
		this.loadConfig();

		//Dinh nghia thuocj tinh cho object
		this.defineProperties();

		// xu lys su kien
		this.handleEvent();

		//load thong tin bai hat dau tien
		this.loadCurrenSong();

		//render playlist
		this.render();

		//hien thi trang thai cua playerButton repeat, random
		randomSongBtn.classList.toggle('active', this.isRandom);
		repeatSongBtn.classList.toggle('active', this.isRepeat);
	}

}

app.start();



