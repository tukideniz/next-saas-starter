import NextLink from 'next/link';
import styled from 'styled-components';
import Container from 'components/Container';
import { media } from 'utils/media';


type SingleFooterListItem = { title: string; href: string };
type FooterListItems = SingleFooterListItem[];
type SingleFooterList = { title: string; items: FooterListItems };

export default function Footer() {
  return (
    <FooterWrapper>
      
      <Container>
      <p>Sosyal Medya Hesaplarımızı Takip Etmeyi Unutmayın!</p>
        <BottomBar>
        
          <ShareBar>
          
            <NextLink href="" passHref>
              <a>
                <Icon src="/whatsapp.png" alt="WhatsApp" />
              </a>
            </NextLink>
            <NextLink href="https://www.facebook.com/profile.php?id=61556311643168" passHref>
              <a>
                <Icon src="/facebook.png" alt="Facebook" /> 
              </a>
            </NextLink>
           
            <NextLink href="https://www.instagram.com/funayazilim/" passHref>
              <a>
                <Icon src="/instagram.png" alt="Instagram" />
              </a>
            </NextLink>
            <NextLink href="https://www.youtube.com/@FunaYazlmReklam" passHref>
              <a>
                <Icon src="/youtube.png" alt="YouTube" />
              </a>
            </NextLink>
          </ShareBar>
          <Copyright>&copy; Copyright 2024 - FunaTek All rights reserved.</Copyright>
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

const FooterWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 4rem;
  background: rgb(var(--secondary));
  color: rgb(var(--textSecondary));
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
  display: flex;
  gap: 1rem;

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

const Icon = styled.img`
  width: 50px;
  height: 50px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Copyright = styled.p`
  font-size: 1.5rem;
  margin-top: 3em;
`;

const BottomBar = styled.div`
  margin-top: -8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;
