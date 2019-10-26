const router = require("express").Router();
const NewsAPI = require("newsapi")
const dotenv = require("dotenv")
const axios = require('axios');
const qs = require("querystring");
dotenv.config();
const napi = new NewsAPI('3b9d66f2d1894a3c9480f2343d80cf64')

router.get('/:user_id(\\d+)?', async (req, res) => {
    let responses = [];
    // ? at the end of the req parameter makes it an optional parameter. 
    // so this router will work for /v1/news/ and work also for /v1/news/1.  
    // the \\d+ is a regular expression which will work only for digit if the parameter is present. 
    let prefStr = ""
    if (req.params.user_id) {
        //DB call here to get user preference

        let user = require("../../../models/user");
        User = new user();
        let preferences = await User.getPreference(req.params.user_id);
        preferences.forEach(p => {
            prefStr += p + " OR "
        })
        console.log(prefStr);
        prefStr = prefStr.substring(0, prefStr.length - 3);
        console.log(prefStr);
    }

    //call to newsapi.org
    let results = await napi.v2.everything({
        q: prefStr != '' ? prefStr : 'new zealand',
        language: 'en',
        pageSize: 10,
        page: 1,
        sortBy: 'popularity',
        source: 'bbc-news'
    })
    console.log(results.articles.length)
    
    //since the api's developer plan doesn't send the whole content I will be scraping the content from the URL using cheerio.io. This will decrease the performance but will give better results. 

    responses = await getResults(results.articles);
    
    //return response of json of all the news. 
    
    console.log(responses)
    res.send(responses);
})

let getContent = async url => {
    //scraping starts here.
    const cheerio = require('cheerio');
    let response = await axios.get(url);
    let $ = cheerio.load(response.data);
    let articleText = "";
    $('p').each((i, e) => {
        text = $(e).text().length > 200 ? $(e).text() : "";
        articleText += text + " ";
    });
    return articleText;

    //scraping ends here.
}

let getSummary = async content => {
    let sent = Math.ceil((content.split(' ').length * 0.5) / 100)
    let data = {
        key: '2099c3c3e0d0ce3996440334ff186910',
        txt: content,
        sentences: sent > 6 ? 6 : sent,
    }
    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    let results = await axios.post("https://api.meaningcloud.com/summarization-1.0", qs.stringify(data), config);
    return results.data.summary;
}

let getResults = async array =>{
    let results = [];
    let i = 0;
    for(const value of array){
        if (i == 0) {
            // getContent is a function that performs scraping.
            let content = await getContent(value.url);
            console.log("::::::::NEW:::::::" + "\n" + content + "length: " + content.split(' ').length);
            //call to summarization api
            let summary = await getSummary(content);
            let o = {
                image: value.urlToImage,
                headline: value.title,
                url: value.url,
                summary
            }
            results.push(o);
        }
        i+=1;
    }
    return results;
}

module.exports = router;