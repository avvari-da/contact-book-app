export function configureBackend() {
    let realFetch = window.fetch;
    let baseUrl = 'http://localhost:3000';
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // pass through any requests not handled above
            realFetch(baseUrl + url, opts).then(response => resolve(response));
        });
    }
}