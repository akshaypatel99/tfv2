import { useEffect, useState } from 'react';
import logo from '../assets/trailerflix-logo2.png';
import user from '../assets/user.png';

import './Navbar.css';

const Navbar = (): JSX.Element => {
	const [show, setShow] = useState<boolean>(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				setShow(true);
			} else setShow(false);
		});
		return () => {
			window.removeEventListener('scroll', () => {
				if (window.scrollY < 100) {
					setShow(false);
				} else setShow(true);
			});
		};
	}, []);

	return (
		<div className={`Navbar ${show && 'Navbar__dark'}`}>
			<div className='Navbar__logo'>
				<img
					src={logo}
					alt='Trailerflix'
				/>
			</div>
			<div className='Navbar__user'>
				<img
					src={user}
					alt='User'
				/>
			</div>
		</div>
	);
};

export default Navbar;
