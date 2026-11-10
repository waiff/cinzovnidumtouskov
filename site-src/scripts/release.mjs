// Zkopíruje hotový build (dist/) do kořene repozitáře, odkud ho Hostinger nasazuje do public_html.
// Spouští se přes `npm run release` ve složce site-src.
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const dist = resolve('dist')
const root = resolve('..')

if (!existsSync(join(dist, 'index.html'))) {
  console.error('Chybí dist/index.html – nejdřív spusťte `npm run build`.')
  process.exit(1)
}
if (!existsSync(join(root, '.git')) && !existsSync(join(root, 'README.md'))) {
  console.error(`Nadřazená složka ${root} nevypadá jako kořen repozitáře – release zrušen.`)
  process.exit(1)
}

const entries = readdirSync(dist)
for (const name of entries) {
  const target = join(root, name)
  if (existsSync(target)) rmSync(target, { recursive: true, force: true })
  cpSync(join(dist, name), target, { recursive: true })
}
console.log(`Web zkopírován do ${root}: ${entries.join(', ')}`)
