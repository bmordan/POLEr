import POLEr from './POLEr.svelte'
import {version} from '../package.json'
 
export default new POLEr({
    target: document.getElementById('app'),
    props: {version}
})