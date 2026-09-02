// OWNED BY: shared — Primitive UI de base.
// Calés au caractère près sur components/events/RegistrationForm.tsx pour que
// tout nouveau formulaire ait le même style sans le retaper à la main. Ajout
// additif — les formulaires existants n'ont pas besoin de migrer.
import type { InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes } from "react";

const FIELD_CLASSES =
  "mt-1 w-full rounded-xl border border-brand-beige bg-white px-4 py-3 text-brand-brown placeholder:text-brand-brown/40 focus:border-brand-brown focus:outline-none";

export function Label({ className = "", ...rest }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`block text-sm font-semibold text-brand-brown ${className}`.trim()} {...rest} />;
}

export function Input({ className = "", ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${FIELD_CLASSES} ${className}`.trim()} {...rest} />;
}

export function Textarea({ className = "", ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${FIELD_CLASSES} ${className}`.trim()} {...rest} />;
}

// Export par défaut pratique pour `import Input from "@/components/ui/Input"`.
export default Input;
