const POLEr = require('../lib')
const publicRoot = file => `${__dirname}/public/${file}.html`

module.exports = {
    index: (req, res) => {
        res.sendFile(publicRoot('index'))
    },
    nodeById: async (req, res) => {
        try {
            const {nodes, edges} = await POLEr.nodeById(req.params.id)
            res.send({nodes, edges})
        } catch(err) {
            res.send(err)
        }
    },
    locationByName: async (req, res) => {
        try {
            const name = decodeURIComponent(req.query.name)
            const {nodes, edges} = await POLEr.locationByName(name)
            res.send({nodes, edges})
        } catch(err) {
            res.send(err)
        }
    },
    personByName: async (req, res) => {
        try {
            const name = decodeURIComponent(req.query.name)
            const {nodes, edges} = await POLEr.personByName(name)
            res.send({nodes, edges})
        } catch(err) {
            res.send(err)
        }
    },
    expandNodeById: async (req, res) => {
        try {
            const {id, label} = req.params
            const {nodes, edges} = await POLEr.expandNodeById(id,label)
            res.send({nodes, edges})
        } catch(err) {
            res.send(err)
        }       
    }
}