<script>
    import { onMount } from 'svelte'
    import { Network, DataSet } from "vis-network/standalone"
    import options, {transformForNetwork, createNodeLookup} from './vis-factory.js'

    export let onSelect

    let nodeLookup = {}
    let networkNodes = null
    let networkEdges = null
    $: network = undefined
    $: updating = true

    const onClick = ({nodes}) => {
        if (!nodes.length) return
        const [id] = nodes
        onSelect(nodeLookup[id] ? nodeLookup[id] : null)
    }

    const onDoubleClick = async event => {
        if (!event.nodes.length) return
        updating = true
        const [id] = event.nodes
        const data = await fetch(`/expand/${id}/LOCATION`).then(res => res.json()).catch(console.error)
        const {nodes, edges} = transformForNetwork(data)
        nodes.forEach(_node => {
            const [node] = network.findNode(_node.id)
            if (!node) networkNodes.add(_node)
        })
        updating = false
    } 

    onMount(async () => {
        const DOM = document.getElementById('explorer')
        try {
            const data = await fetch(`/node/C431E2CC-80D7-480F-A57D-851CE5EC25B5`).then(res => res.json()).catch(console.error)
            const {nodes, edges} = transformForNetwork(data)
            updating = false
            nodeLookup = createNodeLookup(nodes)
            networkNodes = new DataSet(nodes)
            networkEdges = new DataSet(edges)
            network = new Network(DOM, {nodes: networkNodes, edges: networkEdges}, options)
            network.on('click', onClick)
            network.on('doubleClick', onDoubleClick)
        } catch(err) {
            console.error(err)
        }
    })

</script>
<section id="explorer"><div><canvas></canvas></div></section>
<img src="/icons/timer.svg" class={updating ? `updating` : 'not-updating'} alt="the network is updating" />
<style>
.not-updating {
    display: none;
}
.updating {
    position: fixed;
    top: 50%;
    left: 50%;
    animation: spin 3s cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-iteration-count: infinite;
}
@-moz-keyframes spin {
    80% {
        -moz-transform: rotate(360deg);
    }
}
@-webkit-keyframes spin {
    80% {
        -webkit-transform: rotate(360deg); 
    } 
}
@keyframes spin {
    80% {
        -webkit-transform: rotate(360deg);
        transform:rotate(360deg);
    } 
}
#explorer {
    -webkit-box-shadow: inset 1px 2px 12px -8px rgba(0,0,0,0.75);
    -moz-box-shadow: inset 1px 2px 12px -8px rgba(0,0,0,0.75);
    box-shadow: inset 1px 2px 12px -8px rgba(0,0,0,0.75);
}
</style>