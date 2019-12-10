module.exports = {
  env: {
      test: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: 10
                }
              }
            ],
            "@babel/preset-react"
          ]
      }
  }
};
// TODO: Jest requires a Babel config file?? it doesn't use Babel via Webpack?? is that accurate??