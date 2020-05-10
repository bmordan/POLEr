<script>
    import Explorer from "./Explorer.svelte"
    export let version
    $: selected = null
    const onSelect = nodeInfo => {
        selected = nodeInfo.html || null
    }
</script>
<section class="row border-bottom">
    <div class="col-sm-12 pt-2 d-flex align-items-end">
        <img src="/POLEr.svg" alt="POLEr" height="64px" />
        <small class="text-muted">v{version}</small>
    </div>
</section>
<section class="row pt-2">
    <article class="col-sm-12 col-md-8">
        <Explorer onSelect={onSelect} />
    </article>
    <aside class="col-sm-12 col-md-4">
        <h2 class="py-2">Explorer panel</h2>
        <ul class="list-group">
            {@html selected}
        </ul>
    </aside>
</section>
