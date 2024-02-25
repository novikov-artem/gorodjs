export const GorodResponseTypes = {
    raw: 'text',
    html: 'html',
    json: 'json'
}

export const DocumentTypes = {
    [GorodResponseTypes.json]: 'application/json',
    [GorodResponseTypes.html]: 'text/html',
    [GorodResponseTypes.raw]: 'text/plain',
}
