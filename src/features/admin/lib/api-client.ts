/**
 * Wrapper autour des appels API admin pour centraliser la gestion des erreurs
 * et extraire les messages utilisateur.
 */
export function extractApiError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Une erreur inattendue s'est produite.";
}
