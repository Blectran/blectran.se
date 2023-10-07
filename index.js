async function getCurrentSong() {
    const lastFM = "https://blectran.se/lastsong.api.exe";
    var response = await fetch(lastFM)
    var json = await response.json();
    console.log(json)
    var song_data = json.recenttracks.track[0];
    var artist = song_data.artist["#text"]
    var song_name = song_data.name;
    var song_image = song_data.image[1]["#text"];
    
    document.getElementById("song-title").innerText = song_name;
    document.getElementById("song-artist").innerText = artist;
    document.getElementById("song-image").src = song_image;
}

getCurrentSong();