import Link from "next/link";
import { CheckCircleIcon, Rocket, Package, PackageOpen } from "lucide-react";

export default function WaitlistPage() {
  return (
    <main className="container md:mx-auto max-w-6xl md:px-4 py-12 md:py-20">
      {/* Header Section */}
      <section className="-mt-20 border border-fd-border border-b-0 p-6 px-12 relative zimbra-background"></section>

      {/* Hero Section */}
      <section className="text-center border border-fd-border border-b-0 p-8 md:p-12 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl">
          How do you want to use Task Genius?
        </h1>
        <p className="mb-8 max-w-2xl mx-auto text-lg text-fd-muted-foreground">
          Choose the version that fits your workflow
        </p>
      </section>

      {/* Dual Path Selection Cards */}
      <section className="border border-fd-border border-b-1 px-6 p-8 md:p-12 bg-fd-background backdrop-blur-sm bg-opacity-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Plugin Card */}
          <div className="flex flex-col p-8 border border-fd-border hover:border-fd-primary/50 transition-all bg-fd-background/50 group">
            <div className="flex items-center justify-center mb-6 group/icon-container">
              <PackageOpen className="size-8 sm:size-12 md:size-16 text-fd-primary hidden group-hover/icon-container:block group-hover/icon-container:scale-110 transition-transform" />
              <Package className="size-8 sm:size-12 md:size-16 text-fd-primary block group-hover/icon-container:hidden group-hover/icon-container:scale-110 transition-transform" />
            </div>
            <h2 className="text-2xl font-semibold text-fd-foreground mb-2 text-center">
              Task Genius Plugin
            </h2>
            <p className="text-fd-muted-foreground mb-6 text-center text-sm">
              For Obsidian Users
            </p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start text-sm">
                <CheckCircleIcon className="mr-2 size-5 flex-shrink-0 text-fd-primary mt-0.5" />
                <span className="text-fd-foreground">
                  Works within your Obsidian vault
                </span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircleIcon className="mr-2 size-5 flex-shrink-0 text-fd-primary mt-0.5" />
                <span className="text-fd-foreground">
                  Seamless note integration
                </span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircleIcon className="mr-2 size-5 flex-shrink-0 text-fd-primary mt-0.5" />
                <span className="text-fd-foreground">
                  Available now - Free and Open-source
                </span>
              </li>
            </ul>
            <Link
              href="/#installation"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-fd-border rounded-md bg-fd-background text-fd-foreground font-medium hover:bg-fd-muted/50 focus:outline-none focus:ring-2 focus:ring-fd-primary transition-all"
            >
              Install Plugin
            </Link>
          </div>

          {/* Desktop Card */}
          <div className="flex flex-col p-8 border border-fd-border hover:border-fd-primary/50 transition-all bg-fd-background/50 group">
            <div className="flex items-center justify-center mb-6">
              <Rocket className="size-8 sm:size-12 md:size-16 text-fd-primary group-hover:scale-110 transition-transform" />
            </div>
            <h2 className="text-2xl font-semibold text-fd-foreground mb-2 text-center">
              Task Genius Desktop
            </h2>
            <p className="text-fd-muted-foreground mb-6 text-center text-sm">
              Standalone Application
            </p>
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start text-sm">
                <CheckCircleIcon className="mr-2 size-5 flex-shrink-0 text-fd-primary mt-0.5" />
                <span className="text-fd-foreground">
                  Independent from Obsidian
                </span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircleIcon className="mr-2 size-5 flex-shrink-0 text-fd-primary mt-0.5" />
                <span className="text-fd-foreground">
                  Local-first & Private
                </span>
              </li>
              <li className="flex items-start text-sm">
                <CheckCircleIcon className="mr-2 size-5 flex-shrink-0 text-fd-primary mt-0.5" />
                <span className="text-fd-foreground">
                  Coming Soon - Join Waitlist
                </span>
              </li>
            </ul>
            <Link
              href="/app"
              className="w-full inline-flex items-center justify-center cursor-pointer px-6 py-3 border border-fd-primary rounded-md bg-fd-primary text-fd-primary-foreground font-medium hover:bg-fd-primary/90 focus:outline-none focus:ring-2 focus:ring-fd-primary transition-all"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>

      {/* Community Section */}
      <section className="border border-fd-border border-b-1 pt-12 px-6 md:px-12 pb-6 relative">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold mr-2">
            Community
          </span>
          <span className="text-fd-muted-foreground font-sans font-bold">
            :)
          </span>
        </div>
        <div className="text-center">
          <p className="text-fd-muted-foreground text-sm mb-4">
            Questions?{" "}
            <Link
              href="https://discord.gg/ARR2rHHX6b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-primary hover:underline"
            >
              Join our community
            </Link>{" "}
            or{" "}
            <Link
              href="https://github.com/taskgenius/taskgenius-plugin/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fd-primary hover:underline"
            >
              GitHub Discussions
            </Link>{" "}
            to learn more.
          </p>
        </div>
      </section>

      {/* Divider */}
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>

      {/* Legal & Contact Section */}
      <section className="border border-fd-border border-b-1 pt-12 px-6 md:px-12 pb-6 relative">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">Legal</span>
          <span className="text-fd-muted-foreground font-sans font-bold">
            {" "}
            / Contact
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-center">
          <Link
            href="/privacy"
            className="flex flex-col items-center justify-center p-4 border border-fd-border hover:bg-fd-muted/50 transition-colors group"
          >
            <div className="text-sm font-medium text-fd-foreground group-hover:text-fd-primary">
              Privacy Policy
            </div>
            <div className="text-xs text-fd-muted-foreground mt-1">
              How we protect your data
            </div>
          </Link>
          <Link
            href="/terms"
            className="flex flex-col items-center justify-center p-4 border border-fd-border hover:bg-fd-muted/50 transition-colors group"
          >
            <div className="text-sm font-medium text-fd-foreground group-hover:text-fd-primary">
              Terms of Service
            </div>
            <div className="text-xs text-fd-muted-foreground mt-1">
              Usage terms & conditions
            </div>
          </Link>
          <a
            href="mailto:boninall@taskgenius.md"
            className="flex flex-col items-center justify-center p-4 border border-fd-border hover:bg-fd-muted/50 transition-colors group"
          >
            <div className="text-sm font-medium text-fd-foreground group-hover:text-fd-primary">
              Contact
            </div>
            <div className="text-xs text-fd-muted-foreground mt-1">
              boninall@taskgenius.md
            </div>
          </a>
        </div>
      </section>

      {/* Divider */}
      <section className="border border-fd-border border-t-0 border-b-0 p-0 md:p-6 px-12 zimbra-background"></section>

      {/* Copyright Section */}
      <section className="border border-fd-border -mb-20 pt-12 px-6 md:px-12 pb-6 relative text-right">
        <div className="border-r border-b border-fd-border text-sm text-fd-muted-foreground absolute top-0 left-0 px-2 py-2 bg-fd-background backdrop-blur-sm">
          <span className="text-fd-primary font-sans font-bold">Copyright</span>
        </div>
        <div className="prose prose-fd max-w-none">
          <Link
            href="https://boninall.com"
            className="text-fd-muted-foreground hover:text-fd-primary no-underline"
          >
            © {new Date().getFullYear()} Boninall(Quorafind)
          </Link>
        </div>
      </section>
    </main>
  );
}
