const { saveLatestPkgVersionsByDev } = require('./admin/latest-versions')
const { getNameAndVersion } = require('./dev/latest-versions-by-repo')

if (process.env.IS_ADMIN_TASK === 'false') {
  getNameAndVersion()
} else {
  saveLatestPkgVersionsByDev()
}
