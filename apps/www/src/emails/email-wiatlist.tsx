import { DALIM_URL } from "@dalim/auth";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export const EmailTemplate = () => {
    
  return (
    <Html>
      <Head />
      <Preview>{`You’re on the waitlist for Dalim`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            style={{ margin: 'auto'}}
            src={`${DALIM_URL}/brand/logo-icon.svg`}
            width="100"
            height="100"
            alt="Dalim"
          />
          <Section>
            <Text
              style={text}
            >{`Big welcome and thanks for subscribing Dalim`}</Text>
            <Text style={text}>
              🚀 The mission is to send out a stylish and simple newsletter that
              help busy creatives to stay updated without cluttering their
              inbox.
            </Text>
            <Text style={text}>
              🛳 All new AI resources and tools are carefully curated, with only
              a handful of the best being shipped.
            </Text>
            <Text style={text}>Expect a new shipment every Tuesday!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};
 

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "400",
  color: "#404040",
  lineHeight: "26px",
  // padding: "0 40px",
};
 