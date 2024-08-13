import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import BasicSection from 'components/BasicSection';
import { EnvVars } from 'env';
import { getAllPosts } from 'utils/postsFetcher';
import Cta from 'views/HomePage/Blog';
import Features from 'views/HomePage/Features';
import FeaturesGallery from 'views/HomePage/FeaturesGallery';
import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';
import ScrollableBlogPosts from 'views/HomePage/ScrollableBlogPosts';
import Testimonials from 'views/HomePage/Testimonials';
import gif from 'public/arkaplangifdenem.gif'
import Image from 'next/image';
//import Map from 'views/HomePage/Map'


export default function Homepage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ForGIF>
      <Image src={gif} alt="loading..." layout="fill" objectFit="cover"/>       

        <Head>
          <title>{EnvVars.SITE_NAME}</title>
          <meta
            name="description"
            content="Tempor nostrud velit fugiat nostrud duis incididunt Lorem deserunt est tempor aute dolor ad elit."
          />
        </Head>

        

      </ForGIF>
      <HomepageWrapper>
        <WhiteBackgroundContainer>
          <Hero />
          <Partners />
          <BasicSection imageUrl="/demo-illustration-1.svg" title="VİZYONUMUZ" overTitle='Funa' >
            <p>
              {' '}
BURAYA YAZILAR YAZILACAK            </p>
          </BasicSection>
          <BasicSection imageUrl="/demo-illustration-2.svg" title="MİSYONUMUZ" overTitle='Funa'>
            <p>
              BURAYA YAZILAR YAZILACAK
            </p>
            <ul>
              <li>Güvenilir Yazılım</li>
              <li>Etkili Reklamcılık</li>
              <li>Yüksek Teknoloji Donanım</li>
            </ul>
          </BasicSection>
        </WhiteBackgroundContainer>
        <DarkerBackgroundContainer>
          <Cta />
          <FeaturesGallery />
          <Features />
          <Testimonials />
          
          <ScrollableBlogPosts posts={posts} />
          
        </DarkerBackgroundContainer>
      </HomepageWrapper>
    </>
  );
}

const ForGIF = styled.div`
  position: absolute;
  z-index: 10;
  background: #0000;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomepageWrapper = styled.div`
  position: relative;
  & > :last-child {
    margin-bottom: 15rem;
  }
`;





const DarkerBackgroundContainer = styled.div`
  background: rgb(var(--background));

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

const WhiteBackgroundContainer = styled.div`
  background: rgb(var(--secondBackground));

  & > :last-child {
    padding-bottom: 15rem;
  }

  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
}
