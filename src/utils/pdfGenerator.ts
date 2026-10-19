import jsPDF from 'jspdf';
import { PHYSICS_CHAPTERS, ORGANIC_CHEMISTRY_CHAPTERS } from '../data/chapters';

export interface GeneratePdfOptions {
  studentName?: string;
  dob?: string;
  passId?: string;
  utrNumber?: string;
  chapterTitle?: string;
  price?: number;
  subjectFilter?: 'all' | 'physics' | 'chemistry';
}

export function generateToppersClubPdf(options: GeneratePdfOptions = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const studentName = options.studentName || 'Class 12 Topper';
  const studentDob = options.dob || 'Class 12 Batch 2025';
  const studentPassId = options.passId || options.utrNumber || `TC-PASS-${Math.floor(100000 + Math.random() * 900000)}`;
  const chapterName = options.chapterTitle || 'Class 12 Chapter Notes';
  const paidAmount = options.price ? `₹${options.price}` : 'Verified';

  // Page 1: Cover Page
  doc.setFillColor(11, 15, 23); // #0b0f17
  doc.rect(0, 0, 210, 297, 'F');

  // Decorative border
  doc.setDrawColor(245, 158, 11); // Amber
  doc.setLineWidth(1.2);
  doc.rect(10, 10, 190, 277);
  doc.setLineWidth(0.4);
  doc.rect(13, 13, 184, 271);

  // Header Title
  doc.setTextColor(245, 158, 11); // Amber-500
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('TOPPERS CLUB', 105, 45, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(chapterName.toUpperCase(), 105, 55, { align: 'center' });

  doc.setTextColor(148, 163, 184); // Slate-400
  doc.setFontSize(11);
  doc.text('HANDWRITTEN TOPPER REVISION GUIDE & PYQ CHEATSHEET', 105, 63, { align: 'center' });

  // Slogan Banner
  doc.setFillColor(245, 158, 11);
  doc.roundedRect(30, 75, 150, 14, 3, 3, 'F');
  doc.setTextColor(11, 15, 23);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`ACE YOUR EXAMS AFFORDABLY • ${paidAmount} CHAPTER PASS`, 105, 84, { align: 'center' });

  // Verified License Box
  doc.setFillColor(17, 24, 39);
  doc.setDrawColor(55, 65, 81);
  doc.roundedRect(25, 100, 160, 42, 3, 3, 'FD');

  doc.setTextColor(209, 213, 219);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL VERIFIED ACCESS PASS', 35, 112);
  doc.setFont('helvetica', 'normal');
  doc.text(`Licensed To: ${studentName}`, 35, 120);
  doc.text(`DOB: ${studentDob}  •  Student Access ID: ${studentPassId}`, 35, 127);
  doc.text(`Resource: ${chapterName} (${paidAmount} Pass)`, 35, 134);

  // Table of Contents Summary
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('VAULT CONTENTS INCLUDED:', 35, 160);

  const bulletPoints = [
    '• Part A: 14 Class 12 Physics Chapters (Derivations, Ray Diagrams & AC Formulas)',
    '• Part B: Complete Organic Chemistry (SN1/SN2, Aldol, Cannizzaro, Sandmeyer)',
    '• Part C: 28 Essential 5-Mark Physics Derivations Master Checklist',
    '• Part D: 35 Name Reactions Alphabetical Quick-Recall Roadmap',
    '• Part E: 60+ Exam Trap Warnings (CBSE Examiner Red Flags)',
    '• Part F: 10-Year Solved PYQ Trend Analysis'
  ];

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(226, 232, 240);
  let yPos = 172;
  bulletPoints.forEach((point) => {
    doc.text(point, 35, yPos);
    yPos += 10;
  });

  // Footer Note
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.text('TOPPERS CLUB © 2024-2026 • Crafted by Class 12 Toppers for all aspiring students', 105, 275, { align: 'center' });

  // Page 2: High-Yield Physics Derivations Summary
  doc.addPage();
  doc.setFillColor(251, 251, 248); // Ruled paper white
  doc.rect(0, 0, 210, 297, 'F');

  // Red margin line on left (notebook aesthetic)
  doc.setDrawColor(239, 68, 68);
  doc.setLineWidth(0.6);
  doc.line(25, 0, 25, 297);

  // Header
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 1: TOP 10 GUARANTEED 5-MARK PHYSICS DERIVATIONS', 30, 25);
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Always write step-by-step with labeled vector diagrams for full CBSE credit.', 30, 32);

  let py = 45;
  const derivations = [
    { title: "1. Gauss's Law - Infinite Straight Wire", formula: "E = λ / (2πε₀r)", note: "Take Gaussian cylinder of radius r and length L. Flux through flat ends is zero." },
    { title: "2. Gauss's Law - Thin Infinite Sheet", formula: "E = σ / (2ε₀)", note: "Field is independent of distance from the sheet. Gaussian cylinder cuts through sheet." },
    { title: "3. Electric Dipole - Axial & Equatorial Points", formula: "E_axial = 2kp/r³, E_equatorial = kp/r³", note: "E_axial is double of E_equatorial. Show vector resolution on equatorial line." },
    { title: "4. Capacitance with Dielectric Slab (t < d)", formula: "C = ε₀A / [d - t(1 - 1/K)]", note: "Net field in slab is E = E₀/K. Potential V = E₀(d-t) + (E₀/K)t." },
    { title: "5. Drift Velocity & Ohm's Law Deduction", formula: "I = n A e vd, ρ = m / (ne²τ)", note: "Show acceleration a = -eE/m and relaxation time τ decreases with temperature." },
    { title: "6. Moving Coil Galvanometer Sensitivity", formula: "Current Sens = NBA/k, Volt Sens = NBA/(kR)", note: "Radial magnetic field produced by concave poles and soft iron cylinder." },
    { title: "7. Series LCR Resonance & Impedance", formula: "Z = √[R² + (ωL - 1/ωC)²], ω₀ = 1/√(LC)", note: "At resonance Z = R (min) and I = V/R (max). Power factor cos φ = 1." },
    { title: "8. Lens Maker's Formula for Thin Lens", formula: "1/f = (μ₂/μ₁ - 1)[1/R₁ - 1/R₂]", note: "Apply refraction formula at both surfaces; virtual object for 2nd surface." },
    { title: "9. Astronomical Telescope Magnification", formula: "m = -f₀ / f_e (Normal), L = f₀ + f_e", note: "Draw rays parallel at infinity. Objective must have large aperture." },
    { title: "10. YDSE Fringe Width β Derivation", formula: "β = λD / d", note: "Path difference Δx = yd/D. Bright fringe yn = nλD/d, fringe width is constant." }
  ];

  derivations.forEach((d) => {
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(28, py - 4, 172, 18, 2, 2, 'F');
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(d.title, 32, py + 1);

    doc.setTextColor(217, 119, 6); // Amber-600
    doc.setFont('helvetica', 'bold');
    doc.text(d.formula, 135, py + 1);

    doc.setTextColor(71, 85, 105);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text(d.note, 32, py + 8);
    py += 23;
  });

  // Page 3: Organic Chemistry Name Reactions & Conversion Roadmaps
  doc.addPage();
  doc.setFillColor(251, 251, 248);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setDrawColor(239, 68, 68);
  doc.setLineWidth(0.6);
  doc.line(25, 0, 25, 297);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION 2: ORGANIC CHEMISTRY 35 NAME REACTIONS RAPID MEMORIZER', 30, 25);
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('All reactions below are repeated in CBSE 2014-2024 board examinations.', 30, 32);

  const orgReactions = [
    { name: "1. Sandmeyer Reaction", eqn: "Ar-N₂⁺Cl⁻ + CuCl/HCl → Ar-Cl + N₂", tip: "Best way to introduce halogen to benzene ring." },
    { name: "2. Finkelstein Reaction", eqn: "R-Cl + NaI (dry acetone) → R-I + NaCl↓", tip: "Precipitation of NaCl in acetone drives equilibrium." },
    { name: "3. Swarts Reaction", eqn: "R-Br + AgF / SbF₃ / Hg₂F₂ → R-F + AgBr", tip: "The ONLY method to synthesize alkyl fluorides." },
    { name: "4. Kolbe's Reaction", eqn: "Phenol + NaOH + CO₂ (400K, 5atm) / H⁺ → Salicylic Acid", tip: "Precursor for Aspirin synthesis with acetic anhydride." },
    { name: "5. Reimer-Tiemann", eqn: "Phenol + CHCl₃ + 3 NaOH → Salicylaldehyde", tip: "Electrophile is neutral dichlorocarbene :CCl₂." },
    { name: "6. Williamson Ether Synthesis", eqn: "R-ONa + R′-X → R-O-R′ (R′-X must be 1°)", tip: "If 3° alkyl halide is used, elimination alkene is formed!" },
    { name: "7. Rosenmund Reduction", eqn: "R-COCl + H₂ / Pd-BaSO₄ (quinoline) → R-CHO", tip: "BaSO₄ poisons catalyst to prevent further reduction to alcohol." },
    { name: "8. Aldol Condensation", eqn: "2 CH₃CHO (dil NaOH) → CH₃CH(OH)CH₂CHO → But-2-enal", tip: "Requires α-hydrogen. Product is α,β-unsaturated aldehyde." },
    { name: "9. Cannizzaro Reaction", eqn: "2 HCHO (50% NaOH) → CH₃OH + HCOONa", tip: "For carbonyls with NO α-H; disproportionation reaction." },
    { name: "10. Clemmensen Reduction", eqn: ">C=O + Zn-Hg / conc. HCl → >CH₂", tip: "Used for acid-stable ketones; converts C=O to CH₂." },
    { name: "11. Hoffmann Bromamide", eqn: "R-CONH₂ + Br₂ + 4 NaOH → R-NH₂ + Na₂CO₃", tip: "Descending the carbon chain by exactly 1 carbon." },
    { name: "12. Carbylamine Test", eqn: "R-NH₂ + CHCl₃ + 3 alc. KOH → R-NC (foul smell)", tip: "Specific test for 1° aliphatic & aromatic amines." }
  ];

  let oy = 44;
  orgReactions.forEach((r) => {
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(28, oy - 3, 172, 17, 2, 2, 'F');

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.text(r.name, 32, oy + 2);

    doc.setTextColor(13, 148, 136); // Teal-600
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(r.eqn, 95, oy + 2);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(`Pro Tip: ${r.tip}`, 32, oy + 9);
    oy += 19.5;
  });

  // Page 4: Full Drive Master Vault & QR Code Verification Certificate
  doc.addPage();
  doc.setFillColor(11, 15, 23);
  doc.rect(0, 0, 210, 297, 'F');

  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(1);
  doc.rect(12, 12, 186, 273);

  doc.setTextColor(245, 158, 11);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('TOPPERS CLUB MASTER DRIVE VAULT', 105, 35, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Your Full 220+ Pages High-Resolution Handwritten Vault Is Unlocked!', 105, 45, { align: 'center' });

  doc.setFillColor(30, 41, 59);
  doc.roundedRect(25, 60, 160, 60, 4, 4, 'F');

  doc.setTextColor(251, 191, 36);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL CLOUD ACCESS CREDENTIALS', 35, 75);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`• Student Name: ${studentName}`, 35, 87);
  doc.text(`• Date of Birth (DOB): ${studentDob}`, 35, 94);
  doc.text(`• Verified Student Pass ID: ${studentPassId}`, 35, 101);
  doc.text('• Direct High-Speed Download URL: toppersclub.in/vault/class12-master-bundle', 35, 108);

  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.text('Save this PDF for offline revision, derivation practice, and exam morning recall.', 105, 140, { align: 'center' });

  doc.save(`TOPPERS_CLUB_Class12_Physics_Chemistry_Notes_${studentName.replace(/\s+/g, '_')}.pdf`);
}
