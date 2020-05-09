<script>
    import Explorer from "./Explorer.svelte"
    export let version
    export let nodes = [
        {
            properties: {
                name: "Radson Kenton"
            }
        },
        {
            properties: {
                name: "OJ Simpson"
            }
        }
    ]
</script>
<section class="row border-bottom">
    <div class="col-sm-12 pt-2 d-flex align-items-end">
        <img src="/ROLEr.svg" alt="POLEr" height="64px" />
        <small class="text-muted">v{version}</small>
    </div>
</section>
<section class="row pt-2">
    <article class="col-sm-12 col-md-8">
        <Explorer />
    </article>
    <aside class="col-sm-12 col-md-4">
        <h2 class="py-2">Explorer panel</h2>
        <ul class="list-group bg-light">
            <li class="list-group-item">info point</li>
            <li class="list-group-item">more details</li>
            {#each nodes as node}
                <li class="list-group-item">{node.properties.name}</li>
            {/each}
        </ul>
    </aside>
</section>
