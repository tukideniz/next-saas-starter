import BasicSection from 'components/BasicSection';
import styled from 'styled-components';

import Hero from 'views/HomePage/Hero';
import Partners from 'views/HomePage/Partners';

export default function Homepage() {
  return (
    <HomepageWrapper>
      <Hero />
      <Partners />
      <BasicSection imageUrl="/demo-illustration-1.png" title="Lorem ipsum dolor sit amet consectetur." overTitle="sit amet gogo">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem error incidunt a doloremque voluptatem porro inventore
          voluptate quo deleniti animi laboriosam. Possimus ullam velit rem itaque consectetur, in distinctio? Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Soluta repellendus quia quos obcaecati nihil. Laudantium non accusantium, voluptate eum nesciunt at
          suscipit quis est soluta?
        </p>
      </BasicSection>
      <BasicSection imageUrl="/demo-illustration-2.png" title="Lorem ipsum dolor sit." overTitle="gugu gaga" reversed>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem error incidunt a doloremque voluptatem porro inventore
          voluptate quo deleniti animi laboriosam. Possimus ullam velit rem itaque consectetur, in distinctio?{' '}
        </p>
        <ul>
          <li>Professional point 1</li>
          <li>Professional remark 2</li>
          <li>Professional feature 3</li>
        </ul>
      </BasicSection>
    </HomepageWrapper>
  );
}

const HomepageWrapper = styled.div`
  & > *:not(:first-child) {
    margin-top: 15rem;
  }
`;