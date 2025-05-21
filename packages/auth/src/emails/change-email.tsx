 
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components"

interface ChangeEmailProps {
  url: string
}

export default function ChangeEmail({ url }: ChangeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email change</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container>
          <Heading as="h2">Verify Email Change</Heading>
          <Section>
            <Text>
              You requested to change your email address. Please verify this new email by clicking the button below:
            </Text>
            <Button href={url} style={{ background: "#000", color: "#fff", padding: "12px 20px" }}>
              Verify Email Change
            </Button>
            <Text style={{ marginTop: "20px", fontSize: "14px" }}>
              If you didn't request this change, please contact support immediately.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
