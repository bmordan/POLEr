<script>
    import { onMount } from 'svelte'
    import { Network, DataSet } from "vis-network/standalone"

    const getData = async () => {
        const {nodes, edges} = await fetch('/all').then(res => res.json()).catch(console.error)
        return {nodes: new DataSet(nodes), edges: new DataSet(edges)}
    }

    onMount(async () => {
        const DOM = document.getElementById('explorer')
        const options = {
            height: `${window.innerHeight - 97}px`,
            width: '100%'
        }
        try {
            const data = await getData()
            const network = new Network(DOM, data, options)
        } catch(err) {
            console.error(err)
        }
    })
</script>
<section id="explorer" class="mt-1"></section>