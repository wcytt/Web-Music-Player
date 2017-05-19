var loadRe = function() {
    var reList = e('#recommendation-list')
    for (var i = 0; i < onlineReList.length; i++) {
        var music = onlineReList[i]
        var basePath = 'img/'
        var path = basePath + music.imgPath
        var musicName = music.name
        var html = `
            <div class="re-music" data-num=${i}>
                <span class="re-photo" style="background-image:url(${path})"></span>
                <span class="re-name">${musicName}</span>
            </div>
        `
        appendHtml(reList, html)
    }
}

var bindEventAddRe = function() {
    var reList = e('#recommendation-list')
    bindAll('.re-music', 'click', function(e) {
        var index = this.dataset.num
        AddFromRe(index)
    })
}

var AddFromRe = function(index) {
    var addMusic = onlineReList[index]
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

var __re = function() {
    loadRe()
    bindEventAddRe()
}
__re()
