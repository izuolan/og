# Open Graph Generator

🍇 Open Graph Generator made using [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) for personal use.

Feel free to fork it and use it for your website!

## Deployment Guide

You can achieve deployment fully from the website without cloning the repository.

1. Fork the repository
2. Replace the public/favicon.png and public/favicon.ico with your logo. Make sure it has the same file name.

   This is optional, replacing the logo will grant you the ease of using the api without having to add your logo link on the parameters every time.

3. Deploy to Vercel.

### Vercel Configuration Settings

There are some configurations that you need to do:

1.  Set the Node.js Version to 14.x. **Settings > General > Node.js Version: 14.x**
2.  Add the following to the environment variables. **Settings > Environment Variables**

| Name                       | Value                   |
| -------------------------- | ----------------------- |
| NEXT_PUBLIC_DEPLOYMENT_URL | https://your.domain.com |

After configuring, **redeploy the project**.
