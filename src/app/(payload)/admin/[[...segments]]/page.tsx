/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

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

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config: configPromise, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config: sanitizedConfig, params, searchParams, importMap })

export default Page
