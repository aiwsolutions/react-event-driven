import * as React from 'react';
import * as renderer from 'react-test-renderer';
import EventDrivenComponent from '../src/EventDrivenComponent';

test('<EventDrivenComponent> - should render ok', () => {
    const comp = renderer.create(
        <EventDrivenComponent />,
    );
    expect(comp).toMatchSnapshot();
});
