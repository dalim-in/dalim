 
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components"

interface VerifyEmailProps {
  url: string
}

export function VerifyEmail({ url }: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container>
          <Heading as="h2">Verify Your Email</Heading>
          <Section>
            <Text>Thank you for signing up! Please verify your email address by clicking the button below:</Text>
            <Button href={url} style={{ background: "#000", color: "#fff", padding: "12px 20px" }}>
              Verify Email
            </Button>
            <Text style={{ marginTop: "20px", fontSize: "14px" }}>
              If you didn't create an account, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
