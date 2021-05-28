# Twitch Stream Notification
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=AQJUY7YVBS8F6&source=url)  

Javascript chrome / firefox extension to notify when the streamer goes live, with instagram and youtube last posts.


## How it works
Once installed, the script will keep checking for your stream to go live and update the extension when it goes live.

The program will check several times to keep the extension updated !

Don't worry if there's a little delay before it says you're live, that's a Twitch issue.

## Example Notification
![Example Notification](https://i.imgur.com/abpTZJA.png) ![Example Notification](https://i.imgur.com/ZXe5K2M.png)

## Getting Started

Once you've download the sources files, extract it somewhere convenient on your PC.

From there, make it your own by editing a ```config.js``` file with your details. See the below "Config file details" section for how to fill this all out.

When you're all configured, you can test it and publish it. 

## Config file details
The included ```config.js``` should give you a good idea of what the file should look like, but I'll explain where to get all these values in detail.

### Twitch
#### channel_name
This is simply the username/handle of the streamer/broadcaster.  
It can be written in whatever case you would like it to appear in the below Discord message/description placeholders, as it will be converted to lowercase automatically for internal functionality.
#### client_id
This is the Client ID you can get from the [Twitch Developers console.](https://dev.twitch.tv/login)
#### client_secret
This is the Client Secret you can get from the [Twitch Developers console.](https://dev.twitch.tv/login)

If you do not have the above ID and Secret, go to the [Twitch Developers console](https://dev.twitch.tv/login), log in, and register an application.  
You can provide anything for the name and redirect URL, select any category, and upon creation you will get the ID and secret.
![Example Registration](https://i.imgur.com/ZKqJID9.png)

### Instagram
#### accessToken
This is the access token you can get from the [Facebook for Developers.](https://developers.facebook.com/apps/)

If you don't know how to use this website, I suggest you to read [this tutorial](https://www.rgdesign.fr/blog/obtenir-un-token-instagram/).

### Youtube
#### key
This is the key you can get from the [Google cloud platform](https://console.cloud.google.com/projectselector2/apis/dashboard?hl=fr&supportedpurview=project&authuser=1).

If you don't know how to use this website, I suggest you to read [this tutorial](https://developers.google.com/youtube/v3/getting-started?hl=fr).

#### channelId
This information will be available on the same website than the previous.

### Social
Here are your social networks. Please, keep in mind that the extension have been developed for this socialNetworks names and for this number of items. It will work with less links but the design could be destroyed.

### Images
Here are your online / offline extension icons.

## Debugging
If the extension doesn't work for some unknown reason, check your browser console. ( right click, inspect, console )

It should show you any error messages that may have occurred.

## Enjoy!
Feel free to create an issue if you have any problems using this or a feature request if there's something you'd like added!

If you found this useful, please consider donating to keep the development alive! :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=AQJUY7YVBS8F6&source=url)
