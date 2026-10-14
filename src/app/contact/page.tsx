"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Hero,
  Card,
  CardBody,
  CardHeader,
  FormField,
  TextInput,
  TextArea,
  Button,
  Icons,
} from "@/components/ui";

/**
 * Contact page — Sprint 1.3.
 *
 * Per chairman directive there is no newsletter field and no email storage.
 * The contact form is a client-side form that simply opens the user's
 * email client with a pre-filled mailto: link; nothing is captured or
 * stored by MyNoosaHeads. The fallback email address is shown for users
 * who prefer to compose their own email.
 */

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      `From: ${name} <${email}>`,
      ``,
      message,
      ``,
      `— — —`,
      `Sent from the MyNoosaHeads contact form.`,
      `This form does not store any data. It opens your email client.`,
    ].join("\n");
    const mailto = `mailto:hello@mynoosaheads.com?subject=${encodeURIComponent(
      subject || "MyNoosaHeads contact"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <div className="bg-paper-50">
      <Hero
        eyebrow="Contact · no email storage"
        title="Get in touch"
        subtitle="The form below opens your email client with a pre-filled message. Nothing is captured, stored, or sent to a third party — your message never touches our servers."
        flourish="We reply within a few days."
      />

      <section className="container-page py-14 md:py-20" aria-labelledby="contact-h">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="eyebrow">Send a message</p>
            <h2 id="contact-h" className="mt-1 font-display text-display-md text-ink-900 text-balance">
              Use the form, or email direct.
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5 max-w-2xl"
              aria-describedby="form-help"
            >
              <p id="form-help" className="callout">
                <strong>Privacy note.</strong> This form does not store any
                data. When you submit, your email client opens with the
                message pre-filled; you decide whether to send it. If you
                prefer, you can email{" "}
                <a
                  href="mailto:hello@mynoosaheads.com"
                  className="link text-ocean-700"
                >
                  hello@mynoosaheads.com
                </a>{" "}
                directly.
              </p>

              <FormField id="contact-name" label="Your name" required>
                {(props) => (
                  <TextInput
                    {...props}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                )}
              </FormField>

              <FormField id="contact-email" label="Email address" required>
                {(props) => (
                  <TextInput
                    {...props}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                )}
              </FormField>

              <FormField id="contact-subject" label="Subject">
                {(props) => (
                  <TextInput
                    {...props}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Correction to the fishing page"
                  />
                )}
              </FormField>

              <FormField
                id="contact-message"
                label="Message"
                required
                help="Include the page URL if you’re reporting an error."
              >
                {(props) => (
                  <TextArea
                    {...props}
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                )}
              </FormField>

              <div className="flex flex-wrap gap-3">
                <Button type="submit" size="lg">
                  Open email client
                </Button>
                <Button
                  href="mailto:hello@mynoosaheads.com"
                  variant="outline"
                  size="lg"
                  trailingIcon={<Icons.External size={14} />}
                >
                  Email direct
                </Button>
              </div>
            </form>
          </div>

          <aside className="space-y-6">
            <Card variant="surface">
              <CardHeader eyebrow="What we’re good at" title="" />
              <CardBody>
                <ul className="space-y-2 text-body-sm text-ink-800 list-disc pl-5">
                  <li>Error reports on specific pages (include the URL)</li>
                  <li>Outbound links that are broken</li>
                  <li>Suggestions for additional Noosa coverage</li>
                  <li>Affiliation enquiries from local operators</li>
                </ul>
              </CardBody>
            </Card>
            <Card variant="surface">
              <CardHeader eyebrow="Response time" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  We aim to reply within 3 business days. The site is run
                  by a small editorial team; complex editorial questions
                  may take longer.
                </p>
              </CardBody>
            </Card>
            <Card variant="surface">
              <CardHeader eyebrow="For urgent safety issues" title="" />
              <CardBody>
                <p className="text-body-sm text-ink-800">
                  MyNoosaHeads is not an emergency service. For an
                  immediate coastal safety issue, contact the relevant
                  authority —{" "}
                  <Link
                    href="https://www.lifesaving.com.au/"
                    className="link text-ocean-700"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Surf Life Saving QLD
                  </Link>{" "}
                  for beach incidents, or{" "}
                  <a
                    href="tel:000"
                    className="link text-ocean-700"
                  >
                    000
                  </a>{" "}
                  for emergencies.
                </p>
              </CardBody>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}
