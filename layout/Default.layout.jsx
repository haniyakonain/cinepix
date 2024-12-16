import React from "react";
import Footer from "../components/Footer/Footer.Component";
import Navbar from "../components/Navbar/Navbar.Component";

const DefaultLayoutHoc = (Component) => {
	function HOC() {
		return (
			<div className='relative'>
				<Navbar />
				<div className='flex flex-col'>
					<div className='mt-4'>
						<Component />
					</div>
				</div>
				<Footer />
			</div>
		);
	}

	return HOC;
};

export default DefaultLayoutHoc;
