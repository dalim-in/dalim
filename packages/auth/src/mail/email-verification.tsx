import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { DALIM_URL } from '../constants';

interface EmailVerificationProps {
  username?: string;
  verificationLink?: string;
}

export const EmailVerification = ({
  username = '',
  verificationLink = `${DALIM_URL}/verify-email`,
}: EmailVerificationProps) => {
  const previewText = 'Verify your email address';

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] p-[20px]">
            <Heading className="mb-[20px] text-center text-[24px] text-black font-normal">
              Verify your email
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hello {username},
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Please confirm your email address by clicking the button below.
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="bg-[#000000] text-white text-[12px] font-semibold px-5 py-3 rounded"
                href={verificationLink}
              >
                Verify Email
              </Button>
            </Section>
            <Text className="text-[14px] text-black leading-[24px]">
              Or copy and paste this link into your browser:{' '}
              <Link href={verificationLink} className="text-blue-600">
                {verificationLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailVerification.PreviewProps = {
  username: '',
  verificationLink: `${DALIM_URL}/verify-email`,
} as EmailVerificationProps;

export default EmailVerification;
