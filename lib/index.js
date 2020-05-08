const neo4j = require('neo4j-driver')
const R = require('ramda')
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'))
process.on('exit', driver.close)

module.exports = {
    all: async () => {
        let result
        const session = driver.session({ defaultAccessMode: neo4j.session.READ })
        try {
            const {records} = await session.run('MATCH (n)-[r]-() RETURN r,n')
            const {nodes, edges} = R.compose(
                R.reduce((acc, {r, n}) => {
                    if (!n || !r) return acc;
        
                    return {
                        nodes: R.pipe(R.append(R.__, acc.nodes), R.uniq)(n),
                        edges: R.pipe(R.append(R.__, acc.edges), R.uniq)(r)
                    }
                }, {nodes: [], edges: []}),
                R.map(({keys, _fields}) => R.zipObj(keys, _fields))
            )(records);
            // console.log(JSON.stringify({nodes, edges}, null, 2))
            result = {nodes, edges}
        } catch(err) {
            console.error(err)
            result = {nodes: [], edges: []}
        } finally {
            session.close()
        }
        return result
    }
}
