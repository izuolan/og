/* eslint-disable @next/next/no-img-element */
import queryString from 'query-string';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { deploymentURL } from '@/constant/env';
import { GeneralQueryEnum } from '@/pages/api/default';

type Query = Record<keyof typeof GeneralQueryEnum | 'ogType', string>;

export default function BuildPage() {
  const [link, setLink] = React.useState(`${deploymentURL}/api/default`);
  const [imgLink, setImgLink] = React.useState(`${deploymentURL}/api/default`);

  //#region  //*=========== Forms ===========
  const methods = useForm<Query>({
    mode: 'onTouched',
    // defaultValues: {
    //   theme: 'light',
    // },
  });
  const { handleSubmit, watch } = methods;
  //#endregion  //*======== Forms ===========

  //#region  //*=========== Show live change ===========
  const formData = watch();
  React.useEffect(() => {
    const { ogType, ...rest } = formData;
    const qurl = queryString.stringifyUrl(
      {
        url: `${deploymentURL}/api/${ogType}`,
        query: { ...rest },
      },
      {
        skipEmptyString: true,
      }
    );

    setLink(qurl);
  }, [formData]);
  //#endregion  //*======== Show live change ===========

  //#region  //*=========== Submit ===========
  const onSubmit: SubmitHandler<Query> = () => {
    setImgLink(link);
  };
  //#endregion  //*======== Submit ===========

  return (
    <>
      <Seo templateTitle='Build' />

      <main>
        <section className='min-h-screen bg-gray-100'>
          <div className='layout'>
            <h1 className='pt-20'>Open Graph Generator</h1>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid md:grid-cols-[2fr,3fr] gap-8 items-center'>
                  <div className='flex flex-col gap-3 mt-8 md:max-w-sm'>
                    <div className='flex gap-2'>
                      <SelectInput
                        className='w-full'
                        id='ogType'
                        label='ogType'
                        helperText='api type routes'
                      >
                        <option value='default'>default</option>
                      </SelectInput>
                      <SelectInput
                        className='w-full'
                        id='theme'
                        label='theme'
                      >
                        <option value='light'>light</option>
                        <option value='dark'>dark</option>
                      </SelectInput>
                      <SelectInput
                        className='w-full'
                        id='border'
                        label='border'
                      >
                        <option value='solid'>solid</option>
                        <option value='none'>none</option>
                      </SelectInput>
                    </div>
                    <Input
                      id='background'
                      label='Background Image'
                      helperText={`default: ${deploymentURL}/images/background.jpg`}
                    />
                    <Input
                      id='logo'
                      label='Logo Image'
                      helperText={`default: ${deploymentURL}/favicon.png`}
                    />
                    <Input id='siteName' label='siteName' />
                    <Input id='description' label='description' />
                    <Input
                      id='title'
                      label='title'
                      helperText='Adding title will change layout'
                    />
                    <Input
                      id='summary'
                      label='summary'
                      helperText='This is post summary'
                    />
                    {/* <div className='flex gap-2'>
                      <Input
                        className='w-full'
                        id='logoWidth'
                        label='logoWidth'
                        helperText='default: 100'
                      />
                      <Input
                        className='w-full'
                        id='logoHeight'
                        label='logoHeight'
                        helperText='default: auto'
                      />
                    </div> */}
                  </div>
                  <div>
                    <img
                      key={imgLink}
                      src={imgLink}
                      className='w-full bg-gray-500'
                      alt=''
                      width='800'
                      height='400'
                    />
                    <div className='flex gap-2 mt-10'>
                      <Button className='w-2/3'>Generate</Button>
                      <ButtonLink className='w-1/3 text-center' variant='light' href={link}>
                        New Tab
                      </ButtonLink>
                    </div>
                    <p className='mt-2 text-sm text-gray-600 break-all'>
                      {link}
                    </p>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>

          <div className='flex flex-col items-center justify-center text-center mt-10'>
            <footer className='md:absolute text-gray-800 bottom-2'>
              © {new Date().getFullYear()} -{' '}
              <CustomLink href='https://zuolan.me?ref=og'>
                Zuolan.me
              </CustomLink>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
