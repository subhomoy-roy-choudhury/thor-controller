/** @type {import('next').NextConfig} */
// https://github.com/ResourcesCo/snippets/blob/master/docs/codemirror-with-next.md


// const withCSS = require('@zeit/next-css')
// module.exports = withCSS({
//   webpack: (config) => {
//     // Fixes npm packages that depend on `fs` module
//     config.node = {
//       fs: 'empty'
//     }

//     return config
//   }
// })

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig