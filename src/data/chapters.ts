import { Chapter, Review, StudyResource, MasterVaultBundle } from '../types';

export const PHYSICS_CHAPTERS: Chapter[] = [
  {
    id: 'phy-1',
    subject: 'physics',
    number: 1,
    title: 'Electric Charges & Fields',
    tagline: 'Gauss Law applications & electric dipole derivations made crystal clear',
    weightage: '6-7 Marks in Boards',
    pageCount: 18,
    status: 'available',
    price: 15,
    highlightPoints: [
      "Coulomb's Law in vector form & superposition principle with sign convention tricks",
      "Electric field at axial and equatorial points of dipole (step-by-step 5-mark proofs)",
      "Gauss's Law & the 3 essential CBSE derivations: wire, infinite sheet, thin spherical shell",
      "Electric flux through cylinders and cubes (favorite 2-mark CBSE numerical trap)"
    ],
    mostRepeatedQuestions: [
      'Derive electric field intensity on the axial and equatorial line of an electric dipole (CBSE 2017, 2019, 2023)',
      'State Gauss theorem. Use it to find electric field due to infinitely long straight wire (CBSE 2018, 2020, 2024)',
      'Why electric field lines never intersect each other? (CBSE 1-mark guarantee)'
    ],
    keyDerivationsOrMechanisms: [
      'E-field on Dipole Axial Line: E = (1/4πε₀) * (2p/r³)',
      'E-field on Dipole Equatorial Line: E = (1/4πε₀) * (p/r³)',
      'Gauss Law: Infinite wire E = λ / (2πε₀r)',
      'Gauss Law: Thin infinite plane sheet E = σ / (2ε₀)'
    ],
    samplePreview: {
      pageTitle: 'Chapter 01: Electric Charges & Fields (Page 4 of 18)',
      handwrittenNotes: [
        'Electric Dipole in Uniform Field: Torque τ = p × E = pE sin θ',
        'Potential Energy: U = -p · E = -pE cos θ',
        'Stable Equilibrium: θ = 0° (τ = 0, U = -pE is MINIMUM)',
        'Unstable Equilibrium: θ = 180° (τ = 0, U = +pE is MAXIMUM)'
      ],
      diagramLabel: 'Electric Dipole on Equatorial Plane & Field Vector Resolution',
      diagramType: 'dipole',
      examTrapWarning: 'In equatorial derivation, vertical components (E sin θ) cancel out and only horizontal 2E cos θ add up. Draw the vector triangle neatly!',
      topperSecretTip: 'Write the limiting case (r >> 2a) explicitly at the end of the derivation to get the full 5/5 marks from CBSE examiners.'
    }
  },
  {
    id: 'phy-2',
    subject: 'physics',
    number: 2,
    title: 'Electrostatic Potential & Capacitance',
    tagline: 'Parallel plate capacitor with dielectric slab & equipotential rules',
    weightage: '6-8 Marks in Boards',
    pageCount: 22,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Potential due to electric dipole (general point derivation)',
      'Equipotential surfaces properties & sketches for dipole / like charges',
      'Parallel plate capacitor capacitance with and without dielectric slab (t < d)',
      'Energy stored in capacitor U = 1/2 CV² & energy density formula derivation',
      'Common potential and energy loss when two charged capacitors are connected'
    ],
    mostRepeatedQuestions: [
      'Derive expression for capacitance of parallel plate capacitor with dielectric slab of thickness t (CBSE 2016, 2020, 2023)',
      'Plot equipotential surfaces for: (a) single positive charge, (b) electric dipole (CBSE 2019, 2022)'
    ],
    keyDerivationsOrMechanisms: [
      'Capacitance with dielectric slab: C = ε₀A / [d - t(1 - 1/K)]',
      'Energy loss on sharing charges: ΔU = [C₁C₂ / 2(C₁+C₂)] * (V₁ - V₂)²'
    ],
    samplePreview: {
      pageTitle: 'Chapter 02: Capacitance Master Blueprint (Page 9 of 22)',
      handwrittenNotes: [
        'Dielectric Slab insertion between plates:',
        'Case 1 (Battery Connected): Voltage V stays constant! Charge Q increases by K times, C = K·C₀',
        'Case 2 (Battery Disconnected): Charge Q stays constant! Voltage V drops to V₀/K, C = K·C₀',
        'Energy density: u = 1/2 ε₀ E²'
      ],
      diagramLabel: 'Electric Field Lines Across Partially Filled Dielectric Slab',
      diagramType: 'dipole',
      examTrapWarning: 'Always read whether battery was KEPT CONNECTED or DISCONNECTED before inserting slab! 80% students lose 3 marks here.',
      topperSecretTip: 'Memorize the 2x2 comparison table given on Page 11 of our notes—guarantees full marks in case-based questions.'
    }
  },
  {
    id: 'phy-3',
    subject: 'physics',
    number: 3,
    title: 'Current Electricity',
    tagline: 'Kirchhoff rules made painless with sign conventions & drift velocity',
    weightage: '7-8 Marks in Boards',
    pageCount: 20,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Drift velocity derivation: vd = -eEτ/m and relation with electric current I = n·e·A·vd',
      'Deduction of Ohm’s Law from fundamental microscopic parameters',
      "Kirchhoff's Junction Rule and Loop Rule with fool-proof sign convention chart",
      'Wheatstone bridge balanced condition proof using Kirchhoff’s Laws',
      'Internal resistance, Terminal potential difference V = E - Ir (discharging) & V = E + Ir (charging)'
    ],
    mostRepeatedQuestions: [
      'Derive relation between electric current and drift velocity of electrons (CBSE 2015, 2018, 2021, 2024)',
      'State Kirchhoff rules. Use them to obtain balanced Wheatstone bridge condition (CBSE 2019, 2023)'
    ],
    keyDerivationsOrMechanisms: [
      'Drift Velocity & Current: I = n A e vd',
      'Resistivity formula: ρ = m / (n e² τ)',
      'Wheatstone condition: P/Q = R/S'
    ],
    samplePreview: {
      pageTitle: 'Chapter 03: Current Electricity & Kirchhoff Loops (Page 6 of 20)',
      handwrittenNotes: [
        'Drift Velocity Microscopic proof:',
        'F = -eE => a = -eE/m',
        'vd = 0 + a·τ = -eEτ/m',
        'Current I = total charge in volume / time = (n·A·L·e) / (L/vd) = n·e·A·vd'
      ],
      diagramLabel: 'Electron Cloud Drift & Relaxation Time τ Representation',
      diagramType: 'lcr',
      examTrapWarning: 'Always mention that relaxation time τ decreases as temperature increases, hence resistance of metallic conductors increases.',
      topperSecretTip: 'In Kirchhoff loop numericals, trace clockwise with standard sign: battery positive to negative is -E, going against current is +IR.'
    }
  },
  {
    id: 'phy-4',
    subject: 'physics',
    number: 4,
    title: 'Moving Charges & Magnetism',
    tagline: 'Biot-Savart circular loop derivation & Galvanometer conversion formulas',
    weightage: '8-9 Marks in Boards',
    pageCount: 24,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Biot-Savart Law and axial magnetic field of a circular current-carrying coil',
      "Ampere's Circuital Law and magnetic field inside a long straight solenoid",
      'Force between two parallel current-carrying wires and official definition of 1 Ampere',
      'Torque on a rectangular current loop in a magnetic field: τ = M × B = NIAB sin θ',
      'Moving Coil Galvanometer: Construction, working, conversion to ammeter (shunt S) & voltmeter (series R)'
    ],
    mostRepeatedQuestions: [
      'Derive magnetic field on the axis of a circular current loop (CBSE 2017, 2019, 2022, 2024)',
      'How to convert a Galvanometer of resistance G into: (i) Ammeter, (ii) Voltmeter (CBSE 2016, 2020, 2023)'
    ],
    keyDerivationsOrMechanisms: [
      'Axial B-field circular loop: B = (μ₀ I R²) / [2 (R² + x²)^(3/2)]',
      'Force between wires per meter: F/L = (μ₀ I₁ I₂) / (2π d)',
      'Ammeter Shunt: S = (Ig · G) / (I - Ig)',
      'Voltmeter Series Resistance: R = (V / Ig) - G'
    ],
    samplePreview: {
      pageTitle: 'Chapter 04: Moving Charges & Magnetism (Page 14 of 24)',
      handwrittenNotes: [
        'Moving Coil Galvanometer Conversion Formulae:',
        '1. To Ammeter: Connect small resistance (SHUNT S) in PARALLEL',
        '   S = Ig·G / (I - Ig)',
        '2. To Voltmeter: Connect high resistance R in SERIES',
        '   R = (V / Ig) - G'
      ],
      diagramLabel: 'Radial Magnetic Field by Concave Pole Pieces & Soft Iron Core',
      diagramType: 'dipole',
      examTrapWarning: 'State the function of concave poles and soft iron core in galvanometer: creates RADIAL field so torque τ = NIAB is always maximum (sin θ = 1).',
      topperSecretTip: 'Ammeter resistance is R_eff = G·S/(G+S) ≈ 0. Voltmeter resistance is R_eff = G + R ≈ ∞.'
    }
  },
  {
    id: 'phy-5',
    subject: 'physics',
    number: 5,
    title: 'Magnetism & Matter',
    tagline: 'Magnetic dipole moment, Earth elements & Dia/Para/Ferro comparison table',
    weightage: '4-5 Marks in Boards',
    pageCount: 16,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Bar magnet as an equivalent solenoid (derivation of magnetic field)',
      'Magnetic dipole moment M = m × 2l and torque in external magnetic field',
      'Magnetic properties: Diamagnetic, Paramagnetic, and Ferromagnetic detailed 5-point comparison table',
      'Curie’s Law and temperature dependence of magnetic susceptibility χ'
    ],
    mostRepeatedQuestions: [
      'Distinguish between Diamagnetic, Paramagnetic and Ferromagnetic substances (CBSE 2018, 2021, 2023)',
      'Show that a bar magnet is equivalent to a current carrying solenoid (CBSE 2017, 2020)'
    ],
    keyDerivationsOrMechanisms: [
      'B-field on Bar Magnet Axial: B = (μ₀ / 4π) * (2M / r³)',
      'B-field on Bar Magnet Equatorial: B = (μ₀ / 4π) * (M / r³)',
      'Curie Law: χ = C / T'
    ],
    samplePreview: {
      pageTitle: 'Chapter 05: Magnetism & Matter (Page 6 of 16)',
      handwrittenNotes: [
        'Dia vs Para vs Ferro Quick Table:',
        'Diamagnetic: χ is small & negative, feebly repelled by magnet (Bi, Cu, H₂O)',
        'Paramagnetic: χ is small & positive, feebly attracted (Al, Na, O₂)',
        'Ferromagnetic: χ is very large & positive, strongly attracted (Fe, Co, Ni)'
      ],
      diagramLabel: 'Magnetic Field Lines Expelled by Diamagnetic Substance',
      diagramType: 'dipole',
      examTrapWarning: 'Superconductors show perfect diamagnetism with χ = -1 (Meissner Effect). Frequently asked in CBSE MCQs.',
      topperSecretTip: 'Ferromagnetic substance above Curie temperature Tc transitions into a PARAMAGNETIC substance.'
    }
  },
  {
    id: 'phy-6',
    subject: 'physics',
    number: 6,
    title: 'Electromagnetic Induction',
    tagline: 'Faraday & Lenz laws, motional EMF derivation & mutual inductance',
    weightage: '6-7 Marks in Boards',
    pageCount: 22,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Faraday laws of EMI & Lenz Law with conservation of energy justification',
      'Motional EMF ε = Bvl derivation with mechanical work done vs electrical power dissipation',
      'Self-inductance (solenoid L = μ₀ n² A l) and mutual inductance',
      'Eddy currents: Generation, energy loss, and damping applications'
    ],
    mostRepeatedQuestions: [
      'Derive expression for motional EMF induced across a conductor moving in magnetic field (CBSE 2016, 2019, 2023)',
      'State Lenz law. Explain how it complies with principle of conservation of energy (CBSE 2018, 2022)'
    ],
    keyDerivationsOrMechanisms: [
      'Motional EMF: ε = B · v · l',
      'Mechanical Power: P = F · v = (B² l² v²) / R',
      'Self Inductance of Solenoid: L = μ₀ n² A l'
    ],
    samplePreview: {
      pageTitle: 'Chapter 06: EMI & Motional EMF Proof (Page 8 of 22)',
      handwrittenNotes: [
        'Motional EMF Step-by-Step Proof:',
        'Magnetic flux Φ = B · A = B · l · x',
        'Induced EMF ε = -dΦ/dt = -B · l · (dx/dt) = B · v · l',
        'Current I = ε/R = (Bvl) / R',
        'Magnetic Force on rod: F = I l B = (B² l² v) / R'
      ],
      diagramLabel: 'Conducting Rod Moving on U-shaped Rail in Uniform B Field',
      diagramType: 'lcr',
      examTrapWarning: 'Mechanical power supplied to pull the rod P = F·v matches electrical Joule heating dissipation I²R exactly! Mention this to score full credit.',
      topperSecretTip: 'Direction of induced current is given by Fleming’s Right Hand Rule for generators.'
    }
  },
  {
    id: 'phy-7',
    subject: 'physics',
    number: 7,
    title: 'Alternating Current',
    tagline: 'LCR resonance, phasor diagrams, power factor & transformer efficiency',
    weightage: '8-9 Marks in Boards',
    pageCount: 24,
    status: 'available',
    price: 15,
    highlightPoints: [
      'LCR series AC circuit: Phasor diagram, impedance Z = √[R² + (Xl - Xc)²], resonance frequency fr = 1/(2π√LC)',
      'Quality factor (Q-factor), power factor cos φ = R/Z, and wattless current',
      'Step-up and step-down transformer working, voltage transformation ratio, and 4 major energy losses'
    ],
    mostRepeatedQuestions: [
      'Derive impedance and phase angle in a series LCR AC circuit using phasor diagram (CBSE 2016, 2018, 2020, 2023)',
      'State principle and working of an AC transformer. Mention 4 causes of energy loss (CBSE 2017, 2021, 2024)'
    ],
    keyDerivationsOrMechanisms: [
      'LCR Impedance: Z = √[R² + (ωL - 1/ωC)²]',
      'Resonance Frequency: ω₀ = 1 / √(LC)',
      'Transformer Ratio: Vs/Vp = Ns/Np = Ip/Is'
    ],
    samplePreview: {
      pageTitle: 'Chapter 07: Series LCR Circuit Phasor Analysis (Page 8 of 24)',
      handwrittenNotes: [
        'Phasor diagram for series LCR:',
        'VL leads I by 90°, VC lags I by 90°, VR is in phase with I',
        'Net reactive voltage: V_net = √[VR² + (VL - VC)²]',
        'At Resonance: XL = XC => ωL = 1/(ωC) => Z = R (MINIMUM)',
        'Current I is MAXIMUM at resonance: I_max = V/R'
      ],
      diagramLabel: 'Series LCR Phasor Diagram with Impedance Triangle',
      diagramType: 'lcr',
      examTrapWarning: 'At resonance, impedance is purely RESISTIVE, so power factor cos φ = 1. Do not write cos φ = 0!',
      topperSecretTip: 'In transformer losses question, write: (1) Copper loss, (2) Iron/Eddy current loss (laminated core), (3) Hysteresis loss, (4) Flux leakage.'
    }
  },
  {
    id: 'phy-8',
    subject: 'physics',
    number: 8,
    title: 'Ray Optics & Optical Instruments',
    tagline: 'Lens Maker formula derivation, prism formula & telescope ray diagrams',
    weightage: '9-10 Marks in Boards',
    pageCount: 28,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Refraction at spherical surfaces: μ₂/v - μ₁/u = (μ₂ - μ₁)/R',
      "Lens Maker's formula derivation: 1/f = (μ - 1) [1/R₁ - 1/R₂]",
      'Prism formula proof: μ = sin[(A + δm)/2] / sin(A/2)',
      'Astronomical telescope & Compound microscope: Neat ray diagrams for normal adjustment and least distance of distinct vision (D = 25 cm)',
      'Reflecting telescope (Cassegrain) advantages over refracting telescope'
    ],
    mostRepeatedQuestions: [
      'Derive Lens Maker formula for a convex lens (CBSE 2015, 2018, 2020, 2023)',
      'Draw labeled ray diagram of astronomical telescope in normal adjustment (CBSE 2017, 2019, 2024)'
    ],
    keyDerivationsOrMechanisms: [
      "Lens Maker's formula: 1/f = (μ - 1) [1/R₁ - 1/R₂]",
      'Prism Index: μ = sin((A + δm)/2) / sin(A/2)',
      'Compound Microscope M = -(L/fo) * (1 + D/fe)',
      'Astronomical Telescope (Normal) M = -fo / fe, Tube Length L = fo + fe'
    ],
    samplePreview: {
      pageTitle: 'Chapter 08: Ray Optics & Lens Maker Master Proof (Page 12 of 28)',
      handwrittenNotes: [
        'Lens Maker Formula 5-Step Derivation:',
        'Surface 1 (Radius R₁): μ₂/v₁ - μ₁/u = (μ₂ - μ₁)/R₁',
        'Surface 2 (Radius R₂): μ₁/v - μ₂/v₁ = (μ₁ - μ₂)/R₂',
        'Adding (1) & (2): μ₁(1/v - 1/u) = (μ₂ - μ₁)[1/R₁ - 1/R₂]',
        'Since 1/v - 1/u = 1/f => 1/f = (μ₂/μ₁ - 1)[1/R₁ - 1/R₂] Q.E.D.'
      ],
      diagramLabel: 'Ray Diagram: Double Convex Lens with Virtual Intermediate Image',
      diagramType: 'prism',
      examTrapWarning: 'Notice that for the second refraction, image I₁ acts as a VIRTUAL OBJECT inside the denser medium. CBSE deducts 1 mark if this sentence is missing!',
      topperSecretTip: 'In telescope ray diagrams, always draw arrows on every light ray. A ray without an arrow is considered a line, not a light ray!'
    }
  },
  {
    id: 'phy-9',
    subject: 'physics',
    number: 9,
    title: 'Electromagnetic Waves',
    tagline: 'Displacement current, Maxwell equations & EM spectrum frequency chart',
    weightage: '3-4 Marks in Boards',
    pageCount: 14,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Need for displacement current: Maxwell-Ampere circuital law modification ∮B·dl = μ₀(Ic + Id)',
      'Electromagnetic wave transverse nature and energy density u = 1/2 ε₀E² + 1/2 B²/μ₀',
      'Ratio of amplitudes: E₀/B₀ = c = 1/√(μ₀ε₀)',
      'Full EM spectrum wavelength order, production methods, and practical uses'
    ],
    mostRepeatedQuestions: [
      'Write expression for displacement current. Why was it introduced? (CBSE 2019, 2022, 2024)',
      'Identify EM wave used for: (i) Water purification, (ii) Radar, (iii) Night vision (CBSE 2021, 2023)'
    ],
    keyDerivationsOrMechanisms: [
      'Displacement Current: Id = ε₀ · (dΦE/dt)',
      'Maxwell-Ampere Law: ∮ B · dl = μ₀ Ic + μ₀ ε₀ (dΦE/dt)',
      'Speed of Light: c = 1 / √(μ₀ ε₀) = E₀ / B₀',
      'Total Energy Density: u = uE + uB = ε₀ E_rms² = B_rms² / μ₀'
    ],
    samplePreview: {
      pageTitle: 'Chapter 09: Electromagnetic Waves Master Cheatsheet',
      handwrittenNotes: [
        'Displacement Current Origin: Between capacitor plates during charging, conduction current Ic = 0, but changing electric flux produces displacement current Id = ε₀(dΦE/dt).',
        'Continuity: Total current I = Ic + Id is continuous throughout the circuit!',
        'EM Wave Propagation: E along x-axis, B along y-axis => Wave travels along z-axis (direction of E × B).'
      ],
      diagramLabel: 'Mutual Orthogonal Oscillations of E and B Vector Fields in EM Wave',
      diagramType: 'dipole',
      examTrapWarning: 'Never confuse frequency with wavelength order in EM spectrum. Memory Code: Radio, Micro, Infra, Visible, UV, X-Ray, Gamma (Increasing Frequency).',
      topperSecretTip: 'State that average electric energy density equals average magnetic energy density: uE = uB. Examiners test this numerical ratio frequently.'
    }
  },
  {
    id: 'phy-10',
    subject: 'physics',
    number: 10,
    title: 'Wave Optics',
    tagline: 'Huygens proof of Snell law & YDSE fringe width derivation',
    weightage: '6-7 Marks in Boards',
    pageCount: 22,
    status: 'available',
    price: 15,
    highlightPoints: [
      "Huygens' Principle: Proof of laws of reflection and refraction (Snell's Law sin i/sin r = v₁/v₂)",
      'Interference & Young’s Double Slit Experiment: Path difference Δx = yd/D, fringe width β = λD/d derivation',
      'Conditions for sustained interference: coherent sources, identical frequencies, same polarization',
      'Diffraction at single slit central maximum angular width: 2λ/a and linear width: 2λD/a'
    ],
    mostRepeatedQuestions: [
      'Using Huygens principle, verify Snell’s law of refraction (CBSE 2016, 2019, 2022, 2024)',
      'Derive expression for fringe width in Young double slit experiment (CBSE 2018, 2020, 2023)'
    ],
    keyDerivationsOrMechanisms: [
      "Snell's Law via Huygens: sin i / sin r = v₁/v₂ = μ₂/μ₁",
      'YDSE Bright Fringe Position: yn = n · (λ · D) / d',
      'YDSE Dark Fringe Position: yn = (2n - 1) · (λ · D) / (2d)',
      'Fringe Width Formula: β = (λ · D) / d (Identical for bright and dark)'
    ],
    samplePreview: {
      pageTitle: 'Chapter 10: Wave Optics Proofs & Formulas',
      handwrittenNotes: [
        'Huygens Refraction Proof:',
        'In time t, incident wavefront BC travels distance v₁t in medium 1, refracted wavefront AD travels distance v₂t in medium 2.',
        'sin i = BC / AC = v₁t / AC, sin r = AD / AC = v₂t / AC',
        'sin i / sin r = v₁ / v₂ = μ₂ / μ₁ (Snell’s Law Proved!)'
      ],
      diagramLabel: 'Huygens Secondary Wavelets Refraction Geometry at Plane Interface',
      diagramType: 'prism',
      examTrapWarning: 'In single slit diffraction, maxima formula is (2n+1)λ/2, whereas in YDSE interference, (2n+1)λ/2 gives minima! Do NOT interchange them.',
      topperSecretTip: 'When entire YDSE apparatus is immersed in liquid of refractive index μ, fringe width decreases to β′ = β / μ because wavelength shrinks.'
    }
  },
  {
    id: 'phy-11',
    subject: 'physics',
    number: 11,
    title: 'Dual Nature of Radiation & Matter',
    tagline: 'Photoelectric effect graphs, work function & de Broglie matter waves',
    weightage: '4-5 Marks in Boards',
    pageCount: 16,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Einstein’s Photoelectric Equation: hν = Φ₀ + K_max = hν₀ + e·V₀',
      'Photoelectric characteristics: Threshold frequency ν₀, instantaneous emission, stopping potential V₀',
      'Cutoff potential vs frequency graph: Slope = h/e (universal constant), x-intercept = ν₀',
      'de Broglie wavelength of an electron: λ = h / √(2m·e·V) = 1.227 / √V nm'
    ],
    mostRepeatedQuestions: [
      'Explain 3 characteristics of photoelectric effect using Einstein equation (CBSE 2018, 2021, 2023)',
      'Calculate de Broglie wavelength associated with electron accelerated through 100 V (CBSE 2020, 2024)'
    ],
    keyDerivationsOrMechanisms: [
      'Einstein Photoelectric Equation: K_max = h(ν - ν₀) = e · V₀',
      'Stopping Potential vs Frequency: V₀ = (h/e)ν - (Φ₀/e)',
      'de Broglie Relation: λ = h / p = h / √(2mE)',
      'Electron de Broglie Wavelength: λ = 12.27 / √V Å = 1.227 / √V nm'
    ],
    samplePreview: {
      pageTitle: 'Chapter 11: Dual Nature of Matter & Radiation Formulas',
      handwrittenNotes: [
        'Photoelectric Laws Explained by Photon Model:',
        '1. Intensity increase means more photons/sec => higher saturation current, but stopping potential stays unchanged.',
        '2. Frequency increase increases kinetic energy of emitted electrons => stopping potential V₀ increases linearly.',
        'de Broglie wave for gas molecules: λ = h / √(3mkT)'
      ],
      diagramLabel: 'Stopping Potential V₀ vs Frequency ν Curve Showing Threshold Frequency ν₀',
      diagramType: 'dipole',
      examTrapWarning: 'Work function Φ₀ is a property of the metal ONLY. It does not depend on incident light frequency or intensity.',
      topperSecretTip: 'Remember: slope of V₀ vs ν graph is ALWAYS h/e, regardless of whether the metal is Cesium, Copper, or Platinum.'
    }
  },
  {
    id: 'phy-12',
    subject: 'physics',
    number: 12,
    title: 'Atoms',
    tagline: 'Rutherford vs Bohr model, Rydberg formula & spectral series',
    weightage: '3-4 Marks in Boards',
    pageCount: 16,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Alpha particle scattering: Distance of closest approach r₀ = (2 Z e²) / (4πε₀ K)',
      'Bohr Postulates: Quantized angular momentum L = mvr = nh / (2π)',
      'Bohr Orbit Radius derivation: rn = (ε₀ n² h²) / (π m e²) = 0.529 · n² Å',
      'Total energy of electron: En = -13.6 / n² eV (Kinetic K = |En|, Potential U = 2En)',
      'Hydrogen spectral series: Lyman (UV), Balmer (Visible), Paschen, Brackett, Pfund (IR)'
    ],
    mostRepeatedQuestions: [
      'State Bohr postulates. Derive radius of nth orbit in hydrogen atom (CBSE 2017, 2020, 2024)',
      'Find ratio of shortest wavelength of Balmer series to longest wavelength of Lyman series (CBSE 2019, 2023)'
    ],
    keyDerivationsOrMechanisms: [
      'Bohr Angular Momentum: m v r = (n h) / (2π)',
      'Radius of nth Orbit: rn = (n² h² ε₀) / (π m Z e²)',
      'Electron Velocity in Orbit: vn = (Z e²) / (2 ε₀ n h)',
      'Rydberg Wave Number: 1 / λ = R · Z² · (1/n₁² - 1/n₂²)'
    ],
    samplePreview: {
      pageTitle: 'Chapter 12: Atoms Energy Level Derivation Sheet',
      handwrittenNotes: [
        'Total Energy Derivation Steps:',
        '1. Centripetal = Electrostatic: m v² / r = (1/4πε₀) * (e² / r²)',
        '2. Kinetic Energy: K = 1/2 m v² = e² / (8πε₀ r)',
        '3. Potential Energy: U = -e² / (4πε₀ r)',
        '4. Total Energy: E = K + U = -e² / (8πε₀ r) = -13.6 / n² eV'
      ],
      diagramLabel: 'Bohr Hydrogen Energy Levels (-13.6 eV to 0 eV) with Lyman and Balmer Transitions',
      diagramType: 'prism',
      examTrapWarning: 'Notice that total energy E is negative! This indicates a bound system. An electron with E ≥ 0 is free from the nucleus.',
      topperSecretTip: 'Shortest wavelength in any series corresponds to transition from n₂ = ∞ (Series Limit), so 1/λ_min = R / n₁².'
    }
  },
  {
    id: 'phy-13',
    subject: 'physics',
    number: 13,
    title: 'Nuclei',
    tagline: 'Mass defect, binding energy per nucleon curve & nuclear stability',
    weightage: '3-4 Marks in Boards',
    pageCount: 14,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Nuclear radius R = R₀ A^(1/3) where R₀ ≈ 1.2 fm (1.2 × 10⁻¹⁵ m)',
      'Proof that nuclear mass density is constant and independent of mass number A (ρ ≈ 2.3 × 10¹⁷ kg/m³)',
      'Mass defect Δm = [Z·mp + (A-Z)mn] - M_nucleus and Binding Energy Eb = Δm · 931.5 MeV',
      'Binding energy per nucleon curve: Max at ⁵⁶Fe (8.75 MeV/nucleon), decreases for lighter and heavier nuclei'
    ],
    mostRepeatedQuestions: [
      'Draw plot of binding energy per nucleon versus mass number A. State 2 conclusions (CBSE 2018, 2021, 2023)',
      'Show that nuclear density is independent of mass number A (CBSE 2017, 2020, 2024)'
    ],
    keyDerivationsOrMechanisms: [
      'Nuclear Radius: R = R₀ · A^(1/3)',
      'Nuclear Density: ρ = (A · m) / [(4/3) π (R₀ A^(1/3))³] = 3m / (4π R₀³) = Constant',
      'Mass Defect: Δm = [Z · mp + (A - Z) · mn] - M',
      'Binding Energy: Eb = Δm · c² = Δm (in amu) × 931.5 MeV'
    ],
    samplePreview: {
      pageTitle: 'Chapter 13: Nuclei Formulas & Stability Roadmap',
      handwrittenNotes: [
        'Nuclear Density Proof (Standard 2-mark guarantee):',
        'Mass of nucleus M ≈ A × m_nucleon',
        'Volume of nucleus V = 4/3 π R³ = 4/3 π (R₀ A^(1/3))³ = 4/3 π R₀³ A',
        'Density ρ = M / V = (A · m) / (4/3 π R₀³ A) = m / (4/3 π R₀³)',
        'Since A cancels out, density is INDEPENDENT of mass number A!'
      ],
      diagramLabel: 'Binding Energy per Nucleon (Eb/A) vs Mass Number A Curve Showing Fe-56 Peak',
      diagramType: 'dipole',
      examTrapWarning: 'Nuclear forces are short-ranged, saturated, charge-independent, and non-central. They do NOT obey the inverse square law.',
      topperSecretTip: 'Fission releases energy because heavier nuclei (A > 200) move towards higher Eb/A. Fusion releases energy because light nuclei (A < 30) fuse into higher Eb/A.'
    }
  },
  {
    id: 'phy-14',
    subject: 'physics',
    number: 14,
    title: 'Semiconductor Electronics',
    tagline: 'p-n junction diodes, forward/reverse I-V & full wave rectifiers',
    weightage: '7-8 Marks in Boards',
    pageCount: 22,
    status: 'available',
    price: 15,
    highlightPoints: [
      'Energy band diagrams for Conductors (overlapping), Semiconductors (Eg < 3 eV), and Insulators (Eg > 3 eV)',
      'Intrinsic vs Extrinsic Semiconductors: n-type (pentavalent, ne >> nh) and p-type (trivalent, nh >> ne)',
      'p-n junction formation: Diffusion current (majority) and Drift current (minority in electric field)',
      'Depletion region and barrier potential under forward bias (decreases) and reverse bias (increases)',
      'Full Wave and Half Wave Rectifiers: circuit diagram, center-tapped transformer, operation during each half-cycle'
    ],
    mostRepeatedQuestions: [
      'Draw circuit diagram of full wave rectifier and explain its working with waveforms (CBSE 2017, 2021, 2024)',
      'Explain forward and reverse biasing of p-n junction diode with I-V curves (CBSE 2019, 2023)'
    ],
    keyDerivationsOrMechanisms: [
      'Full Wave Rectifier Frequency: f_output = 2 · f_input',
      'Half Wave Rectifier Frequency: f_output = f_input',
      'Mass Action Law: ne · nh = ni² (At constant temperature)',
      'Conductivity of Semiconductor: σ = e · (ne · μe + nh · μh)'
    ],
    samplePreview: {
      pageTitle: 'Chapter 14: Semiconductor Electronics Master Notes',
      handwrittenNotes: [
        'Full Wave Rectifier Working:',
        'During positive half cycle: Diode D1 is Forward Biased (conducts), D2 is Reverse Biased (does not conduct). Current through load is top to bottom.',
        'During negative half cycle: Diode D2 is Forward Biased (conducts), D1 is Reverse Biased (off). Current through load is STILL top to bottom.',
        'Result: Unidirectional pulsating DC output!'
      ],
      diagramLabel: 'Full-Wave Rectifier Circuit with Center-Tapped Transformer & Output Waveforms',
      diagramType: 'rectifier',
      examTrapWarning: 'In Full Wave Rectifier, output frequency is DOUBLE the AC input frequency (f_out = 2f_in). If input is 50 Hz, output ripple is 100 Hz!',
      topperSecretTip: 'Always draw input wave, output across D1, output across D2, and combined output wave to secure all 5 marks from CBSE evaluators.'
    }
  }
];

export const CHEMISTRY_CHAPTERS: Chapter[] = [
  {
    id: 'chem-1',
    subject: 'chemistry',
    number: 1,
    title: 'Haloalkanes & Haloarenes',
    tagline: 'SN1 vs SN2 mechanisms, stereochemistry inversion & Sandmeyer roadmap',
    weightage: '7 Marks in Boards',
    pageCount: 20,
    status: 'available',
    price: 16,
    highlightPoints: [
      'SN1 vs SN2 complete comparison table (rate kinetics, carbocation intermediate, Walden inversion vs racemisation)',
      'Reactivity order: 3° > 2° > 1° for SN1 and 1° > 2° > 3° for SN2',
      'Why aryl halides are extremely unreactive towards nucleophilic substitution (4 reasons)',
      'Name Reactions: Sandmeyer, Gattermann, Finkelstein, Swarts, Wurtz-Fittig, Ullmann reaction',
      'Ambident nucleophiles (KCN gives nitrile vs AgCN gives isonitrile, KNO₂ vs AgNO₂)'
    ],
    mostRepeatedQuestions: [
      'Explain mechanism of SN1 and SN2 reactions with stereochemical consequences (CBSE 2017, 2019, 2021, 2023)',
      'Why are aryl halides less reactive towards nucleophilic substitution than alkyl halides? (CBSE 2018, 2020, 2024)',
      'Convert: (i) Chlorobenzene to phenol, (ii) Propene to 1-nitropropane'
    ],
    keyDerivationsOrMechanisms: [
      'SN1: 2-step mechanism, Carbocation intermediate, Racemic mixture',
      'SN2: 1-step concerted mechanism, Pentavalent transition state, 100% Walden Inversion',
      'Sandmeyer: Ar-N₂⁺Cl⁻ + CuCl/HCl → Ar-Cl + N₂',
      'Finkelstein: R-Cl + NaI (dry acetone) → R-I + NaCl↓'
    ],
    samplePreview: {
      pageTitle: 'Chemistry Ch 01: SN1 vs SN2 Master Mechanism Sheet',
      handwrittenNotes: [
        'SN1 vs SN2 Comparison (Exam Gold):',
        'SN1: Unimolecular, Rate = k[R-X]¹, 3° > 2° > 1°, Polar protic solvent (H₂O/EtOH), Racemisation',
        'SN2: Bimolecular, Rate = k[R-X][Nu⁻], 1° > 2° > 3°, Polar aprotic solvent (DMSO/Acetone), Inversion',
        'Ambident nucleophile trick: Ionic KCN attacks via C (Cyanide), Covalent AgCN attacks via N (Isonitrile)'
      ],
      diagramLabel: 'SN2 Backside Attack & Transition State Walden Inversion Umbrella Flip',
      diagramType: 'sn1_sn2',
      examTrapWarning: 'In aryl halide unreactivity, mention all 4 points: (1) Partial double bond character (resonance), (2) sp² hybridized C, (3) Instability of phenyl cation, (4) Electronic repulsion.',
      topperSecretTip: 'Draw the dashed transition state [Nu···C···X] with partial negative charges δ- to get full mechanism marks.'
    }
  },
  {
    id: 'chem-2',
    subject: 'chemistry',
    number: 2,
    title: 'Aldehydes, Ketones & Carboxylic Acids',
    tagline: 'The highest weightage chapter: Aldol, Cannizzaro, Clemmensen & Tollens test',
    weightage: '9-10 Marks in Boards',
    pageCount: 26,
    status: 'available',
    price: 16,
    highlightPoints: [
      'Nucleophilic addition mechanism on carbonyl group (attack of Nu⁻ on sp² planar carbon)',
      'Reactivity order: Formaldehyde > Aldehydes > Ketones (steric hindrance + +I effect of alkyl groups)',
      'Name Reactions: Rosenmund, Stephen, Etard, Gattermann-Koch, Clemmensen, Wolff-Kishner',
      'Aldol & Cross-Aldol condensation with detailed mechanism (requires α-hydrogen)',
      'Cannizzaro reaction (compounds without α-hydrogen: HCHO, Benzaldehyde) disproportionation',
      'Distinction Tests: Tollens’ Silver Mirror test, Fehling’s solution test, Iodoform test'
    ],
    mostRepeatedQuestions: [
      'Write reactions for: (a) Aldol condensation, (b) Cannizzaro reaction, (c) Wolff-Kishner reduction (CBSE 2016, 2018, 2020, 2022, 2024)',
      'Distinguish between: (i) Acetaldehyde and Benzaldehyde, (ii) Pentan-2-one and Pentan-3-one (CBSE 2019, 2021, 2023)',
      'How will you convert: Benzaldehyde to 3-phenylprop-2-en-1-al (Cinnamaldehyde)?'
    ],
    keyDerivationsOrMechanisms: [
      'Aldol Condensation: 2 CH₃CHO (dil. NaOH) → CH₃-CH(OH)-CH₂-CHO (Δ) → But-2-enal + H₂O',
      'Cannizzaro Reaction: 2 HCHO (conc. 50% NaOH) → CH₃OH + HCOONa',
      'Clemmensen Reduction: C=O + Zn-Hg / conc. HCl → CH₂ (alkane)',
      'Wolff-Kishner: C=O + NH₂NH₂ / KOH, ethylene glycol (Δ) → CH₂ + N₂',
      'Hell-Volhard-Zelinsky (HVZ): R-CH₂-COOH + X₂/red P → R-CH(X)-COOH'
    ],
    samplePreview: {
      pageTitle: 'Chemistry Ch 02: Aldol vs Cannizzaro Diagnostic Sheet',
      handwrittenNotes: [
        'Diagnostic Flowchart for Carbonyl Compounds:',
        'Contains α-hydrogen? (e.g. CH₃CHO, CH₃COCH₃) => Dilute alkali => ALDOL CONDENSATION',
        'NO α-hydrogen? (e.g. HCHO, Ph-CHO, (CH₃)₃C-CHO) => Conc. alkali (50%) => CANNIZZARO DISPROPORTIONATION',
        'Iodoform Test Positive: CH₃-C=O or CH₃-CH(OH)- group gives YELLOW ppt of CHI₃.'
      ],
      diagramLabel: 'Aldol Enolate Attack & Dehydration to α,β-Unsaturated Aldehyde',
      diagramType: 'aldol',
      examTrapWarning: 'Benzophenone does NOT give iodoform test (no CH₃ group), but Acetophenone gives positive iodoform test (has Ph-CO-CH₃). Instant 2-mark question!',
      topperSecretTip: 'Clemmensen uses ACIDIC medium (Zn-Hg / conc. HCl)—do not use for acid-sensitive groups. Wolff-Kishner uses BASIC medium (NH₂NH₂ / KOH).'
    }
  },
  {
    id: 'chem-3',
    subject: 'chemistry',
    number: 3,
    title: 'Amines & Diazonium Salts',
    tagline: 'Basic character in aqueous medium, Gabriel Phthalimide & Carbylamine test',
    weightage: '7-8 Marks in Boards',
    pageCount: 18,
    status: 'available',
    price: 16,
    highlightPoints: [
      'Basicity order of aliphatic amines in aqueous solution: 2° > 1° > 3° (for -CH₃ group) and 2° > 3° > 1° (for -C₂H₅ group) explained by inductive, hydration & steric factors',
      'Why Aniline is less basic than aliphatic amines (resonance delocalization of lone pair into benzene ring)',
      'Name Reactions: Gabriel Phthalimide synthesis, Hoffmann Bromamide degradation',
      'Distinction Tests: Carbylamine test, Hinsberg test (benzene sulphonyl chloride)',
      'Arenediazonium salts: Diazotisation (0-5 °C) and dye coupling reactions with phenol and aniline'
    ],
    mostRepeatedQuestions: [
      'Account for order of basic strength of methyl-substituted amines in aqueous solution (CBSE 2016, 2019, 2021, 2023)',
      'Write chemical equations for: (i) Gabriel phthalimide synthesis, (ii) Hoffmann bromamide degradation (CBSE 2017, 2020, 2024)',
      'Distinguish between Primary, Secondary and Tertiary amines using Hinsberg reagent (CBSE 2018, 2022)'
    ],
    keyDerivationsOrMechanisms: [
      'Hoffmann Bromamide: R-CONH₂ + Br₂ + 4 NaOH → R-NH₂ + Na₂CO₃ + 2 NaBr + 2 H₂O',
      'Carbylamine Test: R-NH₂ + CHCl₃ + 3 KOH(alc) (Δ) → R-NC (foul smelling) + 3 KCl + 3 H₂O',
      'Diazotisation: Ar-NH₂ + NaNO₂ + 2 HCl (273-278 K) → Ar-N₂⁺Cl⁻ + NaCl + 2 H₂O',
      'Coupling: Ar-N₂⁺Cl⁻ + Phenol (basic pH 9-10) → p-hydroxyazobenzene (Orange dye)'
    ],
    samplePreview: {
      pageTitle: 'Chemistry Ch 03: Amines Basicity & Diazonium Salt Map',
      handwrittenNotes: [
        'Basicity Golden Rule (Aqueous medium):',
        'Methyl group (-CH₃): 2° > 1° > 3° > NH₃ (Remember "213" code!)',
        'Ethyl group (-C₂H₅): 2° > 3° > 1° > NH₃ (Remember "231" code!)',
        'In gas phase (no hydration): 3° > 2° > 1° > NH₃ (Pure +I effect)',
        'Aniline is WEAKEST base due to 5 resonating structures delocalizing N lone pair.'
      ],
      diagramLabel: 'Aniline Resonating Structures & Nitrogen Lone Pair Delocalization',
      diagramType: 'sn1_sn2',
      examTrapWarning: 'Why aromatic primary amines cannot be prepared by Gabriel Phthalimide synthesis? Because aryl halides do NOT undergo nucleophilic substitution with phthalimide anion!',
      topperSecretTip: 'Coupling with Phenol needs pH 9-10 (mildly alkaline). Coupling with Aniline needs pH 4-5 (mildly acidic).'
    }
  },
  {
    id: 'chem-4',
    subject: 'chemistry',
    number: 4,
    title: 'Alcohols, Phenols & Ethers',
    tagline: 'Acidic strength order, Kolbe, Reimer-Tiemann & Williamson ether synthesis',
    weightage: '8 Marks in Boards',
    pageCount: 22,
    status: 'available',
    price: 16,
    highlightPoints: [
      'Acidic strength comparison: Phenol > H₂O > Alcohol, effect of -NO₂ (strong acidifying) vs -CH₃ (weakening)',
      'Distinction tests: Lucas Test (turbidity speeds: 3° immediate, 2° 5 mins, 1° on heating)',
      'Mechanism of acid-catalyzed hydration of alkene and dehydration of ethanol to ethene/ether',
      'Famous Named Reactions: Kolbe’s Reaction, Reimer-Tiemann, Williamson Synthesis, Fries rearrangement'
    ],
    mostRepeatedQuestions: [
      'Write equations for: (i) Kolbe reaction, (ii) Reimer-Tiemann reaction (CBSE 2016, 2019, 2022, 2024)',
      'Explain Lucas test to distinguish 1°, 2° and 3° alcohols (CBSE 2018, 2021, 2023)',
      'Explain why o-nitrophenol is steam volatile while p-nitrophenol is not (CBSE favorite)'
    ],
    keyDerivationsOrMechanisms: [
      "Kolbe's Reaction: Phenol + NaOH + CO₂ (400K, 4-7 atm) / H⁺ → Salicylic Acid",
      'Reimer-Tiemann Reaction: Phenol + CHCl₃ + 3 NaOH → Salicylaldehyde (Intermediate :CCl₂)',
      "Williamson Synthesis: R-ONa + R′-X → R-O-R′ (R′-X must be 1° alkyl halide)",
      'Dehydration of Ethanol: C₂H₅OH + conc. H₂SO₄ (443 K) → CH₂=CH₂; (413 K) → C₂H₅-O-C₂H₅'
    ],
    samplePreview: {
      pageTitle: 'Chemistry Ch 04: Alcohols, Phenols & Ethers Master Sheet',
      handwrittenNotes: [
        'Phenol Acidic Strength Rules:',
        'Electron withdrawing groups (-NO₂, -CN, -X) at ortho and para positions INCREASE acidity by stabilizing phenoxide ion.',
        'Order: 2,4,6-trinitrophenol (Picric acid) > 2,4-dinitrophenol > 4-nitrophenol > 2-nitrophenol > Phenol > Ethanol',
        'Williamson Ether Rule: Alkoxide can be 1°, 2°, or 3°, but ALKYL HALIDE MUST BE 1°! If 3° alkyl halide is taken, alkene elimination occurs.'
      ],
      diagramLabel: 'Phenoxide Ion Resonance Structures Stabilizing Negative Charge on Ring',
      diagramType: 'sn1_sn2',
      examTrapWarning: 'o-Nitrophenol is steam volatile due to intramolecular H-bonding (chelation). p-Nitrophenol has intermolecular H-bonding, resulting in higher boiling point and non-volatility.',
      topperSecretTip: 'In Reimer-Tiemann reaction, always mention the active attacking electrophile: neutral dichlorocarbene (:CCl₂). CBSE awards 1 separate mark for this!'
    }
  },
  {
    id: 'chem-5',
    subject: 'chemistry',
    number: 5,
    title: 'Biomolecules',
    tagline: 'Glucose proofs, peptide bonds, DNA/RNA double helix & structures',
    weightage: '7 Marks in Boards',
    pageCount: 20,
    status: 'available',
    price: 16,
    highlightPoints: [
      'Chemical structure proofs of D-Glucose (reactions with HI, Br₂ water, conc. HNO₃, NH₂OH, acetic anhydride)',
      'Reactions not explained by open chain structure of glucose (does not form 2,4-DNP, no NaHSO₃ adduct, pentaacetate does not react with NH₂OH)',
      'Proteins: Amino acids, zwitterion, peptide linkage, Primary/Secondary (α-helix, β-pleated)/Tertiary structures',
      'Denaturation of proteins: 2° and 3° structures destroyed, but 1° (sequence) remains intact (e.g. curdling of milk, boiling of egg)',
      'Nucleic Acids: Purines (A, G) vs Pyrimidines (C, T, U), phosphodiester linkage, Chargaff rule'
    ],
    mostRepeatedQuestions: [
      'Enumerate 3 reactions of D-glucose that cannot be explained by open-chain structure (CBSE 2017, 2019, 2022, 2024)',
      'What is meant by denaturation of proteins? Which structure remains intact? (CBSE 2018, 2021, 2023)',
      'Differentiate between fibrous and globular proteins with examples'
    ],
    keyDerivationsOrMechanisms: [
      'Straight Chain Proof: D-Glucose + HI (Δ) → n-Hexane (Proves 6 carbons in straight chain)',
      'Carbonyl Proof: D-Glucose + NH₂OH → Glucose Oxime; + HCN → Cyanohydrin',
      'Aldehyde Proof: D-Glucose + Br₂ water (mild) → Gluconic Acid',
      'Primary Alcohol Proof: D-Glucose + conc. HNO₃ → Saccharic Acid (dicarboxylic acid)',
      '5 -OH Groups Proof: D-Glucose + Acetic Anhydride → Glucose Pentaacetate'
    ],
    samplePreview: {
      pageTitle: 'Chemistry Ch 05: Biomolecules Diagnostic & Structure Cheatsheet',
      handwrittenNotes: [
        '5 Classic CBSE Reactions Proving D-Glucose Structure:',
        '1. HI / Δ => n-Hexane (Straight chain of 6 carbons)',
        '2. NH₂OH => Oxime (Confirms carbonyl group >C=O)',
        '3. Br₂ water => Gluconic Acid (Confirms that carbonyl is ALDEHYDE -CHO)',
        '4. (CH₃CO)₂O => Pentaacetate (Confirms 5 hydroxyl -OH groups on different carbons)',
        '5. conc. HNO₃ => Saccharic Acid (Confirms 1° alcohol -CH₂OH at terminal position)'
      ],
      diagramLabel: 'Haworth Projection of α-D-Glucopyranose and β-D-Glucopyranose Anomers',
      diagramType: 'aldol',
      examTrapWarning: 'In denaturation of proteins, secondary and tertiary structures are destroyed, but PRIMARY structure remains intact! Common 1-mark trap.',
      topperSecretTip: 'DNA contains Thymine (T) and 2′-deoxyribose sugar. RNA contains Uracil (U) and D-ribose sugar. In DNA, A pairs with T via 2 hydrogen bonds (A=T) and G pairs with C via 3 hydrogen bonds (G≡C).'
    }
  }
];

export const ORGANIC_CHEMISTRY_CHAPTERS = CHEMISTRY_CHAPTERS;


export const STUDENT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Aarav Sharma',
    schoolOrCity: 'DPS R.K. Puram, New Delhi',
    beforeScore: '41 / 70 (Pre-boards)',
    afterScore: '68 / 70 (CBSE Boards - 97.1%)',
    subject: 'Physics',
    highlightTopic: 'Gauss Law & Ray Optics Derivations',
    quote: 'I used to lose 15 marks in Physics pre-boards because textbook derivations were too long to remember. These ₹15 notes broke down Gauss’s Law, Lens Maker’s formula, and Prism proofs into 5 clean, numbered steps with neat ray diagrams. Writing the exact same steps in my board exam got me 68 out of 70!',
    verifiedBadge: 'CBSE 2024 Scorer',
    avatarLetter: 'A'
  },
  {
    id: 'rev-2',
    name: 'Sneha Kulkarni',
    schoolOrCity: 'DAV Public School, Pune',
    beforeScore: '34 / 70 (Mid-terms)',
    afterScore: '67 / 70 (Board Exam)',
    subject: 'Chemistry',
    highlightTopic: 'Aldol & Cannizzaro Reaction Flowchart',
    quote: 'Organic Chemistry reaction conversions used to confuse me completely. The ₹16 Aldehydes & Ketones flowchart clearly separated reactions with alpha-hydrogen from those without. Memorizing that 1-page chart gave me full marks in the 5-mark conversion question!',
    verifiedBadge: 'State Board Ranker',
    avatarLetter: 'S'
  },
  {
    id: 'rev-3',
    name: 'Devansh Verma',
    schoolOrCity: 'St. Xavier’s Collegiate, Kolkata',
    beforeScore: '46 / 70 (Pre-boards)',
    afterScore: '70 / 70 (Centum in Chemistry)',
    subject: 'Chemistry',
    highlightTopic: 'CBSE Exam Traps & Reimer-Tiemann',
    quote: 'The Exam Trap red flags are what make these notes truly special. They show the exact mistakes CBSE examiners penalize—like omitting the neutral dichlorocarbene intermediate in Reimer-Tiemann or writing wrong catalysts. Avoiding those traps helped me score a perfect 70/70 in Chemistry theory.',
    verifiedBadge: 'JEE Main 99.1%ile',
    avatarLetter: 'D'
  },
  {
    id: 'rev-4',
    name: 'Priyanka Nambiar',
    schoolOrCity: 'Bhavan’s Vidya Mandir, Kochi',
    beforeScore: '39 / 70 (First Mock)',
    afterScore: '66 / 70 (Board Exam)',
    subject: 'Chemistry',
    highlightTopic: 'Amines & Gabriel Phthalimide',
    quote: 'I needed quick revision notes for Amines the night before my board exam. I scanned the UPI QR, paid ₹16, and had the complete PDF on my phone in 10 seconds. The ruled paper handwriting is clean, easy on the eyes, and straight to the point.',
    verifiedBadge: 'NEET 645/720',
    avatarLetter: 'P'
  },
  {
    id: 'rev-5',
    name: 'Kabir Singhania',
    schoolOrCity: 'Allen Career Institute, Kota',
    beforeScore: '42 / 70 (Allen Mock Test)',
    afterScore: '69 / 70 (CBSE Boards)',
    subject: 'Physics',
    highlightTopic: 'AC Resonance & Moving Coil Galvanometer',
    quote: 'Derivations for Alternating Current (LCR circuit resonance) and Moving Coil Galvanometer sensitivity used to take hours. In these notes, every vector phasor diagram and formula is drawn cleanly with step-by-step logic. It turned my weakest chapters into my highest scoring sections.',
    verifiedBadge: 'CBSE 98% in Physics',
    avatarLetter: 'K'
  },
  {
    id: 'rev-6',
    name: 'Tanvi Deshmukh',
    schoolOrCity: 'St. Mary’s Convent, Indore',
    beforeScore: '37 / 70 (Pre-boards)',
    afterScore: '68 / 70 (Board Exam)',
    subject: 'Physics',
    highlightTopic: 'Wave Optics & Astronomical Telescope',
    quote: 'In Ray and Wave Optics, half the battle is drawing clean ray diagrams with correct arrows and knowing the exact formula for resolving power. These notes provide crisp diagrams with zero clutter. The ₹15 chapter price makes high quality study notes accessible to everyone.',
    verifiedBadge: 'CBSE State Merit List',
    avatarLetter: 'T'
  }
];

export const INCLUDED_RESOURCES: StudyResource[] = [
  {
    title: 'Individual Chapter Notes Option',
    badge: '₹15 Physics • ₹16 Chemistry',
    description: 'Download only the chapters you need! Pick Physics chapters (₹15 each) or Chemistry chapters (₹16 each) separately.',
    includedInVault: true
  },
  {
    title: 'Physics Master Vault (8 Core Chapters)',
    badge: '₹119 Complete Pass',
    description: 'All 8 ready Physics chapters: Electrostatics, Capacitors, Current Electricity, Magnetism, EMI, AC, and Ray Optics with all 28 derivations.',
    includedInVault: true
  },
  {
    title: 'Chemistry Master Vault (4 Core Chapters)',
    badge: '₹49 Complete Pass',
    description: 'All 4 ready Organic Chemistry chapters: Haloalkanes, Aldehydes & Ketones, Amines, and Alcohols, Phenols & Ethers with reaction flowcharts.',
    includedInVault: true
  },
  {
    title: 'Full Master Combo Vault (12 Chapters)',
    badge: '₹169 Best Value',
    description: 'Complete combo pack containing all 8 Physics chapters and 4 Chemistry chapters with complete derivations, mechanisms, and exam traps.',
    includedInVault: true
  },
  {
    title: '28 Essential 5-Mark Physics Derivations Master Book',
    badge: 'CBSE Guaranteed 15 Marks',
    description: 'All derivations asked in CBSE over the last 10 years, written in standard CBSE marking scheme format so you never lose step marks.',
    includedInVault: true
  },
  {
    title: 'Exam Trap Warnings (Common CBSE Examiner Red Flags)',
    badge: 'Save 10-15 Marks',
    description: 'Over 60+ identified trap spots where students lose easy marks due to missing ray arrows, improper units, or missing reaction intermediates.',
    includedInVault: true
  }
];

// Purchasable chapters in payment interface (Core 8 Physics + 4 Chemistry; Biomolecules & Physics 9-14 excluded)
export const PAYMENT_PHYSICS_CHAPTERS = PHYSICS_CHAPTERS.filter((ch) => ch.number <= 8);
export const PAYMENT_CHEMISTRY_CHAPTERS = CHEMISTRY_CHAPTERS.filter((ch) => ch.id !== 'chem-5');
export const PAYMENT_AVAILABLE_CHAPTERS = [...PAYMENT_PHYSICS_CHAPTERS, ...PAYMENT_CHEMISTRY_CHAPTERS];

// The Three Master Vault Bundles
export const MASTER_VAULTS: MasterVaultBundle[] = [
  {
    id: 'vault-physics',
    title: 'Physics Master Vault (8 Core Chapters)',
    shortTitle: 'Physics Vault (8 Chapters)',
    badge: '₹119 Special',
    description: 'All 8 ready Physics chapters: Electrostatics, Capacitors, Current Electricity, Magnetism, EMI, AC, and Ray Optics with all 28 derivations.',
    chaptersCount: 8,
    price: 119,
    transactionNote: 'TOPPERS_CLUB_Phy_Vault_119'
  },
  {
    id: 'vault-chemistry',
    title: 'Chemistry Master Vault (4 Core Chapters)',
    shortTitle: 'Chemistry Vault (4 Chapters)',
    badge: '₹49 Special',
    description: 'All 4 ready Organic Chemistry chapters: Haloalkanes, Aldehydes & Ketones, Amines, and Alcohols, Phenols & Ethers with reaction roadmaps.',
    chaptersCount: 4,
    price: 49,
    transactionNote: 'TOPPERS_CLUB_Chem_Vault_49'
  },
  {
    id: 'vault-master',
    title: 'Full Master Vault (8 Physics + 4 Chemistry Chapters)',
    shortTitle: 'Full Master Vault (12 Chapters)',
    badge: 'Best Value • ₹169',
    description: 'Complete package of all 12 core chapters (8 Physics + 4 Chemistry) with full derivations, flowcharts, and CBSE exam trap alerts.',
    chaptersCount: 12,
    price: 169,
    transactionNote: 'TOPPERS_CLUB_Master_Vault_169'
  }
];

export const getVaultById = (id: string): MasterVaultBundle | undefined => {
  return MASTER_VAULTS.find((v) => v.id === id);
};


