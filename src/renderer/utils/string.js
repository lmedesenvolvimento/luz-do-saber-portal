/* eslint-disable no-useless-escape */

export function parseSTRFile(text){
    let matches
    const pattern = /(\d+)\n([\d:,\‚]+)\s+-{2}\>\s+([\d:,\‚]+)\n([\s\S]*?(?=\n{2}|$))/gm

    init(pattern)

    if (typeof (text) != 'string')
        throw 'Sorry, Parser accept string only.'

    var result = []

    if (text == null)
        return null

    text = text.replace(/\r\n|\r|\n/g, '\n')

    while ((matches = pattern.exec(text)) != null) {
        result.push(toLineObj(matches))
    }
    return result
}

function init(pattern){
    return new RegExp(pattern)
}

function toLineObj (group) {
    return {
        line: group[1],
        startTime: group[2].replace(/([,\‚]+)([\d]+)/gm, ''),
        endTime: group[3].replace(/([,\‚]+)([\d]+)/gm, ''),
        text: group[4]
    }
}