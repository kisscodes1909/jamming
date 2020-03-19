const clientID = 'cba02bc6524f41b48b30a6d072577fac';
const redirectURI = 'http://huujamming.surge.sh';
const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=playlist-modify-public&response_type=token&state=123`;
let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {
    userID: undefined,
    playListID: undefined,
    
    getAccessToken() {
        if (accessToken) {
          return accessToken;
        }
        const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
          accessToken = urlAccessToken[1];
          expiresIn = urlExpiresIn[1];
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
        } else {
          window.location = spotifyUrl;
        }
      },
      search(term) {
          return(
              fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
              }).then( response => {
                  return response.json();
              }).then( response => {
                    return response.tracks.items.map( track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri
                        }
                    } )
              })
          )
      },
      savePlaylist(playlistName, playList) {
        //if( !playlistName && !trackURIs ) { return; }
        const currentUserAccessToken = accessToken;
        const headers = {
            'Authorization': 'Bearer ' + currentUserAccessToken
        }

        return (
            fetch('https://api.spotify.com/v1/me', {
                headers: headers
            }).then( response => {
                return response.json()
            }).then( response => {
                this.userID = response.id;
            }).then(()=> {
                this.createPlaylist(playlistName, headers, playList);
            })            
        )
    },
    createPlaylist(name, headers, playList) {
        if( !name ) return;         
        return(
            fetch(`https://api.spotify.com/v1/users/${this.userID}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: name,
                })
            }).then(response=>{
                return response.json();
            }).then(response=>{
                this.playListID = response.id;
            }).then(()=> {
                this.savePLToSpotify(this.playListID, headers,playList)
            })
        )
    },
    savePLToSpotify(playListID, headers, playList) {
        let trackURIS = this.extractTrackUri(playList);
        return (
            fetch(`https://api.spotify.com/v1/playlists/${playListID}/tracks`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    uris: trackURIS,
                })
            }).then(response=>{
                return response.json();
            }).then(response=>{
                return response;
            })           
        )
    },
    extractTrackUri(playList) {
        return playList.map(track => {
            return track.uri;
        })
    }



}

//Spotify.getAccessToken();
//Spotify.savePlaylist('sds','dsds');

export {Spotify}
