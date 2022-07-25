const loadPost = async () => {
  const postId = new URL(window.location.href).searchParams.get("postId");

  // container
  const containerEl = document.querySelector('.container');

  if (!postId) {
    // render error message
    const errorEl = document.createElement('div');
    errorEl.classList.add('error-message');
    errorEl.innerText = 'No post id provided!';
    containerEl.appendChild(errorEl);

  } else {
    // loading el
    const loadingEl = document.createElement('div');
    loadingEl.classList.add('loading');
    loadingEl.innerText = 'Loading...';
    containerEl.appendChild(loadingEl);

    // fetch data
    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const postData = await postResponse.json();

    // fetch user data
    const { userId } = postData; // const userId = postData.userId;
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const userData = await userResponse.json();

    // fetch comments
    const commentResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const commentData = await commentResponse.json();

    // render post

    // title
    const titleEl = document.createElement('h1');
    titleEl.classList.add('posts-title');
    titleEl.innerText = postData.title;
    containerEl.appendChild(titleEl);

    // post text
    const postWrapEl = document.createElement('article');
    postWrapEl.classList.add('post_wrap');
    const postTextEl = document.createElement('p');
    postTextEl.classList.add('post_wrap-text');
    postTextEl.innerText = postData.body;
    postWrapEl.appendChild(postTextEl);
    containerEl.appendChild(postWrapEl);

    // render user data
    const userWrapEl = document.createElement('div');
    userWrapEl.classList.add('user-details-wrap');
    const userTitleEl = document.createElement('h3');
    userTitleEl.classList.add('user-details_title');
    userTitleEl.innerText = 'Author:';
    userWrapEl.appendChild(userTitleEl);
    const userNameEl = document.createElement('div');
    userNameEl.classList.add('user-details_name');
    const userNameLinkEl = document.createElement('a');
    userNameLinkEl.setAttribute('href', `user.html?userId=${userData.id}`);
    userNameLinkEl.innerText = userData.name;
    userNameEl.appendChild(userNameLinkEl);
    userWrapEl.appendChild(userNameEl);
    const userEmailEl = document.createElement('div');
    userEmailEl.classList.add('user-details_email');
    const userEmailLinkEl = document.createElement('a');
    userEmailLinkEl.setAttribute('href', `mailto:${userData.email}`);
    userEmailLinkEl.innerText = userData.email;
    userEmailEl.appendChild(userEmailLinkEl);
    userWrapEl.appendChild(userEmailEl);
    containerEl.appendChild(userWrapEl);

    // render comments
    const commentsWrapEl = document.createElement('div');
    commentsWrapEl.classList.add('comments_wrap');
    const commentsTitleEl = document.createElement('h3');
    commentsTitleEl.classList.add('comments_wrap-title');
    commentsTitleEl.innerText = 'Comments:';
    commentsWrapEl.appendChild(commentsTitleEl);

    commentData.forEach(item => {
      const commentWrapEl = document.createElement('div');
      commentWrapEl.classList.add('comment_wrap');
      const commentUserEl = document.createElement('div');
      commentUserEl.classList.add('comment_wrap_user');
      commentUserEl.innerText = item.email;
      commentWrapEl.appendChild(commentUserEl);
      const commentTextEl = document.createElement('div');
      commentTextEl.classList.add('comment_wrap_text');
      commentTextEl.innerText = item.body;
      commentWrapEl.appendChild(commentTextEl);
      commentsWrapEl.appendChild(commentWrapEl);
    });
    containerEl.appendChild(commentsWrapEl);

    // remove loading el
    loadingEl.remove();
  }
};

loadPost();
