"use client"
import '@/app/globals.css'
import { CanvasProvider } from '@/components/CanvasContext'
import useContextProviders from '@/hooks/useContextProviders'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

const NoSsr = ({ children }: {children: React.ReactNode}) => <>{children}</>

const NoSsrs = dynamic(() => Promise.resolve(NoSsr), { ssr: false })

const classNames = (...classNamees: string[]) => classNamees.filter(Boolean).join(" "); 

type TRootProps =  { children: React.ReactNode }

export default function RootLayout({ children }: TRootProps) {
  const {canvasParent, isAuthenticated, providers } = useContextProviders();


  const onclick = () => {
    const element = document.querySelector("body");
     element?.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,)
     })
  }
  
  return (
    <html lang="en"> 
      <head>
        <title>Emperor Gaming Solutions</title>
        <meta name='description' content='Description' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body onClick={onclick}  className={inter.className} >
        <div className={classNames("h-screen w-screen bg-black/70 absolute ", providers.blur? "visible": "hidden")}/>
        <CanvasProvider.Provider value={providers}>
          <div  className={classNames("h-screen bg-gradient-to-t from-egprimary via-egsecondary to-egprimary", "flex justify-center items-center")}> 
              <div className={classNames("flex-1 max-h-[813px]  min-h-[739px] max-w-[400px] min-w-[400px]")} ref={canvasParent}>
                {children}
            </div>
          </div>
        </CanvasProvider.Provider>
        {!isAuthenticated.authenticate && 
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"> 
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> 
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"> 
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Attention</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {isAuthenticated.message} 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <a type="button" href={`${process.env.NEXT_PUBLIC_MAIN_PAGE}/login`} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                    Go back to site
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </body>
    </html>
  )
}
