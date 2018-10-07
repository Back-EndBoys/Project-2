$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and author select
  var definitionInput = $("#defInput");
  var titleInput = $("#titleInput");
  var urlInput = $('#urlInput')
  var tagInput = $('#tagInput')
  var formDef = $("#formDef");

  // var useInput = $('#useInput')

  // Adding an event listener for when the form is submitted
  $(formDef).on("submit", handleFormSubmit);
  $('#DefSubmitButton').on("click", handleFormSubmit);

 

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    var imgId = imageIDExtractor(urlInput.val());
    console.log(urlInput);
    console.log(urlInput.val());
    // console.log(imageIDExtractor(String(urlInput.val())))
    console.log(typeof definitionInput.val())
    if(!imgId){
      return alert("Links from Giphy only please ... click the giph and get link not right click and copy link")
    }
    event.preventDefault();
   
    // Wont submit the post if we are missing a body, title, or author
    if (!titleInput.val().trim() || !definitionInput.val().trim() || !urlInput.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    console.log("rick", imgId)
    var newDefinition =
    {
      title: titleInput
        .val()
        .trim(),
      definition: definitionInput
        .val()
        .trim(),
      // use: useInput
      //   .val()
      //   .trim(),
      tags: tagInput
        .val()
        .trim(),
      link: imgId,
      UserNameID: 1 //change this to use the login creditials
    };
    console.log(newDefinition.UserNameID)

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
      submitDefinition(newDefinition);
    }
  

  // Submits a new post and brings user to blog page upon completion
  function submitDefinition(definition) {
    $.post("/api/definitions", definition, function () {
      window.location.href = "/homePage.html";
    });
  }

function imageIDExtractor(inputURL)
{
    let step1 = "", imageID = "";

    //If user provides us a "GIF Link"
    if(inputURL.substr(inputURL.length-10, inputURL.length) === "/giphy.gif")
    {
        console.log("-=COPY LINK METHOD=-");
        console.log(`Sample Input URL: ${inputURL}`);
        step1 = inputURL.substr(0, inputURL.length-10);
        console.log(`Post-Step 1 Input URL: ${step1}`);
        imageID = step1.substr(30, step1.length);
        console.log(`Image ID: ${imageID}`);
        return imageID;
    }

    //If user provides us a "HTML5 Video" Link
    else if(inputURL.substr(inputURL.length-6, inputURL.length) === "/html5")
    {
        console.log("% % HTML5 METHOD % %");
        console.log(`Sample Input URL: ${inputURL}`);
        step1 = inputURL.substr(0, inputURL.length-6);
        console.log(`Post-Step 1 Input URL: ${step1}`);
        imageID = step1.substr(23, step1.length);
        console.log(`Image ID: ${imageID}`);
        return imageID;
    }

    //If user provides us a "Short Link"
    else if(inputURL.substr(0, 14) === "http://gph.is/")
    {
        console.log(". . SHORT METHOD . .");
        console.log(`Sample Input URL: ${inputURL}`);
        imageID = inputURL.substr(15, inputURL.length);
        console.log(`Image ID: ${imageID}`);
        return imageID;
    }

}
})