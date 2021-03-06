//This file keeps track of our "requires"

window.require = require;

var request = require('superagent');
    google.charts.load('current', {
      'packages': ['map'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyDBU4eMBD02OnA8bu0iIn4HZFE__DEW3gE'
    });
    //google.charts.setOnLoadCallback(drawSearchMap("UNCC"));
  

    //Handles adding and searching for points
    document.addEventListener("DOMContentLoaded",function(event){
      document.getElementById("execute").addEventListener("click",function(){
        console.log("Clicked");
        var address = document.getElementById('query').value;
        drawSearchMap(address);
      });
    });


    var request = require('superagent');
   
    // calls up a search based around a specific address or palce
     function drawSearchMap(addrs){
      
      
       var map = new google.visualization.Map(document.getElementById('map_div'));
       //Get lat long of address
       request.get('https://maps.googleapis.com/maps/api/geocode/json?address='+addrs+'&key=AIzaSyDBU4eMBD02OnA8bu0iIn4HZFE__DEW3gE')
              .set('Accept','application/json')
              .end((err,res)=>{
                if(res){
                  var results =JSON.parse(res.text)
                  console.log(results.results[0].geometry);
                  var lat =results.results[0].geometry.location.lat;
                  var long = results.results[0].geometry.location.lng;
                  var data = google.visualization.arrayToDataTable([
                    ['Lat','Long','Description','Marker'],
                    [lat,long,addrs,"search"]
                  ]);
                  request.get('/addSearch?lat='+lat+'&long='+long)
              .set('Accept','application/json')
              .end((err,res)=>{
                if(res){
                  console.log(res)
                  var sap = 0;
                  var total= 0;
                  var tempLat = 0;
                  var tempLong = 0;
                  for(i =0;i<res.body.length;i++){
                    var x = res.body[i];

                    if(x.lat != tempLat ||x.long != tempLong){
                      //Remove date rows from above
                      if(sap > 1){
                      data.removeRows(total-sap,sap-1);
                      total = total-sap;
                      }
                      sap = 0;
                      tempLat = x.lat;
                      tempLong = x.long;
                    }
                    sap++;
                    total++;
              var x_string = '<div id ="content">'+'<h1 id="firstHeading" class = "firstHeading">Median Income: '+ x.income +'</h1>'
                             +'<div id="bodyContent">'+
                             '<p><b> Shape: <b>'+ x.shape +'<p>' +
                             '<p><b> Sighting Time: <b>'+ x.datetime +'<p>' +
                             '<p><b> Location : <b>'+ x.city + ", " + x.state +'<p>' +
                             '<p><b> Duration(seconds): <b>'+ x.duration +'<p>' +
                             '<p><b> Sightings at this Location: <b>'+ sap+'<p>' +
                              '</div>'
                                + '</div>';
        
          
                data.addRows([[x.lat,x.long,x_string,"ufo"]]);
                
            
              
              }
              //Get airport points
              request.get('/airport?lat='+lat+'&long='+long)
              .set('Accept','application/json')
              .end((err,res)=>{
                if(res){
                  for(i = 0; i<res.body.length;i++){
                    var a = res.body[i];

                    data.addRows([[a.Latitude,a.Longitude*(-1),a.locationID,'airport']]);
                   
                  }
                  console.log(data.getNumberOfRows());
                  map.draw(data, {
                    showTooltip: true,
                    showInfoWindow: true,
                    icons: {
                      ufo: {
                        normal:   '/ufo.png'
                      },
                      search: {
                        normal:   '/telescope.png'
                      },
                      airport:{
                        normal:   '/airplane.png'
                      }
                    }
                  });
                }

              }
            )
               
              
                }
                
               // console.log(data);
                
            
                });
                };
              })

     }
     function drawMapAdress(){
        var data = google.visualization.arrayToDataTable([
            ['Lat', 'Long', 'Name'],
            [37.4232, -122.0853, 'Work']])
        var map = new google.visualization.Map(document.getElementById('map_div'));
      request.get('/testSearch')
              .set('Accept','application/json')
              .end((err,res)=>{
                if(res){
                  console.log(res)
                  for(i =0;i<res.body.length;i++){
                    var x = res.body[i];
                    console.log("gi");
                data.addRows([[x.lat,x.long,x.shape]]);
                }
                map.draw(data, {
                    showTooltip: true,
                    showInfoWindow: true
                  });
                }
                
               // var map = new google.visualization.Map(document.getElementById('map_div'));
                console.log(data);
                
                map.draw(data, {
                    showTooltip: true,
                    showInfoWindow: true
                  });
                });

    }
    function drawMap () {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Address');
      data.addColumn('string', 'Location');
      data.addColumn('string', 'Marker')

      data.addRows([
        ['gisborne (new zealand)', 'Home, bnefore I fucked everything up',   'blue' ],
        ['holmes/pawling',      'FUCk',   'green'],
        ['Washington DC, United States',    'Washington', 'pink' ],
        ['Philadelphia PA, United States',  'Philly',     'green'],
        ['Pittsburgh PA, United States',    'Pittsburgh', 'green'],
        ['Buffalo NY, United States',       'Buffalo',    'blue' ],
        ['Baltimore MD, United States',     'Baltimore',  'pink' ],
        ['Albany NY, United States',        'No FUn',     'blue' ],
        ['Allentown PA, United States',     'Allentown',  'green']
      ]);
      var url = 'https://icons.iconarchive.com/icons/icons-land/vista-map-markers/48/';

      var options = {
        zoomLevel: 6,
        showTooltip: true,
        showInfoWindow: true,
        useMapTypeControl: true,
        icons: {
          blue: {
            normal:   url + 'Map-Marker-Ball-Azure-icon.png',
            selected: url + 'Map-Marker-Ball-Right-Azure-icon.png'
          },
          green: {
            normal:   url + 'Map-Marker-Push-Pin-1-Chartreuse-icon.png',
            selected: url + 'Map-Marker-Push-Pin-1-Right-Chartreuse-icon.png'
          },
          pink: {
            normal:   url + 'Map-Marker-Ball-Pink-icon.png',
            selected: url + 'Map-Marker-Ball-Right-Pink-icon.png'
          }
        }
      };
      var map = new google.visualization.Map(document.getElementById('map_div'));

      map.draw(data, options);
    }