// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   console.log(req);
//   res.status(200).json({ name: 'John Doe' })
// }

import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Rest of the API logic
  console.log(req.body)
  var fileReader = new FileReader();
  fileReader.onload = function () {
        fs.writeFileSync('test.wav', Buffer(new Uint8Array(req.body)));
  };
  fileReader.readAsArrayBuffer(blob);
  res.json({ message: 'Hello Everyone!' })
}

export default handler