import * as React from 'react';
import EventDrivenContext, { initialContextValue } from './EventDrivenContext';

class EventDrivenComponent extends React.Component {
    render(): any {
        const { children } = this.props;
        return (
            <EventDrivenContext.Consumer>
                {
                    (context) => {
                        const contextValue = context ? context : initialContextValue;
                        return (
                            <EventDrivenContext.Provider value={contextValue}>
                                {children}
                            </EventDrivenContext.Provider>
                        );
                    }
                }
            </EventDrivenContext.Consumer>
        );
    }
}
