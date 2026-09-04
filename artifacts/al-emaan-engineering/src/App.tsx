import { type ReactNode, useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  HardHat,
  Menu,
  MessageCircle,
  MoveUpRight,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import screwPumpImage from '@assets/al_emaan_screw_pump_clean_enhanced_1788512606174.jpg';
import formworkImage from '@assets/al_emaan_formwork_clean_enhanced_1788512606227.jpg';
import liftingImage from '@assets/al_emaan_lifting_equipment_enhanced_1788512606254.jpg';

const queryClient = new QueryClient();
const whatsappBase = 'https://wa.me/923122229849';
const whatsappGeneralMessage =
  'Hello Al Emaan Engineering, I would like to discuss my construction equipment requirements.';

type Product = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  price: string;
  image: string;
  imagePosition: string;
  summary: string;
  specs: string[];
  message: string;
};

const products: Product[] = [
  {
    id: 'screw-pump',
    index: '01',
    eyebrow: 'Concrete delivery',
    title:
      'High Quality Small Secondary Structure Feeding Machine for Concrete Delivery Screw Pump on Construction Site',
    price: 'PKR 250,000',
    image: screwPumpImage,
    imagePosition: 'center',
    summary:
      'A compact, workshop-ready feeding solution for controlled concrete delivery on secondary structures and active sites.',
    specs: ['Small footprint', 'Heavy-duty steel body', 'Site-ready mobility'],
    message:
      'Hello Al Emaan Engineering, I am interested in the High Quality Small Secondary Structure Feeding Machine for Concrete Delivery Screw Pump on Construction Site. Please share availability and delivery details.',
  },
  {
    id: 'formwork',
    index: '02',
    eyebrow: 'Concrete forming',
    title:
      'Plastic Formwork Reusable PVC PP Formwork High Strength Adjustable Size Formwork Panel for Concrete',
    price: 'PKR 3,500',
    image: formworkImage,
    imagePosition: 'center',
    summary:
      'Reusable, adjustable panels that bring a clean, repeatable edge to concrete work without the weight of traditional systems.',
    specs: ['Reusable PVC / PP', 'Adjustable sizing', 'High-strength panels'],
    message:
      'Hello Al Emaan Engineering, I am interested in the Plastic Formwork Reusable PVC PP Formwork High Strength Adjustable Size Formwork Panel for Concrete. Please share availability and delivery details.',
  },
  {
    id: 'lifting-equipment',
    index: '03',
    eyebrow: 'Material handling',
    title:
      'Portable Indoor Electric Lifting Equipment for Construction Material Lift to Take 100kgs From Ground',
    price: 'PKR 220,000',
    image: liftingImage,
    imagePosition: 'center',
    summary:
      'Portable electric lifting equipment made for moving up to 100 kg of material safely between ground and working levels.',
    specs: ['100 kg lift capacity', 'Portable indoor format', 'Electric operation'],
    message:
      'Hello Al Emaan Engineering, I am interested in the Portable Indoor Electric Lifting Equipment for Construction Material Lift to Take 100kgs From Ground. Please share availability and delivery details.',
  },
];

function WhatsAppLink({
  message,
  children,
  className = '',
  testId,
}: {
  message: string;
  children: ReactNode;
  className?: string;
  testId: string;
}) {
  return (
    <a
      href={`${whatsappBase}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      className={className}
      data-testid={testId}
    >
      {children}
    </a>
  );
}

function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#13232c]/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.eyebrow} details`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-testid={`dialog-product-${product.id}`}
    >
      <div className="modal-in relative grid max-h-[92dvh] w-full max-w-4xl overflow-auto bg-[#f3f0e7] sm:grid-cols-[.9fr_1.1fr]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border border-[#13232c]/20 bg-[#f3f0e7] text-[#13232c] transition-colors hover:bg-[#e6ff45]"
          aria-label="Close product details"
          data-testid={`button-close-details-${product.id}`}
        >
          <X size={20} />
        </button>
        <div className="min-h-[270px] overflow-hidden bg-[#d8d4c9]">
          <img
            src={product.image}
            alt={product.title}
            className="h-full min-h-[270px] w-full object-cover"
            style={{ objectPosition: product.imagePosition }}
            data-testid={`img-detail-${product.id}`}
          />
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-11">
          <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[.2em] text-[#f06423]">
            Product {product.index} / {product.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[.9] tracking-tight text-[#13232c] sm:text-5xl">
            {product.title}
          </h2>
          <p className="mt-6 text-base leading-7 text-[#526069]">{product.summary}</p>
          <div className="my-7 grid gap-3 border-y border-[#13232c]/15 py-5">
            {product.specs.map((spec) => (
              <div key={spec} className="flex items-center gap-3 text-sm font-semibold text-[#13232c]">
                <Check size={16} className="text-[#f06423]" />
                {spec}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#526069]">Listed price</p>
              <p className="mt-1 font-display text-4xl font-bold text-[#13232c]">{product.price}</p>
            </div>
            <WhatsAppLink
              message={product.message}
              testId={`link-whatsapp-modal-${product.id}`}
              className="inline-flex items-center gap-3 bg-[#13232c] px-5 py-3.5 text-sm font-bold text-[#e6ff45] transition-colors hover:bg-[#f06423] hover:text-[#13232c]"
            >
              <MessageCircle size={18} />
              Ask about this product
              <ArrowUpRight size={17} />
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navigation({ onContact }: { onContact: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { label: 'Equipment', href: '#equipment' },
    { label: 'Why Al Emaan', href: '#why-us' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-[#13232c]/10 bg-[#f3f0e7]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3" data-testid="link-home">
          <span className="flex h-9 w-9 items-center justify-center bg-[#13232c] text-[#e6ff45]">
            <HardHat size={19} strokeWidth={2.4} />
          </span>
          <span className="font-display text-[22px] font-bold uppercase leading-none tracking-tight text-[#13232c]">
            Al Emaan<span className="text-[#f06423]">.</span>
            <span className="block text-[9px] tracking-[.26em] text-[#526069]">Engineering</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="link-underline pb-1 text-[12px] font-bold uppercase tracking-[.13em] text-[#526069] hover:text-[#13232c]"
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href="tel:+923122229849" className="flex items-center gap-2 text-xs font-semibold text-[#526069]" data-testid="link-phone">
            <Phone size={15} className="text-[#f06423]" />
            +92 312 222 9849
          </a>
          <button
            type="button"
            onClick={onContact}
            className="inline-flex items-center gap-2 bg-[#13232c] px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] text-[#e6ff45] transition-all hover:bg-[#f06423] hover:text-[#13232c]"
            data-testid="button-nav-contact"
          >
            Start a conversation
            <ArrowUpRight size={15} />
          </button>
        </div>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-[#13232c]/15 text-[#13232c] md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          data-testid="button-mobile-menu"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-[#13232c]/10 bg-[#f3f0e7] px-5 py-5 md:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border-b border-[#13232c]/10 py-3 text-sm font-bold uppercase tracking-[.12em] text-[#13232c]"
                data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}
              >
                {item.label}
                <ArrowRight size={16} className="text-[#f06423]" />
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onContact();
            }}
            className="mt-5 flex w-full items-center justify-center gap-2 bg-[#13232c] px-4 py-3.5 text-xs font-bold uppercase tracking-[.12em] text-[#e6ff45]"
            data-testid="button-mobile-contact"
          >
            Talk to our team <MessageCircle size={16} />
          </button>
        </div>
      )}
    </header>
  );
}

function ProductCard({ product, onDetails }: { product: Product; onDetails: (product: Product) => void }) {
  return (
    <article className="product-card group flex flex-col border border-[#13232c]/15 bg-[#f3f0e7]" data-testid={`card-product-${product.id}`}>
      <div className="relative aspect-[1.08] overflow-hidden bg-[#d8d4c9]">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
          style={{ objectPosition: product.imagePosition }}
          loading="lazy"
          data-testid={`img-product-${product.id}`}
        />
        <span className="absolute left-4 top-4 bg-[#e6ff45] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#13232c]">
          {product.index} / {product.eyebrow}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-[27px] font-bold uppercase leading-[.92] text-[#13232c]">{product.title}</h3>
        <p className="mt-4 text-sm leading-6 text-[#526069]">{product.summary}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#13232c]/15 pt-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.18em] text-[#526069]">From</p>
            <p className="font-display text-3xl font-bold text-[#13232c]" data-testid={`text-price-${product.id}`}>{product.price}</p>
          </div>
          <button
            type="button"
            onClick={() => onDetails(product)}
            className="group/button inline-flex items-center gap-2 pb-1 text-xs font-bold uppercase tracking-[.1em] text-[#13232c] transition-colors hover:text-[#f06423]"
            data-testid={`button-view-details-${product.id}`}
          >
            View details
            <ArrowUpRight size={16} className="transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAllReasons, setShowAllReasons] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openContact = () => {
    window.open(`${whatsappBase}?text=${encodeURIComponent(whatsappGeneralMessage)}`, '_blank', 'noopener,noreferrer');
  };

  const reasons = [
    { icon: ShieldCheck, title: 'Equipment that earns its place', text: 'Selected for dependable output, sensible maintenance, and the realities of working sites.' },
    { icon: Ruler, title: 'Specifications without guesswork', text: 'Clear product information and direct answers before you commit budget or schedule.' },
    { icon: Clock3, title: 'A response when it matters', text: 'Talk directly with our team on WhatsApp for stock, pricing, and delivery conversations.' },
    { icon: Zap, title: 'Built for the next move', text: 'Practical equipment and building solutions that help teams keep the work moving.' },
  ];

  return (
    <main className="site-shell min-h-[100dvh] bg-[#f3f0e7] text-[#13232c]" id="top">
      <Navigation onContact={openContact} />

      <section className="blueprint-grid relative overflow-hidden pt-[76px]" aria-labelledby="hero-heading">
        <div className="mx-auto grid min-h-[690px] max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.88fr_1.12fr] lg:px-12 lg:py-20">
          <div className="relative z-10 max-w-[680px]">
            <div className="reveal mb-7 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-[#f06423]">
              <span className="h-px w-10 bg-[#f06423]" />
              Construction equipment / Building solutions
            </div>
            <h1 id="hero-heading" className="reveal reveal-delay-1 font-display text-[clamp(4.7rem,11vw,9.8rem)] font-bold uppercase leading-[.77] tracking-[-.045em] text-[#13232c]">
              Make the<br /><span className="text-[#f06423]">next build</span><br />certain.
            </h1>
            <p className="reveal reveal-delay-2 mt-9 max-w-[455px] text-base leading-7 text-[#526069] sm:text-lg">
              Al Emaan Engineering supplies the equipment and building essentials that keep serious work precise, productive, and on schedule.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={openContact}
                className="inline-flex items-center gap-3 bg-[#f06423] px-6 py-4 text-xs font-bold uppercase tracking-[.13em] text-[#13232c] transition-all hover:bg-[#e6ff45]"
                data-testid="button-hero-whatsapp"
              >
                <MessageCircle size={18} />
                Speak with an engineer
                <ArrowUpRight size={16} />
              </button>
              <a href="#equipment" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-[#13232c]" data-testid="link-hero-equipment">
                Explore equipment
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>
            <div className="reveal reveal-delay-3 mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#13232c]/15 pt-5">
              <div><span className="font-display text-3xl font-bold">01</span><span className="ml-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#526069]">Direct sourcing</span></div>
              <div><span className="font-display text-3xl font-bold">100kg</span><span className="ml-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#526069]">Lift capacity</span></div>
              <div><span className="font-display text-3xl font-bold">PKR</span><span className="ml-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#526069]">Clear pricing</span></div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[680px] lg:ml-auto">
            <div className="relative aspect-[1.04] overflow-hidden border-[10px] border-[#13232c] bg-[#13232c] shadow-[20px_20px_0_hsl(30_100%_56%)]">
              <img src={screwPumpImage} alt="Al Emaan Engineering concrete screw pump" className="h-full w-full object-cover" data-testid="img-hero-equipment" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13232c]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[#f3f0e7]">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#e6ff45]">Featured / 01</p>
                  <p className="mt-1 font-display text-3xl font-bold uppercase leading-none">Site-ready<br />concrete flow</p>
                </div>
                <span className="flex h-12 w-12 items-center justify-center border border-[#f3f0e7]/60"><MoveUpRight size={20} /></span>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-4 hidden w-40 border border-[#13232c]/20 bg-[#e6ff45] p-4 sm:block">
              <Sparkles size={18} className="mb-7 text-[#f06423]" />
              <p className="font-display text-2xl font-bold uppercase leading-none">Good work<br />starts here.</p>
            </div>
            <div className={`absolute -right-3 -top-4 h-20 w-20 border-8 border-[#f06423] ${scrolled ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
          </div>
        </div>
        <div className="hidden absolute bottom-8 right-12 font-mono text-[10px] uppercase tracking-[.2em] text-[#526069] lg:block">24°51' N / 67°00' E</div>
      </section>

      <section className="border-y border-[#13232c]/10 bg-[#13232c] text-[#f3f0e7]" aria-label="Company statement">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 py-7 sm:px-8 md:flex-row md:items-center lg:px-12">
          <p className="font-display text-3xl font-bold uppercase leading-none sm:text-4xl">The right equipment changes the whole pour.</p>
          <p className="max-w-xs text-sm leading-6 text-[#b5c0c3]">Practical tools. Honest conversations. Better-built outcomes.</p>
        </div>
      </section>

      <section id="equipment" className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.25em] text-[#f06423]">The current line-up</p>
            <h2 className="font-display text-6xl font-bold uppercase leading-[.8] tracking-tight sm:text-8xl">Equipment<br /><span className="text-[#f06423]">with purpose.</span></h2>
          </div>
          <p className="max-w-[310px] text-sm leading-6 text-[#526069]">Three focused solutions for the moments that make or break a construction schedule. Open a product to see the details.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} onDetails={setSelectedProduct} />)}
        </div>
      </section>

      <section id="why-us" className="bg-[#e6ff45]">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:px-12 lg:py-28">
          <div>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.25em] text-[#f06423]">Why Al Emaan</p>
            <h2 className="font-display text-6xl font-bold uppercase leading-[.8] tracking-tight sm:text-8xl">Less<br />uncertainty.<br /><span className="text-[#f06423]">More build.</span></h2>
            <p className="mt-8 max-w-[340px] text-sm leading-6 text-[#13232c]/75">Established with a practical point of view: if it does not help your team build better, it does not belong in the conversation.</p>
          </div>
          <div className="grid gap-px bg-[#13232c]/20 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={reason.title} className={`bg-[#e6ff45] p-6 sm:p-8 ${index > 1 && !showAllReasons ? 'hidden sm:block' : ''}`} data-testid={`trust-point-${index + 1}`}>
                  <Icon size={25} strokeWidth={1.7} className="text-[#f06423]" />
                  <p className="mt-10 font-display text-3xl font-bold uppercase leading-[.9]">{reason.title}</p>
                  <p className="mt-4 max-w-[260px] text-sm leading-6 text-[#13232c]/70">{reason.text}</p>
                </div>
              );
            })}
          </div>
          <button type="button" onClick={() => setShowAllReasons((shown) => !shown)} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#13232c] sm:hidden" data-testid="button-toggle-trust-points">
            {showAllReasons ? 'Show less' : 'See all four reasons'}
            {showAllReasons ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </section>

      <section id="about" className="relative overflow-hidden bg-[#d8d4c9]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12 lg:py-32">
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-24 w-24 border-8 border-[#f06423]" />
            <div className="relative overflow-hidden border-[9px] border-[#13232c]">
              <img src={liftingImage} alt="Construction material lifting equipment in use" className="aspect-[1.1] w-full object-cover grayscale-[.12]" data-testid="img-about-lifting" />
              <div className="absolute bottom-0 left-0 bg-[#13232c] px-5 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-[#e6ff45]">Move material / move forward</div>
            </div>
          </div>
          <div>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.25em] text-[#f06423]">A working relationship</p>
            <h2 className="font-display text-6xl font-bold uppercase leading-[.8] tracking-tight sm:text-8xl">Built on<br /><span className="text-[#f06423]">straight talk.</span></h2>
            <p className="mt-8 max-w-[520px] text-base leading-7 text-[#526069]">Al Emaan Engineering is a construction equipment and building solutions business for contractors, professionals, and businesses who value reliable tools and clear decisions. We make it easier to find the right equipment, understand what it does, and get a direct answer from a real team.</p>
            <p className="mt-5 max-w-[520px] text-base leading-7 text-[#526069]">From a concrete feeding machine to reusable formwork and portable lifting equipment, our line-up is focused on useful performance—not a warehouse full of noise.</p>
            <button type="button" onClick={openContact} className="mt-9 inline-flex items-center gap-3 border-b-2 border-[#f06423] pb-2 text-xs font-bold uppercase tracking-[.13em] text-[#13232c] transition-colors hover:text-[#f06423]" data-testid="button-about-contact">
              Ask a practical question <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f06423]">
        <div className="mx-auto grid max-w-[1440px] items-center gap-9 px-5 py-20 sm:px-8 md:grid-cols-[1fr_auto] lg:px-12 lg:py-24">
          <div>
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[.25em] text-[#13232c]/65">Your next site starts with one message</p>
            <h2 className="font-display text-[clamp(4rem,9vw,8rem)] font-bold uppercase leading-[.78] tracking-tight text-[#13232c]">Let&apos;s talk<br /><span className="text-[#e6ff45]">equipment.</span></h2>
          </div>
          <div className="md:pr-8">
            <p className="mb-6 max-w-[270px] text-sm font-medium leading-6 text-[#13232c]/75">Tell us what you are building, what you need to move, and when you need it. We&apos;ll take it from there.</p>
            <WhatsAppLink message={whatsappGeneralMessage} testId="link-whatsapp-cta" className="whatsapp-pulse inline-flex items-center gap-3 bg-[#13232c] px-6 py-4 text-xs font-bold uppercase tracking-[.13em] text-[#e6ff45] transition-colors hover:bg-[#e6ff45] hover:text-[#13232c]">
              <MessageCircle size={19} />
              WhatsApp Al Emaan Engineering
              <ArrowUpRight size={16} />
            </WhatsAppLink>
          </div>
        </div>
      </section>

      <footer className="bg-[#13232c] text-[#f3f0e7]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
          <div className="grid gap-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center bg-[#e6ff45] text-[#13232c]"><HardHat size={19} /></span>
                <span className="font-display text-[24px] font-bold uppercase leading-none">Al Emaan<span className="text-[#f06423]">.</span><span className="block text-[9px] tracking-[.26em] text-[#9aa8ad]">Engineering</span></span>
              </div>
              <p className="mt-7 max-w-[300px] text-sm leading-6 text-[#9aa8ad]">Construction equipment and building solutions for teams that take the work seriously.</p>
            </div>
            <div>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[.2em] text-[#e6ff45]">Navigate</p>
              <div className="grid gap-3 text-sm text-[#c6d0d2]">
                <a href="#equipment" className="hover:text-[#e6ff45]" data-testid="link-footer-equipment">Equipment</a>
                <a href="#why-us" className="hover:text-[#e6ff45]" data-testid="link-footer-why-us">Why Al Emaan</a>
                <a href="#about" className="hover:text-[#e6ff45]" data-testid="link-footer-about">About us</a>
              </div>
            </div>
            <div>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[.2em] text-[#e6ff45]">Reach the team</p>
              <div className="grid gap-3 text-sm text-[#c6d0d2]">
                <WhatsAppLink message={whatsappGeneralMessage} testId="link-footer-whatsapp" className="flex items-center gap-2 hover:text-[#e6ff45]"><MessageCircle size={15} /> WhatsApp us directly</WhatsAppLink>
                <a href="tel:+923122229849" className="flex items-center gap-2 hover:text-[#e6ff45]" data-testid="link-footer-phone"><Phone size={15} /> +92 312 222 9849</a>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col justify-between gap-3 border-t border-[#f3f0e7]/15 pt-5 text-[10px] uppercase tracking-[.14em] text-[#829196] sm:flex-row">
            <span>© {new Date().getFullYear()} Al Emaan Engineering</span>
            <span>Equipment that keeps work moving.</span>
          </div>
        </div>
      </footer>

      <WhatsAppLink message={whatsappGeneralMessage} testId="link-floating-whatsapp" className="whatsapp-pulse fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-[#13232c] shadow-[0_8px_20px_hsl(197_29%_15%_/_0.22)] transition-transform hover:scale-105 sm:bottom-7 sm:right-7" aria-label="Chat with Al Emaan Engineering on WhatsApp">
        <MessageCircle size={25} strokeWidth={2.2} />
      </WhatsAppLink>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={window.location.pathname}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;