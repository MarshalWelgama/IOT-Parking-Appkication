var express = require("express");
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.json({limit: '1mb'}));

app.listen(3000, (error, res, body) => {
    if (error) {
        console.error(error)
        return
    }
    else {
        console.log('Example api listening on port 3000')
    }
});

app.get('/', (req, res) => {
    res.send("API working");
})

app.get('/googleres', (req, res) => {
   
    const googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyCuX2mbNXXXvmoTJn6ZX2T8bNvTCQTA6PA'
});

googleMapsClient.geocode({
    //Testing purpose in web browser. SO hard coded
        address: "7 hughes street, burwood, AU" //req
    }, function (err, response) {
        var geocoord = response.json.results[0].geometry.location;
        if (!err) {
            console.log("response from api: " + response.json.results);
            res.send(geocoord);
        }
        else {
            console.log("Runningauto");
        }
    });
});

app.post('/googlepost', (request, res) =>{
    console.log(request.body)

    const googleMapsClient = require('@google/maps').createClient({
        key: 'AIzaSyCuX2mbNXXXvmoTJn6ZX2T8bNvTCQTA6PA'
});

googleMapsClient.geocode({
        address: request.body.text
    }, function (err, response) {
        var geocoord = response.json.results[0].geometry.location;
        if (!err) {
            //WORKING!!!!!! gives the whole object of the address from google.
                //console.log(response.json.results);
            //Following shows {42.6367945 , -73.11626609999999} in console for the address
                console.log("{" +  geocoord.lat + " , " + geocoord.lng + "}");

            res.json({
                status: "success",
                latitude : geocoord.lat,
                longitude : geocoord.lng
            });
            
        }
        else {
            console.log("Runningauto");
        }
    });
})