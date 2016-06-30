define(function() {
    return new Promise(function(resolve, reject) {
        window.gapi_loaded = function() {
            gapi.client.load('drive', 'v3', function() {
                resolve(gapi);
                console.log('drive loaded');
            });
        };
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://apis.google.com/js/client.js?onload=gapi_loaded';
        document.getElementsByTagName('head')[0].appendChild(script);
    });
});