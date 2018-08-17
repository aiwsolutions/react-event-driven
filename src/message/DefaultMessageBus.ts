import { MessageBus, Event, Consumer } from '../Types';
import * as _ from 'lodash';

class DefaultMessageBus implements MessageBus {
    listeners: { [key: string]: Consumer<Event>[] } = {};

    emit(event: Event): void {
        _.forEach(this.listeners, (consumers, name) => {
            const regex = new RegExp(name, 'i');
            if (regex.test(event.name)) {
                _.forEach(consumers, listener => listener.call(null, event));
            }
        });
    }

    listen(name: string, listener: Consumer<Event>): void {
        this.listeners[name] = _.union(this.listeners[name], [listener]);
    }

    remove(name: string, listener: Consumer<Event>): void {
        _.pull(this.listeners[name], listener);
        if (_.isEmpty(this.listeners[name])) {
            _.unset(this.listeners, name);
        }
    }
}

export default DefaultMessageBus;
