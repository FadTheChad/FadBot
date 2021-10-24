import FadBotClient from './structure/Client'
import config from './config.json'
import options from './utils/options'

const client = new FadBotClient(options)

client.start(config.token, config.mongoURI)
