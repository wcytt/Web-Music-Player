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
    element.addEventListener(element, callback)
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


// lpbo
var position = [
    {
        x: -400,
        y: 0,
        z: -120,
    },
    {
        x: -200,
        y: 0,
        z: -60,
    },
    {
        x: 0,
        y: 0,
        z: 30,
    },
    {
        x: 200,
        y: 0,
        z: -60,
    },
    {
        x: 400,
        y: 0,
        z: -120,
    }
]
var container = e('#lpbo')
var photos = es('#lpbo .photo')
var playLpboInterval = null
var nLpbo = 0

var playLpbo = function() {
    clearInterval(playLpboInterval)
    playLpboInterval = setInterval(function() {
        nLpbo = changePos(nLpbo)
    }, 3000)
}

var stopLpbo = function() {
    clearInterval(playLpboInterval)
}

var changePos = function(nLpbo) {
    for (var i = 0; i < photos.length; i++) {
        photos[i].style.transform = `translate3d(${position[nLpbo].x}px, ${position[nLpbo].y}px, ${position[nLpbo].z}px)`
        nLpbo++
        nLpbo %= photos.length
    }
    nLpbo++
    nLpbo %= photos.length
    return nLpbo
}

var indexOf = function(e) {
    var id = e.id
    var ids = id.split('-')
    var index = parseInt(ids[ids.length - 1])
    return index
}

// 点击轮播图会添加到播放列表并播放
var AddFromLpbo = function(index) {
    var addMusic = onlineList[index]
    for (var i = 0; i < musicList.length; i++) {
        var music = musicList[i].music
        if(music == addMusic.music) {
            CutPlay(musicList[i], i)
            return
        }
    }
    musicList.push(addMusic)
    UpdateMusicList()
    var n = musicList.length - 1
    CutPlay(addMusic, n)
}

var setPos = function(e) {
    var event = e.target
    var index = indexOf(event)
    var pos = ((2 - index) + 5) % photos.length
    nLpbo = changePos(pos)
    AddFromLpbo(index)
}

var initLpbo = function() {
    container.addEventListener('mouseover', function() {
        clearInterval(playLpboInterval)
    })
    container.addEventListener('mouseout', function() {
        playLpbo()
    })
    container.addEventListener('click', function(e) {
        setPos(e)
    })
}

// 设置轮播图的背景
var setBackground = function() {
    var lpbo = e('#lpbo')
    var photos = lpbo.querySelectorAll('span')
    for (var i = 0; i < photos.length; i++) {
        var basePath = 'img/'
        var music = onlineList[i]
        var path = basePath + music.imgPath
        photos[i].style.backgroundImage = `url(${path})`
        var a = find(photos[i], 'a')
        a.innerHTML = `${music.name}--${music.singer}`
    }
}



var __main = function() {
    initLpbo()
    playLpbo()
    setBackground()
    nLpbo = changePos(nLpbo)
}
__main()
