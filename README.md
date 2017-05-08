# inconspicuousRedditBot

## An incredibly simple Discord and Reddit bot.


It doesn't do very much.

------

### Features:


+ Scrapes a provided subreddit for the link of each post

+ Works with pictures, since discord embeds them from the link

+ Only sends messages in a provided text channel (is that a feature?)

+ Can send a new link periodically (user defined interval)

------

### Things you need to know:


#### Environment Variables:


- MSG: the command being listened for (sends a single link)
..- For example: "/bot"
- CHANNEL_ID: the channel to which it will send messages
..- Protip: enable developer mode in discord, right-click the channel, click "Copy ID"
- TOKEN: the Discord bot user token
..- I hope you weren't expecting this to be provided...
- UBREDDIT: the subreddit to be scraped
..- I recommend "/r/awwnime/" ...if you're into that sorta thing
- INTERVAL: the time between each automatically sent link
..- Measured in milliseconds


#### Autosend:


To enable, send the message '$MSG autosend', where '$MSG' is the environment variable selected above. To disable, repeat the process. The bot will even tell you what you just did! In case you hadn't already realized!


#### Permissions:


There are no permissions. How's that for simple?

------

### Coming Soon&trade;:

- Exception handling! Isn't that exciting?!