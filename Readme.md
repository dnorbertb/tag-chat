# Tag Chat

  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#try-me">Try Me</a></li>
        <li><a href="#additional-information">Additional Information</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
  </ol>

## About The Project

This app is inspired by [Filip Legierski](https://dribbble.com/kedavra) - [Riotters](https://dribbble.com/riotters) design. Check it on [Dribbble](https://dribbble.com/shots/16118990-Tagchat-Mobile-Application) and [Behance](https://www.behance.net/gallery/123874177/Tagchat/)

[![Tag Chat Screen Shot][product-screenshot]](https://dribbble.com/shots/16118990-Tagchat-Mobile-Application)

Goal of this project was just to build the design visible on the image above but during the coding process I decided to add to it some minimal functionality. This is of course not real app, this will be not compiled and used but it's now possible to send and receive messages between devices.

### Built With

- React Native
- Redux
- Node.js
- Express.js and Server-Sent Events

### Try Me

This app and API is hosted on my private VPS server and can be tried on your device using Expo Go App. 
To try the app please open `exp://srv18.mikr.us:40050` or scan the QR code below:

![QR Code Image][qrcode-screenshot]

On Android you need to do that in Expo Go App, on iOS you can just use camera app or web browser/Safari. 

VPS server is quite slow so bundling and downloading app can be quite long. Development server restarts every 24 hours so after restart, app will bundle longer, even up to 1-2 minutes. Please follow on screen instructions to run the app. When You register yourself in app, your username will be visible on "Menu" Screen, in right bottom corner. You can give it to someone to test the chat or use Postman to send message to yourself.

#### Postman how to

Endpoint url: `http://srv18.mikr.us:40049/message`, method `POST`, request body type: `JSON`. Content:

```js
{
    "senderId": "Postman", // Name of the sender, this will show up on messages screen
    "receiverId": "User_2976", // ID of user you want to send message to
    "content": "This is your message content"
}
```

Put your username in as receiver id and you should receive the message on your device.

NB. If you test app on android device, you should probably receive notification also if app is in the background, before it's get killed in memory. iOS devices will receive notifications only if app is opened.

### Additional information

As I wrote before it's not the real app, it's just preview/demo. I built that for fun in approx 40 hours. Backend is written in one file, not protected and doesn't have any database connected to store the data. There is many things which can be improved but since it's not the real project, I didn't care too much. Like for example message request body above. It should contain much more stuff. As I remember, adding messages should be done better in Redux because it's not so straight forward right now. Notifications were made just to work. It would need more time to make this app running in the background and make notifications looks nice on Android. But some thing's are also prepared like for real app. I didn't check how can I store data in app but I heard something about SQLite. I think SQLite should be connected to Redux instead of dummy data. SSE are emitting only info about new messages, and messages are downloaded by another request because I think it would be easier to add authentication this way. There are also some comments in the code. I want to focus on other things so I will not spend more time on this project.


## Getting Started 

This is an example of how you may give instructions on setting up your project locally.
You need to have Node.js installed to run this.

### Installation


1. Clone the API repo, install dependencies and run
   ```sh
   git clone https://github.com/dnorbertb/tag-chat-api.git
   cd tag-chat-api
   npm install
   npm run build
   npm start
   ```
2. Clone this repo and install dependecies 
   ```sh
   git clone https://github.com/dnorbertb/tag-chat.git
   cd tag-chat
   npm install
   npm start
   ```
3. Change API address
   ```js
   // ./src/configs/apiConfig.ts
   // Change this to Your local API address. 
   // You will need your local IP address
   // 127.0.0.1 or localhost will probably not work
    export const apiAddress = 'http://srv18.mikr.us:40049';
   ```
4. Scan QR code from command line to open project in Expo Go App.


-- end -- 
:)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: screenshots/app_design.png
[qrcode-screenshot]: screenshots/code.png
