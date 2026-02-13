/**
 * Validateurs côté client pour les formulaires admin.
 * Note: la validation côté serveur reste la source de vérité.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TITLE_LENGTH = 255;
const MAX_META_TITLE_LENGTH = 60;
const MAX_META_DESCRIPTION_LENGTH = 160;

export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) return { valid: false, message: "L'email est obligatoire." };
  if (!EMAIL_REGEX.test(trimmed)) return { valid: false, message: "Format d'email invalide." };
  return { valid: true };
}

export function validateLoginCredentials(
  email: string,
  password: string
): ValidationResult {
  const emailResult = validateEmail(email);
  if (!emailResult.valid) return emailResult;
  if (!password.trim()) return { valid: false, message: "Le mot de passe est obligatoire." };
  return { valid: true };
}

export function validateArticleForm(data: {
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}): ValidationResult {
  const title = data.title.trim();
  const content = data.content.trim();

  if (!title) return { valid: false, message: "Le titre est obligatoire." };
  if (title.length > MAX_TITLE_LENGTH) {
    return { valid: false, message: `Le titre ne doit pas dépasser ${MAX_TITLE_LENGTH} caractères.` };
  }
  if (!content) return { valid: false, message: "Le contenu est obligatoire." };

  if (data.metaTitle && data.metaTitle.length > MAX_META_TITLE_LENGTH) {
    return { valid: false, message: `La meta title ne doit pas dépasser ${MAX_META_TITLE_LENGTH} caractères.` };
  }
  if (data.metaDescription && data.metaDescription.length > MAX_META_DESCRIPTION_LENGTH) {
    return { valid: false, message: `La meta description ne doit pas dépasser ${MAX_META_DESCRIPTION_LENGTH} caractères.` };
  }

  return { valid: true };
}

export function validateCategoryOrTagName(name: string): ValidationResult {
  if (!name.trim()) return { valid: false, message: "Le nom est obligatoire." };
  return { valid: true };
}
