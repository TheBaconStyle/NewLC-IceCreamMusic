import { VirtuosoGridProps } from 'react-virtuoso';
import type { Ref } from 'react';

export const gridComponents: VirtuosoGridProps<
	undefined,
	undefined
>['components'] = {
	List: ({ style, children, ref, ...props }) => (
		<div
			ref={ref as Ref<HTMLDivElement>}
			{...props}
			style={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '10px',
				...style,
			}}>
			{children}
		</div>
	),
	Item: ({ children, ref, ...props }) => (
		<div
			ref={ref as Ref<HTMLDivElement>}
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
