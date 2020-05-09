const POLEr = require('../lib')
const publicRoot = file => `${__dirname}/public/${file}.html`

module.exports = {
    index: (req, res) => res.sendFile(publicRoot('index')),
    all: async (req, res) => {
        try {
            const {nodes, edges} = await POLEr.all()
            res.send({nodes, edges})
        } catch(err) {
            res.send(err)
        }
    }
}