import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Upload from './pages/Upload';
const Home: NextPage = () => {
    return (
        <div>
            <NextSeo
                openGraph={{
                    type: 'website',
                    url: 'https://how-old-do-i-look.vercel.app/',
                    title: 'How old do i look 😎',
                    description: '나이 추정 APP',
                    images: [
                        {
                            url: 'https://images.unsplash.com/photo-1645528364055-f45131ebc3a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                            width: 800,
                            height: 600,
                            alt: 'baby picture'
                        }
                    ]
                }}
            />
            <Upload />
        </div>
    );
};
export default Home;
