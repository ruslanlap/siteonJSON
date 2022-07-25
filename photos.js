const loadAlbumPhotos = async () => {
	const albumId = new URL(window.location.href).searchParams.get('albumId');

	// container
	const containerEl = document.querySelector('.container');

	if (!albumId) {
		// render error message
		const errorEl = document.createElement('div');
		errorEl.classList.add('error-message');
		errorEl.innerText = 'No photo available';
		containerEl.appendChild(errorEl);
	} else {
		// loading el
		const loadingEl = document.createElement('div');
		loadingEl.classList.add('loading');
		loadingEl.innerText = 'Loading...';
		containerEl.appendChild(loadingEl);

		// fetch photos data
		const photoResponse = await fetch(
			`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
		);
		const photoData = await photoResponse.json();
		// photoData = photoData.slice(0, 20);

		//title = photo
		const photoTitle = document.createElement('h3');
		photoTitle.classList.add('comments_wrap-title');
		photoTitle.innerText = 'Photos:';

		//photo data
		const photosWrapper = document.createElement('div');
		photosWrapper.classList.add('photos-wrapper');

		containerEl.appendChild(photoTitle);
		containerEl.appendChild(photosWrapper);

		photoData.forEach(el => {
			const photoContainer = document.createElement('div');
			photoContainer.classList.add('photos');
			photoContainer.innerHTML = `<div class="photo"><img src="${el.url}" width="200" alt="photo" />${el.title}</div>`;
			photosWrapper.appendChild(photoContainer);
		});

		// remove loading el
		loadingEl.remove();
	}
};
loadAlbumPhotos();
