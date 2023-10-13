/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cars', [
      {
        name: 'Honda CR-V Hybrid',
        brand: 'Honda',
        quantity: 5,
        picture: 'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2022/07/13102850/Honda-CR-V-generasi-terbaru_0.jpg',
        price: 30000,
        description: `The Honda CR-V Hybrid is a top-tier hybrid SUV that seamlessly combines eco-friendliness with high-performance engineering. Designed with the environment in mind, this hybrid vehicle offers an impressive fuel efficiency that reduces your carbon footprint and helps you save on fuel costs. Its hybrid powertrain, consisting of a gasoline engine and an electric motor, ensures a smooth and responsive drive.
      Inside the Honda CR-V Hybrid, you'll find a spacious and comfortable cabin designed to accommodate both driver and passengers with ease. Premium materials and thoughtful design elements enhance the overall driving experience, making it perfect for long journeys and daily commutes alike.
  
      Safety is a top priority for Honda, and the CR-V Hybrid is equipped with advanced safety features to keep you and your loved ones protected on the road. From adaptive cruise control to lane-keeping assist, this SUV is designed to provide peace of mind in various driving conditions.
  
      With ample cargo space and versatile seating options, the Honda CR-V Hybrid is well-suited for your active lifestyle. Whether you're heading out for a weekend adventure or simply running errands in the city, this hybrid SUV offers the versatility and reliability you need.
  
      Experience the future of automotive technology with the Honda CR-V Hybrid. It's not just a vehicle; it's a sustainable and stylish driving solution that makes a positive impact on the environment while delivering the performance and comfort you expect from Honda.`,
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'KIA EV9',
        brand: 'KIA',
        quantity: 10,
        picture: 'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2023/05/26202257/2024-kia-ev9.jpg',
        price: 59000,
        description: `The KIA EV9 is an innovative all-electric SUV that exemplifies the cutting edge of automotive technology. This forward-thinking vehicle offers an electrifying driving experience, completely free from traditional gasoline-powered engines. With its eco-friendly design and zero-emission operation, the KIA EV9 represents a significant step forward in sustainable transportation. It not only demonstrates KIA's commitment to environmental responsibility but also caters to the growing demand for electric vehicles in today's automotive market.

        Beyond its electric drivetrain, the KIA EV9 is packed with advanced technology and features, making it a standout choice in the world of electric SUVs. From its state-of-the-art infotainment system to its comprehensive safety suite, the EV9 offers a high-tech driving environment that enhances both convenience and safety. With a spacious interior and a design that prioritizes efficiency, this all-electric SUV is not only a step towards a greener future but also a testament to KIA's dedication to delivering innovative and technologically advanced vehicles to consumers.`,
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Mitsubishi XFC / Mitsubishi Xforce',
        brand: 'Mitsubishi',
        quantity: 10,
        picture: 'https://s3.ap-southeast-1.amazonaws.com/moladin.assets/blog/wp-content/uploads/2022/10/20100514/mitsubishi-xfc-test-drive.jpg',
        price: 50000,
        description: `The Mitsubishi XFC stands out as a striking and contemporary crossover SUV, blending eye-catching aesthetics with practicality. Its sleek and stylish design captures attention on the road, making a bold statement in the world of modern automobiles. Beyond its looks, the XFC offers a host of modern features and technology, ensuring a comfortable and convenient driving experience for both the driver and passengers. With its spacious interior, advanced safety systems, and efficient performance, this crossover SUV caters to the needs of today's discerning consumers who seek a vehicle that combines fashion and function seamlessly.

        Underneath its fashionable exterior, the Mitsubishi XFC boasts a robust and capable platform that can handle various driving conditions. Whether navigating through city streets or venturing onto off-road terrain, this crossover SUV provides the versatility and reliability expected from a Mitsubishi vehicle. With its fusion of style, technology, and practicality, the Mitsubishi XFC represents a compelling option for those in search of a modern and stylish crossover SUV that doesn't compromise on performance or comfort.`,
        rating: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  },
};
