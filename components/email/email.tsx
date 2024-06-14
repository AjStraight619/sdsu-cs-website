import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  senderEmail?: string;
  verificationUrl?: string
};

export default function VerificationEmail({
  message,
  senderEmail,
  verificationUrl
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm Email</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                You received the following message from the register form
              </Heading>

              <Text>{message}</Text>
              <Hr />
              {/*  <Text>The sender's email is: {senderEmail}</Text> */}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
