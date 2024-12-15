import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Import FaStar for star icon
import { motion } from "framer-motion";

const Footer = () => {
	// Team member details
	const teamMembers = [
		{
			name: "Haniya Konain",
			linkedin: "https://www.linkedin.com/in/haniya-konain-210882251/",
			role: "Full Stack Developer & AI&DS undergrad"
		},
		{
			name: "Nadeeha Mapa Shoukat",
			linkedin: "https://www.linkedin.com/in/nadeeha-mapa-shoukat-9a834a175/",
			role: "UI/UX Designer & AI&DS undergrad"
		},
		{
			name: "Syeda Fatima",
			linkedin: "https://www.linkedin.com/in/fatima-syed-764b49249/",
			role: "Frontend Developer & AI&DS undergrad"
		}
	];

	return (
		<motion.footer
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className='bg-gradient-to-br from-gray-900 to-black text-white py-12 px-6 overflow-hidden'>
			{/* Terms and Conditions Section */}
			<motion.div
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
				className='container mx-auto text-center mb-12'>
				<h3 className='text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>
					Terms and Conditions
				</h3>
				<div className='flex justify-center space-x-8'>
					{[
						{ text: "Privacy Policy", link: "/privacy-policy" },
						{ text: "Terms of Service", link: "/terms-of-service" }
					].map((item, index) => (
						<motion.div
							key={index}
							whileHover={{
								scale: 1.1,
								color: "#60a5fa"
							}}
							transition={{ type: "spring", stiffness: 300 }}>
							<Link
								to={item.link}
								className='text-lg font-medium transition-all duration-300 hover:text-blue-400'>
								{item.text}
							</Link>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* CinePix Logo and Hackathon Info */}
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className='flex flex-col items-center mb-12 space-y-4'>
				<div className='flex items-center gap-4'>
					<motion.img
						whileHover={{ rotate: 360 }}
						transition={{ duration: 0.8 }}
						src='/cinepix.png'
						alt='CinePix'
						className='w-16 h-16 object-contain transform transition-all duration-500 hover:scale-110'
					/>
					<h1 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600'>
						CinePix
					</h1>
				</div>
				<p className='text-sm text-gray-400 text-center max-w-xl'>
					Developed for a 24hr Stanley Code-A-Thon 2024 by Team Tritechs
				</p>
			</motion.div>

			{/* Team Member Links with Star Icons and Animated Boxes */}
			<motion.div
				initial={{ y: 100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5 }}
				className='flex flex-wrap justify-center gap-4 items-center'>
				{teamMembers.map((member, index) => (
					<motion.div
						key={index}
						className='flex flex-col items-center p-4 bg-gray-800 rounded-lg w-40 h-56 transform transition-all duration-300 hover:bg-gray-700 hover:scale-105 hover:shadow-xl'
						whileHover={{ scale: 1.05, rotate: 5 }}
						transition={{ type: "spring", stiffness: 300 }}>
						{/* One Star Icon */}
						<div className='text-yellow-400 mb-3'>
							<FaStar className='text-3xl' />
						</div>
						{/* LinkedIn Link */}
						<a
							href={member.linkedin}
							target='_blank'
							rel='noopener noreferrer'
							className='text-md font-semibold text-white hover:text-blue-400 transition-all'>
							{member.name}
						</a>
						<p className='text-sm text-gray-400 mt-2'>{member.role}</p>
					</motion.div>
				))}
			</motion.div>

			{/* Copyright and Additional Info */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8, duration: 0.5 }}
				className='text-center text-gray-500 mt-12 pt-6 border-t border-gray-700'>
				<p className='text-sm'>© 2024 CinePix. All Rights Reserved.</p>
			</motion.div>
		</motion.footer>
	);
};

export default Footer;
