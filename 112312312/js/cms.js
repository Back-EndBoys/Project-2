$(document).ready(function () {
  // Getting jQuery references to the post body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var authorSelect = $("#author");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?definiton_id=") !== -1) {
    postId = url.split("=")[1];
    getDefinitionData(definitionId, "definition");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?userName_id=") !== -1) {
    userNameId = url.split("=")[1];
  }

  // Getting the authors, and their posts
  getUserNames();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newDefinition = {
      title: titleInput
        .val()
        .trim(),
      definition: definitionInput
        .val()
        .trim(),
      use: useInput
        .val()
        .trim(),
      tags: tagsInput
        .val()
        .trim(),
      link: linkinput
        .val()
        .trim(),
      AuthorId: authorSelect.val() //change this to use the login creditials
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newDefinition.id = definitionId;
      updateDefinition(newDefinition);
    }
    else {
      submitDefinition(newDefinition);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitDefinition(definition) {
    $.post("/api/definitons", definition, function () {
      window.location.href = "/blog";
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getDefinitionData(id, type) {
    var queryUrl;
    switch (type) {
      case "post":
        queryUrl = "/api/definitions/" + id;
        break;
      case "UserName":
        queryUrl = "/api/UserNames/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function (data) {
      if (data) {
        console.log(data.UserNameId || data.id);
        // If this post exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        userNameId = data.UserNameId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Authors and then render our list of Authors
  function getUserNames() {
    $.get("/api/userNames", renderUserNameList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderUserNameList(data) {
    if (!data.length) {
      window.location.href = "/userNames";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

  // Creates the author options in the dropdown
  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", userName.id);
    listOption.text(userName.name);
    return listOption;
  }

  // Update a given post, bring user to the blog page when done
  function updateDefinition(definition) {
    $.ajax({
      method: "PUT",
      url: "/api/definitions",
      data: definition
    })
      .then(function () {
        window.location.href = "/blog";
      });
  }
});