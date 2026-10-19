// IndexedDB storage for offline & persistent notes PDFs
// Avoids Google Drive permission issues and keeps uploaded PDFs saved across reloads.

const DB_NAME = 'ToppersClubNotesDB';
const DB_VERSION = 1;
const STORE_NAME = 'chapter_pdfs';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB not supported in this browser.'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveChapterPdf(chapterId: string, file: Blob): Promise<string> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const putReq = store.put(file, chapterId);
    putReq.onsuccess = () => {
      const url = URL.createObjectURL(file);
      resolve(url);
    };
    putReq.onerror = () => reject(putReq.error);
  });
}

export async function getChapterPdf(chapterId: string): Promise<string | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const getReq = store.get(chapterId);
      getReq.onsuccess = () => {
        if (getReq.result instanceof Blob) {
          resolve(URL.createObjectURL(getReq.result));
        } else {
          resolve(null);
        }
      };
      getReq.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function getAllCustomPdfs(): Promise<Record<string, string>> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      const results: Record<string, string> = {};

      req.onsuccess = (e: any) => {
        const cursor = e.target.result;
        if (cursor) {
          const key = cursor.key as string;
          const blob = cursor.value as Blob;
          if (blob instanceof Blob) {
            results[key] = URL.createObjectURL(blob);
          }
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

export async function deleteChapterPdf(chapterId: string): Promise<void> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(chapterId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore
  }
}

// Convert ANY Google Drive link into an embeddable preview link without iframe blocks:
export function convertGoogleDriveUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Extract Google Drive file ID:
  // Examples:
  // https://drive.google.com/file/d/1AbC-xYz_123/view?usp=sharing
  // https://drive.google.com/open?id=1AbC-xYz_123
  // https://docs.google.com/file/d/1AbC-xYz_123/edit
  const match = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }

  // If already a preview URL or standard PDF url:
  if (trimmed.includes('drive.google.com') && trimmed.includes('/view')) {
    return trimmed.replace('/view', '/preview');
  }

  return trimmed;
}
