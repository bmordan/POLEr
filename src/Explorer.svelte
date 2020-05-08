<script>
    import { onMount } from 'svelte'
    import { DataSet, Network } from "vis-network/standalone"

    const nodes = new DataSet([
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
    ])

    const edges = new DataSet([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 3, to: 3}
    ])

    const options = {
        height: `${window.innerHeight - 97}px`,
        width: '100%'
    }

    onMount(() => {
        const DOM = document.getElementById('explorer')
        const network = new Network(DOM, {nodes, edges}, options)
    })
</script>
<section id="explorer" class="bg-dark mt-1"></section>