jQuery(document).ready(function ($) {
    $('.login-form form').on('submit', function (e) {
        e.preventDefault();

        var username = $('#username').val(), password = $('#password').val();

        if (username && password) {
            console.log('Form submit');

            // Submit username and password and redierct to the post page upon success.

            window.location.href = 'post.html';
        }
    });


    // Post comment
    $('form.comment-form').on('submit', function (e) {
        e.preventDefault();

        var user = $('#user').val(), userAvatar = $('#user-avatar').val(), comment = $('#post-comment').val();

        console.log('Comment submitted!');
        console.log(user, userAvatar, comment);

        if (comment != '') {
            var $newComment = $(`
            <div class="d-flex mb-4 single-comment">
            <div class="flex-shrink-0" onclick="handleClick(event.target.parentElement.parentElement)">
                <img class="rounded-circle comment-avatar" src="${userAvatar}" alt="...">
            </div>
            <div class="ms-3" id="${user.replace(/\s/g, "_")}">
                <div class="fw-bold person-name" onclick="handleClick(event.target.parentElement.parentElement)">${user}</div>
                <div class="comment-time" id="${Date.now()}">${humanizeDuration(0, { round: true }).split(",")[0]}</div>
                <div class="comment-line" onclick="handleClick(event.target.parentElement.parentElement)">${comment}</div>
                <div class="child"></div>
            </div>
            </div>`);

            /**
             * Submit the comment data to the backend and append the new comment to the list upon success.
             */
            
            if (!comment.split("\n")[0].startsWith("@")) {
                $('.comment-list').append($newComment);
                // Clear comment box after submit
                $('#post-comment').val('');
            }
            else{
                let name = comment.split("\n")[0].substring(1).split(" ").join("_");
                let message = comment.split("\n")[1];
                console.log(name)
                document.getElementById(name).querySelector(".child").innerHTML += child(Date.now(),user,message,userAvatar);
                $('#post-comment').val('');
            }
        }
    });
});