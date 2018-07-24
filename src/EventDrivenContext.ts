import { createContext } from 'react';

export interface Event {
    name: string;
    payload: any;
}

export interface MessageBus {
    getState: (event: Event) => object;
    emit: (name: string, payload: any) => void;
}

const state = {};
export const initialContextValue = {
    getState: () => state,
    emit: (name: string, payload: any) => { console.log(name, payload); },
};

const defaultContext: React.Context<MessageBus> = createContext(initialContextValue);

export default defaultContext;
