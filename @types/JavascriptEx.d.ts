declare namespace ToolEx {
    var JavascriptEx: boolean;
}

interface String {
    format(...args: any[]): string;
}

interface Array<T> {
    random(): T;
}
