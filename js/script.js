document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(event) {
	// Prevent form from submitting
	event.preventDefault();

	let siteName = document.getElementById('siteName').value;
	let siteUrl = document.getElementById('siteUrl').value;

	if (!validateForm(siteName, siteUrl)) {
		return;
	}

	let bookmark = {
		name: siteName,
		url: siteUrl
	};

	// Test if bookmarks is null
	if (localStorage.getItem('bookmarks') === null) {
		
		let bookmarks = [];

		bookmarks.push(bookmark);

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	} else {
		
		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		
		bookmarks.push(bookmark);

		
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	// Clear form
	document.getElementById('myForm').reset();

	fetchBookmarks();

}

function deleteBookmark(url) {
	
	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for (let i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].url == url) {
			// Remove from array
			bookmarks.splice(i, 1);
		}
	}

	// Re-set back to local storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();
}

function fetchBookmarks() {
	
	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// Get output id
	let bookmarksResults = document.getElementById('bookmarksResults');

	// Build output
	bookmarksResults.innerHTML = '';
	for (let i = 0; i < bookmarks.length; i++) {
		let name = bookmarks[i].name;
		let url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">' + 
									  '<h3>' + name + 
									  ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
									  ' <a onclick="deleteBookmark(\''+ url +'\')" class="btn btn-danger" href="#">Delete</a> '
									  '</h3>' + 
									  '</div>';
	}
}

function validateForm(siteName, siteUrl) {

	if (!siteName || !siteUrl) {
		alert('Please fill in the form');
		return;
	}

	let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	let regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
		alert('Please use valid URL');
		return;
	}

	return true;
}