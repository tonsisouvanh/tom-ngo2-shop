import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-transparent z-10"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"></div>

      <div className="container relative z-20 mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Style Redefined
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl">
          Curating fashion that speaks to your individuality
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/products">Explore Collection</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="rounded-full px-8"
          >
            <a
              target="_blank"
              href="https://web.facebook.com/profile.php?id=61577003547664"
            >
              Get in Touch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
