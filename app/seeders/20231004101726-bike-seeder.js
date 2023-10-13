/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bikes', [{
      name: 'Yamaha MT-07',
      brand: 'Yamaha',
      quantity: 50,
      picture: 'https://cdn.pixabay.com/photo/2021/01/06/12/32/yamaha-5894293_1280.jpg',
      price: 15000,
      description: `The Yamaha MT-07 is a naked sport motorcycle known for its exceptional performance and stylish design. With a powerful 689cc twin-cylinder engine, it delivers a thrilling riding experience. Whether you're a seasoned rider or a beginner, the MT-07 offers a comfortable and agile ride.

      Its distinctive look, characterized by a minimalist design and aggressive stance, sets it apart from the crowd. The lightweight chassis and responsive handling make it perfect for both city commuting and weekend adventures.

      Safety features like ABS and traction control ensure stability and confidence on the road. The MT-07 is an excellent choice for riders looking for a versatile and exciting motorcycle.`,
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Kawasaki Ninja h2r',
      brand: 'Kawasaki',
      quantity: 3,
      picture: 'https://cdn.pixabay.com/photo/2021/04/19/05/12/kawasaki-ninja-h2r-6190254_1280.jpg',
      price: 16000,
      description: `The Kawasaki Ninja H2R is a supercharged sportbike designed for adrenaline junkies. It's one of the most powerful motorcycles in the world, equipped with a supercharged 998cc engine that delivers mind-blowing acceleration and speed.

      With its aerodynamic design and cutting-edge technology, the Ninja H2R is built for the racetrack and high-speed performance. It features a carbon fiber body, advanced suspension, and state-of-the-art electronics for precise control.

      Riding the Ninja H2R is an exhilarating experience that pushes the boundaries of what's possible on two wheels. It's a track-focused beast that offers unparalleled power and performance.`,
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Harley-Davidson Street 750',
      brand: 'Harley-Davidson',
      quantity: 5,
      picture: 'https://cdn.pixabay.com/photo/2018/10/26/22/55/harley-davidson-3775527_1280.jpg',
      price: 19000,
      description: `The Harley-Davidson Street 750 is a classic cruiser motorcycle that combines iconic American style with modern engineering. It's designed for riders who appreciate the timeless Harley-Davidson heritage and a comfortable riding experience.

      Powered by a liquid-cooled, 750cc Revolution X V-twin engine, the Street 750 offers a smooth and responsive performance. Its low seat height and ergonomic design make it easy to handle, even in urban environments.

      Whether you're cruising through the city streets or embarking on a long-distance journey, the Street 750 delivers a relaxed and enjoyable ride. It's a versatile cruiser that pays tribute to the Harley-Davidson legacy.`,
      rating: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bikes', null, {});
  },
};
