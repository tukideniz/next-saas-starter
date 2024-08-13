import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNewsletterModalContext } from 'contexts/newsletter-modal.context';
import { ScrollPositionEffectProps, useScrollPosition } from 'hooks/useScrollPosition';
import { NavItems, SingleNavItem } from 'types';
import { media } from 'utils/media';
import Button from './Button';
import Container from './Container';
import Drawer from './Drawer';
import { HamburgerIcon } from './HamburgerIcon';
import Logo from './Logo';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Option } from 'react-dropdown'; // Import Option type

type NavbarProps = { items: NavItems };
type ScrollingDirections = 'up' | 'down' | 'none';
type NavbarContainerProps = { hidden: boolean; transparent: boolean };

export default function Navbar({ items }: NavbarProps) {
  const router = useRouter();
  const { toggle } = Drawer.useDrawer();
  const [scrollingDirection, setScrollingDirection] = useState<ScrollingDirections>('none');

  let lastScrollY = useRef(0);
  const lastRoute = useRef('');
  const stepSize = useRef(50);

  useScrollPosition(scrollPositionCallback, [router.asPath], undefined, undefined, 50);

  function scrollPositionCallback({ currPos }: ScrollPositionEffectProps) {
    const routerPath = router.asPath;
    const hasRouteChanged = routerPath !== lastRoute.current;

    if (hasRouteChanged) {
      lastRoute.current = routerPath;
      setScrollingDirection('none');
      return;
    }

    const currentScrollY = currPos.y;
    const isScrollingUp = currentScrollY > lastScrollY.current;
    const scrollDifference = Math.abs(lastScrollY.current - currentScrollY);
    const hasScrolledWholeStep = scrollDifference >= stepSize.current;
    const isInNonCollapsibleArea = lastScrollY.current > -50;

    if (currentScrollY === 0) {
      setScrollingDirection('none');
      lastScrollY.current = currentScrollY;
      return;
    }

    if (isInNonCollapsibleArea) {
      setScrollingDirection('none');
      lastScrollY.current = currentScrollY;
      return;
    }

    if (!hasScrolledWholeStep) {
      lastScrollY.current = currentScrollY;
      return;
    }

    setScrollingDirection(isScrollingUp ? 'up' : 'down');
    lastScrollY.current = currentScrollY;
  }

  const isNavbarHidden = scrollingDirection === 'down';
  const isTransparent = scrollingDirection === 'none';

  return (
    <NavbarContainer hidden={isNavbarHidden} transparent={isTransparent}>
      <Content>
        <NextLink href="/" passHref>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </NextLink>
        <NavItemList>
          {items.map((singleItem) => (
            <NavItem key={singleItem.href} {...singleItem} />
          ))}
        </NavItemList>
        <HamburgerMenuWrapper>
          <HamburgerIcon aria-label="Toggle menu" onClick={toggle} />
        </HamburgerMenuWrapper>
      </Content>
    </NavbarContainer>
  );
}

function NavItem({ href, title, outlined }: SingleNavItem) {
  const router = useRouter();
  const { setIsModalOpened } = useNewsletterModalContext();

  function showNewsletterModal() {
    setIsModalOpened(true);
  }

  function handleSelect(option: Option) {
    // Check the value and navigate accordingly
    switch (option.value) {
      case 'funayazılım':
        router.push('/funayazilim');
        break;
      case 'funareklam':
        router.push('/funareklam');
        break;
      case 'funateknoloji':
        router.push('/funateknoloji');
        break;
      default:
        break;
    }
  }
  
  if (title === 'FUNA') {
    const options = [
      { value: 'funayazılım', label: 'FUNA Yazılım' },
      { value: 'funareklam', label: 'FUNA Reklam' },
      { value: 'funateknoloji', label: 'FUNA Teknoloji' }
    ];

    return (
      <DropdownWrapper>
        <Dropdown
          options={options}
          onChange={handleSelect}
          placeholder="FUNA"
          className="dropdown"
          controlClassName="dropdown-control"
          menuClassName="dropdown-menu"
          arrowClassName="dropdown-arrow"
        />
      </DropdownWrapper>
    );
  }

  if (outlined) {
    return <CustomButton onClick={showNewsletterModal}>{title}</CustomButton>;
  }

  return (
    <NavItemWrapper outlined={outlined}>
      <NextLink href={href} passHref>
        <a>{title}</a>
      </NextLink>
    </NavItemWrapper>
  );
}

const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;

  .dropdown-control {
    font-size: 1.3rem;
    text-transform: uppercase;
    padding: 0.75rem 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: 700;
    color: rgb(var(--text), 0.75);
    letter-spacing: 0.025em;
    display: flex;
    align-items: center;
  }

  .dropdown-arrow {
    margin-left: 2rem;
    position: relative;
    top: 2px;
  }

  .dropdown-menu {
    background-color: white;
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .dropdown-option {
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    font-family: inherit;
    color: black;

    &:hover {
      background-color: rgb(var(--primary), 0.1);
    }
  }
`;

const CustomButton = styled(Button)`
  padding: 0.75rem 1.5rem;
  line-height: 1.8;
`;

const NavItemList = styled.div`
  display: flex;
  list-style: none;
  color: #000;

  ${media('<desktop')} {
    display: none;
  }
`;

const HamburgerMenuWrapper = styled.div`
  ${media('>=desktop')} {
    display: none;
  }
`;

const LogoWrapper = styled.a`
  display: flex;
  margin-right: auto;
  text-decoration: none;
  color: rgb(var(--logoColor));
`;

const NavItemWrapper = styled.li<Partial<SingleNavItem>>`
  background-color: ${(p) => (p.outlined ? 'rgb(var(--primary))' : 'transparent')};
  border-radius: 0.5rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  line-height: 2;

  &:hover {
    background-color: ${(p) => (p.outlined ? 'rgb(var(--primary), 0.8)' : 'transparent')};
    transition: background-color 0.2s;
  }

  a {
    display: flex;
    color: ${(p) => (p.outlined ? 'rgb(var(--textSecondary))' : 'rgb(var(--text), 0.75)')};
    letter-spacing: 0.025em;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font-weight: 700;
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const NavbarContainer = styled.div<NavbarContainerProps>`
  display: flex;
  position: sticky;
  top: 0;
  padding: 1.5rem 0;
  width: 100%;
  height: 8rem;
  z-index: var(--z-navbar);

  background-color: ${(p) => (p.transparent ? 'transparent' : 'rgb(var(--navbarBackground))')};
  visibility: ${(p) => (p.hidden ? 'hidden' : 'visible')};
  transform: ${(p) => (p.hidden ? `translateY(-8rem) translateZ(0) scale(1)` : 'translateY(0) translateZ(0) scale(1)')};
  box-shadow: ${(p) => (p.transparent ? 'none' : '0 1px 2px 0 rgb(0 0 0 / 5%)')};

  transition-property: transform, visibility, height, box-shadow, background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;
`;

const Content = styled(Container)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
