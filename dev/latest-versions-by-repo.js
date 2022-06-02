const { readdirSync, readFile, writeFileSync, readFileSync } = require('fs')
const path = require('path')

const authorsName = require('../package.json').displayName.replace(/\s/g, '-')

const basePathName = path.resolve(__dirname + '../../../')

const repos = readdirSync(basePathName)

const getNameAndVersion = () => {
  const packagesVersions = {}
  for (const pkg of repos) {
    readFile(`${basePathName}/${pkg}/package.json`, (err, data) => {
      if (!err) {
        const packageJson = JSON.parse(data.toString())
        const { name, version } = packageJson
        packagesVersions[name] = version
      }
      writeFileSync(
        `./packages-versions/packages-versions-${authorsName}.json`,
        JSON.stringify(packagesVersions, null, 2),
      )
    })
  }
  return packagesVersions
}

module.exports = { getNameAndVersion }
