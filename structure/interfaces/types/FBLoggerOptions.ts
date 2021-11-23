type RGBColor = [number, number, number]

export type FBLoggerType = 'Command' | 'SlashCommand' | 'Event' | 'Ready' | 'Load' | 'MongooseConnection' | 'Deployment'

export type FBLoggerUtilsType = 'Error' | 'Warn'

type FBLoggerOptions = {
    primary: RGBColor
    secondary: RGBColor
} & {
    [key in Lowercase<FBLoggerType>]?: RGBColor
} & {
    [key in Lowercase<FBLoggerUtilsType>]?: RGBColor
}

export default FBLoggerOptions