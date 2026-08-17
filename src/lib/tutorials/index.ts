import type { Tutorial } from "./types"
import { pengenalanPemrograman } from "./dasar/pengenalan-pemrograman"
import { caraKerjaWeb } from "./dasar/cara-kerja-web"
import { htmlDasar } from "./html/html-dasar"
import { htmlFormulir } from "./html/html-formulir"
import { cssDasar } from "./frontend/css-dasar"
import { cssFlexboxGrid } from "./frontend/css-flexbox-grid"
import { cssLanjutan } from "./frontend/css-lanjutan"
import { javascriptDasar } from "./frontend/javascript-dasar"
import { javascriptFunctionArrayObject } from "./frontend/javascript-function-array-object"
import { javascriptDom } from "./frontend/javascript-dom"
import { javascriptAsync } from "./frontend/javascript-async"
import { reactDasar } from "./frontend/react-dasar"
import { reactLanjutan } from "./frontend/react-lanjutan"
import { nextjsDasar } from "./nextjs/nextjs-dasar"
import { nodejsDasar } from "./backend/nodejs-dasar"
import { expressApi } from "./backend/express-api"
import { databaseSql } from "./backend/database-sql"
import { persiapanLingkungan } from "./tools/persiapan-lingkungan"
import { terminalDasar } from "./tools/terminal-dasar"
import { gitDasar } from "./tools/git-dasar"
import { deployVercel } from "./deployment/deploy-vercel"
import { laravelDasar } from "./laravel/laravel-dasar"
import { laravelRouting } from "./laravel/laravel-routing"
import { laravelBlade } from "./laravel/laravel-blade"
import { laravelController } from "./laravel/laravel-controller"
import { laravelDatabase } from "./laravel/laravel-database"
import { laravelEloquent } from "./laravel/laravel-eloquent"
import { laravelCrud } from "./laravel/laravel-crud"
import { laravelValidasi } from "./laravel/laravel-validasi"
import { laravelAuth } from "./laravel/laravel-auth"
import { laravelRelasi } from "./laravel/laravel-relasi"
import { laravelApi } from "./laravel/laravel-api"
import { laravelProject } from "./laravel/laravel-project"
import { nextjsPengenalan } from "./nextjs/nextjs-pengenalan"
import { nextjsRouting } from "./nextjs/nextjs-routing"
import { nextjsLayout } from "./nextjs/nextjs-layout"
import { nextjsServerClient } from "./nextjs/nextjs-server-client"
import { nextjsDataFetching } from "./nextjs/nextjs-data-fetching"
import { nextjsForm } from "./nextjs/nextjs-form"
import { nextjsApi } from "./nextjs/nextjs-api"
import { nextjsDatabase } from "./nextjs/nextjs-database"
import { nextjsAuth } from "./nextjs/nextjs-auth"
import { nextjsOptimasi } from "./nextjs/nextjs-optimasi"
import { nextjsDeploy } from "./nextjs/nextjs-deploy"
import { nextjsProject } from "./nextjs/nextjs-project"
import { phpDasar } from "./php/php-dasar"
import { phpVariabel } from "./php/php-variabel"
import { phpOperatorKondisi } from "./php/php-operator-kondisi"
import { phpLoop } from "./php/php-loop"
import { phpArrayString } from "./php/php-array-string"
import { phpFunction } from "./php/php-function"
import { phpFormHandling } from "./php/php-form"
import { phpFileHandling } from "./php/php-file-handling"
import { phpDatabase } from "./php/php-database"
import { phpOOP } from "./php/php-oop"
import { phpErrorHandling } from "./php/php-error-handling"
import { phpSessionCookie } from "./php/php-session-cookie"
import { phpApi } from "./php/php-api"
import { phpSecurity } from "./php/php-security"
import { phpComposer } from "./php/php-composer"
import { phpModern } from "./php/php-modern"
import { phpProject } from "./php/php-project"

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
  nextjsPengenalan,
  nextjsRouting,
  nextjsLayout,
  nextjsServerClient,
  nextjsDataFetching,
  nextjsForm,
  nextjsApi,
  nextjsDatabase,
  nextjsAuth,
  nextjsOptimasi,
  nextjsDasar,
  nextjsDeploy,
  nextjsProject,
  laravelDasar,
  laravelRouting,
  laravelBlade,
  laravelController,
  laravelDatabase,
  laravelEloquent,
  laravelCrud,
  laravelValidasi,
  laravelAuth,
  laravelRelasi,
  laravelApi,
  laravelProject,
  phpDasar,
  phpVariabel,
  phpOperatorKondisi,
  phpLoop,
  phpArrayString,
  phpFunction,
  phpFormHandling,
  phpFileHandling,
  phpDatabase,
  phpOOP,
  phpErrorHandling,
  phpSessionCookie,
  phpApi,
  phpSecurity,
  phpComposer,
  phpModern,
  phpProject,
]

export function getTutorialBySlug(slug: string) {
  return tutorials.find((tutorial) => tutorial.slug === slug)
}

export type * from "./types"
