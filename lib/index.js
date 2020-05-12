const neo4j = require('neo4j-driver')
const R = require('ramda')
const driver = neo4j.driver('neo4j://localhost', neo4j.auth.basic('neo4j', 'neo4j'))
const { Node, Relationship } = require('neo4j-driver/lib/graph-types');
process.on('exit', driver.close)

const coalesce_nodes_edges = R.compose(
    R.evolve({ nodes: R.uniq, edges: R.uniq }),
    R.reduce((acc, record) => {
        return {
            nodes: record instanceof Node ? R.append(record, acc.nodes) : acc.nodes,
            edges: record instanceof Relationship ? R.append({...record, from: record.start, to: record.end}, acc.edges) : acc.edges
        }
    }, {nodes: [], edges: []}),
    R.filter(record => !!record),
    R.flatten,
    R.map(R.values),
    R.map(({keys, _fields}) => R.zipObj(keys, _fields))
);

async function openSessionAndRunQuery (query) {
    let result
    const session = driver.session({ defaultAccessMode: neo4j.session.READ })
    try {
        const {records} = await session.run(query)
        result = coalesce_nodes_edges(records)
    } catch(err) {
        throw err
    } finally {
        session.close()
    }
    return result    
}

module.exports = {
    nodeById: async (id) => {
        return await openSessionAndRunQuery(`MATCH (n) WHERE n.id="${id}" RETURN n;`)
    },
    locationByName: async name => {
        return await openSessionAndRunQuery(`MATCH (l:LOCATION)-[r]-(n) WHERE l.name="${name}" RETURN l,r,n;`)
    },
    personByName: async name => {
        return await openSessionAndRunQuery(`MATCH (p:PERSON)-[r]-(n) WHERE p.name="${name}" RETURN p,r,n;`)
    },
    expandNodeById: async (id, label) => {
        return await openSessionAndRunQuery(`MATCH (t:${label})-[r]-(n) WHERE t.id="${id}" RETURN r,n;`)
    }
}
