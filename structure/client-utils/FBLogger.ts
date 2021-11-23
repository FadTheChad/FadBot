// noinspection FunctionNamingConventionJS

import chalk from 'chalk'
import FBLoggerOptions, { FBLoggerType } from '../interfaces/types/FBLoggerOptions'

/*
 Ready - Yellow / Black
 Event - Green
 Command - Light Orange
 Warn - Glowing Orange
 Err - Blue | Purple
 Load - Light Blue
 and etc
*/

class FBLogger {
    public colours: FBLoggerOptions

    constructor(options: FBLoggerOptions) {
        this.colours = {
            primary: options.primary,
            secondary: options.secondary,
            ready: options.ready ?? options.primary,
            load: options.load ?? [66, 215, 245],
            command: options.command ?? [250, 169, 70],
            slashcommand: options.slashcommand ?? [247, 5, 215],
            event: options.event ?? [5, 247, 82],
            error: options.error ?? [0, 0, 255],
            warn: options.warn ?? [255, 174, 0],
            mongooseconnection: options.mongooseconnection ?? [77, 179, 61],
            deployment: options.deployment ?? [66, 215, 245]
        }
    }

    public log(type: FBLoggerType, message: any, tab?: boolean, newLineBefore?: boolean) {
        let colourOfType = this.colours[type.toLowerCase() as keyof FBLoggerOptions]!

        let chalkColour = chalk.rgb(...colourOfType)

        let typeTitle = chalkColour(type.trim().split(/(?=[A-Z])/).join('_').toUpperCase())

        if (type === 'Ready') {
            chalkColour = chalk.rgb(...this.colours.secondary).bgRgb(...colourOfType)
        }

        let data = (newLineBefore ? '\n' : '') + (tab ? '\t' : '') + '[' + typeTitle + '] ' + chalkColour(message)

        console.log(data)
    }

    public error(err: any, errType?: FBLoggerType) {
        let errColourArray = this.colours.error!
        let errColour = chalk.rgb(...errColourArray)

        let data = '[' + errColour(errType ? (errType.toUpperCase() + '_ERR') : 'ERR') + '] ' + errColour(err)

        console.log(data)
    }

    public warn(err: any, warnType?: FBLoggerType) {
        let warnColourArray = this.colours.warn!
        let warnColour = chalk.rgb(...warnColourArray)

        let data = '[' + warnColour(warnType ? (warnType.toUpperCase() + '_WARN') : 'WARN') + '] ' + warnColour(err)

        console.log(data)
    }
}

export default FBLogger