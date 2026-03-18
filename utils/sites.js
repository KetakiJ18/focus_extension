const distractingSites = [
    "youtube.com",
    "instagram.com",
    "twitter.com",
    "facebook.com",
    "reddit.com"
];

function isDistractingSite(url) 
{
    return distractingSites.some(site => url.includes(site));
}