const { readdirSync, writeFileSync, readFileSync } = require('fs')
const path = require('path')
const { versionCompare } = require('./conpareVersions')

const packagesVersionsPath = path.resolve(__dirname, '../packages-versions')

const saveLatestPkgVersionsByDev = () => {
  const versionsByDev = readdirSync(packagesVersionsPath)
  const latestReposVersions = {}

  for (const devVersionsPath of versionsByDev) {
    const devVersionsBuffer = readFileSync(
      `${packagesVersionsPath}/${devVersionsPath}`,
    )
    const devVersions = JSON.parse(devVersionsBuffer.toString())
    const developerName = devVersionsPath
      .replace(/packages-versions-|.json|\-/g, ' ')
      .trim()

    Object.entries(devVersions).forEach(([key, value]) => {
      if (!latestReposVersions[key]) {
        latestReposVersions[key] = { developerName, value }
      }
      const isGreaterVersion =
        versionCompare(value, latestReposVersions[key].value) > 0
      if (isGreaterVersion) {
        latestReposVersions[key] = { developerName, value }
      }
    })
  }

  writeFileSync(
    `${__dirname}/latest-versions.json`,
    JSON.stringify(latestReposVersions, null, 2),
  )
}

module.exports = {
  saveLatestPkgVersionsByDev,
}
