const LOGO_URL = 'https://dmg0joh3jdjfmu8k.public.blob.vercel-storage.com/business-logos/1776384361305-logo-hammill-electric-logo.jpg';

export default function HammillLogo({ size = 120, className = '' }) {
  return (
    <img
      src={LOGO_URL}
      alt="Hammill Electric LLC"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    />
  );
}
