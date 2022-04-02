type ListNode = {
    value: number;
    next: ListNode;
};

function listLength(head: ListNode): number {
    let result = 0;
    let curr = head;

    while (curr) {
        result++;
        curr = curr.next;
    }

    return result;
}

// 01. Reverse a list
function reverseList(head: ListNode): ListNode {
    let prev: ListNode = undefined;
    let curr: ListNode = head;

    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}

// 02a. Append two lists recursive
function appendR(l1: ListNode, l2: ListNode): ListNode {
    if (!l1) return l2;

    l1.next = appendR(l1.next, l2);
    return l1;
}

// 02b. Append two lists iterative
function append(l1: ListNode, l2: ListNode): ListNode {
    if (!l1) return l2;

    let curr = l1;
    while (curr.next) {
        curr = curr.next;
    }

    curr.next = l2;
    return l1;
}

// 03a. Delete n-th element recursive
function removeR(head: ListNode, n: number): ListNode {
    if (!head) return head;

    if (n === 0) {
        return head.next;
    }

    return removeR(head.next, n - 1);
}

// 03a. Delete n-th element
function remove(head: ListNode, n: number): ListNode {
    if (!head) return head;

    let curr = head;
    let prev = undefined;

    while (n > 0 && curr) {
        prev = curr;
        curr = curr.next;
        n--;
    }

    if (prev) {
        prev.next = curr ? curr.next : undefined;
        return head;
    } else {
        return head.next;
    }
}

// 04. Delete n-th from tail
function removeTail(head: ListNode, n: number): ListNode {
    if (!head) return head;
    const l = listLength(head);

    if (l < n) return head.next;
    let prev = undefined;
    let curr = head;

    for (let i = 0; i < l - n; i++) {
        prev = curr;
        curr = curr.next;
    }

    if (prev) {
        prev.next = curr.next;
        return head;
    } else {
        return head.next;
    }
}
