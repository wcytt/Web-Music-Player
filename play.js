var log = console.log.bind(console, '***警告***')

var e = function(sel) {
    return document.querySelector(sel)
}

var es = function(sel) {
    return document.querySelectorAll(sel)
}

var appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var toggleClass = function(element, className) {
    if(element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var find = function(element, selector) {
    return element.querySelector(selector)
}

var findAll = function(element, sel) {
    return element.querySelectorAll(sel)
}


var playMusic = function() {
    var music = e('#audio-player')
    music.play()
}

var stopMusic = function() {
    var music = e('#audio-player')
    music.pause()
}

var changeProgress = function() {
    var music = e('#audio-player')
    music.changeProgress = true
    music.current = 0
    var progressSection = e('#progress')
    var duration = e('#duration')
  	var d = event.clientX - progressSection.offsetLeft
  	var width = duration.offsetLeft - progressSection.offsetLeft
  	if(d <= 0) {
  		  d = 0
  	}
  	if(d >= width) {
  		  d = width - 1
  	}
  	var len = Math.floor(d * 100 / width)
  	var duration = music.duration
  	var currentTime = music.currentTime
  	music.current = duration * len / 100
  	setProgress(len)
}

var endChangeProgress = function() {
  	var music = e('#audio-player')
  	if(music.changeProgress == true) {
  		  music.currentTime = music.current
  	}
  	music.changeProgress = false
}

var bindEventProgress = function(pointer, classback, endCallback) {
  	var body = e('body')
   	pointer.move = false
  	bindEvent(pointer, 'mousedown', function() {
  		  pointer.move = true
  	})
  	bindEvent(body, 'mousemove', function(e) {
    		if(pointer.move == true) {
    			  classback(e)
    		}
  	})
  	bindEvent(body, 'mouseup', function() {
    		pointer.move = false
    		if(endCallback != undefined) {
    			  endCallback()
    		}
  	})
  	bindEvent(body, 'mouseleave', function() {
    		pointer.move = false
    		if(endCallback != undefined) {
    			  endCallback()
    		}
  	})
}

var bindEventPlayProgress = function() {
    var pointer = e('#music-progress-point')
    bindEventProgress(pointer, changeProgress, endChangeProgress)
}

var time = function(t) {
    var sec = Math.floor(t % 60)
    var min = Math.floor(t / 60)
    if(sec < 10) {
        sec = '0' + sec
    }
    if(min < 10) {
        min = '0' + min
    }
    return `${min}:${sec}`
}

var setProgress = function(len) {
  	var progressSection = e('#progress')
  	var duration = e('#duration')
  	var width = duration.offsetLeft - progressSection.offsetLeft
  	var pointer = e('#music-progress-point')
  	var px = len * width / 100
  	pointer.style.left = px +'px'
  	var currentProgress = e('#current-progress')
  	currentProgress.style.width = len + '%'
}

var showProgrss = function() {
  	var music = e('#audio-player')
  	var duration = music.duration
  	var currentTime = music.currentTime
  	var len = currentTime / duration * 100
  	if(music.changeProgress == undefined) {
  		music.changeProgress = false
  	}
  	if(music.changeProgress == false) {
  		setProgress(len)
  	}
}

var showTime = function() {
  	var music = e('#audio-player')
  	var currentTimeSpan = e('#current-time')
  	var durationSpan = e('#duration')
  	music.show = null
  	clearInterval(music.show)
  	music.show = setInterval(function() {
  		var duration = music.duration
  		var currentTime = music.currentTime
  		if(duration != '' && currentTime != '') {
  			currentTimeSpan.innerHTML = time(currentTime)
  			durationSpan.innerHTML = time(duration)
  		}
  		showProgrss()
  	}, 100)
}

var rotateCD = function() {
    var cd = e('#rotate-cd')
    if(cd.interval == undefined) {
        cd.interval = null
    }
    if(cd.dregree == undefined) {
        cd.dregree = 0
    }
    clearInterval(cd.interval)
    cd.interval = setInterval(function() {
        cd.dregree = (cd.dregree + 0.25) % 360
        var style = `translateX(-50%) translateY(-50%) rotateZ(${cd.dregree}deg)`
        cd.style.transform = style
    }, 20)
}

var play = function() {
    playStatus = true
    var gan = e('#gan')
    var ganMove = 'translateX(-50%) rotateZ(-5deg)'
    var music = e('#audio-player')
    var delay = 500
    var playBtn = e('#img-play')
    playBtn.src = 'img/stop2.png'
    if(music.playTimeout == undefined) {
        music.playTimeout = null
    }
    gan.style.transform = ganMove
    setTimeout(rotateCD, delay)
    music.playTimeout = setTimeout(playMusic, delay)
    bindEventPlayProgress()
    showTime()
}

var stop = function() {
    playStatus = false
    var cd = e('#rotate-cd')
    clearInterval(cd.interval)
    var gan = e('#gan')
    var ganMove = 'translateX(-50%) rotateZ(-30deg)'
    gan.style.transform = ganMove
    var playBtn = e('#img-play')
    playBtn.src = 'img/play2.png'
    stopMusic()
}

var resetCD = function() {
  	var cd = e('#rotate-cd')
  	var style = `translateX(-50%) translateY(-50%) rotateZ(0deg)`
  	cd.dregree = 0
  	cd.style.transform = style
}

// 绑定 暂停 播放 按钮图片 切换
var bindEventPlay = function() {
    // log('点击到了1')
    var playBtn = e('#img-play')
    bindEvent(playBtn, 'click', function() {
        // log('点击到了2')
        if(playStatus == false) {
            playStatus = true
            play()
        } else {
            playStatus = false
            stop()
        }
    })
}

var changeVol = function(event) {
  	var volSection = e('#music-vol-order')
  	var d = event.clientX - volSection.offsetLeft
  	if(d <= 100) {
  		  d = 100
  	}
  	if(d >= 200) {
  		  d = 200
  	}
  	//改变圆点 及 进度条
  	var volWidth = d - 100
  	var volume = volWidth / 100
  	var pointer = e('#id-music-vol-point')
  	pointer.style.left = d +'px'
  	var vol = e('#id-music-vol')
  	vol.style.width = volWidth + 'px'
  	//改变音量
  	var music = e('#audio-player')
  	music.volume = volume
}

var bindEventVol = function() {
  	var pointer = e('#id-music-vol-point')
  	bindEventProgress(pointer, changeVol)
}

// 插入音乐
var insertMusic = function(music, i) {
  	var name = music.name
  	var singer = music.singer
  	var duration = music.duration
  	var html =`
        <div class="music-info" data-num=${i}>
            <span class=music-name>${name}</span>
            <span class=music-duration>${duration}</span>
            <span class=music-singer>${singer}</span>
        </div>
    `
  	var list = e('#music-play-list')
   	appendHtml(list, html)
}

// 更新播放列表
var UpdateMusicList = function() {
  	var list = e('#music-play-list ')
  	var musics = findAll(list, '.music-info')
  	for(var j = 0; j < musics.length; j++) {
  		  musics[j].remove()
  	}
  	for(var i = 0; i < musicList.length; i++) {
  		  insertMusic(musicList[i], i)
  	}
  	bindEventSelectMusic()
}

// 更新当前音乐
var updateMusic = function(music) {
  	var player = e('#audio-player')
  	var baseAD = 'music/'
  	player.src = baseAD + music.music
  	var currentMusic = e('#current-music')
  	var topCurrentMusic = e('#top-playing-name')
  	topCurrentMusic.innerHTML = `${music.name}`
  	currentMusic.innerHTML = `${music.name}--${music.singer}`
  	updatePlayingSymbol()
  	var cover = e('#cd-cover')
  	var basePath = 'img/'
  	var path = basePath + music.imgPath
  	cover.style.backgroundImage = `url(${path})`
}

//更新正在播放标志
var updatePlayingSymbol = function() {
  	removeClassAll('playing')
  	var list = e('#music-play-list')
  	var cur = parseInt(list.dataset.cur)
  	var musics = findAll(list, '.music-info')
  	musics[cur].classList.add('playing')
}

// 更新当前歌曲
var updateCurrentMusic = function(n) {
  	var list = e('#music-play-list')
  	list.dataset.cur = n
  	updatePlayingSymbol()
}

// 切歌并播放
var CutPlay = function(music, n) {
  	updateMusic(music)
  	updateCurrentMusic(n)
  	resetCD()
  	stop()
  	setTimeout(play, 500)
}

// 选择播放列表
var bindEventSelectMusic = function() {
  	bindAll('.music-info', 'click', function(event) {
        // var target = event.target
        // var parent = target.parentElement
    		var list = e('#music-play-list')
    		var cur = parseInt(list.dataset.cur)
    		var num = parseInt(this.dataset.num)
        // log('点击了这里', target, parent, cur, num)
    		list.dataset.cur = num
    		CutPlay(musicList[num], num)
  	})
}

var nextMusic = function() {
  	resetCD()
  	var list = e('#music-play-list')
  	var cur = parseInt(list.dataset.cur)
  	var len = musicList.length
  	var nextIndex = (cur + 1) % len
  	list.dataset.cur = nextIndex
  	updateMusic(musicList[nextIndex])
  	stop()
  	setTimeout(play, 500)
}

var preMusic = function() {
  	resetCD()
  	var list = e('#music-play-list')
  	var cur = parseInt(list.dataset.cur)
  	var len = musicList.length
  	var preIndex = (len +　cur - 1) % len
  	list.dataset.cur = preIndex
  	updateMusic(musicList[preIndex])
  	stop()
  	setTimeout(play, 500)
}

// 切换歌曲按钮
var bindEventToggleMusic = function() {
  	var next = e('#img-next')
  	var pre = e('#img-pre')
  	bindEvent(next, 'click', function() {
        nextMusic()
    })
  	bindEvent(pre, 'click', function() {
        preMusic()
    })
}

// 单曲循环
var againPlay = function() {
  	var list = e('#music-play-list')
  	var cur = parseInt(list.dataset.cur)
  	updateMusic(musicList[cur])
  	play()
}

// 随机播放
var randomPlay = function() {
  	var list = e('#music-play-list')
  	var cur = parseInt(list.dataset.cur)
  	var len = musicList.length
  	var nextIndex = Math.floor(Math.random() * len)
  	while(nextIndex == cur) {
  		nextIndex = Math.floor(Math.random() * len)
  	}
  	list.dataset.cur = nextIndex
  	updateMusic(musicList[nextIndex])
  	play()
}

// 自动播放下一首
var autoPlayNext = function() {
  	resetCD()
  	var musicOrder = e('#music-order')
  	var order = musicOrder.dataset.order
  	if(order == '0') {
  		  nextMusic()
  	}
  	if(order == '1') {
  		  randomPlay()
  	}
  	if(order == '2') {
  		  againPlay()
  	}
}

// 音乐结束
var bindEventMusicEnd = function() {
  	var player = e('#audio-player')
  	bindEvent(player, 'ended', function() {
  		stop()
  		setTimeout(autoPlayNext, 500)
  	})
}

// 绑定播放方式
var bindEventNextPlay = function() {
  	var musicOrder = e('#music-order')
  	bindEvent(musicOrder, 'click', function() {
    		var len = loop.length
    		var order = (musicOrder.dataset.order + 1) % len
    		musicOrder.dataset.order = order
    		var basePath = 'img/'
    		musicOrder.src = basePath + loop[order] + '.png'
  	})
}

// 初始化
var musicInt = function() {
  	var music = e('#audio-player')
  	music.volume = 0.5
  	UpdateMusicList()
  	bindEventSelectMusic()
  	if(musicList.length >= 1) {
    		var m = musicList[0]
    		updateMusic(m)
  	}
  	bindEventToggleMusic()
  	bindEventMusicEnd()
  	bindEventNextPlay()
}

//换页
var bindEventPage = function() {
  	var page0 = e('#page-0')
  	var page1 = e('#page-1')
  	var preBtn = e('#pre-page')
  	var nextBtn = e('#next-page')
  	var main = e('#main')
  	bindEvent(preBtn, 'click', function(e) {
    		page0.style.left = '50%'
    		page0.style.opacity = '1'
    		page1.style.right = '-400%'
    		page1.style.opacity = '0'
    		preBtn.style.opacity = '0'
    		nextBtn.style.opacity = '1'
  	})
  	bindEvent(nextBtn, 'click', function(e) {
    		page0.style.left = '-400%'
    		page0.style.opacity = '0'
    		page1.style.right = '50%'
    		page1.style.opacity = '1'
    		preBtn.style.opacity = '1'
    		nextBtn.style.opacity = '0'
    		scrollTo(0,0);
  	})
}

var bindEvents = function() {
	 bindEventPage()
}

// 程序入口
var __playmain = function() {
  	playStatus = false
  	musicInt()
  	bindEventPlay()
  	bindEventVol()
  	bindEventPlayProgress()
  	bindEvents()
}

__playmain()
