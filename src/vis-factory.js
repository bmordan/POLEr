import * as R from "ramda"
import tpl from './vis-templates'

const size = {
    height: `${window.innerHeight - 97}px`,
    width: '100%'
}

const colors = {
    primary: '#F5A623',
    warn: '#D50208',
    accent: '#A60013',
    primary_selected: '#CA881C'
}

const nodes = {
    borderWidth: 1,
    borderWidthSelected: 2,
    color: {
        border: colors.accent,
        background: colors.primary,
        highlight: {
          border: colors.accent,
          background: colors.accent
        },
        hover: {
          border: colors.accent,
          background: colors.accent
        }
    },
    opacity: 1,
    font: {
        color: '#343434',
        size: 14,
        face: 'roboto',
        background: 'none',
        strokeWidth: 0,
        strokeColor: '#ffffff',
        align: 'center',
        multi: false,
        vadjust: 0
    },
    shape: 'image',
    image: {
        selected: '/icons/default.svg',
        unselected: '/icons/default.svg'
    },
    imagePadding: {
        top: 2,
        right: 2,
        bottom: 2,
        left: 2
    }
}
const iconImages = type => {
    return {
        selected: `/icons/${type.toLowerCase()}-selected.svg`,
        unselected: `/icons/${type.toLowerCase()}-unselected.svg`
    }
}
const addLabels = {
    nodes: R.map(node => {
        const label = {
            PERSON: 'name',
            OBJECT: 'reference',
            LOCATION: 'name',
            EVENT: 'title'
        }[getPoleType(node)]

        return R.assoc('label', node.properties[label], node)
    }),
    edges: R.map(edge => R.pipe(R.assoc('from', edge.start), R.assoc('to', edge.end))(edge))
}

const getPoleType = node => {
    const type = ['PERSON', 'OBJECT', 'LOCATION', 'EVENT'].filter(POLE_TYPE => R.includes(POLE_TYPE, node.labels))
    return R.head(type) || 'OBJECT'
}

const assignIcon = {
    nodes: R.map(node => R.assoc('image', iconImages(getPoleType(node)), node))
}

const addNodeTplInfo = {
    nodes: R.map(node => R.assoc('html', tpl[getPoleType(node)](node.properties), node))
}

export const transformForNetwork = data => {
    return R.pipe(
        R.evolve(addLabels),
        R.evolve(assignIcon),
        R.evolve(addNodeTplInfo)
    )(data)
}

export const createNodeLookup = nodes => nodes.reduce((m, n) => { m[n.id] = n; return m }, {})

const options = {...size, nodes}
export default options
