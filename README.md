<h1 align="center" style="position: relative;">
    FadBot
</h1>

<h2 align="center" style="position: relative;">
    A Multipurpose Open-Source Bot in JavaScript
</h2>

# About The Project
![Logo](./public/logo.png)

FadBot is a multipurpose and open-source discord bot currently being developed using javascript. Currently at the time of `v0.x.x` it doesn't really do much, but i will try my best to frequently add more features.

Here are some things that you can expect from the bot:

* None of the main features of the bot will be put behind a paywall.
* Might have some fun minigames that you could play with your friends!
* Will implement some of the new features of the Discord API such as Context and Dropdown Menus, Buttons, Ephemeral Messages (and hopefully slash commands and threads).

## Built With
* [discord.js](https://github.com/discordjs/discord.js)

## Devs
* Fad The Chad

## Version
**Current Version:** v0.12.1

See `CHANGELOG.md` for all changes

## Trello
If you want to see some of the ideas/features that the bot could get, check out our [Trello Page](https://trello.com/b/4qiwoazB/fadbot-board)!

# Get Started

## Requirements
Node `v16.6+` is required. You can install it at their [official site](https://nodejs.org/en/download/).

## Installation

1. Clone this repo

1. Install the NPM Packages
    ```
    npm install
    ```

1. Make a `config.json` file in the root of the directory and add:
    ```json
    "token": "Your Token Here",
    "prefix": "Your Prefix Here",
    "devs": ["devId1", "devId2"],
    "clientId": "Your Client ID Here",
    "guildId": "Your Guild ID Here"
    ```
   - `token` is the Bot's Token. You can recieve it from Discord's Developer Portal.
   - `prefix` is the bot's prefix.
   - `devs` stores the ID of discord users that can run secret dev commands. You can add as many devs as you want but its recommended to keep it small.
   - `clientId` is your Client's ID. You can recieve it from Discord's Developer Portal. [For Slash Cmds]
   - `guildId` is your Testing Guild/Server's ID. [For Slash Cmds]

# Contributing
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project.

1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).

1. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).

1. Push to the Branch (`git push origin feature/AmazingFeature`).

1. Open a pull request. We will review the changes (and hopefully merge it!).

Check out `.github/CONTRIBUTING.md` before doing the above!

# Code Of Conduct
We expect you to be respectful with each other and create a happy environment! See `.github/CODE_OF_CONDUCT.md` for more details!

# License
Distributed under the `GNU GPLv3` License. See [`LICENSE.txt`](https://github.com/FadTheChad/FadBot/blob/main/LICENSE.txt) for more information.

# Contact
Our Support Discord Server: https://discord.gg/3tEGymY5pE
