declare namespace ToolEx {
    var TextManager: boolean;
}

declare class TextManager {

    constructor();

    static load(land_path: string): Promise<void>;

    static get(key: string): string;

    static apply(): void;

    static on_apply(func: () => void): void;

    static on(type: 'loading', callback: (e: {type: 'loading', break: boolean}) => void): void;
    static on(type: 'loaded', callback: (e: {type: 'loaded', break: boolean}) => void): void;
    static on(type: 'get', callback: (e: {type: 'get', break: boolean, returnValue: string}, key: string) => void): void;
    static on(type: 'apply', callback: (e: {type: 'apply', break: boolean}) => void): void;
    static on(type: 'applied', callback: (e: {type: 'applied', break: boolean}) => void): void;
}