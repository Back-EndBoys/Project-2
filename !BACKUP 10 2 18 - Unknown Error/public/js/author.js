$(document).ready(function() //Run on page load
{
  // Getting references to the name input, author container, and table body.
  var nameInput = $("#author-name");
  var authorList = $("tbody");
  var authorContainer = $(".author-container");

  // Added event listeners to the form to create a new object
  // and the button to delete an Author
  $(document).on("submit", "#author-form", handleAuthorFormSubmit); //Run handleAuthorFormSubmit on author-form submission.
  $(document).on("click", ".delete-author", handleDeleteButtonPress); //Run handleDeleteButtonPress on delete-form click.

  // Getting the initial list of Authors
  getAuthors();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleAuthorFormSubmit(event)
  {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim())
    {
      return;
    }
    // Calling the upsertAuthor function and passing in the value of the name input
    upsertAuthor
    ({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an author.  Calls getAuthors upon completion.
  function upsertAuthor(authorData)
  {
    $.post("/api/authors", authorData)
      .then(getAuthors);
  }

  // Function for creating a new list row for authors
  function createAuthorRow(authorData)
  {
    var newTr = $("<tr>"); //<TR> is table row.
    newTr.data("author", authorData);
    newTr.append("<td>" + authorData.name + "</td>");
    newTr.append("<td> " + authorData.Posts.length + "</td>");
    newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newTr;
  }

  // Function for retrieving authors and readying them to be rendered to the page.
  function getAuthors()
  {
    $.get("/api/authors", function(data)
    {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++)
      {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page.
  function renderAuthorList(rows)
  {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    
    //If at least 1 row exists in the database, show the post list in descending order.
    if(rows.length)
    {
      console.log(rows);
      authorList.prepend(rows);
    }

    //If no authors exist in the database, show an empty list.
    else
    {
      renderEmpty();
    }
  }

  // This function makes and displays a message when the database has no authors nor posts.
  function renderEmpty()
  {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Author before you can create a Post.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress()
  {
    //Access the author data.  This is 2 steps up the hierarchy.
    //First, find the "td" (table data) entry.  Second, find the "tr" (table row) entry.
    //Third, access the "author" proprerty.
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax
    ({
      method: "DELETE",
      url: "/api/authors/" + id
    })
      .then(getAuthors);
  }
});