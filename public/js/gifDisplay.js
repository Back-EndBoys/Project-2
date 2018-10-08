
$(document).ready(function() {
   
var searchItem = window.localStorage.getItem('searchItem');
var searchObject = JSON.parse(searchItem)

var gifName = $('#gifName')
var definition = $('#definition')
var tags = $('#tags')
var gif = $('#gif')

// var queryURL = "http://cors.io/?http://api.giphy.com/v1/gifs/"+searchObject.link+"?api_key=dc6zaTOxFJmzC";

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });

gifName.append(searchObject.title);
definition.append(searchObject.definition);
tags.append(searchObject.tags);
gif.append(searchObject.gif);



});