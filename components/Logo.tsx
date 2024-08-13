import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import funaHeaderSiyah from 'public/funaheadersiyah.png';

export default function Logo({ ...rest }) {
  return (
    <Link href="/">
      <a>
        <Image
          src={funaHeaderSiyah}
          id="logoheader"
          width={210}
          height={60}
          alt="Logo"
          {...rest}
        />
      </a>
    </Link>
  );
}
