async function getComments() {
    let url = 'https://my-json-server.typicode.com/telegraph/front-end-exercise-contractors/comments';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderComments() {
  let comments = await getComments();
  let keyCount  = Object.keys(comments).length;
  
  let buildComments = function () {
    let html = "";
    comments.forEach((comment) => {
      let htmlSegment = `<div class="comment-box">
                                <header class="comment-header">
                                    <div class="user"><p>${comment.name}</p>  </div>
                                    <div class="likes"> <p>${comment.likes} Likes</p></div>
                                </header>
                                <section class="comment"><p>${comment.body}</p></section>
                            </div>`;

      html += htmlSegment;
    });

    let commentNum = document.querySelector(".comment-amount span");
  
    commentNum.innerHTML = keyCount;

    let container = document.querySelector(".comments-container");

    container.innerHTML = html;
  };

  buildComments();

  document.getElementById("likes").addEventListener("click", () => {
    comments.sort(function (a, b) {
      return parseFloat(b.likes) - parseFloat(a.likes);
    });
    buildComments();
  });
}

renderComments();

