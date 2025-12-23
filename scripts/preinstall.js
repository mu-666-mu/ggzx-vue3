const execPath = process.env.npm_execpath || ''
const userAgent = process.env.npm_config_user_agent || ''

const isNpm =
        execPath.includes('npm-cli.js') ||
        userAgent.startsWith('npm/')

if (!isNpm) {
        console.error(`
❌ This project ONLY supports npm
❌ Detected: ${userAgent || execPath}

👉 Please run:
   npm install
`)
        process.exit(1)
}
