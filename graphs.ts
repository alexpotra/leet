type GraphNode =
    | {
          value: number;
          nodes: GraphNode[];
      }
    | undefined;

// 01 - Spanning tree
function spanningTree(g: GraphNode): GraphNode {
    if (!g) return undefined;

    const result = { value: g.value, nodes: [] };

    const visited: Set<GraphNode> = new Set();
    const toVisit: GraphNode[] = [];
    const toVisitNew: GraphNode[] = [];
    toVisit.push(g);
    toVisitNew.push(result);

    while (toVisit.length > 0) {
        const toProcess = toVisit.pop();
        const toProcessNew = toVisitNew.pop();

        visited.add(toProcess);

        for (let i = 0; i < toProcess.nodes.length; i++) {
            if (visited.has(toProcess.nodes[i])) {
                const newNode = { value: toProcess.nodes[i].value, nodes: [] };
                toProcessNew.nodes.push(newNode);

                toVisit.push(toProcess.nodes[i]);
                toVisitNew.push(newNode);
            }
        }
    }

    return result;
}

// 02 - Clone graph
function cloneGraph(g: GraphNode[]): GraphNode[] {
    const result: GraphNode[] = [];

    const visited: Map<GraphNode, GraphNode> = new Map();

    function clonePart(n: GraphNode) {
        if (visited.has(n)) return;

        const toVisit: GraphNode[] = [n];
        visited.set(n, { value: n.value, nodes: [] });

        while (toVisit.length > 0) {
            const toProcess = toVisit.shift();
            const clone = visited.get(toProcess);

            for (let i = 0; i < toProcess.nodes.length; i++) {
                const neighbor = toProcess.nodes[i];
                let newNode = visited.get(neighbor);
                if (!newNode) {
                    newNode = { value: neighbor.value, nodes: [] };
                    toVisit.push(neighbor);
                    visited.set(neighbor, newNode);
                }
                clone.nodes.push(newNode);
            }
        }

        result.push(visited.get(n));
    }

    for (let i = 0; i < g.length; i++) {
        clonePart(g[i]);
    }

    return result;
}
