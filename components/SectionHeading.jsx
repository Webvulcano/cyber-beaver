// Világos szekciók közös fejléce: eyebrow + H2 + bevezető mondat.
// attrs: { eyebrow, title, intro } → CMS szerkesztő data-attribútumok (cms.attr)
export default function SectionHeading({ eyebrow, title, intro, attrs = {} }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-petrol/60" {...attrs.eyebrow}>{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-petrol-deep md:text-4xl" {...attrs.title}>{title}</h2>
      {intro && <p className="mt-6 text-lg text-petrol/70" {...attrs.intro}>{intro}</p>}
    </div>
  );
}
