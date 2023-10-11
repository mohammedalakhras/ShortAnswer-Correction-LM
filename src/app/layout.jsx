//  import './globals.css'
// import 'bootstrap/dist/css/bootstrap.css';

import { Montserrat } from 'next/font/google'
const bodyFont = Montserrat({ subsets: ['latin'] ,weight: ['400']})

export const metadata = {
  title: 'Mohammed Alakhras Telegram Auto Reply ',
  description: 'By Mohammed Alakhras',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
  
      <body className={bodyFont.className}>
        
        <div className='container'>

        {children}
        
        </div>
        </body>
        </html>

  )
}
