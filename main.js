const loadPosts = async () => {
  // container
  const containerEl = document.querySelector('.container');

  // loading el
  const loadingEl = document.createElement('div');
  loadingEl.classList.add('loading');
  loadingEl.innerText = 'Loading...';
  containerEl.appendChild(loadingEl);

  // fetch data
  const dataResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await dataResponse.json();

  // remove loaidng el
  loadingEl.remove();

  // render data
  data.forEach(item => {
    // wrap el
    const itemWrapEl = document.createElement('article');
    itemWrapEl.classList.add('post_wrap');

    // title el
    const itemTitleEl = document.createElement('h3');
    itemTitleEl.classList.add('post_wrap-title');
    itemTitleEl.innerText = item.title;
    itemWrapEl.appendChild(itemTitleEl);

    // text el
    const itemTextEl = document.createElement('p');
    itemTextEl.classList.add('post_wrap-text');
    itemTextEl.innerText = item.body;
    itemWrapEl.appendChild(itemTextEl);

    // link wrap el and link el
    const itemLinkWrapEl = document.createElement('div');
    itemLinkWrapEl.classList.add('post_wrap-read-more');
    const itemLinkEl = document.createElement('a');
    itemLinkEl.innerText = 'Read more';
    itemLinkEl.setAttribute('href', `post.html?postId=${item.id}`);
    itemLinkWrapEl.appendChild(itemLinkEl);
    itemWrapEl.appendChild(itemLinkWrapEl);
    containerEl.appendChild(itemWrapEl);
  });
};

loadPosts();