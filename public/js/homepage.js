$(document).ready(function () {

  var searchInput = $("#searchInput");
  var addGif = $("#addGifButton")
  var formDef = $("#formDef");
  $(formDef).on("submit", search);
  $('#DefSubmitButton').on("click", search);

  function search(event) {
    event.preventDefault();
    console.log(searchInput.val());

    title = searchInput.val().trim()
    $.get("/api/definitions/" + title, renderSearch)
      .then(function (res) {
        var response = JSON.stringify(res, null, 2)
        console.log(response)
        window.localStorage.clear();
        window.localStorage.setItem('searchItem', response)


        //           module.exports = function() {
        // transfer 
        // }
        // if(res){
        //   location.href = "gifDisplay.html"
        //   console.log(res)
        //   dom change here
        //     // getPosts(postCategorySelect.val());
        //       }
        //       else{
        //    M.toast ({html:"couldn't find it, try search by tag? "})
        //       }
      });
  };
  // $(searchTag).on("click", search)

  // function search(tags) {
  //    tags = tags.val().trim()
  //   $.ajax({
  //     method: "GET",
  //     url: "/api/definitions/" + tags
  //   })
  //     .then(function(res) {
  //         console.log(res)
  //         if(res){
  //           location.href = "gifListDisplay.html"
  //           console.log(res)
  //       //   dom change here
  //       // getPosts(postCategorySelect.val());
  //         }
  //         else{
  //      M.toast ({html:"couldn't find it, try search by tag? "})
  //         }
  //     });
  // };
  addGif.on("click", link)
  function link (){
      location.href = "addGif.html"
  };
  function renderSearch(data) {
    if (data) {
      window.location.href = "/gifDisplay.html";
    }
    else {
    window.location.href = "/GifDisplayAll.html";
    }
  }
  // function getSearch (){
  //   $.get("/api/definitions/:title", function (data){
  //     console.log("THIS IS THE DATA", data)
  //   })
  // }
  // getSearch();
})
