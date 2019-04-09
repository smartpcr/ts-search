/**
 * Find and return a nested object value.
 *
 * @param currentNode to crawl
 * @param path Property path
 * @returns {any}
 */
export default function getNestedFieldValue(currentNode: Object, path: Array<string>): any {
    path = path || [];
    currentNode = currentNode || {};
    let value: object = currentNode;

    // walk down the property path
    for (let i = 0; i < path.length; i++) {
        value = getPropertyValue(value, path[i]);

        if (value == null) {
            return null;
        }
    }

    return value;
}

export function getPropertyValue(node: any, propPath: string): any {
    if (!node) {
        return null;
    }

    if (!propPath) {
        return node;
    }

    const propNames = propPath.split(/\./g);
    let currentNode = node;
    propNames.forEach(propName => {
        if (currentNode) {
            currentNode = currentNode[propName];
        }
    });

    return currentNode;
}

export function setPropertyValue(node: any, propPath: string, propValue: any): void {
    if (!node) {
        return;
    }

    if (!propPath) {
        return;
    }

    const propNames = propPath.split(/\./g);
    let currentNode = node;
    for (let i = 0; i < propNames.length; i++) {
        if (i === propNames.length - 1) {
            currentNode = propValue;
        } else {
            if (!currentNode) {
                return;
            }
            currentNode = currentNode[propNames[i]];
        }
    }
}