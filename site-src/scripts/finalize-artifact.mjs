// Převede dist-artifact/artifact.html na stránku bez vlastní kostry (<html>/<head>/<body>),
// jak ji očekává claude.ai artefakt: <title> a styly nahoře, pak obsah a skript.
import { readFileSync, writeFileSync } from 'node:fs'

const src = readFileSync('dist-artifact/artifact.html', 'utf8')
const head = src.match(/<head>([\s\S]*?)<\/head>/)[1]
const body = src.match(/<body>([\s\S]*?)<\/body>/)[1]

const title = head.match(/<title>[\s\S]*?<\/title>/)[0]
const links = head.match(/<link[^>]*>/g) ?? []
const styles = head.match(/<style[^>]*>[\s\S]*?<\/style>/g) ?? []
const scripts = [...(head.match(/<script[^>]*>[\s\S]*?<\/script>/g) ?? [])]

const out = [title, ...links, ...styles, body.trim(), ...scripts].join('\n')
writeFileSync('dist-artifact/cinzovni-dum-tauskov.html'.replace('tauskov', 'touskov'), out)
console.log('artifact page:', (out.length / 1024).toFixed(0), 'kB')
