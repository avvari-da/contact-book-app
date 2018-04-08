export function configureBackend() {
    let realFetch = window.fetch;
    const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // pass through any requests not handled above
            realFetch(baseUrl + url, opts).then(response => resolve(response));
        });
    }
}