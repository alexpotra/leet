type TreeNode<T> = {
    value: T;
    left?: TreeNode<T>;
    right?: TreeNode<T>;
};

type Tree = TreeNode<number> | undefined;

// 01 - In-order traversal
function inorder(root: Tree): number[] {
    const result: number[] = [];

    function visit(n: Tree) {
        if (n === undefined) return;

        visit(n.left);
        result.push(n.value);
        visit(n.right);
    }

    visit(root);
    return result;
}

// 02 - Find node BST
function findNode(root: Tree, n: number): Tree | undefined {
    if (root === undefined) return undefined;

    if (root.value > n) return findNode(root.left, n);
    if (root.value < n) return findNode(root.right, n);

    return root;
}

// 03 - Traverse by level
function getByLevel(root: Tree): Tree[][] {
    const result: Tree[][] = [];

    if (root === undefined) return result;

    let level: Tree[] = [];
    while (level.length > 0) {
        result.push(level);
        const newLevel: Tree[] = [];

        for (const node of level) {
            if (node.left) newLevel.push(node.left);
            if (node.right) newLevel.push(node.right);
        }

        level = newLevel;
    }

    return result;
}

// 04 - Find next node
function findNext(root: Tree, n: number): Tree {
    let result: Tree;
    let lastLeft: Tree;

    let node = root;
    while (node && node.value !== n) {
        if (node.value > n) {
            lastLeft = node;
            node = node.left;
        } else {
            node = node.right;
        }
    }

    // Check if we found the node
    if (node) {
        if (node.right) {
            let current = node.right;
            while (current.left) current = current.left;
            result = current;
        } else {
            result = lastLeft;
        }
    }

    return result;
}

// 05 - Find path
function findPath(root: Tree, n: number): Tree[] {
    if (!root) return [];

    if (root.value === n) return [root];

    const leftResult = findPath(root.left, n);
    if (leftResult.length > 0) {
        leftResult.unshift(root);
        return leftResult;
    }

    const rightResult = findPath(root.right, n);
    if (rightResult.length > 0) {
        rightResult.unshift(root);
        return rightResult;
    }

    return [];
}

// 06 - Find nearest common ancestor
function findAncestor(root: Tree, n1: number, n2: number): Tree {
    function findNodePath(root: Tree, n: number): Tree[] {
        if (!root) return [];

        if (root.value === n) return [root];

        const leftResult = findNodePath(root.left, n);
        if (leftResult.length > 0) {
            leftResult.unshift(root);
            return leftResult;
        }

        const rightResult = findNodePath(root.right, n);
        if (rightResult.length > 0) {
            rightResult.unshift(root);
            return rightResult;
        }

        return [];
    }

    const path1 = findNodePath(root, n1);
    const path2 = findNodePath(root, n2);

    let i = 0;
    while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
        i++;
    }

    if (i > 0) {
        return path1[i - 1];
    }
}

// 07 - Symmetric tree
function isSymmetric(root: Tree): boolean {
    function isSame(root1: Tree, root2: Tree): boolean {
        if (!root1 && !root2) return true;

        if (root1 && root2) {
            return (
                root1.value === root2.value &&
                isSame(root1.left, root2.left) &&
                isSame(root1.right, root2.right)
            );
        }

        return false;
    }

    if (!root) return true;
    return isSame(root.left, root.right);
}

// 08 - Convert sorted array to balanced BST
function makeTree(a: number[]): Tree {
    let result: Tree;

    function makeSubtree(l: number, r: number): Tree {
        if (r < l) return undefined;

        const middle = Math.floor((l + r) / 2);
        return {
            value: a[middle],
            left: makeSubtree(l, middle - 1),
            right: makeSubtree(middle + 1, r),
        };
    }

    result = makeSubtree(0, a.length - 1);

    return result;
}
