import { forwardRef } from 'react';
import { VirtuosoGrid, VirtuosoGridProps } from 'react-virtuoso';

export const gridComponents: VirtuosoGridProps<undefined, undefined>['components'] = {
    List: forwardRef(({ style, children, ...props }, ref) => (
        <div
            ref={ref}
            {...props}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                ...style,
            }}>
            {children}
        </div>
    )),
    Item: ({ children, ...props }) => (
        <div
            {...props}
            style={{
                width: '24%',
                display: 'flex',
                boxSizing: 'border-box',
            }}>
            {children}
        </div>
    ),
};