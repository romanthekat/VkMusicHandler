// main function - scrolls down until the end, and saves all the tracks
var currentScrollTop = -1;
var timerId = setInterval(function () {
    if (document.body.scrollTop > currentScrollTop) {
        currentScrollTop = document.body.scrollTop;
        document.body.scrollTop = currentScrollTop + 9001;
    } else {
        clearInterval(timerId);
        saveTracksList();
    }
}, 500);

/**
 * Parses current VK music page, takes tracks, and saves as file
 */
function saveTracksList() {
    var tracks = getTracksList('-----');
    saveTracksAsFile(tracks, 'tracks.txt');
}

function getTracksList(artistTrackDelimiter) {
    var elementsList = document.getElementsByClassName("audio_title_wrap");

    var tracks = [];
    for (var i = 0; i < elementsList.length; i++) {
        var element = elementsList[i];

        var artist = element.children[0].textContent;
        var track = element.children[2].children[0].textContent;

        tracks.push(artist + artistTrackDelimiter + track);
    }
    return tracks;
}

function saveTracksAsFile(tracks, filename) {
    var a = document.createElement('a');

    a.download = filename;
    var urlObj = URL.createObjectURL(new Blob([tracks.join("\n")],
        {type: 'text/plain'}));

    a.href = urlObj;
    a.click();

    URL.revokeObjectURL(urlObj);
}