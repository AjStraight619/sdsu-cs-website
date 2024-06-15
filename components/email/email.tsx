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
  verificationUrl,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm Your Email</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Email Verification Required
              </Heading>

              <Text>
                Thank you for registering! Please click the link below to verify your email address and complete your registration:
              </Text>

              <Text>
                <a href={verificationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Verify your email
                </a>
              </Text>

              <Hr />

              <Text>
                If you did not register for an account, please ignore this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
