var bg = document.getElementsByTagName('body')[0];
var username_ip = document.getElementById('search-username-ip');
var timer, timeout = 200, api_key="";

username_ip.value = "";

username_ip.onkeypress = function(k) {
    clearTimeout(timer);

    if(k.keyCode==13)
        document.getElementById('search-username-btn').click();

    bg.style.backgroundImage = "url('./media/typing2.gif')";

    timer = setTimeout(function(bg){
        bg.style.backgroundImage = "url('./media/typing2.jpg')";
    }.bind(null, bg), timeout);

};

function loadYTChannel(containerIndex) {
    var url_0, url_1, chanID = "", chanName = username_ip.value;
    var data_container = document.getElementsByClassName("data-container")[containerIndex]; 
    var profile_summaries = data_container.getElementsByClassName("profile-summary");
    var link = document.getElementById("yt-link");
    var pfp = document.getElementById("yt-pfp");
    var username = document.getElementById("yt-username");
    var subscriber_ct = document.getElementById("yt-subscriber-count");
    var view_ct = document.getElementById("yt-view-count");
    var video_ct = document.getElementById("yt-video-count");
    var desc = document.getElementById("yt-description");
    var i;

    while(api_key=="")
        api_key = prompt("Enter API Key", "");
        
    if(api_key==null)
    {
        api_key = "";
        return;
    }

    url_0 = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='+chanName+'&type=channel&key='+api_key+'&maxResults=1';

    $.getJSON(url_0, function(data) {
        
        chanID = data.items[0].id.channelId;

        pfp.setAttribute('src', data.items[0].snippet.thumbnails.default.url);
        link.setAttribute('href', "https://www.youtube.com/channel/"+chanID);
        username.innerHTML = data.items[0].snippet.title;
        desc.innerHTML = data.items[0].snippet.description;

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
            for(i=0;i<profile_summaries.length;i++)
                profile_summaries[i].style.display = "flex";
            data_container.scrollIntoView({behavior:'smooth'});
        });        
    });
}

function search() {
    var i, data_containers = document.getElementsByClassName("data-container");

    for(i=0;i<data_containers.length;i++)
        switch(i) {
            case 0:
                loadYTChannel(i);
                break;
            //add cases as platforms are appended
        }
}