export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

import { auth } from './firebase';

/**
 * Handles Firestore errors by throwing a structured JSON string as per system requirements.
 */
export function handleFirestoreError(
  error: any, 
  operationType: FirestoreErrorInfo['operationType'], 
  path: string | null = null
) {
  if (error?.code === 'permission-denied' || error?.message?.includes('insufficient permissions')) {
    const user = auth.currentUser;
    const errorInfo: FirestoreErrorInfo = {
      error: error.message || 'Missing or insufficient permissions',
      operationType,
      path,
      authInfo: {
        userId: user?.uid || 'anonymous',
        email: user?.email || '',
        emailVerified: user?.emailVerified || false,
        isAnonymous: user?.isAnonymous || true,
        providerInfo: user?.providerData.map(p => ({
          providerId: p.providerId,
          displayName: p.displayName || '',
          email: p.email || '',
        })) || [],
      }
    };
    
    // Throwing as a JSON string as requested in system instructions
    throw new Error(JSON.stringify(errorInfo));
  }
  
  // Re-throw other errors
  throw error;
}
