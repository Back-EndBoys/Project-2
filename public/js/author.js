$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body dont change
  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", "#author-form", handleAuthorFormSubmit);
  $(document).on("click", ".delete-author", handleDeleteButtonPress);

  // Getting the initial list of Authors
  getUserNames();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleUserNameFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim()) {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertUserName({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertUserName(userNameData) {
    $.post("/api/userNames", userNameData)
      .then(getUserNames);
  }

  // Function for creating a new list row for authors
  function createUserNameRow(userNameData) {
    var newTr = $("<tr>");
    newTr.data("userName", userNameData);
    newTr.append("<td>" + userNameData.name + "</td>");
    newTr.append("<td> " + userNameData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?userName_id=" + userNameData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?userName_id=" + userNameData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-userName'>Delete UserName</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getUserNames() {
    $.get("/api/userNames", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserNameRow(data[i]));
      }
      renderUserNameList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderUserNameList(rows) {
    userNameList.children().not(":last").remove();
    userNameContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      userNameList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Author before you can create a Definition.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("userName");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/userNames/" + id
    })
      .then(getUserNames);
  }
});
