'use client';
import { createContext, PropsWithChildren, useState } from 'react';

export const SideBarContext = createContext({
	showSideBarHeader: true,
	setShowSideBarHeader: (state: boolean) => {},
	positionSideBar: 'bottom',
	setPositionSideBar: (state: 'left' | 'right' | 'bottom') => {},
	typeSideBar: 'full',
	setTypeSideBar: (state: 'small' | 'full') => {},
	typeIcon: 'basic',
	setTypeIcon: (state: 'basic' | 'alternative') => {},
});

export default function SideBarProvider({ children }: PropsWithChildren) {
	const [showSideBarHeader, setShowSideBarHeader] = useState(true);
	const [positionSideBar, setPositionSideBar] = useState('left');
	const [typeSideBar, setTypeSideBar] = useState('full');
	const [typeIcon, setTypeIcon] = useState('basic');

	return (
		<SideBarContext.Provider
			value={{
				showSideBarHeader,
				setShowSideBarHeader,
				positionSideBar,
				setPositionSideBar,
				typeSideBar,
				setTypeSideBar,
				typeIcon,
				setTypeIcon,
			}}>
			{children}
		</SideBarContext.Provider>
	);
}
