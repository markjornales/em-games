"use client"
import '@/app/globals.css'
import { CanvasProvider, TCanvas } from '@/components/CanvasContext'
import { Inter } from 'next/font/google'
import React from 'react'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })



const NoSsr = ({ children }: {children: React.ReactNode}) => <>{children}</>

const NoSsrs = dynamic(() => Promise.resolve(NoSsr), { ssr: false })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const canvasParent = React.useRef<HTMLDivElement>(null); 
  const [isCanvasSize, setConvasSize] = React.useState<TCanvas>({
      height: 0,
      width: 0,
  });

  React.useEffect(() => {
      handleEventListener()   
  },[]);

  React.useEffect(() => {
      window.addEventListener("resize", handleEventListener);
      return () => {
          window.addEventListener("resize", handleEventListener);
      }
  }, []);

  const handleEventListener = () => {
      setConvasSize({
          height: canvasParent.current?.offsetHeight || 0,
          width: canvasParent.current?.offsetWidth || 0
      });
  }

  return (
    <html lang="en"> 
      <head>
        <title>Emperor Gaming Solutions</title>
        <meta name='description' content='Description' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} >
        <CanvasProvider.Provider value={{isCanvasSize}}>
          <div className="h-screen bg-gradient-to-t from-egprimary via-egsecondary to-egprimary flex justify-center "> 
              <div className="flex-1  max-h-[813px]  min-h-[739px] max-w-[400px] min-w-[400px]" ref={canvasParent}>
                {children}
            </div>
          </div>
        </CanvasProvider.Provider>
      </body>
    </html>
  )
}
