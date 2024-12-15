import React, { useState } from "react";
import { motion } from "framer-motion";

const SeatSelection = ({ showtime, onSeatSelect }) => {
	const [selectedSeats, setSelectedSeats] = useState([]);

	const seatLayout = {
		premium: Array(20).fill(null),
		standard: Array(30).fill(null)
	};

	const handleSeatClick = (type, index) => {
		const seatId = `${type}-${index}`; // Corrected syntax for template literal
		if (selectedSeats.includes(seatId)) {
			setSelectedSeats((prev) => prev.filter((seat) => seat !== seatId));
		} else {
			setSelectedSeats((prev) => [...prev, seatId]);
		}
	};

	return (
		<div className='p-4'>
			<h3 className='text-xl font-bold text-red-500 mb-4'>Select Your Seats</h3>

			<div className='mb-8'>
				<h4 className='text-lg font-semibold text-gray-200 mb-2'>Premium (₹400)</h4>
				<div className='grid grid-cols-10 gap-2'>
					{seatLayout.premium.map((_, index) => (
						<motion.button
							key={`premium-${index}`} // Corrected template literal for key
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className={`p-2 rounded ${
								selectedSeats.includes(`premium-${index}`)
									? "bg-red-500"
									: "bg-navy-800 hover:bg-navy-700"
							}`} // Corrected className syntax
							onClick={() => handleSeatClick("premium", index)}>
							{index + 1}
						</motion.button>
					))}
				</div>
			</div>

			<div>
				<h4 className='text-lg font-semibold text-gray-200 mb-2'>Standard (₹200)</h4>
				<div className='grid grid-cols-10 gap-2'>
					{seatLayout.standard.map((_, index) => (
						<motion.button
							key={`standard-${index}`} // Corrected template literal for key
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
							className={`p-2 rounded ${
								selectedSeats.includes(`standard-${index}`)
									? "bg-red-500"
									: "bg-navy-800 hover:bg-navy-700"
							}`} // Corrected className syntax
							onClick={() => handleSeatClick("standard", index)}>
							{index + 1}
						</motion.button>
					))}
				</div>
			</div>

			<div className='mt-8'>
				<button
					className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors'
					onClick={() => onSeatSelect(selectedSeats)}>
					Proceed to Payment (₹
					{selectedSeats.reduce((total, seat) => total + (seat.includes("premium") ? 400 : 200), 0)}
					)
				</button>
			</div>
		</div>
	);
};

export default SeatSelection;
