var express = require('express');
const createApi = require('./createApi');
const path = require('path');
const TorrentSearchApi = require('torrent-search-api');
const app = express();

const port = 8080;


const ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

module.exports = createApi(path.join(__dirname, './lib/providers'));


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

app.listen(port, ip,() => console.log(`Example app listening on port ${port}!`))


async function search(query) {
    const torrents = await TorrentSearchApi.search(query,'',20);
	return torrents;
}
module.exports=app;
