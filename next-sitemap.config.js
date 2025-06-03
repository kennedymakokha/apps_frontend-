/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://qrcode-generator.mtandao.app',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: 'monthly',
    priority: 0.7,
    exclude: ['/404'],
  };
  