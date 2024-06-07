"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Services", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			heading: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			text: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			file: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});

		// Insert initial data
		await queryInterface.bulkInsert(
			"Services",
			[
				{
					id: 1,
					heading: "Washing",
					text: "Refresh your wardrobe with our expert laundering service, leaving them fresh and clean, ready to wear.",
					file: "1.png",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 2,
					heading: "Ironing",
					text: "Say goodbye to wrinkles! Our expert ironing service will leave your wears pressed and ready to impress.",
					file: "2.png",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 3,
					heading: "Starching",
					text: "Add that extra touch of elegance to your clothes with our premium starching service.",
					file: "3.png",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 4,
					heading: "Premium Packaging",
					text: "We'll package your wears with care and style, ready for your collection or delivery.",
					file: "4.png",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 5,
					heading: "Stubborn stain removal",
					text: "No stain is too tough for us to tackle. Trust our skilled team to banish even the most stubborn marks.",
					file: "5.png",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
				{
					id: 6,
					heading: "Door Step Delivery",
					text: "Enjoy convenience at your doorstep as we bring our top-notch service directly to you, making laundry day a breeze.",
					file: "6.png",
					createdAt: "2024-06-03 23:04:03",
					updatedAt: "2024-06-03 23:04:03",
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Services");
	},
};
