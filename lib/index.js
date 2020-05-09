const neo4j = require('neo4j-driver')
const R = require('ramda')
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'))
const { Node, Relationship } = require('neo4j-driver/lib/graph-types');
process.on('exit', driver.close)

function toNumber({ low, high }) {
    let res = high
    for (let i = 0; i < 32; i++) {
      res *= 2
    }
    return low + res
}

const coalesce_nodes_edges = R.compose(
    R.evolve({ nodes: R.uniq, edges: R.uniq }),
    R.reduce((acc, record) => {
        const recordId = R.compose(toNumber, R.prop('identity'))(record)
        
        const transformStartAndEnd = {
            start: toNumber,
            end: toNumber
        }

        const addNode = R.compose(
            R.map(rec => ({...rec, label: rec.properties.name})),
            R.append(R.__, acc.nodes),
            R.assoc('id', recordId)
        )

        const addEdge = R.compose(
            R.map(rec => ({...rec, from: rec.start, to: rec.end})),
            R.append(R.__, acc.edges),
            R.evolve(transformStartAndEnd),
            R.assoc('id', recordId)
        )
        return {
            nodes: record instanceof Node ? addNode(record) : acc.nodes,
            edges: record instanceof Relationship ? addEdge(record) : acc.edges
        }
    }, {nodes: [], edges: []}),
    R.filter(record => !!record),
    R.flatten,
    R.map(R.values),
    R.map(({keys, _fields}) => R.zipObj(keys, _fields))
  );

module.exports = {
    all: async () => {
        let result
        const session = driver.session({ defaultAccessMode: neo4j.session.READ })
        try {
            const {records} = await session.run('MATCH (n)-[r]-() RETURN r,n')
            result = coalesce_nodes_edges(records)
        } catch(err) {
            throw err
        } finally {
            session.close()
        }
        return result
    }
}
