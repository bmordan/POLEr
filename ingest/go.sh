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

until cypher-shell 'LOAD CSV FROM "file:///relationships_COACHES.csv" AS r MATCH (a:PERSON {id: r[0]}), (b:PERSON {id: r[1]}) CREATE (a)-[rel:COACHES]->(b);'
do
    echo "Problem LOADING relationships_COACHES.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///relationships_MANAGES.csv" AS r MATCH (a:PERSON {id: r[0]}), (b:PERSON {id: r[1]}) CREATE (a)-[rel:MANAGES]->(b);'
do
    echo "Problem LOADING relationships_MANAGES.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///relationships_REVIEWED.csv" AS r MATCH (a:PERSON {id: r[0]}), (b:PERSON {id: r[1]}) CREATE (a)-[rel:REVIEWED]->(b);'
do
    echo "Problem LOADING relationships_REVIEWED.csv"
    sleep 10
done

until cypher-shell 'LOAD CSV FROM "file:///relationships_WORKS_AT.csv" AS r MATCH (a:PERSON {id: r[0]}), (b:PERSON {id: r[1]}) CREATE (a)-[rel:WORKS_AT]->(b);'
do
    echo "Problem LOADING relationships_MANAGES.csv"
    sleep 10
done
