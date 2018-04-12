const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require('shortid')
const isUri = require('isuri')

// Set some defaults (required if JSON file is empty)
db.defaults({ list: [] })
    .write()

// Helper function to generate unique ids
const generateId = () => {
    const id = shortid.generate()

    const item = db
        .get('list')
        .find({ id: id })
        .value()

    if (item) {
        generateId()
    } else {
        return id
    }
}

// Returns the current list of shortened URLs
exports.fetchList = (req, res) => {
    const list = db
        .get('list')
        .cloneDeep()
        .value()

    res.status(200).send(list.reverse())
}

// Handles the search of a given id
exports.fetchUrl = (req, res) => {
    // Search DB for 
    const item = db
        .get('list')
        .cloneDeep()
        .find({ id: req.params.id })
        .value()

    // if id exists in DB returns object otherwise returns error
    item ? res.status(200).send(item) : res.status(404).send('URL not found')
}

// Handles the creation of new URLs
exports.createUrl = (req, res) => {
    let url = req.body.url
    const regex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi

    // validates url
    if (regex.test(url)) {
        // if url doesn't contain http or https, adds to url to allow redirect
        url = url.indexOf('http') === -1 ? 'http://' + url : url
        
        // generates a unique id
        const id = generateId()

        // add to DB
        const list = db
            .get('list')
            .push({
                id: id,
                url: url,
                creationDate: new Date()
            })
            .write()

        // server response with new list
        res.status(200).send(list.reverse())
    } else {
        // if url is not valid, returns error
        res.status(400).send('Unable to shorten that link. It is not a valid url.')
    }
}