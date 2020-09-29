const clientID = 'bfa98ce77af34400ac3d6dcf5026585c';
const redirectURI = 'http://localhost:3000';

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) return accessToken;
    
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURL;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization : `Bearer ${accessToken}`};
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: headers})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error("Request Failed");
            }).then(jsonResponse => {
                if(!jsonResponse.tracks) {
                    return;
                }
                return jsonResponse.tracks.items.map(track => ({
                    id : track.id,
                    name : track.name,
                    artist : track.artists[0].name,
                    album : track.album.name,
                    uri : track.uri
                })
            );
        });
        
    },

    savePlayList(name, trackURIs) {
        if(!name || !trackURIs.length) return;
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization : `Bearer ${accessToken}`};
        let userID;

        return fetch('https://api.spotify.com/v1/me', {headers : headers})
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error("Request failed");
            })
            .then(jsonResponse => {
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers : headers,
                    method : 'POST',
                    body : JSON.stringify({ name : name })
                })
                .then(response => {
                    if(response.ok) {
                        return response.json()
                    }
                    throw new Error("Request failed");
                })
                .then(jsonResponse => {
                    const playlistID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                        headers : headers,
                        method : 'POST',
                        body : JSON.stringify({ uris : trackURIs })
                    })
                    .then(response => {
                        if(response.ok) {
                            return response.json();
                        }
                        throw new Error("Request failed")
                    })
                    .then(jsonResponse => jsonResponse);
                });
            });
    }
}

export default Spotify;