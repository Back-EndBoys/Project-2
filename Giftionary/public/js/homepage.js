$(document).ready(function() {
const searchBar = $('#searchButton')
const login = $('#login')
const addGif = $('#addGifButton')

$(searchBar).on("click", search)

  function search(title) {
     title = title.val().trim()
    $.ajax({
      method: "GET",
      url: "/api/definitions/:" + title
    // })
    //   .then(function(res) {
    //       console.log(res)
    //       if(res){
    //         location.href = "gifDisplay.html"
    //     //   dom change here
    //     // getPosts(postCategorySelect.val());
    //       }
    //       else{
    //         location.href = "addGif.html"
    //       }
      });
  };
  addGif.on("click", link)
  function link (){
      location.href = "addGif.html"
  }
})
