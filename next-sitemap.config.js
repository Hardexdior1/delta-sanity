const { default: axios } = require('axios');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://verseonehotel.netlify.app', 
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/admin',
    '/admin/*',
    '/user',
    '/user/*',
    '/auth',
    '/reset-password',
      '/thank-you'
  ],
   additionalPaths: async () => {
    try {
      const res = await axios.get('https://verse-one-backend.onrender.com/api/rooms'); 
      const rooms = res.data;

      return rooms.map((room) => ({
        loc: `/rooms/${room._id}`,
        lastmod: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('Error generating dynamic paths for rooms:', error);
      return [];
    }
  },
};
