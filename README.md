# webmessenger-starting-form
Enables a custom launcher and input form to gather use information before starting the converstaion.

Many people I talk to would like to have an "input form" where users can enter in custom details about their interaction so it can be used for routing purposes as well as flow DataActions to look into 3rd part Dbs etc. While in WebMessaging this is normally done either through data collected in the website using GPE or conversationally through the messenger. But sometime people prefer a more traditional approach to startign a conversation. For this I have created a custom [Launcher](https://developer.genesys.cloud/commdigital/digital/webmessaging/messengersdk/pluginExamples#build-your-own-messenger-launcher) but instead of showing the convesation or homem screen first if there is no existing conversation I am showing an input form.

This data is then sent into Genesys Cloud through the [DataPlugin](https://developer.genesys.cloud/commdigital/digital/webmessaging/messengersdk/SDKCommandsEvents/databasePlugin#database-set) which is then able to be accessed inside architect.

Input User Interface:
![](/docs/images/inputForm.png?raw=true)

Getting data in the flow:
![](/docs/images/architect.png?raw=true)

To do this you simply need to have your WebMessenger Deployment setup "Hide" the default launcher as well as not using the "Home" screen. If you must use the home screen you will need to change some of the code to suite that use case.

![](/docs/images/deploymentConfig.png?raw=true)

First you will need to update the

```
const deploymentId = 'ENTER_YOUR_DEPLOYMENTID'
```
with your webmessenger deploymentId. Optionally you can also set the HEX color code to match the widget. I ahve it set to a default of black or #000000
```
const hexColor = '#000000'
```

To add this script to your existing deployment on the webpage you will need to add it as a script tag in the header of the page just below the default WebMessager snippet.

```
<script src="inviteform.js" defer></script>
or if using terser:
<script src="inviteform.min.js" defer></script>
```

Ensure you have the "defer" as it needs to laod after the normally snippet as this uses the Genesys SDK to interact with the widget.

  ## TERSER NOTE:
I have included a VSCode "Task" for minifying and uglifying the js file in the "private" folder and it will output it into the "public folder. This is done in my case through [terser](https://terser.org/) this then gives you a .min.js file to use for best practice in production.

If you are not familuar with VSCode Tasks you can find info [here](https://code.visualstudio.com/docs/editor/tasks) in short they are a GREAT way to build out scripts to automate builds of items rather then manually running them each time.

To manually do this you can run the below script if you ahve terser installed

```
terser ./private/inviteform.js -c -m  -o ./public/inviteform.min.js
```
