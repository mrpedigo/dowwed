# dowwed News & Weather

This application provides news and weather information based on your news source selections and the weather from your location. We don't store (nor want to) any data. Your choices are simply stored as local storage. The desire to create this application came from using many of the other news apps available. Not only do they not honor your source selections and requests to not show stories that don't interest you, but they use and sell your data in exchange for use of the app. I believe the user has the right to select news sources they trust and prefer and getting news and weather information shouldn't sacrifice individual privacy.

For this application, news is being pulled from newsapi.org and weather information is coming from the National Weather Service (weather.gov).

## Getting Started

If you'd like to use this app, simply visit https://dowwed.com and select your sources. The app is mobile friendly so feel free to add to your homescreen for convenience. If you prefer to run a copy of yourself, download this project and host like any normal website. You will need to create a file (js/config.js) and add a key from newsapi.org in the following format:

```
var config = {
  newskey : 'YOUR KEY GOES HERE'
}
```