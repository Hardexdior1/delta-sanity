import Reset from './components/Reset'
import { Suspense } from 'react';

export const metadata = {
  title: 'Reset Password | Verse One',
  description: 'Securely reset your password for your Verse One account. Enter your new password to regain access and continue enjoying exceptional hospitality and services.'
};



const Page=()=>{
  return (
        <Suspense fallback={ <div className="bg-black opacity-2">
          <div className="flex items-center justify-center h-screen">
            <div className="z-10 w-16 h-16 border-8 border-t-emerald-600 border-r-white border-b-emerald-600 border-l-white rounded-full animate-spin"></div>
          </div>

        </div>}>

<Reset />

 </Suspense>
  )

}
export default Page