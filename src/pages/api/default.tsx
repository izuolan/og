/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { deploymentURL } from '@/constant/env';

export const config = {
  runtime: 'experimental-edge',
}

// Make sure the font exists in the specified path:
const font = fetch(new URL(`${deploymentURL}/fonts/LXGWWenKaiMono-Light.ttf`, import.meta.url)).then(
  (res) => res.arrayBuffer(),
);

export enum GeneralQueryEnum {
  'background',
  'logo',
  'siteName',
  'description',
  'title',
  'summary',
  'theme',
  'border',
}

export default async function handler(req: NextRequest) {

  try {
    const fontData = await font;
    const { searchParams } = new URL(req.url)

    // ?background=<background>
    const background = searchParams.get('background')
    const defaultBackground = `${deploymentURL}/images/background.jpg`
    // ?logo=<logo>
    const logo = searchParams.get('logo')
    const defaultLogo = `${deploymentURL}/favicon.png`

    // ?siteName=<siteName>
    const siteName = searchParams.has('siteName')
      ? searchParams.get('siteName')?.slice(0, 20)
      : '左蓝'
    // ?description=<description>
    const description = searchParams.has('description')
      ? searchParams.get('description')?.slice(0, 30)
      : '一个静悄悄的博客'
    // ?title=<title>
    const title = searchParams.has('title')
      ? searchParams.get('title')?.slice(0, 80)
      : 'Open Graph Generator'
    // ?summary=<summary>
    const summary = searchParams.has('summary')
      ? searchParams.get('summary')?.slice(0, 200)
      : 'Free and Open Source Tools for Developers'

    // ?theme=<theme>
    const theme = searchParams.has('theme')
      ? searchParams.get('theme')
      : 'light'
    // ?border=<border>
    const border = searchParams.has('border')
      ? searchParams.get('border')
      : 'solid'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            fontFamily: '"LXGWWenKaiMono-Light"',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `${theme === 'light' ? '#fff' : '#000'}`,
          }}
        >
          <img tw="absolute" src={background || defaultBackground} alt="background" width="800" />
          <div tw="flex flex-col w-full items-center">
            
            <div tw="flex items-center mb-5">
              <img
                tw={`${border === 'solid' ? 'border' : 'border-none'} border-gray-400 rounded-full w-16 h-16 mr-2`}
                alt="logo"
                width="64" 
                src={logo || defaultLogo}
              />
              <h2 tw={`flex flex-col pl-2 border-gray-300 ${border === 'solid' ? 'border-l-2' : 'border-none'}`}>
                <span
                  tw="text-2xl font-bold"
                  style={{
                    color: `${theme === 'light' ? '#000' : '#fff'}`,
                  }}
                >
                  {siteName}
                </span>
                <span tw="text-base text-indigo-500">{description}</span>
              </h2>
            </div>
            <div tw="flex flex-row">
              <div tw="flex">
                <h2 tw="flex flex-col">
                  <span
                    tw="text-4xl font-bold px-10"
                    style={{
                      color: `${theme === 'light' ? '#000' : '#fff'}`,
                    }}
                  >
                    {title}
                  </span>
                  <span tw="text-xl text-gray-400 px-10">{summary}</span>
                </h2>
              </div>
            </div>

          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
        fonts: [
          {
            name: 'LXGWWenKaiMono-Light',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    )
  } catch (e: unknown) {
    // console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
