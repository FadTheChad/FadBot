import { IGuildCache } from '../structure/interfaces/db/IGuild'

const convertMapToString = (m: Map<string, IGuildCache | object>) => {

    let mapEntries = [...m.keys()]

    return '{\n' + mapEntries.map(k => {
        return '    ' + k + ' => ' + JSON.stringify(m.get(k), null, 2)
    }).join(',\n') + '\n}'
}

export default convertMapToString