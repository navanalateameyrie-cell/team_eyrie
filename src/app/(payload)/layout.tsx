import type { ServerFunctionClient } from 'payload'
import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'

type Args = {
  children: React.ReactNode
}

// Next.js 15 Client Components strictly forbid passing functions in props.
// Payload internally attaches `toString` to locale objects, which causes a crash.
// We sanitize the config before passing it to RootLayout.
const sanitizedConfig = configPromise.then((cfg) => {
  if (cfg.localization && cfg.localization.locales) {
    cfg.localization.locales.forEach((l: any) => {
      if (typeof l.toString === 'function') {
        l.toString = undefined;
      }
    });
  }
  return cfg;
});

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={sanitizedConfig} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
