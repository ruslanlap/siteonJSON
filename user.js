const loadUserInfo = async () => {
	const userId = new URL(window.location.href).searchParams.get('userId');

	// container
	const containerEl = document.querySelector('.container');

	if (!userId) {
		// render error message
		const errorEl = document.createElement('div');
		errorEl.classList.add('error-message');
		errorEl.innerText = 'No user info founded!';
		containerEl.appendChild(errorEl);
	} else {
		// loading el
		const loadingEl = document.createElement('div');
		loadingEl.classList.add('loading');
		loadingEl.innerText = 'Loading...';
		containerEl.appendChild(loadingEl);

		// fetch user data
		const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
		const userData = await userResponse.json();

		// fetch todo data
		const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
		let todoData = await todoResponse.json();
		todoData = todoData.splice(0, 8);

		// fetch user album data
		const albumResponse = await fetch(
			`https://jsonplaceholder.typicode.com/users/${userId}/albums`,
		);
		let albumData = await albumResponse.json();
		albumData = albumData.splice(0, 5);

		// get user details
		// container render title
		const titleElement = document.createElement('h1');
		titleElement.innerHTML = userData.name;
		titleElement.classList.add('posts-title');
		containerEl.appendChild(titleElement);

		// container render username
		const userWrapEl = document.createElement('article');
		// userWrapEl.classList.add('post_wrap');
		const userElement = document.createElement('ul');
		userElement.classList.add('post_wrap');

		// render list of element user info

		userElement.innerHTML = `
    <li><span class="post_wrap-text_span">Username:</span> ${userData.username}</li>
    <li><span class="post_wrap-text_span">Email:</span> <a href="mailto:${userData.email}">${userData.email}</a></li>
    <li><span class="post_wrap-text_span">Address:</span> <a href="https://www.google.com/maps/search/${userData.address.geo.lat},${userData.address.geo.lng}">${userData.address.suite}, ${userData.address.street},${userData.address.city}, ${userData.address.zipcode}, <br>${userData.address.geo.lat},
    ${userData.address.geo.lng}</a></li>
    <li><span class="post_wrap-text_span">Phone:</span> <a href="tel:${userData.phone}">${userData.phone}</a></li>
    <li><span class="post_wrap-text_span">Website:</span> <a href="${userData.website}">${userData.website}</a></li>
    <li><span class="post_wrap-text_span">Company:</span> ${userData.company.name}</li>
    `;

		userWrapEl.appendChild(userElement);
		containerEl.appendChild(userWrapEl);

		// TO-DO
		const todoWrapper = document.createElement('div');
		const todoTitleEl = document.createElement('h3');
		todoTitleEl.classList.add('comments_wrap-title');
		todoTitleEl.innerText = 'TODOs:';
		todoWrapper.appendChild(todoTitleEl);
		//sort to do complete or not completed
		todoData
			.sort((a, b) => Number(b.completed) - Number(a.completed))
			.forEach(element => {
				const todoWrapElement = document.createElement('div');
				todoWrapElement.classList.add('todo_wrap');
				const todoTitleEl = document.createElement('div');
				todoTitleEl.classList.add('todo_title');
				todoTitleEl.innerText = element.title;
				if (element.completed) {
					todoWrapElement.classList.add('completed');
				}
				todoWrapElement.appendChild(todoTitleEl);
				todoWrapper.appendChild(todoWrapElement);
			});
		containerEl.appendChild(todoWrapper);

		//wrapper for title abum and albums
		const titleContainer = document.createElement('div');
		titleContainer.classList.add('comments_wrap');

		//album
		const albumWrapper = document.createElement('div');
		albumWrapper.classList.add('albums_wrap');
		const albumTitleEl = document.createElement('h3');
		albumTitleEl.classList.add('comments_wrap-title');
		albumTitleEl.innerText = 'Albums:';
		titleContainer.appendChild(albumTitleEl);

		//render album
		albumData.forEach(albums => {
			const album = document.createElement('div');
			album.classList.add('album');
			const albumAddresses = document.createElement('a');
			albumAddresses.classList.add('album');
			albumAddresses.setAttribute('href', `photos.html?albumId=${albums.id}`);
			const albumTitleElement = document.createElement('div');
			albumTitleElement.innerText = albums.title;
			albumAddresses.appendChild(albumTitleElement);
			album.appendChild(albumAddresses);
			albumWrapper.appendChild(album);
		});

		containerEl.appendChild(titleContainer);
		containerEl.appendChild(albumWrapper);

		// remove loading el
		loadingEl.remove();
	}
};
loadUserInfo();
