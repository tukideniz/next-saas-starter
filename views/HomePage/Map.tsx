import styled from 'styled-components';

export default function MapSection() {
  return (
    <Wrapper>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d841.342864243427!2d31.72371609677223!3d37.677992864319776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dab7101dd90167%3A0xea191c1b285acdc3!2zRnVOYSBZYXrEsWzEsW0gJiBSZWtsYW0gQWphbnPEsQ!5e0!3m2!1sen!2str!4v1722933599382!5m2!1sen!2str"
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade" 
      ></iframe>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #f9f9f9;
  display: flex;
  justify-content: flex-end; /* Aligns the map to the right side */
  
  @media (max-width: 768px) {
    padding: 0;
    justify-content: center; /* Center-aligns on mobile */
  }

  iframe {
    width: 400px;
    height: 400px;
    max-width: 100%; /* Ensures it does not exceed the container's width */
    max-height: 500px; /* You can adjust this to your preference */
    min-width: 300px; /* Adjust for smaller screens if needed */
  }
`;
