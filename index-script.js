var bg = document.getElementsByTagName('body')[0];
var username_ip = document.getElementById('search-username-ip');
var timer, timeout = 200, api_key="";

username_ip.onkeypress = function(k) {
    clearTimeout(timer);

    if(k.keyCode==13)
        document.getElementById('search-username-btn').click();

    bg.style.backgroundImage = "url('./media/typing2.gif')";

    timer = setTimeout(function(bg){
        bg.style.backgroundImage = "url('./media/typing2.jpg')";
    }.bind(null, bg), timeout);

};

function loadChannel() {
    var url_0, url_1, url_2, chanID = "", chanName = username_ip.value;
    var data_container = document.getElementById("data-container");
    var pfp = document.getElementById("pfp");
    var username = document.getElementById("username");
    var subscriber_ct = document.getElementById("subscriber-count");
    var view_ct = document.getElementById("view-count");
    var video_ct = document.getElementById("video-count");

    while(api_key=="")
        api_key = prompt("Enter API Key", "");
        
    if(api_key==null)
    {
        api_key = "";
        return;
    }

    // url_0 = 'https://www.googleapis.com/youtube/v3/channels?key='+api_key+'&forUsername='+chanName+'&part=id';
    url_0 = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='+chanName+'&type=channel&key='+api_key+'&maxResults=1';

    $.getJSON(url_0, function(data) {
        //chanID = data.items[0].id;
        chanID = data.items[0].id.channelId;

        pfp.setAttribute('src', data.items[0].snippet.thumbnails.default.url);
        username.innerHTML = data.items[0].snippet.title;

        url_1 = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id='+chanID+'&key='+api_key;

        $.getJSON(url_1, function(data) {
            if(data.items[0].statistics.hiddenSubscriberCount == true)
                subscriber_ct.innerHTML = "Hidden";
            else
                subscriber_ct.innerHTML = data.items[0].statistics.subscriberCount;
            view_ct.innerHTML = data.items[0].statistics.viewCount;
            video_ct.innerHTML = data.items[0].statistics.videoCount;

            subscriber_ct.style.fontFamily = "'Zen Dots', 'Original Surfer', 'Segoe UI', 'Work Sans', sans-serif";
            view_ct.style.fontFamily = "'Zen Dots', 'Original Surfer', 'Segoe UI', 'Work Sans', sans-serif";
            video_ct.style.fontFamily = "'Zen Dots', 'Original Surfer', 'Segoe UI', 'Work Sans', sans-serif";

            data_container.style.display = "block";
            data_container.scrollIntoView();

            // url_2 = 'https://www.googleapis.com/youtube/v3/channels?part=snippet&id='+chanID+'&key='+api_key;

            // $.getJSON(url_2, function(data) {
            //     $('#pfp').attr('src', data.items[0].snippet.thumbnails.default.url);
            //     $('#username').html(data.items[0].snippet.title);

            //     data_container.style.display = "block";
            //     data_container.scrollIntoView();
            // });
        });        
    });
}

// $(document).ready(function () {
//     var access_token = "IGQVJWMG1HZAnVUSzIybDJwcy10TzYwd2JhYVpNT2dzRnhTb1hmY1kxUFVILXQwbWZATRzYyeThQSUR3REZAiWEk4dzc4N2E0WDNJOFUxak1hQTBRMmd6Vk51MFppSmF6Y3JHNWJYNS1YX0NsWDRNWnlwVwZDZD";
//     var url_0, url_1;
    
//     url_0 = "https://graph.instagram.com/me/media?fields=id,caption&access_token="+access_token;

//     $.getJSON(url_0, function (response) {
//         var posts = response.data;
//         for(var i=0;i<posts.length;i++)
//         {
//             url_1 = "https://graph.instagram.com/"+posts[i].id+"?fields=id,media_type,media_url,username,timestamp&access_token="+access_token;
//             $.getJSON(url_1, function (response2) {
//                 var media_url = response2.media_url;
//                 console.log(media_url);
//             });
//         }
//     });
// });


// var chartIndex = 0, charts = document.getElementsByClassName("chart");

// switchChart();

// function switchChartBy(n) {
//     chartIndex += n;
//     switchChart();
// }

// function switchChart() {    
//     if (chartIndex < 0)
//         chartIndex = charts.length-1;
//     else if (chartIndex >= charts.length)
//         chartIndex = 0;

//     for(var i = 0;i < charts.length;i++)
//         charts[i].style.display = "none";
//     charts[chartIndex].style.display = "block";
// }

// var httpClientHandler = new HttpClientHandler()
// {
//     Proxy = new WebProxy("127.0.0.1:8080", false),
//     UseProxy = true
// };

// var client = new HttpClient(handler: httpClientHandler, disposeHandler: true);
// var response = await client.GetAsync("https://www.instagram.com/instagram/?__a=1");


// if ( response.Content.Headers.ContentType.MediaType == "application/json")
// {
//     // Not detect
// // Not detected proxy and good for Instagram

// }
// else
// {
//     // Detected proxy and not good for Instagram
// }