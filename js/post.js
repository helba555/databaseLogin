
let PostImage = null
function child(time, name, message, image) {
    return `
        <div class="d-flex mt-4 person-child">
            <div class="flex-shrink-0">
                <img class="rounded-circle comment-avatar" src="${image}"
                    alt="...">
            </div>
            <div class="ms-3">
                <div class="fw-bold">${name}</div>
                <div class="comment-time" id="${time}">0 seconds ago</div>
                ${message}
            </div>
        </div>
       `
}

function handleClick(ev) {
    document.getElementById("post-comment").value = `@${ev.querySelector(".person-name").innerText}\n`;
}

function addImage() {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = function (event) {
        let file = event.target.files[0];
        PostImage = file
        document.getElementById("img-title").innerText = file.name
    }
    input.click()
}

function handleSubmit(event) {
    event.preventDefault();
    if(!PostImage) return
    let title = event.target[0].value
    let post = event.target[1].value
    document.getElementById("posts").innerHTML += addPost(title, post, PostImage)
    document.getElementById("img-title").innerText = "";
    [0, 1].forEach(i => event.target[i].value = "");
    PostImage = null
    document.getElementById("postModalClose").click()
}

function addPost(title, post, imageFile) {
    return `
    <div class="card mt-2" style="width: 18rem;">
    <img src="${URL.createObjectURL(imageFile)}" style="width:250px,height:250px" width="250px" height="250px" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${post}</p>
    </div>
  </div>   
    `
}

try {
    document.querySelectorAll(".comment-time").forEach(element => {
        element.innerHTML = humanizeDuration(Date.now() - Number(element.id), { round: true }).split(",")[0] + " ago";
    })
} catch (error) { }

setInterval(() => {
    document.querySelectorAll(".comment-time").forEach(element => {
        element.innerHTML = humanizeDuration(Date.now() - Number(element.id), { round: true }).split(",")[0] + " ago";
    })
}, 10 * 1000);