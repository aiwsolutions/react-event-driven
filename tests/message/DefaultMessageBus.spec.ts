import { Event } from '../../src/Types';
import DefaultMessageBus from '../../src/message/DefaultMessageBus';
import { stub } from 'sinon';

test('Be able to add and remove message bus', () => {
    const bus = new DefaultMessageBus();
    const listener = stub();

    bus.listen('test', listener);
    expect(bus.listeners).toHaveProperty('test');

    bus.remove('test', listener);
    expect(bus.listeners).not.toHaveProperty('test');
});

test('Be able to remove single listener', () => {
    const bus = new DefaultMessageBus();
    const listen1 = stub();
    const listen2 = stub();
    bus.listen('test', listen1);
    bus.listen('test', listen2);

    expect(bus.listeners['test']).toHaveLength(2);

    bus.remove('test', listen2);

    expect(bus.listeners).toHaveProperty('test');
    expect(bus.listeners['test']).toHaveLength(1);
});

test('Emit an event must call the listener', () => {
    const bus = new DefaultMessageBus();
    const listener = stub();
    bus.listen('test', listener);

    const event: Event = { name: 'test', payload: 'data' };
    bus.emit(event);

    expect(listener.calledWith(event)).toBeTruthy();
});

test('Emit an event must call all the listeners', () => {
    const bus = new DefaultMessageBus();
    const listen1 = stub();
    const listen2 = stub();
    bus.listen('test', listen1);
    bus.listen('test', listen2);

    const event: Event = { name: 'test', payload: 'data' };
    bus.emit(event);

    expect(listen1.calledWith(event)).toBeTruthy();
    expect(listen2.calledWith(event)).toBeTruthy();
});

test('Listener with regex', () => {
    const bus = new DefaultMessageBus();
    const listener = stub();
    bus.listen('.*est', listener);

    const event: Event = { name: 'test', payload: 'data' };
    bus.emit(event);

    expect(listener.calledWith(event)).toBeTruthy();
});

test('Unrelavant listener must not be called', () => {
    const bus = new DefaultMessageBus();
    const listener = stub();
    bus.listen('shouldnotcall', listener);

    const event: Event = { name: 'test', payload: 'data' };
    bus.emit(event);

    expect(listener.notCalled).toBeTruthy();
});
