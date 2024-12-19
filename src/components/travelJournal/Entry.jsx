import { MapPin } from "lucide-react";

export default function Entry({ id, img, title, country, googleMapsLink, dates, text }) {
  return (
    <section className="flex flex-col gap-4">
      <img 
        src={img.src} 
        alt={img.alt} 
        className="w-full h-[300px] object-cover" 
      />
      <section className="flex flex-col gap-2">
        <section>
          <section className="flex items-center gap-6">
            <small className="flex items-center gap-1 uppercase">
              <MapPin size={16} className="text-red-500" />
              {country}
            </small>
            <a className="underline text-sm" href={googleMapsLink}>
              View on Google Maps
            </a>
          </section>
          <h1 className="text-2xl font-semibold">{title}</h1>
        </section>
        <h2 className="text-lg font-bold">{dates}</h2>
        <p>{text}</p>
      </section>
    </section>
  );
}
