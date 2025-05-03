import type * as React from 'react';

export function mergeRefs<T = any>(
	refs: Array<React.Ref<T>>,
): React.RefCallback<T> {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref) {
				(ref as React.Ref<T>) = ref;
			}
		});
	};
}
