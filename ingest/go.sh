#! bin/bash

until cypher-shell 'LOAD CSV FROM "file:///person_nodes.csv" AS p CREATE(n:PERSON {id: p[0], name: p[1], role: p[2]});'
do
    echo "Problem LOADING person_nodes.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///location_nodes.csv" AS p CREATE(l:LOCATION {id: p[0], name: p[1], address: p[2]});'
do
    echo "Problem LOADING location_nodes.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///event_nodes.csv" AS p CREATE(e:EVENT {id: p[0], date: p[1], details: p[2]});'
do
    echo "Problem LOADING event_nodes.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///relationships_COACHES.csv" AS r MATCH (a:PERSON {id: r[0]}), (b:PERSON {id: r[1]}) CREATE (a)-[rel:COACHES {from: r[0],to: r[1]}]->(b);'
do
    echo "Problem LOADING relationships_COACHES.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///relationships_MANAGES.csv" AS r MATCH (a:PERSON {id: r[0]}), (b:PERSON {id: r[1]}) CREATE (a)-[rel:MANAGES {from: r[0],to: r[1]}]->(b);'
do
    echo "Problem LOADING relationships_MANAGES.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///relationships_REVIEWED.csv" AS r MATCH (a:PERSON {id: r[0]}), (b:PERSON {id: r[1]}) CREATE (a)-[rel:REVIEWED {from: r[0],to: r[1]}]->(b);'
do
    echo "Problem LOADING relationships_REVIEWED.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///relationships_WORKSAT.csv" AS r MATCH (a:PERSON {id: r[0]}), (b:LOCATION {id: r[1]}) CREATE (a)-[rel:WORKSAT {from: r[0],to: r[1]}]->(b);'
do
    echo "Problem LOADING relationships_WORKSAT.csv"
    sleep 10
done
