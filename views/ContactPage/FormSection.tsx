import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'components/Button';
import Input from 'components/Input';
import { media } from 'utils/media';
import MailSentState from '../../components/MailSentState';

interface EmailPayload {
  name: string;
  email?: string;
  phone: string;
  company: string;
  description: string;
}

export default function FormSection() {
  const [hasSuccessfullySentMail, setHasSuccessfullySentMail] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitSuccessful, isSubmitting, isSubmitted, errors } = formState;

  async function onSubmit(payload: EmailPayload) {
    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: 'Email from contact form', ...payload }),
      });

      if (res.status !== 204) {
        setHasErrored(true);
      }
    } catch {
      setHasErrored(true);
      return;
    }

    setHasSuccessfullySentMail(true);
  }

  const isSent = isSubmitSuccessful && isSubmitted;
  const isDisabled = isSubmitting || isSent;
  const isSubmitDisabled = Object.keys(errors).length > 0 || isDisabled;

  if (hasSuccessfullySentMail) {
    return <MailSentState />;
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {hasErrored && <ErrorMessage>Mail gönderilemedi. Lütfen tekrar deneyiniz.</ErrorMessage>}
        <InputGroup>
          <InputStack>
            {errors.name && <ErrorMessage>İsim zorunludur</ErrorMessage>}
            <Input placeholder="Adınız-Soyadınız" id="name" disabled={isDisabled} {...register('name', { required: true })} />
          </InputStack>
          <InputStack>
            {errors.email && <ErrorMessage>Email zorunludur</ErrorMessage>}
            <Input placeholder="Email Adresiniz" id="email" disabled={isDisabled} {...register('email')} />
          </InputStack>
          <InputStack>
            {errors.phone && <ErrorMessage>Telefon numarası zorunludur</ErrorMessage>}
            <Input placeholder="Telefon Numaranız" id="phone" disabled={isDisabled} {...register('phone', { required: true })} />
          </InputStack>
          <InputStack>
            {errors.company && <ErrorMessage>Şirket adı zorunludur</ErrorMessage>}
            <Input placeholder="Şirket Adınız" id="company" disabled={isDisabled} {...register('company', { required: true })} />
          </InputStack>
        </InputGroup>
        <InputStack>
          {errors.description && <ErrorMessage>Açıklama zorunludur</ErrorMessage>}
          <Textarea
            as="textarea"
            placeholder="Mesajınızı Giriniz..."
            id="description"
            disabled={isDisabled}
            {...register('description', { required: true })}
          />
        </InputStack>
        <Button as="button" type="submit" disabled={isSubmitDisabled}>
          Gönder
        </Button>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 1;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #f9f9f9;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 1rem;
  }
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;

  ${media('<=tablet')} {
    flex-direction: column;
  }
`;

const InputStack = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:first-child) {
    margin-top: 0.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: rgb(var(--errorColor));
  font-size: 1.5rem;
`;

const Textarea = styled(Input)`
  width: 100%;
  min-height: 20rem;
`;
