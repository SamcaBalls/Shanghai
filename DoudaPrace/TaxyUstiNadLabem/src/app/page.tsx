import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import OrderForm from "@/components/OrderForm";
import FAQ from "@/components/FAQ";
import CTAStrip from "@/components/CTAStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <OrderForm />
      <FAQ />
      <CTAStrip />
    </>
  );
}
