import { container } from './core/container/container'
import { TOKENS } from './core/container/tokens'

const main = (async () => {
  const app = container.get(TOKENS.app)

  await app.init()
})()
