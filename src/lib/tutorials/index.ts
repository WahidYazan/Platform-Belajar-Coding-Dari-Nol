import type { Tutorial } from "./types"
import { pengenalanPemrograman } from "./dasar/pengenalan-pemrograman"
import { caraKerjaWeb } from "./dasar/cara-kerja-web"
import { htmlDasar } from "./frontend/html-dasar"
import { htmlFormulir } from "./frontend/html-formulir"
import { cssDasar } from "./frontend/css-dasar"
import { cssFlexboxGrid } from "./frontend/css-flexbox-grid"
import { cssLanjutan } from "./frontend/css-lanjutan"
import { javascriptDasar } from "./frontend/javascript-dasar"
import { javascriptFunctionArrayObject } from "./frontend/javascript-function-array-object"
import { javascriptDom } from "./frontend/javascript-dom"
import { javascriptAsync } from "./frontend/javascript-async"
import { reactDasar } from "./frontend/react-dasar"
import { reactLanjutan } from "./frontend/react-lanjutan"
import { nextjsDasar } from "./frontend/nextjs-dasar"
import { nodejsDasar } from "./backend/nodejs-dasar"
import { expressApi } from "./backend/express-api"
import { databaseSql } from "./backend/database-sql"
import { persiapanLingkungan } from "./tools/persiapan-lingkungan"
import { terminalDasar } from "./tools/terminal-dasar"
import { gitDasar } from "./tools/git-dasar"
import { deployVercel } from "./deployment/deploy-vercel"

export const tutorials: Tutorial[] = [
  pengenalanPemrograman,
  htmlDasar,
  cssDasar,
  cssFlexboxGrid,
  javascriptDasar,
  javascriptFunctionArrayObject,
  gitDasar,
  nodejsDasar,
  reactDasar,
  deployVercel,
  caraKerjaWeb,
  persiapanLingkungan,
  htmlFormulir,
  cssLanjutan,
  javascriptDom,
  javascriptAsync,
  terminalDasar,
  expressApi,
  databaseSql,
  reactLanjutan,
  nextjsDasar,
]

export function getTutorialBySlug(slug: string) {
  return tutorials.find((tutorial) => tutorial.slug === slug)
}

export type * from "./types"
