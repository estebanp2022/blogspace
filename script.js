let postTitle = document.getElementById("post-title");
let postBody = document.getElementById("post-body");
let btn = document.querySelector("button");
let formPost = document.getElementById("form-post");
let blogPosts = document.getElementById("blog-posts");

let postsArray = [];

function renderPosts() {
  let postHtml = "";
  for (let post of postsArray) {
    postHtml += `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          <hr>
          `;
  }
  blogPosts.innerHTML = postHtml;
}

//get data from API and render it to the body
fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    postsArray = data.slice(0, 5); //creating variable with only the 1st 5 posts
    renderPosts();
  });

//event listener when clicking 'post' to submit form
formPost.addEventListener("submit", function (e) {
  e.preventDefault();
  let newPost = {
    title: postTitle.value,
    body: postBody.value,
  };

  const options = {
    method: "POST", //POST is method used to add new data to API
    body: JSON.stringify(newPost), //data has to be turned into JSON first
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://jsonplaceholder.typicode.com/posts", options)
    .then((response) => response.json())
    .then((post) => {
      postsArray.unshift(post); //adds submitted post to list of posts
      renderPosts();
      formPost.reset(); //reset form after clicking 'POST'
    });
});
