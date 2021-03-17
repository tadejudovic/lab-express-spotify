

require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const SpotifyWebApi = require('spotify-web-api-node');


const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });


const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

  app.get (`/`, (req,res)=> { 
    res.render (`index`, {layout:`index`})
  })


   app.get(`/artist-search`, (req,res)=> { 
    const  data =  req.query.q
    console.log(data)

    spotifyApi 
    .searchArtists(data)
    .then(data => {
      console.log('The received data from the API: ', data.body);
       res.render (`artist-search`, {artist:data.body})
    
      })
      .catch(err => console.log('The error while searching artists occurred: ', err));
    }
    )
    
  
// Our routes go here:
/*
app.get("/artist-search/", (req,res)=> { 
spotifyApi 
const  query =  req.query.q
console.log(query)

 .searchArtists(query)
.then(data => {
  console.log('The received data from the API: ', data.body);
   res.render (`artist-search`)

  })
  .catch(err => console.log('The error while searching artists occurred: ', err));
}
)*/


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
