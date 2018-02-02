// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmark from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    // Prevent for form submitting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop thought bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmark from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    var amount = document.getElementById('amount');

    //Build Output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML +=   '<tr>' +
                                            '<td>' +
                                                '<div class="container-fluid">' +
                                                    '<div class="row">' +
                                                        '<div class="col-sm-6 col-xs-6">' +
                                                            '<h4 class="webTitle">' + name + '</h4>' +
                                                        '</div>' +
                                                        '<div class="col-sm-6 col-xs-6">' +
                                                            '<div class="right">' +
                                                                '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
                                                                '<a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger">Delete</a> ' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</td>' +
                                        '</tr>';
    }

    // Get total from localStorage
    amount.innerHTML = 'Total: ' + bookmarks.length;
}


function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }

    return true;
}