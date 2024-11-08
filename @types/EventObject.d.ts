declare namespace ToolEx {
    var EventObject: boolean;
}

declare interface EventArg {
    type: string;
    break: boolean;
    returnValue: any;
}

declare class EventObject {
    private events: { [key: string]: Array<(e: EventArg, ...args: any[]) => void> };

    constructor();

    on(event: string, callback: (e: EventArg, ...args: any[]) => void): void;

    once(event: string, callback: (e: EventArg, ...args: any[]) => void): void;

    off(event: string, callback: (e: EventArg, ...args: any[]) => void): void;

    emit(event: string, ...args: any[]): EventArg;

    emitAsync(event: string, ...args: any[]): Promise<EventArg>;

    clear(event?: string): void;
}
