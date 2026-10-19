# How to Put Your Own Class 12 Notes PDFs in TOPPERS CLUB

You can add your own notes in 3 easy ways:

---

### Method 1: Drop your PDF files directly into `/public/notes/` (Recommended)

1. Place your handwritten PDF files in this `/public/notes/` folder.
   For example:
   - `/public/notes/physics-complete.pdf`
   - `/public/notes/organic-chemistry-complete.pdf`
   - `/public/notes/chapter-1-electric-charges.pdf`

2. In `src/data/chapters.ts`, set the `pdfUrl` field for the chapter or bundle:
   ```ts
   pdfUrl: '/notes/physics-complete.pdf',
   ```

3. Any file in `/public` is served directly by the app. When a user clicks "Preview PDF" or "Download", it loads your real file!

---

### Method 2: Use Google Drive Embed / Public PDF Link (No file storage needed!)

1. Upload your Class 12 notes PDF to **Google Drive**.
2. Right click the file in Google Drive -> **Share** -> Set access to **"Anyone with the link can view"**.
3. Copy the file ID from your Google Drive link:
   - If your link is: `https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9/view?usp=sharing`
   - The preview URL is: `https://drive.google.com/file/d/1A2B3C4D5E6F7G8H9/preview`
4. Paste that preview link into the in-app **"Upload / Link My Own PDF"** manager right inside the Notes Preview section! It will immediately embed and display your Google Drive PDF right inside the previewer.

---

### Method 3: In-App Interactive Uploader (Try It Live Right Now!)

Inside the **Notes Preview section** on the website:
1. Click the **"📁 Add / Link My Own PDF"** button.
2. Select any PDF from your laptop or mobile phone, or paste your Google Drive link.
3. The app will immediately switch to **"Live PDF Viewer"** mode and display your real PDF file inside the notebook preview!
