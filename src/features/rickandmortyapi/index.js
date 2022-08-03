export const getPageFromURI = (uri) => {
    if ( uri ) {
        var url = new URL(uri)
        var urlParams = new URLSearchParams(url.search);
        var page = urlParams.get('page');
        return page;
    } else return null;
}

export const getEpisodeFromURI = (uri) => {
    if (uri) {
        var url = new URL(uri);
        var episode = url.pathname.split("/")[3];
        return episode
    } else return null;
}