import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import ContactForm from '@/components/demos/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | AI Automation Specialist',
  description:
    'Get in touch to discuss AI automation projects. The contact form is powered by AI — watch it analyze your message and generate a personalized response in real time.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary pt-16">
        <section className="border-b border-border bg-bg-secondary py-16 text-center">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Demo 5</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Smart Contact Form</h1>
            <p className="mt-4 text-text-secondary">
              This form is itself a live demo. Send a message and watch the AI detect your intent, assess
              urgency, and write a personalized response — all in real time.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-xl px-4 sm:px-6">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
