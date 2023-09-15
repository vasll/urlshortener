document.addEventListener('DOMContentLoaded', () => {
    const submitFormButton = document.getElementById('shorturl-button');
    const urlShortenAlert = document.getElementById('url_shorten_alert');
    const urlShortLink = document.getElementById('url_short_link');
    const urlLongLink = document.getElementById('url_long_link');

    submitFormButton.addEventListener('click', function (e) {
        e.preventDefault();
        const urlInput = document.getElementById('url_input').value;

        // Send the AJAX request
        fetch('api/shorturl', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({url: urlInput}),
        })
            .then(response => response.json())
            .then(data => {
                const shortenedUrl = window.location.href + `api/shorturl/${data.short_url}`;
                urlShortenAlert.classList.remove('invisible');
                urlShortenAlert.classList.add('visible');
                urlShortLink.href = shortenedUrl;
                urlShortLink.innerText = shortenedUrl;
                urlLongLink.href = data.original_url;
                urlLongLink.innerText = data.original_url;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});