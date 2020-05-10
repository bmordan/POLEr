const POLEr = require('../lib')
const publicRoot = file => `${__dirname}/public/${file}.html`

module.exports = {
    index: (req, res) => {
        res.sendFile(publicRoot('index'))
    },
    all: async (req, res) => {
        try {
            const {nodes, edges} = await POLEr.all()
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
        console.log('server gets ', req.params.id)
        try {
            const {nodes, edges} = await POLEr.expandNodeById(req.params.id)
            res.send({nodes, edges})
        } catch(err) {
            res.send(err)
        }       
    }
}