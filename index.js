var express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const createApi = require('./createApi');

module.exports = createApi(path.join(__dirname, './lib/providers'));
const TorrentSearchApi = require('torrent-search-api');

app.get('/search/:keyword', function (req, res, next) {
    var query = req.params.keyword;
TorrentSearchApi.enablePublicProviders();
try{
search(query).then(result => {
   res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(result,null, 4));
})
}catch(err){
console.log(err);
}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


async function search(query) {
    const torrents = await TorrentSearchApi.search(query,'',20);
	return torrents;
}

