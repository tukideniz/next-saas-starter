import NextLink from 'next/link';
import { FacebookIcon, InstapaperIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';
import ImageIG from 'public/instagramlogo.png';


const InstagramIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <Image src={Image} alt="Instagram" {...props} />;
};


type SingleFooterListItem = { title: string; href: string };
type FooterListItems = SingleFooterListItem[];
type SingleFooterList = { title: string; items: FooterListItems };







export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        
        <BottomBar>
          <ShareBar>
            <NextLink href="" passHref>
              <a>
                <WhatsappIcon size={50} round={true} />
              </a>
            </NextLink>
            <NextLink href="" passHref>
            <a>
                <Image />
              </a>
            </NextLink>

            <NextLink href="https://www.facebook.com/profile.php?id=61556311643168" passHref>
              <a>
                <FacebookIcon size={50} round={true} />
              </a>
            </NextLink>

            <NextLink href="" passHref>
              <a>
                <LinkedinIcon size={50} round={true} />
              </a>
            </NextLink>
          </ShareBar>
          <Copyright>&copy; Copyright © 2024- FunaTek   All rights reserved.</Copyright>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}

function FooterList({ title, items }: SingleFooterList) {
  return (
    <ListWrapper>
      <ListHeader>{title}</ListHeader>
      {items.map((singleItem) => (
        <ListItem key={singleItem.href} {...singleItem} />
      ))}
    </ListWrapper>
  );
}

function ListItem({ title, href }: SingleFooterListItem) {
  return (
    <ListItemWrapper>
      <NextLink href={href} passHref>
        <a>{title}</a>
      </NextLink>
    </ListItemWrapper>
  );
}


// StyledImage bileşeni
const Image = styled.img`
  width: 50px;  // WhatsApp ikonu ile aynı boyut
  height: 50px; // WhatsApp ikonu ile aynı boyut
  border-radius: 50%; // Yuvarlak görünüm
`


const FooterWrapper = styled.div`
  padding-top: 10rem;
  padding-bottom: 4rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListHeader = styled.p`
  font-weight: bold;
  font-size: 2.25rem;
  margin-bottom: 2.5rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  margin-right: 5rem;

  & > *:not(:first-child) {
    margin-top: 1rem;
  }

  ${media('<=tablet')} {
    flex: 0 40%;
    margin-right: 1.5rem;
  }

  ${media('<=phone')} {
    flex: 0 100%;
    margin-right: 0rem;
  }
`;


const ListItemWrapper = styled.p`
  font-size: 1.6rem;

  a {
    text-decoration: none;
    color: rgba(var(--textSecondary), 0.75);
  }
`;

const ShareBar = styled.div`
  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

const BottomBar = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
