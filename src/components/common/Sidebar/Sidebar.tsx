import React, { useState } from 'react';

interface SidebarProps {
	children: React.ReactNode;
}

// css for anything not a phone :D
const normalScreenBackdrop = 'md:hidden';
const normalScreen = 'md:w-[35vw] md:relative md:bg-white md:opacity-100 md:p-0 md:pl-0 md:block md:h-auto md:z-[1]';

const Sidebar = ({ children }: SidebarProps) => {
	const [showSidebar, setShowSidebar] = useState(true);

	//css for phones
	const smallScreen = `top-0 ${showSidebar ? '' : 'translate-x-[-100%]'} left-0 w-[80%] px-5 fixed h-4/5 z-[100] ease-in-out duration-300`;
	const smallScreenBackdrop = `top-0 ${showSidebar ? '' : 'translate-x-[-100%]'} left-0 w-[80%] bg-black opacity-95 p-10 pl-20 fixed h-full z-[100] ease-in-out duration-300`;

	return (
		<>
			<div className={`${smallScreenBackdrop} ${normalScreenBackdrop}`} />
			<div className={`${smallScreen} ${normalScreen}`}>
				{children}
				<div onClick={() => setShowSidebar((s) => !s)} className={'absolute w-10 rounded-full h-10 bg-blue-200 top-10 right-[-20px] md:hidden'} />
			</div>
		</>
	);
};

export default Sidebar;
