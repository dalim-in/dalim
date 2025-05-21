 
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components"

interface ResetPasswordEmailProps {
  url: string
}

export function ResetPasswordEmail({ url }: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container>
          <Heading as="h2">Reset Your Password</Heading>
          <Section>
            <Text>You requested to reset your password. Click the button below to set a new password:</Text>
            <Button href={url} style={{ background: "#000", color: "#fff", padding: "12px 20px" }}>
              Reset Password
            </Button>
            <Text style={{ marginTop: "20px", fontSize: "14px" }}>
              If you didn't request this, you can safely ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
