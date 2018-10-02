$(document).ready(function() //Runs on page load.
{
  /* global moment */

  // blogContainer holds all of our posts.
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");

  // Click events for the edit and delete buttons.
  $(document).on("click", "button.delete", handlePostDelete); //Delete post when user clicks delete button.
  $(document).on("click", "button.edit", handlePostEdit); //Edit post when user clicks delete button.

  // Click events for the vote buttons.
  $(document).on("click", "button.upvote", handleUpvote); //Delete post when user clicks delete button.
  $(document).on("click", "button.downvote", handleDownvote); //Edit post when user clicks delete button.
  
  // Variable to hold our posts.
  var posts;

  // This code handles retrieving all blog posts from a specific post via
  // checking for a query param in the url for author_id.
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1)
  {
    authorId = url.split("=")[1];
    getPosts(authorId);
  }

  // If there's no authorId we just get all posts as usual.
  else
  {
    getPosts();
  }

  // This function grabs posts from the database and updates the view.
  function getPosts(author)
  {
    authorId = author || ""; //authorId takes the value of the author variable if it exists or an empty string otherwise
    if (authorId)
    {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/posts" + authorId, function(data)
    {
      console.log("Posts", data);
      posts = data;

      //If there are no posts or posts.length is 0, display the empty page for that author.
      if (!posts || !posts.length)
      {
        displayEmpty(author);
      }

      //If there's at least 1 post from an author, initialize rows.
      else
      {
        initializeRows();
      }
    });
  }

  // InitializeRows handles appending all of our constructed HTML for Posts inside blogContainer.
  function initializeRows()
  {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++)
    {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML.
  // Change to createNewPage for GIFtionary?
  function createNewRow(post)
  {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");

    var newPostCard = $("<div>");
    newPostCard.addClass("card");

    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");

    let downvoteBtn = $("<button>");
    downvoteBtn.text("Downvote");
    downvoteBtn.addClass("downvote btn btn-warning");

    let upvoteBtn = $("<button>");
    upvoteBtn.text("Upvote");
    upvoteBtn.addClass("upvote btn btn-success");
    
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h5>");
    
    newPostAuthor.text("Written by: " + post.Author.name);
    newPostAuthor.css
    ({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    
    newPostCardHeading.append(upvoteBtn);
    console.log("^UPVOTE^ button should be appended now!")
    newPostCardHeading.append(downvoteBtn);
    console.log("vDOWNVOTEv button should be appended now!")
  //  newPostCardHeading.append(deleteBtn);
//    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    
    newPostCardBody.append(newPostBody);
    
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    
    return newPostCard;
  }

  // This function does an API call to delete posts.
  function deletePost(id)
  {
    $.ajax
    ({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function()
      {
        getPosts(postCategorySelect.val() );
      });
  }
  
  // This function handles upvoting an entry.
  function handleUpvote()
  {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
      // currentPost.id.upvotes++;
  
  }

  // This function handles downvoting an entry.
  function handleDownvote()
  {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
      // currentPost.id.downvotes++;
  }
  
  // This function figures out which post we want to delete and then calls deletePost.
  function handlePostDelete()
  {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit()
  {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id)
  {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Author #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageH2);
  }
});