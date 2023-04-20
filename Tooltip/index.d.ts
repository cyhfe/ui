import React from 'react';
declare enum TooltipStates {
    Idle = "IDLE",
    Focused = "FOCUSED",
    Visible = "VISIBLE",
    LeavingVisible = "LEAVING_VISIBLE",
    Dismissed = "DISMISSED"
}
declare enum TooltipEvents {
    Blur = "BLUR",
    Focus = "FOCUS",
    MouseDown = "MOUSE_DOWN",
    MouseEnter = "MOUSE_ENTER",
    MouseLeave = "MOUSE_LEAVE",
    MouseMove = "MOUSE_MOVE",
    Rest = "REST",
    TimeComplete = "TIME_COMPLETE"
}
declare const machine: {
    state: TooltipStates;
    subscriptions: Set<Function>;
    subscribe(fn: Function): () => void;
    notify(): void;
    send(event: TooltipEvents): void;
    transition(event: TooltipEvents): {
        state: TooltipStates;
        change: boolean;
    };
};
interface TooltipProps {
    children: React.ReactNode;
    label: string;
}
declare function Tooltip({ children, label }: TooltipProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Tooltip, machine };
