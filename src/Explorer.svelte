<script>
    import { onMount } from 'svelte'
    import { Network, DataSet } from "vis-network/standalone"
    import options, {transformForNetwork, createNodeLookup} from './vis-factory.js'

    export let onSelect

    let nodeLookup = {}
    let networkNodes = null
    let networkEdges = null
    $: network = undefined
    $: updating = false

    const onClick = ({nodes}) => {
        if (!nodes.length) return
        const [id] = nodes
        onSelect(nodeLookup[id] ? nodeLookup[id] : null)
    }

    const onDoubleClick = async event => {
        if (!event.nodes.length) return
        updating = true
        const [id] = event.nodes
        const data = await fetch(`/expand/${id}`).then(res => res.json()).catch(console.error)
        const {nodes, edges} = transformForNetwork(data)
        nodes.forEach(_node => {
            const [node] = network.findNode(_node.id)
            if (!node) networkNodes.add(node)
        })
        updating = false
    } 

    onMount(async () => {
        const DOM = document.getElementById('explorer')
        try {
            const data = await fetch(`/person?name=${encodeURIComponent("Jen")}`).then(res => res.json()).catch(console.error)
            const {nodes, edges} = transformForNetwork(data)
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
<section id="explorer" class="mt-1">
    <div class="w-100 d-flex align-items-center justify-content-center" style="height:90vh;">
        <img src="/icons/timer.svg" alt="loading network" class="loading" />
    </div>
</section>
<style>
.loading {
    animation: spin 3s cubic-bezier(0.075, 0.82, 0.165, 1);
    animation-iteration-count: infinite;
}
@-moz-keyframes spin { 80% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 80% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 80% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>