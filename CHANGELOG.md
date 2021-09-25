# Versions

# 0.12.0 9/25/21
- Context Menus handler has been fully set up and ready for use!
- Added a ctx-content command
- Added a ctx-avatar command
- Fixed help cmd
- `messageCreate.js` had a weird whitespace so removed that to make the code look more clean.

## 0.11.0 9/24/21
- The Bot Handlers are now in a seperate folder.
- Added a demo ContextMenu check in `interactionCreate.js`. 
- Added a unmute command
- Added a userinfo command
- Deploy command also uses the new Handler now.
- Bot now replies if you start your message with pinging it.
- Fixed usage in avatar command.
- Fixed the DMing code in ban and mute command.

## 0.10.0 9/23/21
- Advanced ban cmd is here with a optional timer now!
- Added a unban command
- Added a mute command
- Added JSDoc to the fbEmbed system
- Removed useless fetching of roles, channels, and emojis and used cache instead since they are already cached.
- Something special in index.js ;)

## 0.9.1 9/22/21
- Fixed >ban and >kick where a invalid member was defined and bot did not seem to catch.
- Fixed indentation in >serverinfo.

## 0.9.0 9/21/21
- Advanced Help command is here with flags and dropdown menus!
- Added a roll command
- Added a serverinfo command which is extremely slow
- Improved the aliases system in `messageCreate.js`.
- Added a perms check in `interactionCreate.js`
- Added a test /dev command

## 0.8.0 9/20/21
- Slash commands are here! (kinda)
- Implemented the ability to use merged slash command and normal command by using different functions.
- Added a demo ping command.
- Added a in-construction dropdown help menu function but havent tested nor used it yet.
- Fixed the perms check which caused moderation cmds to be evaded (very scary).
- Added a max limit to the slowmode command.

## 0.7.0 9/19/21
- Added an whole new fbEmbed system with types which is now implemented in almost every file which uses a success/error embed. Check `utils/fbEmbed-utils.js` for the system.
- Now whenever a command file or an event file is loaded, it gets logged on the console.
- Running a command now gives details in the console.
- Improved the error message that gets logged on to a console whenever a command is note ran successfully.

## v0.6.0 9/18/21
- added an 8ball command
- added a new role utility command
- added a devhelp command that shows the list of dev cmds
- added a purge command
- added a non-beginner friendly embed command. Gonna add a basic version later.
- added a slowmode command
- The help command for searching a specific cmd through an alias is now case insensitive.
- The bot now has a presence on its profile.

## v0.5.0 9/17/21
- added a avatar command
- added a say command
- added a github command
- added a dev guilds command
- fixed dev.js aliases

## v0.4.0 9/16/21
- Added a test dev command and improved the dev check. Made it so that the help command does not show the dev commands.
- Added a kick command
- Added an new utility command category and a new utility command of >channel.

## v0.3.1 9/15/21 - 2
- Accidently used the default emojis while i had my own special ones. Fixed.

## v0.3.0 9/15/21
- added a botinfo cmd
- implemented command aliases and usage
- help command now has an option to show all commands in a specific category, and in the case of showing one specifc command, it now shows that command's usage and aliases aswell (if any)

## v0.2.0 9/14/21
- added a help cmd
- improved ping and ban cmd
- added categories in commands

## v0.1.0 (Where it all began)
- added a ping and test ban cmd (which does not ban yet)
- added a simple event and command handler (~~stolen~~ inspired from the d.js guide)
