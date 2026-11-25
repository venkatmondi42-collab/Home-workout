import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Home, Compass, BarChart3, Settings as SettingsIcon, Search, Flame, Trophy,
  Plus, X, ChevronRight, ChevronLeft, Check, Pause, Play, SkipForward,
  ArrowLeft, Star, Edit2, Trash2, Copy, GripVertical, Bell, Volume2,
  Vibrate, Download, RotateCcw, User, Timer as TimerIcon, Dumbbell,
  ChevronUp, ChevronDown, Scale, Ruler, ClipboardList, Heart
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  DESIGN TOKENS (AMOLED true-black / electric blue)                     */
/* ---------------------------------------------------------------------- */
const C = {
  bg: "#000000",
  surface: "#0B0C0E",
  surface2: "#141519",
  surface3: "#1C1E24",
  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.14)",
  blue: "#2F7FFF",
  blueSoft: "rgba(47,127,255,0.16)",
  blueGlow: "0 0 0 1px rgba(47,127,255,0.35), 0 0 24px rgba(47,127,255,0.25)",
  text: "#F5F6F8",
  sub: "#8B8D98",
  sub2: "#5B5D66",
  green: "#34D399",
  greenSoft: "rgba(52,211,153,0.14)",
  orange: "#FF8A3D",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
`;

/* ---------------------------------------------------------------------- */
/*  SEED DATA                                                             */
/* ---------------------------------------------------------------------- */
const MUSCLES = ["Abs", "Chest", "Back", "Shoulders", "Arms", "Legs", "Full Body", "Cardio", "Mobility"];
const MUSCLE_EMOJI = { Abs: "🧱", Chest: "🫸", Back: "🔙", Shoulders: "🏔️", Arms: "💪", Legs: "🦵", "Full Body": "⚡", Cardio: "🔥", Mobility: "🧘" };

const EXLIB = [
  { id: "e1", name: "Push Ups", muscle: "Chest", equip: "No Equipment", diff: "Beginner", sets: 4, reps: 12, rest: 45, cal: 6 },
  { id: "e2", name: "Wide Push Ups", muscle: "Chest", equip: "No Equipment", diff: "Beginner", sets: 3, reps: 10, rest: 45, cal: 6 },
  { id: "e3", name: "Diamond Push Ups", muscle: "Arms", equip: "No Equipment", diff: "Intermediate", sets: 3, reps: 8, rest: 45, cal: 7 },
  { id: "e4", name: "Pike Push Ups", muscle: "Shoulders", equip: "No Equipment", diff: "Intermediate", sets: 3, reps: 10, rest: 45, cal: 6 },
  { id: "e5", name: "Bodyweight Squats", muscle: "Legs", equip: "No Equipment", diff: "Beginner", sets: 4, reps: 15, rest: 40, cal: 7 },
  { id: "e6", name: "Walking Lunges", muscle: "Legs", equip: "No Equipment", diff: "Beginner", sets: 3, reps: 12, rest: 40, cal: 7 },
  { id: "e7", name: "Plank", muscle: "Abs", equip: "No Equipment", diff: "Beginner", sets: 3, reps: 45, rest: 30, cal: 4, timed: true },
  { id: "e8", name: "Bicycle Crunches", muscle: "Abs", equip: "No Equipment", diff: "Beginner", sets: 3, reps: 20, rest: 30, cal: 5 },
  { id: "e9", name: "Mountain Climbers", muscle: "Cardio", equip: "No Equipment", diff: "Intermediate", sets: 4, reps: 30, rest: 30, cal: 9, timed: true },
  { id: "e10", name: "Jumping Jacks", muscle: "Cardio", equip: "No Equipment", diff: "Beginner", sets: 3, reps: 40, rest: 20, cal: 8, timed: true },
  { id: "e11", name: "Superman Hold", muscle: "Back", equip: "No Equipment", diff: "Beginner", sets: 3, reps: 30, rest: 30, cal: 4, timed: true },
  { id: "e12", name: "Pull Ups", muscle: "Back", equip: "Other", diff: "Advanced", sets: 4, reps: 6, rest: 60, cal: 8 },
  { id: "e13", name: "Cat-Cow Stretch", muscle: "Mobility", equip: "No Equipment", diff: "Beginner", sets: 2, reps: 30, rest: 15, cal: 2, timed: true },
  { id: "e14", name: "World's Greatest Stretch", muscle: "Mobility", equip: "No Equipment", diff: "Beginner", sets: 2, reps: 8, rest: 20, cal: 3 },
  { id: "e15", name: "Full Body Burpees", muscle: "Full Body", equip: "No Equipment", diff: "Advanced", sets: 4, reps: 10, rest: 50, cal: 11 },
  { id: "b1", name: "Backpack Squat", muscle: "Legs", equip: "Backpack", diff: "Intermediate", sets: 4, reps: 12, rest: 50, cal: 8 },
  { id: "b2", name: "Backpack Romanian Deadlift", muscle: "Legs", equip: "Backpack", diff: "Intermediate", sets: 4, reps: 10, rest: 55, cal: 8 },
  { id: "b3", name: "Backpack Row", muscle: "Back", equip: "Backpack", diff: "Intermediate", sets: 4, reps: 12, rest: 45, cal: 7 },
  { id: "b4", name: "Backpack Curl", muscle: "Arms", equip: "Backpack", diff: "Beginner", sets: 3, reps: 12, rest: 40, cal: 5 },
  { id: "b5", name: "Backpack Shoulder Press", muscle: "Shoulders", equip: "Backpack", diff: "Intermediate", sets: 3, reps: 10, rest: 45, cal: 6 },
  { id: "b6", name: "Backpack Lateral Raise", muscle: "Shoulders", equip: "Backpack", diff: "Beginner", sets: 3, reps: 12, rest: 35, cal: 5 },
  { id: "b7", name: "Backpack Chest Press", muscle: "Chest", equip: "Backpack", diff: "Intermediate", sets: 3, reps: 10, rest: 45, cal: 6 },
  { id: "b8", name: "Backpack Lunges", muscle: "Legs", equip: "Backpack", diff: "Intermediate", sets: 3, reps: 12, rest: 45, cal: 8 },
  { id: "b9", name: "Backpack Shrugs", muscle: "Shoulders", equip: "Backpack", diff: "Beginner", sets: 3, reps: 15, rest: 35, cal: 5 },
  { id: "b10", name: "Backpack Calf Raises", muscle: "Legs", equip: "Backpack", diff: "Beginner", sets: 3, reps: 18, rest: 30, cal: 4 },
];
const exById = (id) => EXLIB.find((e) => e.id === id);

const CHALLENGES = [
  { id: "c1", title: "28 Days Full Body Challenge", days: 28, desc: "Build strength head to toe with daily bodyweight sessions.", hue: "#2F7FFF" },
  { id: "c2", title: "28 Days Muscle Building", days: 28, desc: "Progressive overload using backpack resistance.", hue: "#7C5CFF" },
  { id: "c3", title: "30 Days Push-Up Challenge", days: 30, desc: "Climb from 10 to 100 push ups a day.", hue: "#FF8A3D" },
  { id: "c4", title: "30 Days Abs Challenge", days: 30, desc: "Core-focused circuits, 12 minutes a day.", hue: "#34D399" },
  { id: "c5", title: "30 Days Pull-Up Challenge", days: 30, desc: "Grip, back and arm strength progression.", hue: "#FF5C7A" },
];

const DISCOVER_CATS = [
  { key: "Popular", emoji: "🔥" }, { key: "Muscle Building", emoji: "💪" }, { key: "Home Workout", emoji: "🏠" },
  { key: "Backpack Workout", emoji: "🎒" }, { key: "Fat Loss", emoji: "🔥" }, { key: "Core", emoji: "🧱" },
  { key: "Legs", emoji: "🦵" }, { key: "Upper Body", emoji: "🏋️" }, { key: "HIIT", emoji: "⚡" },
  { key: "Mobility", emoji: "🧘" }, { key: "Challenges", emoji: "🏆" },
];

const WORKOUTS = [
  { id: "w1", title: "Full Body Burn", cat: "Popular", dur: 20, diff: "Intermediate", equip: "No Equipment", hue: "#2F7FFF", exIds: ["e15", "e5", "e1", "e7", "e9"] },
  { id: "w2", title: "Backpack Strength", cat: "Backpack Workout", dur: 30, diff: "Intermediate", equip: "Backpack", hue: "#7C5CFF", exIds: ["b1", "b3", "b5", "b2", "b9"] },
  { id: "w3", title: "Core Crusher", cat: "Core", dur: 12, diff: "Beginner", equip: "No Equipment", hue: "#34D399", exIds: ["e7", "e8", "e11"] },
  { id: "w4", title: "Leg Day Essentials", cat: "Legs", dur: 25, diff: "Intermediate", equip: "Mixed", hue: "#FF8A3D", exIds: ["e5", "e6", "b1", "b8", "b10"] },
  { id: "w5", title: "Upper Body Push/Pull", cat: "Upper Body", dur: 28, diff: "Intermediate", equip: "Mixed", hue: "#FF5C7A", exIds: ["e1", "e4", "b3", "b7", "e12"] },
  { id: "w6", title: "10-Min HIIT Blast", cat: "HIIT", dur: 10, diff: "Advanced", equip: "No Equipment", hue: "#FF8A3D", exIds: ["e15", "e9", "e10"] },
  { id: "w7", title: "Fat Loss Circuit", cat: "Fat Loss", dur: 22, diff: "Intermediate", equip: "No Equipment", hue: "#2F7FFF", exIds: ["e10", "e9", "e15", "e5"] },
  { id: "w8", title: "Mobility Reset", cat: "Mobility", dur: 15, diff: "Beginner", equip: "No Equipment", hue: "#34D399", exIds: ["e13", "e14"] },
  { id: "w9", title: "Muscle Builder — Backpack", cat: "Muscle Building", dur: 32, diff: "Advanced", equip: "Backpack", hue: "#7C5CFF", exIds: ["b1", "b2", "b3", "b5", "b7", "b4"] },
  { id: "w10", title: "5-Move Home Starter", cat: "Home Workout", dur: 15, diff: "Beginner", equip: "No Equipment", hue: "#2F7FFF", exIds: ["e1", "e5", "e7", "e6", "e13"] },
];

const DEFAULT_PLANS = [
  { id: "p1", name: "Push Day", diff: "Intermediate", days: ["Mon", "Thu"], custom: false, items: [
    { exId: "e1", sets: 4, reps: 12 }, { exId: "e2", sets: 3, reps: 10 }, { exId: "e3", sets: 3, reps: 8 }, { exId: "e4", sets: 3, reps: 10 },
  ]},
  { id: "p2", name: "Pull Day", diff: "Intermediate", days: ["Tue", "Fri"], custom: false, items: [
    { exId: "b3", sets: 4, reps: 12 }, { exId: "e12", sets: 3, reps: 6 }, { exId: "b4", sets: 3, reps: 12 }, { exId: "e11", sets: 3, reps: 30 },
  ]},
  { id: "p3", name: "Legs Day", diff: "Intermediate", days: ["Wed", "Sat"], custom: false, items: [
    { exId: "b1", sets: 4, reps: 12 }, { exId: "b2", sets: 4, reps: 10 }, { exId: "b8", sets: 3, reps: 12 }, { exId: "b10", sets: 3, reps: 18 },
  ]},
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BACKPACK_WEIGHTS = [1, 2, 3, 5, 7.5, 10, 12.5, 15];

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
function fmtClock(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function isoWeekdayShort(iso) {
  const d = new Date(iso + "T00:00:00");
  const idx = (d.getDay() + 6) % 7; // 0=Mon
  return WEEK_DAYS[idx];
}

/* seed history / weight so the app looks populated */
function seedHistory() {
  const out = [];
  for (let i = 27; i >= 0; i--) {
    if (Math.random() > 0.58) {
      out.push({ date: todayISO(-i), title: WORKOUTS[i % WORKOUTS.length].title, min: 15 + (i % 4) * 6, cal: 180 + (i % 5) * 45 });
    }
  }
  // guarantee a short recent streak
  out.push({ date: todayISO(-1), title: "Backpack Strength", min: 30, cal: 310 });
  out.push({ date: todayISO(-2), title: "Full Body Burn", min: 20, cal: 260 });
  out.push({ date: todayISO(-3), title: "Core Crusher", min: 12, cal: 150 });
  return out.filter((v, i, arr) => arr.findIndex((x) => x.date === v.date) === i).sort((a, b) => a.date.localeCompare(b.date));
}
function seedWeight() {
  const out = [];
  let w = 82;
  for (let i = 40; i >= 0; i -= 3) {
    w -= Math.random() * 0.6;
    out.push({ date: todayISO(-i), kg: Math.round(w * 10) / 10 });
  }
  return out;
}

const DEFAULT_DATA = {
  profile: { name: "Athlete", goal: "Build Muscle", experience: "Intermediate", onboarded: false },
  settings: { backpackWeight: 10, units: "kg", notifications: true, sound: true, vibration: true },
  weeklyGoalTarget: 5,
  plans: DEFAULT_PLANS,
  customExercises: [],
  favorites: { exercises: [], workouts: [] },
  history: seedHistory(),
  weightLog: seedWeight(),
  measurements: { chest: 100, waist: 82, shoulders: 112, arms: 34, thighs: 56 },
  bests: { streak: 14 },
};

/* ---------------------------------------------------------------------- */
/*  STORAGE HOOK                                                          */
/* ---------------------------------------------------------------------- */
function useAppData() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loaded, setLoaded] = useState(false);
  const loadedRef = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = localStorage.getItem("fitapp-data");
        if (raw) {
          const parsed = JSON.parse(raw);
          setData({ ...DEFAULT_DATA, ...parsed, settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) } });
        }
      } catch (e) {
        /* no saved data yet — use defaults */
      } finally {
        setLoaded(true);
        loadedRef.current = true;
      }
    })();
  }, []);

  const save = useCallback((next) => {
    setData(next);
    if (loadedRef.current) {
      try { localStorage.setItem("fitapp-data", JSON.stringify(next)); } catch (e) {}
    }
  }, []);

  const update = useCallback((fn) => {
    setData((prev) => {
      const next = typeof fn === "function" ? fn(prev) : { ...prev, ...fn };
      if (loadedRef.current) {
        try { localStorage.setItem("fitapp-data", JSON.stringify(next)); } catch (e) {}
      }
      return next;
    });
  }, []);

  return { data, update, save, loaded };
}

/* ---------------------------------------------------------------------- */
/*  SMALL UI PRIMITIVES                                                   */
/* ---------------------------------------------------------------------- */
function Chip({ active, onClick, children, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 6, flexShrink: 0,
        padding: "9px 15px", borderRadius: 999, fontFamily: "Inter", fontSize: 13.5, fontWeight: 600,
        background: active ? C.blue : C.surface2, color: active ? "#fff" : C.sub,
        border: `1px solid ${active ? C.blue : C.border}`, boxShadow: active ? "0 0 16px rgba(47,127,255,0.35)" : "none",
        cursor: "pointer", transition: "all .15s ease", whiteSpace: "nowrap",
      }}
    >
      {icon && <span style={{ fontSize: 14 }}>{icon}</span>}
      {children}
    </button>
  );
}

function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20,
        padding: 16, cursor: onClick ? "pointer" : "default", ...style,
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, style, disabled, icon }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: disabled ? C.surface3 : C.blue, color: disabled ? C.sub2 : "#fff",
        border: "none", borderRadius: 14, padding: "14px 18px", fontFamily: "Inter",
        fontSize: 15, fontWeight: 700, cursor: disabled ? "default" : "pointer",
        boxShadow: disabled ? "none" : "0 0 22px rgba(47,127,255,0.35)",
        transition: "transform .1s ease", ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {icon}{children}
    </button>
  );
}

function GhostButton({ children, onClick, style, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: C.surface2, color: C.text, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: "12px 16px", fontFamily: "Inter", fontSize: 14,
        fontWeight: 600, cursor: "pointer", ...style,
      }}
    >
      {icon}{children}
    </button>
  );
}

function SectionTitle({ children, action, onAction }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "26px 4px 12px" }}>
      <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 17, color: C.text, letterSpacing: 0.2 }}>{children}</div>
      {action && (
        <button onClick={onAction} style={{ background: "none", border: "none", color: C.blue, fontFamily: "Inter", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 2 }}>
          {action}<ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function ProgressBar({ pct, h = 8, color = C.blue }) {
  return (
    <div style={{ width: "100%", height: h, borderRadius: h, background: C.surface3, overflow: "hidden" }}>
      <div style={{ width: `${Math.max(0, Math.min(100, pct))}%`, height: "100%", background: color, borderRadius: h, transition: "width .4s ease", boxShadow: `0 0 10px ${color}66` }} />
    </div>
  );
}

function StatPill({ label, value, sub }) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 22, color: C.text }}>{value}</div>
      <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, marginTop: 2, fontWeight: 600 }}>{label}</div>
      {sub && <div style={{ fontFamily: "Inter", fontSize: 10.5, color: C.sub2 }}>{sub}</div>}
    </div>
  );
}

function CircularTimer({ pct, size = 220, label, value, color = C.blue }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={C.surface3} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset .3s linear", filter: `drop-shadow(0 0 8px ${color}88)` }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 44, color: C.text, letterSpacing: 0.5 }}>{value}</div>
        <div style={{ fontFamily: "Inter", fontSize: 12.5, color: C.sub, fontWeight: 700, letterSpacing: 1.5, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

function EmptyState({ emoji, title, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "36px 20px", color: C.sub }}>
      <div style={{ fontSize: 34, marginBottom: 8 }}>{emoji}</div>
      <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: C.text }}>{title}</div>
      {sub && <div style={{ fontFamily: "Inter", fontSize: 12.5, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function TopHeader({ title, onBack, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px 6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && (
          <button onClick={onBack} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: C.text, cursor: "pointer" }}>
            <ArrowLeft size={18} />
          </button>
        )}
        <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 21, color: C.text }}>{title}</div>
      </div>
      {right}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  ONBOARDING                                                            */
/* ---------------------------------------------------------------------- */
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ goal: "", experience: "", equip: "", dur: "", days: "" });
  const steps = [
    { key: "goal", title: "What's your goal?", opts: ["Build Muscle", "Get Stronger", "Improve Fitness", "Lose Fat", "Improve Endurance", "General Fitness"] },
    { key: "experience", title: "Your experience level?", opts: ["Beginner", "Intermediate", "Advanced"] },
    { key: "equip", title: "What equipment do you have?", opts: ["No Equipment", "Backpack", "Dumbbells", "Resistance Bands", "Mixed Equipment"] },
    { key: "dur", title: "Preferred workout length?", opts: ["10 min", "15 min", "20 min", "30 min", "45 min", "60+ min"] },
    { key: "days", title: "Days per week?", opts: ["2", "3", "4", "5", "6", "7"] },
  ];
  const cur = steps[step];
  const pick = (val) => {
    const next = { ...answers, [cur.key]: val };
    setAnswers(next);
    if (step < steps.length - 1) setTimeout(() => setStep(step + 1), 150);
    else setTimeout(() => onDone(next), 150);
  };
  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", padding: "40px 22px", background: C.bg }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 40 }}>
        {steps.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? C.blue : C.surface3, boxShadow: i <= step ? "0 0 8px rgba(47,127,255,.5)" : "none" }} />
        ))}
      </div>
      <div style={{ fontFamily: "Inter", color: C.sub, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>Step {step + 1} of {steps.length}</div>
      <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 28, color: C.text, margin: "10px 0 30px", lineHeight: 1.25 }}>{cur.title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {cur.opts.map((o) => (
          <button
            key={o}
            onClick={() => pick(o)}
            style={{
              textAlign: "left", padding: "16px 18px", borderRadius: 16, fontFamily: "Inter", fontWeight: 600, fontSize: 15.5,
              background: answers[cur.key] === o ? C.blueSoft : C.surface, color: C.text,
              border: `1px solid ${answers[cur.key] === o ? C.blue : C.border}`, cursor: "pointer",
            }}
          >
            {o}
          </button>
        ))}
      </div>
      {step > 0 && (
        <button onClick={() => setStep(step - 1)} style={{ marginTop: "auto", background: "none", border: "none", color: C.sub, fontFamily: "Inter", fontWeight: 600, fontSize: 13.5, paddingTop: 24, cursor: "pointer" }}>← Back</button>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  HOME / TRAINING SCREEN                                                */
/* ---------------------------------------------------------------------- */
function HomeScreen({ data, update, nav }) {
  const streak = computeStreak(data.history);
  const weekDates = Array.from({ length: 7 }, (_, i) => todayISO(-((new Date().getDay() + 6) % 7) + i));
  const doneDates = new Set(data.history.map((h) => h.date));
  const weekDoneCount = weekDates.filter((d) => doneDates.has(d) && d <= todayISO()).length;
  const [query, setQuery] = useState("");
  const searchResults = query.trim()
    ? [...WORKOUTS.filter((w) => w.title.toLowerCase().includes(query.toLowerCase())),
       ...EXLIB.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))]
    : [];

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ padding: "18px 20px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "Inter", color: C.sub, fontSize: 12.5, fontWeight: 600, letterSpacing: 1.5 }}>HOME WORKOUT</div>
          <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 23, color: C.text, marginTop: 2 }}>Hey, {data.profile.name}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 999, padding: "7px 12px" }}>
            <Flame size={15} color={C.orange} fill={C.orange} />
            <span style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 13.5, color: C.text }}>{streak}</span>
          </div>
          <button onClick={() => nav("settings")} style={{ width: 38, height: 38, borderRadius: 12, background: C.surface2, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <User size={17} color={C.text} />
          </button>
        </div>
      </div>

      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ position: "relative" }}>
          <Search size={17} color={C.sub} style={{ position: "absolute", left: 14, top: 13 }} />
          <input
            value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workouts, exercises, plans..."
            style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 14px 12px 40px", color: C.text, fontFamily: "Inter", fontSize: 14.5, outline: "none", boxSizing: "border-box" }}
          />
        </div>
        {query.trim() && (
          <div style={{ marginTop: 10, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden" }}>
            {searchResults.length === 0 && <div style={{ padding: 16, color: C.sub, fontFamily: "Inter", fontSize: 13.5 }}>No matches.</div>}
            {searchResults.slice(0, 6).map((r) => (
              <div key={r.id} onClick={() => (r.title ? nav("workoutDetail", { workout: r }) : nav("exerciseDetail", { exercise: r }))}
                style={{ padding: "12px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                <span style={{ fontFamily: "Inter", fontSize: 14, color: C.text, fontWeight: 600 }}>{r.title || r.name}</span>
                <span style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub }}>{r.title ? "Workout" : "Exercise"}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly goal */}
      <div style={{ padding: "20px 20px 0" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15.5, color: C.text }}>Weekly Goal</div>
            <button onClick={() => update((d) => ({ ...d, weeklyGoalTarget: d.weeklyGoalTarget >= 7 ? 3 : d.weeklyGoalTarget + 1 }))}
              style={{ background: "none", border: "none", color: C.sub, cursor: "pointer" }}>
              <Edit2 size={14} />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "6px 0 12px" }}>
            <span style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 26, color: C.blue }}>{weekDoneCount}</span>
            <span style={{ fontFamily: "Inter", fontSize: 14, color: C.sub, fontWeight: 600 }}>/ {data.weeklyGoalTarget} workouts</span>
          </div>
          <ProgressBar pct={(weekDoneCount / data.weeklyGoalTarget) * 100} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            {weekDates.map((d) => {
              const done = doneDates.has(d);
              const isToday = d === todayISO();
              return (
                <div key={d} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontFamily: "Inter", fontSize: 10.5, color: isToday ? C.blue : C.sub, fontWeight: 700 }}>{isoWeekdayShort(d)[0]}</div>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: done ? C.blue : "transparent", border: `1.5px solid ${done ? C.blue : isToday ? C.borderStrong : C.border}`,
                    boxShadow: done ? "0 0 10px rgba(47,127,255,.5)" : "none",
                  }}>
                    {done ? <Check size={13} color="#fff" strokeWidth={3} /> : <span style={{ fontFamily: "Inter", fontSize: 10.5, color: isToday ? C.text : C.sub2, fontWeight: 700 }}>{new Date(d + "T00:00:00").getDate()}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Challenges */}
      <SectionTitle action="See all" onAction={() => nav("discover", { cat: "Challenges" })}>Challenges</SectionTitle>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px 4px", scrollbarWidth: "none" }}>
        {CHALLENGES.map((c) => (
          <div key={c.id} style={{ flexShrink: 0, width: 210, borderRadius: 20, overflow: "hidden", border: `1px solid ${C.border}`, background: C.surface }}>
            <div style={{ height: 90, background: `linear-gradient(135deg, ${c.hue}55, ${c.hue}15)`, display: "flex", alignItems: "flex-end", padding: 10 }}>
              <span style={{ background: "rgba(0,0,0,0.55)", color: "#fff", fontFamily: "Inter", fontWeight: 700, fontSize: 11, padding: "4px 9px", borderRadius: 999 }}>{c.days} DAYS</span>
            </div>
            <div style={{ padding: 13 }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: C.text, lineHeight: 1.25, minHeight: 36 }}>{c.title}</div>
              <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, margin: "6px 0 10px", lineHeight: 1.4 }}>{c.desc}</div>
              <PrimaryButton style={{ padding: "9px 0", fontSize: 12.5, width: "100%", boxShadow: "none" }} onClick={() => nav("planBuilder", { challenge: c })}>START</PrimaryButton>
            </div>
          </div>
        ))}
      </div>

      {/* Body focus */}
      <SectionTitle>Body Focus</SectionTitle>
      <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 20px 4px", scrollbarWidth: "none" }}>
        {MUSCLES.map((m) => (
          <Chip key={m} icon={MUSCLE_EMOJI[m]} onClick={() => nav("discover", { muscle: m })}>{m}</Chip>
        ))}
      </div>

      {/* Recommended */}
      <SectionTitle action="See all" onAction={() => nav("discover")}>Recommended For You</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 20px" }}>
        {WORKOUTS.slice(0, 3).map((w) => <WorkoutRow key={w.id} w={w} onClick={() => nav("workoutDetail", { workout: w })} />)}
      </div>

      {/* My Plans */}
      <SectionTitle action="New Plan" onAction={() => nav("planBuilder")}>My Plans</SectionTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 20px" }}>
        {data.plans.map((p) => (
          <Card key={p.id} onClick={() => nav("planDetail", { plan: p })} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: C.text }}>{p.name}</div>
              <div style={{ fontFamily: "Inter", fontSize: 12, color: C.sub, marginTop: 3 }}>{p.items.length} exercises · {p.days.join(", ")}</div>
            </div>
            <ChevronRight size={18} color={C.sub} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function computeStreak(history) {
  const dates = new Set(history.map((h) => h.date));
  let streak = 0;
  let cursor = dates.has(todayISO()) ? 0 : 1;
  while (dates.has(todayISO(-cursor))) { streak++; cursor++; }
  return streak;
}

function WorkoutRow({ w, onClick }) {
  return (
    <Card onClick={onClick} style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0, background: `linear-gradient(135deg, ${w.hue}77, ${w.hue}22)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
        {MUSCLE_EMOJI[w.cat] || "🏋️"}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14.5, color: C.text }}>{w.title}</div>
        <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, marginTop: 3 }}>{w.dur} min · {w.diff} · {w.exIds.length} exercises</div>
      </div>
      <ChevronRight size={17} color={C.sub} />
    </Card>
  );
}

/* ---------------------------------------------------------------------- */
/*  DISCOVER SCREEN                                                       */
/* ---------------------------------------------------------------------- */
function DiscoverScreen({ nav, initialCat }) {
  const [cat, setCat] = useState(initialCat || "Popular");
  const list = cat === "Popular" ? WORKOUTS : WORKOUTS.filter((w) => w.cat === cat);
  return (
    <div style={{ paddingBottom: 100 }}>
      <TopHeader title="Discover" />
      <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "10px 20px", scrollbarWidth: "none" }}>
        {DISCOVER_CATS.map((c) => <Chip key={c.key} icon={c.emoji} active={cat === c.key} onClick={() => setCat(c.key)}>{c.key}</Chip>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "6px 20px" }}>
        {list.length === 0 && <EmptyState emoji="🗂️" title="Nothing here yet" sub="Try a different category" />}
        {list.map((w) => <WorkoutCard key={w.id} w={w} onClick={() => nav("workoutDetail", { workout: w })} />)}
      </div>
    </div>
  );
}

function WorkoutCard({ w, onClick }) {
  return (
    <Card onClick={onClick} style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ height: 110, background: `linear-gradient(135deg, ${w.hue}66, ${w.hue}14)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>
        {MUSCLE_EMOJI[w.cat] || "🏋️"}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15.5, color: C.text }}>{w.title}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
          <Tag>{w.dur} min</Tag><Tag>{w.diff}</Tag><Tag>{w.exIds.length} exercises</Tag><Tag>{w.equip}</Tag>
        </div>
      </div>
    </Card>
  );
}
function Tag({ children }) {
  return <span style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 600, color: C.sub, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 999, padding: "3px 9px" }}>{children}</span>;
}

/* ---------------------------------------------------------------------- */
/*  WORKOUT DETAIL                                                        */
/* ---------------------------------------------------------------------- */
function WorkoutDetail({ workout, nav, onBack, data, update }) {
  const exs = workout.exIds.map(exById).filter(Boolean);
  const isFav = data.favorites.workouts.includes(workout.id);
  const toggleFav = () => update((d) => ({ ...d, favorites: { ...d.favorites, workouts: isFav ? d.favorites.workouts.filter((id) => id !== workout.id) : [...d.favorites.workouts, workout.id] } }));
  return (
    <div style={{ paddingBottom: 110 }}>
      <TopHeader title="Workout" onBack={onBack} right={
        <button onClick={toggleFav} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Star size={17} color={isFav ? C.orange : C.sub} fill={isFav ? C.orange : "none"} />
        </button>
      } />
      <div style={{ padding: "10px 20px" }}>
        <div style={{ height: 140, borderRadius: 20, background: `linear-gradient(135deg, ${workout.hue}66, ${workout.hue}14)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52 }}>
          {MUSCLE_EMOJI[workout.cat] || "🏋️"}
        </div>
        <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 22, color: C.text, marginTop: 16 }}>{workout.title}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <Tag>{workout.dur} min</Tag><Tag>{workout.diff}</Tag><Tag>{exs.length} exercises</Tag><Tag>{workout.equip}</Tag>
        </div>
        <SectionTitle>Exercises</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {exs.map((e, i) => (
            <Card key={e.id} onClick={() => nav("exerciseDetail", { exercise: e })} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit", fontWeight: 700, fontSize: 12.5, color: C.sub, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: C.text }}>{e.name}</div>
                <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, marginTop: 2 }}>{e.sets} sets × {e.timed ? `${e.reps}s` : `${e.reps} reps`}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 20px 22px", background: `linear-gradient(0deg, ${C.bg} 60%, transparent)` }}>
        <PrimaryButton style={{ width: "100%", padding: "16px 0", fontSize: 16 }} onClick={() => nav("player", { source: { title: workout.title, exercises: exs, hue: workout.hue } })}>
          START WORKOUT
        </PrimaryButton>
      </div>
    </div>
  );
}

function PlanDetail({ plan, nav, onBack }) {
  const exs = plan.items.map((it) => ({ ...exById(it.exId), sets: it.sets, reps: it.reps }));
  return (
    <div style={{ paddingBottom: 110 }}>
      <TopHeader title={plan.name} onBack={onBack} />
      <div style={{ padding: "10px 20px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag>{plan.diff}</Tag><Tag>{plan.days.join(", ")}</Tag><Tag>{exs.length} exercises</Tag>
        </div>
        <SectionTitle>Exercises</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {exs.map((e, i) => (
            <Card key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit", fontWeight: 700, fontSize: 12.5, color: C.sub, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: C.text }}>{e.name}</div>
                <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, marginTop: 2 }}>{e.sets} sets × {e.timed ? `${e.reps}s` : `${e.reps} reps`}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 20px 22px", background: `linear-gradient(0deg, ${C.bg} 60%, transparent)` }}>
        <PrimaryButton style={{ width: "100%", padding: "16px 0", fontSize: 16 }} onClick={() => nav("player", { source: { title: plan.name, exercises: exs, hue: C.blue } })}>
          START WORKOUT
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  EXERCISE DETAIL                                                       */
/* ---------------------------------------------------------------------- */
function ExerciseDetail({ exercise, onBack, data, update, backpackWeight }) {
  const isFav = data.favorites.exercises.includes(exercise.id);
  const toggleFav = () => update((d) => ({ ...d, favorites: { ...d.favorites, exercises: isFav ? d.favorites.exercises.filter((id) => id !== exercise.id) : [...d.favorites.exercises, exercise.id] } }));
  const isBackpack = exercise.equip === "Backpack";
  return (
    <div style={{ paddingBottom: 40 }}>
      <TopHeader title="Exercise" onBack={onBack} right={
        <button onClick={toggleFav} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Star size={17} color={isFav ? C.orange : C.sub} fill={isFav ? C.orange : "none"} />
        </button>
      } />
      <div style={{ padding: "10px 20px" }}>
        <MediaPlaceholder emoji={MUSCLE_EMOJI[exercise.muscle]} />
        <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 22, color: C.text, marginTop: 16 }}>{exercise.name}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          <Tag>{exercise.muscle}</Tag><Tag>{exercise.equip}</Tag><Tag>{exercise.diff}</Tag>
        </div>
        {isBackpack && (
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, background: C.blueSoft, border: `1px solid ${C.blue}`, borderRadius: 14, padding: "10px 14px" }}>
            <span style={{ fontSize: 16 }}>🎒</span>
            <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 13.5, color: C.text }}>Backpack: {backpackWeight} kg</span>
          </div>
        )}
        <Card style={{ marginTop: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <StatPill label="SETS" value={exercise.sets} />
            <StatPill label={exercise.timed ? "SECONDS" : "REPS"} value={exercise.reps} />
            <StatPill label="REST" value={`${exercise.rest}s`} />
            <StatPill label="CAL/SET" value={exercise.cal} />
          </div>
        </Card>
        <SectionTitle>Instructions</SectionTitle>
        <Card>
          <div style={{ fontFamily: "Inter", fontSize: 13.5, color: C.sub, lineHeight: 1.7 }}>
            Keep your core braced and move through a controlled full range of motion. Inhale on the eccentric phase, exhale as you exert. Stop a rep or two before form breaks down, and rest fully between sets to keep quality high.
          </div>
        </Card>
      </div>
    </div>
  );
}

function MediaPlaceholder({ emoji }) {
  return (
    <div style={{
      height: 210, borderRadius: 22, background: `radial-gradient(circle at 30% 20%, ${C.blueSoft}, ${C.surface} 70%)`,
      border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
    }}>
      <div style={{ fontSize: 64 }}>{emoji || "🏋️"}</div>
      <div style={{ position: "absolute", bottom: 12, right: 14, fontFamily: "Inter", fontSize: 10.5, color: C.sub, background: "rgba(0,0,0,0.5)", padding: "4px 8px", borderRadius: 999 }}>Demo preview</div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  WORKOUT PLAYER                                                        */
/* ---------------------------------------------------------------------- */
function WorkoutPlayer({ source, onExit, onComplete, backpackWeight }) {
  const [exIdx, setExIdx] = useState(0);
  const [setNum, setSetNum] = useState(1);
  const [phase, setPhase] = useState("work"); // work | rest | done
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [restLeft, setRestLeft] = useState(0);
  const [restTotal, setRestTotal] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const startTime = useRef(Date.now());
  const tickRef = useRef(null);

  const ex = source.exercises[exIdx];
  const totalSets = source.exercises.reduce((s, e) => s + e.sets, 0);

  useEffect(() => {
    tickRef.current = setInterval(() => {
      if (paused) return;
      if (phase === "rest") {
        setRestLeft((v) => {
          if (v <= 1) { setPhase("work"); return 0; }
          return v - 1;
        });
      }
      setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [phase, paused]);

  const totalCalories = Math.round(source.exercises.reduce((s, e) => s + e.sets * e.cal, 0) * (completedSets / Math.max(totalSets, 1)));

  function goRest(sec) {
    setRestTotal(sec); setRestLeft(sec); setPhase("rest");
  }
  function completeSet() {
    setCompletedSets((c) => c + 1);
    if (setNum < ex.sets) {
      setSetNum(setNum + 1);
      goRest(ex.rest);
    } else if (exIdx < source.exercises.length - 1) {
      setExIdx(exIdx + 1); setSetNum(1);
      goRest(ex.rest);
    } else {
      setPhase("done");
      clearInterval(tickRef.current);
    }
  }
  function skip() {
    if (setNum < ex.sets) { setSetNum(setNum + 1); setPhase("work"); }
    else if (exIdx < source.exercises.length - 1) { setExIdx(exIdx + 1); setSetNum(1); setPhase("work"); }
    else { setPhase("done"); clearInterval(tickRef.current); }
  }
  function prev() {
    if (setNum > 1) setSetNum(setNum - 1);
    else if (exIdx > 0) { setExIdx(exIdx - 1); setSetNum(source.exercises[exIdx - 1].sets); }
    setPhase("work");
  }

  if (phase === "done") {
    const durMin = Math.max(1, Math.round(elapsed / 60));
    return (
      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 10 }}>🎉</div>
        <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 24, color: C.text }}>Workout Complete</div>
        <div style={{ fontFamily: "Inter", fontSize: 14, color: C.sub, marginTop: 6 }}>{source.title}</div>
        <Card style={{ marginTop: 26, width: "100%", maxWidth: 320 }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <StatPill label="MINUTES" value={durMin} />
            <StatPill label="CALORIES" value={Math.round(source.exercises.reduce((s, e) => s + e.sets * e.cal, 0))} />
            <StatPill label="SETS" value={totalSets} />
          </div>
        </Card>
        <PrimaryButton style={{ marginTop: 28, width: "100%", maxWidth: 320, padding: "16px 0" }} onClick={() => onComplete({ min: durMin, cal: Math.round(source.exercises.reduce((s, e) => s + e.sets * e.cal, 0)), title: source.title })}>
          FINISH
        </PrimaryButton>
      </div>
    );
  }

  if (phase === "rest") {
    const nextEx = setNum <= ex.sets && setNum > 1 ? ex : source.exercises[exIdx + 1] || ex;
    return (
      <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "26px 24px 30px", position: "relative" }}>
        <button onClick={onExit} style={{ position: "absolute", top: 20, left: 20, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: C.text, cursor: "pointer" }}><X size={17} /></button>
        <div style={{ marginTop: 60, fontFamily: "Inter", fontWeight: 700, fontSize: 13, letterSpacing: 3, color: C.sub }}>REST</div>
        <div style={{ margin: "26px 0" }}>
          <CircularTimer pct={(restLeft / Math.max(restTotal, 1)) * 100} value={fmtClock(restLeft)} label="REMAINING" color={C.green} />
        </div>
        <Card style={{ width: "100%", maxWidth: 320, textAlign: "center" }}>
          <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, fontWeight: 700, letterSpacing: 1 }}>NEXT</div>
          <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 17, color: C.text, marginTop: 4 }}>{nextEx.name}</div>
        </Card>
        <div style={{ display: "flex", gap: 10, marginTop: 22, width: "100%", maxWidth: 320 }}>
          <GhostButton style={{ flex: 1 }} onClick={() => setRestLeft((v) => v + 15)}>+15 sec</GhostButton>
          <GhostButton style={{ flex: 1 }} onClick={() => setPaused((p) => !p)} icon={paused ? <Play size={15} /> : <Pause size={15} />}>{paused ? "Resume" : "Pause"}</GhostButton>
          <GhostButton style={{ flex: 1 }} onClick={() => { setRestLeft(0); setPhase("work"); }}>Skip</GhostButton>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", padding: "18px 20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={onExit} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: C.text, cursor: "pointer" }}><X size={17} /></button>
        <div style={{ fontFamily: "Inter", fontSize: 12.5, color: C.sub, fontWeight: 700 }}>{completedSets} / {totalSets} SETS</div>
        <button onClick={() => setPaused((p) => !p)} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: C.text, cursor: "pointer" }}>
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
      <div style={{ marginTop: 14 }}><ProgressBar pct={(completedSets / totalSets) * 100} /></div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontFamily: "Inter", fontSize: 12.5, color: C.sub, fontWeight: 700, letterSpacing: 2 }}>{ex.equip === "Backpack" ? `🎒 BACKPACK · ${backpackWeight} KG` : ex.muscle.toUpperCase()}</div>
        <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 27, color: C.text, margin: "8px 0 20px" }}>{ex.name}</div>
        <MediaPlaceholder emoji={MUSCLE_EMOJI[ex.muscle]} />
        <div style={{ display: "flex", gap: 26, marginTop: 22 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 30, color: C.blue }}>{setNum}<span style={{ fontSize: 16, color: C.sub }}>/{ex.sets}</span></div>
            <div style={{ fontFamily: "Inter", fontSize: 11, color: C.sub, fontWeight: 700, letterSpacing: 1 }}>SET</div>
          </div>
          <div style={{ width: 1, background: C.border }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 30, color: C.text }}>{ex.reps}</div>
            <div style={{ fontFamily: "Inter", fontSize: 11, color: C.sub, fontWeight: 700, letterSpacing: 1 }}>{ex.timed ? "SECONDS" : "REPS"}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={prev} style={{ width: 50, height: 50, borderRadius: 16, background: C.surface2, border: `1px solid ${C.border}`, color: C.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}><ChevronLeft size={20} /></button>
        <PrimaryButton style={{ flex: 1, padding: "17px 0", fontSize: 15.5 }} onClick={completeSet} icon={<Check size={18} />}>COMPLETE SET</PrimaryButton>
        <button onClick={skip} style={{ width: 50, height: 50, borderRadius: 16, background: C.surface2, border: `1px solid ${C.border}`, color: C.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}><SkipForward size={19} /></button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  PLAN BUILDER (create workout plan)                                    */
/* ---------------------------------------------------------------------- */
function PlanBuilder({ onBack, onSave, challenge }) {
  const [name, setName] = useState(challenge ? challenge.title : "");
  const [desc, setDesc] = useState(challenge ? challenge.desc : "");
  const [diff, setDiff] = useState("Intermediate");
  const [days, setDays] = useState([]);
  const [items, setItems] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  const toggleDay = (d) => setDays((v) => (v.includes(d) ? v.filter((x) => x !== d) : [...v, d]));
  const addEx = (ex) => { setItems((v) => [...v, { exId: ex.id, sets: ex.sets, reps: ex.reps, name: ex.name, timed: ex.timed }]); setShowPicker(false); };
  const removeAt = (i) => setItems((v) => v.filter((_, idx) => idx !== i));
  const dupAt = (i) => setItems((v) => { const cp = [...v]; cp.splice(i + 1, 0, { ...v[i] }); return cp; });
  const move = (i, dir) => setItems((v) => { const cp = [...v]; const j = i + dir; if (j < 0 || j >= cp.length) return v; [cp[i], cp[j]] = [cp[j], cp[i]]; return cp; });
  const setField = (i, field, val) => setItems((v) => v.map((it, idx) => (idx === i ? { ...it, [field]: val } : it)));

  const canSave = name.trim() && days.length && items.length;

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopHeader title="Create Workout Plan" onBack={onBack} />
      <div style={{ padding: "10px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="Plan name">
          <TextInput value={name} onChange={setName} placeholder="e.g. Push Day" />
        </Field>
        <Field label="Description">
          <TextInput value={desc} onChange={setDesc} placeholder="Optional notes about this plan" />
        </Field>
        <Field label="Difficulty">
          <div style={{ display: "flex", gap: 8 }}>
            {["Beginner", "Intermediate", "Advanced"].map((d) => <Chip key={d} active={diff === d} onClick={() => setDiff(d)}>{d}</Chip>)}
          </div>
        </Field>
        <Field label="Training days">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {WEEK_DAYS.map((d) => <Chip key={d} active={days.includes(d)} onClick={() => toggleDay(d)}>{d}</Chip>)}
          </div>
        </Field>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: C.text }}>Exercises</div>
          <button onClick={() => setShowPicker(true)} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: C.blue, fontFamily: "Inter", fontWeight: 700, fontSize: 13, cursor: "pointer" }}><Plus size={15} /> Add exercise</button>
        </div>

        {items.length === 0 && <EmptyState emoji="📋" title="No exercises yet" sub="Tap “Add exercise” to build your plan" />}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((it, i) => (
            <Card key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <button onClick={() => move(i, -1)} style={{ background: "none", border: "none", color: C.sub, cursor: "pointer" }}><ChevronUp size={14} /></button>
                  <button onClick={() => move(i, 1)} style={{ background: "none", border: "none", color: C.sub, cursor: "pointer" }}><ChevronDown size={14} /></button>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: C.text }}>{i + 1}. {it.name}</div>
                  <div style={{ display: "flex", gap: 10, marginTop: 8, alignItems: "center" }}>
                    <NumStepper label="sets" value={it.sets} onChange={(v) => setField(i, "sets", v)} />
                    <NumStepper label={it.timed ? "sec" : "reps"} value={it.reps} onChange={(v) => setField(i, "reps", v)} />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <button onClick={() => dupAt(i)} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 9, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: C.sub, cursor: "pointer" }}><Copy size={13} /></button>
                  <button onClick={() => removeAt(i)} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 9, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", color: "#FF5C7A", cursor: "pointer" }}><Trash2 size={13} /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 20px 22px", background: `linear-gradient(0deg, ${C.bg} 60%, transparent)` }}>
        <PrimaryButton disabled={!canSave} style={{ width: "100%", padding: "16px 0" }} onClick={() => onSave({
          id: "plan_" + Date.now(), name: name.trim(), diff, days, custom: true,
          items: items.map((it) => ({ exId: it.exId, sets: it.sets, reps: it.reps })),
        })}>SAVE PLAN</PrimaryButton>
      </div>

      {showPicker && <ExercisePicker onClose={() => setShowPicker(false)} onPick={addEx} />}
    </div>
  );
}

function ExercisePicker({ onClose, onPick }) {
  const [q, setQ] = useState("");
  const list = EXLIB.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 50, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: C.surface, width: "100%", maxHeight: "75%", borderRadius: "24px 24px 0 0", padding: "16px 20px 24px", overflowY: "auto", border: `1px solid ${C.border}` }}>
        <div style={{ width: 36, height: 4, borderRadius: 4, background: C.surface3, margin: "0 auto 14px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 17, color: C.text }}>Add Exercise</div>
          <button onClick={onClose} style={{ background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", color: C.text, cursor: "pointer" }}><X size={15} /></button>
        </div>
        <TextInput value={q} onChange={setQ} placeholder="Search exercises..." />
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {list.map((e) => (
            <div key={e.id} onClick={() => onPick(e)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: C.surface2, borderRadius: 14, cursor: "pointer", border: `1px solid ${C.border}` }}>
              <div>
                <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: C.text }}>{e.name}</div>
                <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, marginTop: 2 }}>{e.muscle} · {e.equip}</div>
              </div>
              <Plus size={17} color={C.blue} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NumStepper({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "4px 8px" }}>
      <button onClick={() => onChange(Math.max(1, value - 1))} style={{ background: "none", border: "none", color: C.sub, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>−</button>
      <span style={{ fontFamily: "Inter", fontSize: 12.5, color: C.text, fontWeight: 700, minWidth: 34, textAlign: "center" }}>{value} {label}</span>
      <button onClick={() => onChange(value + 1)} style={{ background: "none", border: "none", color: C.sub, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>+</button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontFamily: "Inter", fontSize: 12.5, color: C.sub, fontWeight: 700, marginBottom: 8, letterSpacing: 0.3 }}>{label}</div>
      {children}
    </div>
  );
}
function TextInput({ value, onChange, placeholder }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", background: C.surface2, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", color: C.text, fontFamily: "Inter", fontSize: 14.5, outline: "none", boxSizing: "border-box" }} />
  );
}

/* ---------------------------------------------------------------------- */
/*  ADD CUSTOM EXERCISE                                                   */
/* ---------------------------------------------------------------------- */
function AddExercise({ onBack, onSave }) {
  const [name, setName] = useState("");
  const [muscle, setMuscle] = useState("Full Body");
  const [equip, setEquip] = useState("No Equipment");
  const [diff, setDiff] = useState("Beginner");
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [rest, setRest] = useState(45);
  const [notes, setNotes] = useState("");
  const equips = ["No Equipment", "Backpack", "Dumbbells", "Resistance Band", "Chair", "Table", "Other"];

  return (
    <div style={{ paddingBottom: 110 }}>
      <TopHeader title="Add Exercise" onBack={onBack} />
      <div style={{ padding: "10px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        <Field label="Exercise name"><TextInput value={name} onChange={setName} placeholder="e.g. Archer Push Up" /></Field>
        <Field label="Muscle group">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{MUSCLES.map((m) => <Chip key={m} icon={MUSCLE_EMOJI[m]} active={muscle === m} onClick={() => setMuscle(m)}>{m}</Chip>)}</div>
        </Field>
        <Field label="Equipment">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{equips.map((e) => <Chip key={e} active={equip === e} onClick={() => setEquip(e)}>{e}</Chip>)}</div>
        </Field>
        <Field label="Difficulty">
          <div style={{ display: "flex", gap: 8 }}>{["Beginner", "Intermediate", "Advanced"].map((d) => <Chip key={d} active={diff === d} onClick={() => setDiff(d)}>{d}</Chip>)}</div>
        </Field>
        <Field label="Default sets / reps / rest">
          <div style={{ display: "flex", gap: 10 }}>
            <NumStepper label="sets" value={sets} onChange={setSets} />
            <NumStepper label="reps" value={reps} onChange={setReps} />
            <NumStepper label="s rest" value={rest} onChange={setRest} />
          </div>
        </Field>
        <Field label="Personal notes"><TextInput value={notes} onChange={setNotes} placeholder="Cues, form notes, variations..." /></Field>
        <MediaPlaceholder emoji="📷" />
        <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub2, textAlign: "center", marginTop: -8 }}>Image, GIF and video support coming to this slot</div>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "14px 20px 22px", background: `linear-gradient(0deg, ${C.bg} 60%, transparent)` }}>
        <PrimaryButton disabled={!name.trim()} style={{ width: "100%", padding: "16px 0" }} onClick={() => onSave({ id: "cx_" + Date.now(), name: name.trim(), muscle, equip, diff, sets, reps, rest, cal: 5, notes })}>
          SAVE EXERCISE
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  PROGRESS / REPORT SCREEN                                              */
/* ---------------------------------------------------------------------- */
function ProgressScreen({ data, update }) {
  const totalWorkouts = data.history.length;
  const totalCal = data.history.reduce((s, h) => s + h.cal, 0);
  const totalMin = data.history.reduce((s, h) => s + h.min, 0);
  const streak = computeStreak(data.history);
  const best = Math.max(streak, data.bests.streak);
  const [monthOffset, setMonthOffset] = useState(0);
  const [tab, setTab] = useState("overview");

  return (
    <div style={{ paddingBottom: 100 }}>
      <TopHeader title="Progress" />
      <div style={{ padding: "6px 20px" }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <StatPill label="WORKOUTS" value={totalWorkouts} />
            <StatPill label="CALORIES" value={totalCal.toLocaleString()} />
            <StatPill label="MINUTES" value={totalMin.toLocaleString()} />
          </div>
        </Card>

        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          <Card style={{ flex: 1, textAlign: "center" }}>
            <Flame size={20} color={C.orange} fill={C.orange} style={{ marginBottom: 4 }} />
            <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 20, color: C.text }}>{streak} days</div>
            <div style={{ fontFamily: "Inter", fontSize: 11, color: C.sub, fontWeight: 600 }}>Current Streak</div>
          </Card>
          <Card style={{ flex: 1, textAlign: "center" }}>
            <Trophy size={20} color="#FFD166" style={{ marginBottom: 4 }} />
            <div style={{ fontFamily: "Outfit", fontWeight: 800, fontSize: 20, color: C.text }}>{best} days</div>
            <div style={{ fontFamily: "Inter", fontSize: 11, color: C.sub, fontWeight: 600 }}>Personal Best</div>
          </Card>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          <Chip active={tab === "overview"} onClick={() => setTab("overview")}>Calendar</Chip>
          <Chip active={tab === "weight"} onClick={() => setTab("weight")}>Weight</Chip>
          <Chip active={tab === "measure"} onClick={() => setTab("measure")}>Measurements</Chip>
        </div>

        {tab === "overview" && <MonthCalendar history={data.history} monthOffset={monthOffset} setMonthOffset={setMonthOffset} />}
        {tab === "weight" && <WeightTracker data={data} update={update} />}
        {tab === "measure" && <Measurements data={data} update={update} />}
      </div>
    </div>
  );
}

function MonthCalendar({ history, monthOffset, setMonthOffset }) {
  const doneMap = new Map(history.map((h) => [h.date, h]));
  const now = new Date();
  now.setMonth(now.getMonth() + monthOffset);
  const year = now.getFullYear(), month = now.getMonth();
  const first = new Date(year, month, 1);
  const startPad = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(startPad).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const [sel, setSel] = useState(null);
  const monthName = now.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <Card style={{ marginTop: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <button onClick={() => setMonthOffset((v) => v - 1)} style={{ background: "none", border: "none", color: C.sub, cursor: "pointer" }}><ChevronLeft size={18} /></button>
        <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14.5, color: C.text }}>{monthName}</div>
        <button onClick={() => setMonthOffset((v) => Math.min(0, v + 1))} style={{ background: "none", border: "none", color: C.sub, cursor: "pointer" }}><ChevronRight size={18} /></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 6 }}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <div key={i} style={{ textAlign: "center", fontFamily: "Inter", fontSize: 10.5, color: C.sub2, fontWeight: 700 }}>{d}</div>)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
          const done = doneMap.has(iso);
          const isToday = iso === todayISO();
          return (
            <div key={i} onClick={() => done && setSel(iso)} style={{
              aspectRatio: "1", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              background: done ? C.blueSoft : "transparent", border: isToday ? `1.5px solid ${C.blue}` : "1px solid transparent",
              cursor: done ? "pointer" : "default", position: "relative",
            }}>
              <span style={{ fontFamily: "Inter", fontSize: 11.5, color: done ? C.text : C.sub2, fontWeight: done ? 700 : 500 }}>{d}</span>
              {done && <div style={{ position: "absolute", bottom: 3, width: 4, height: 4, borderRadius: "50%", background: C.blue }} />}
            </div>
          );
        })}
      </div>
      {sel && doneMap.get(sel) && (
        <div style={{ marginTop: 14, padding: 12, background: C.surface2, borderRadius: 14, border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 13.5, color: C.text }}>{doneMap.get(sel).title}</div>
          <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, marginTop: 4 }}>{doneMap.get(sel).min} min · {doneMap.get(sel).cal} kcal</div>
        </div>
      )}
    </Card>
  );
}

function WeightTracker({ data, update }) {
  const log = data.weightLog;
  const [val, setVal] = useState("");
  const min = Math.min(...log.map((l) => l.kg));
  const max = Math.max(...log.map((l) => l.kg));
  const current = log[log.length - 1]?.kg;
  const addEntry = () => {
    const n = parseFloat(val);
    if (!n) return;
    update((d) => ({ ...d, weightLog: [...d.weightLog, { date: todayISO(), kg: n }] }));
    setVal("");
  };
  const range = max - min || 1;
  const pts = log.slice(-20);
  const w = 280, h = 100;
  const path = pts.map((p, i) => {
    const x = (i / Math.max(pts.length - 1, 1)) * w;
    const y = h - ((p.kg - min) / range) * (h - 10) - 5;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");

  return (
    <Card style={{ marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: 14 }}>
        <StatPill label="CURRENT" value={`${current} kg`} />
        <StatPill label="LIGHTEST" value={`${min} kg`} />
        <StatPill label="HEAVIEST" value={`${max} kg`} />
      </div>
      <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
        <path d={path} fill="none" stroke={C.blue} strokeWidth={2.5} style={{ filter: "drop-shadow(0 0 6px rgba(47,127,255,.5))" }} />
      </svg>
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
        <TextInput value={val} onChange={setVal} placeholder="Log today's weight (kg)" />
        <button onClick={addEntry} style={{ background: C.blue, border: "none", borderRadius: 12, padding: "0 16px", color: "#fff", cursor: "pointer" }}><Plus size={18} /></button>
      </div>
    </Card>
  );
}

function Measurements({ data, update }) {
  const m = data.measurements;
  const setM = (k, v) => update((d) => ({ ...d, measurements: { ...d.measurements, [k]: v } }));
  return (
    <Card style={{ marginTop: 14 }}>
      {Object.entries(m).map(([k, v]) => (
        <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontFamily: "Inter", fontSize: 14, color: C.text, fontWeight: 600, textTransform: "capitalize" }}>{k}</span>
          <NumStepper label="cm" value={v} onChange={(nv) => setM(k, nv)} />
        </div>
      ))}
    </Card>
  );
}

/* ---------------------------------------------------------------------- */
/*  FAVORITES                                                             */
/* ---------------------------------------------------------------------- */
function FavoritesScreen({ data, nav, onBack, update }) {
  const favW = WORKOUTS.filter((w) => data.favorites.workouts.includes(w.id));
  const favE = EXLIB.filter((e) => data.favorites.exercises.includes(e.id));
  return (
    <div style={{ paddingBottom: 100 }}>
      <TopHeader title="My Favorites" onBack={onBack} />
      <div style={{ padding: "6px 20px" }}>
        <SectionTitle>Workouts</SectionTitle>
        {favW.length === 0 && <EmptyState emoji="⭐" title="No favorite workouts yet" />}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {favW.map((w) => <WorkoutRow key={w.id} w={w} onClick={() => nav("workoutDetail", { workout: w })} />)}
        </div>
        <SectionTitle>Exercises</SectionTitle>
        {favE.length === 0 && <EmptyState emoji="⭐" title="No favorite exercises yet" />}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {favE.map((e) => (
            <Card key={e.id} onClick={() => nav("exerciseDetail", { exercise: e })} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: C.text }}>{e.name}</div>
              <ChevronRight size={16} color={C.sub} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  BACKPACK TRAINING                                                     */
/* ---------------------------------------------------------------------- */
function BackpackScreen({ data, update, nav, onBack }) {
  const [custom, setCustom] = useState("");
  const list = EXLIB.filter((e) => e.equip === "Backpack");
  return (
    <div style={{ paddingBottom: 100 }}>
      <TopHeader title="Backpack Training" onBack={onBack} />
      <div style={{ padding: "6px 20px" }}>
        <Card>
          <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 12 }}>Backpack weight</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {BACKPACK_WEIGHTS.map((w) => (
              <Chip key={w} active={data.settings.backpackWeight === w} onClick={() => update((d) => ({ ...d, settings: { ...d.settings, backpackWeight: w } }))}>{w} kg</Chip>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <TextInput value={custom} onChange={setCustom} placeholder="Custom weight (kg)" />
            <button onClick={() => { const n = parseFloat(custom); if (n) { update((d) => ({ ...d, settings: { ...d.settings, backpackWeight: n } })); setCustom(""); } }} style={{ background: C.blue, border: "none", borderRadius: 12, padding: "0 16px", color: "#fff", cursor: "pointer" }}>Set</button>
          </div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, background: C.blueSoft, border: `1px solid ${C.blue}`, borderRadius: 14, padding: "10px 14px" }}>
            <span style={{ fontSize: 16 }}>🎒</span>
            <span style={{ fontFamily: "Inter", fontWeight: 700, fontSize: 13.5, color: C.text }}>Backpack: {data.settings.backpackWeight} kg</span>
          </div>
        </Card>
        <SectionTitle>Backpack Exercises</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((e) => (
            <Card key={e.id} onClick={() => nav("exerciseDetail", { exercise: e })} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 14, color: C.text }}>{e.name}</div>
                <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.sub, marginTop: 2 }}>{e.sets} sets × {e.reps} reps</div>
              </div>
              <ChevronRight size={16} color={C.sub} />
            </Card>
          ))}
        </div>
        <PrimaryButton style={{ width: "100%", marginTop: 16, padding: "15px 0" }} onClick={() => nav("player", { source: { title: "Backpack Session", exercises: list.slice(0, 5), hue: C.blue } })}>
          START BACKPACK WORKOUT
        </PrimaryButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  SETTINGS                                                              */
/* ---------------------------------------------------------------------- */
function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} style={{ width: 46, height: 26, borderRadius: 999, background: on ? C.blue : C.surface3, border: `1px solid ${on ? C.blue : C.border}`, position: "relative", cursor: "pointer", boxShadow: on ? "0 0 10px rgba(47,127,255,.4)" : "none" }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: on ? 23 : 2, transition: "left .15s ease" }} />
    </button>
  );
}
function Row({ icon, label, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center", color: C.blue }}>{icon}</div>
        <span style={{ fontFamily: "Inter", fontSize: 14.5, color: C.text, fontWeight: 600 }}>{label}</span>
      </div>
      {right}
    </div>
  );
}

function SettingsScreen({ data, update, nav }) {
  const s = data.settings;
  const setS = (k, v) => update((d) => ({ ...d, settings: { ...d.settings, [k]: v } }));
  const [name, setName] = useState(data.profile.name);
  const [resetConfirm, setResetConfirm] = useState(false);

  return (
    <div style={{ paddingBottom: 100 }}>
      <TopHeader title="Settings" />
      <div style={{ padding: "6px 20px" }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: C.blueSoft, border: `1px solid ${C.blue}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={24} color={C.blue} />
            </div>
            <div style={{ flex: 1 }}>
              <input value={name} onChange={(e) => setName(e.target.value)} onBlur={() => update((d) => ({ ...d, profile: { ...d.profile, name } }))}
                style={{ background: "none", border: "none", outline: "none", fontFamily: "Outfit", fontWeight: 700, fontSize: 16, color: C.text, width: "100%" }} />
              <div style={{ fontFamily: "Inter", fontSize: 12, color: C.sub, marginTop: 2 }}>{data.profile.goal} · {data.profile.experience}</div>
            </div>
          </div>
        </Card>

        <SectionTitle>Training</SectionTitle>
        <Card>
          <Row icon={<span style={{ fontSize: 16 }}>🎒</span>} label="Backpack Weight" right={<button onClick={() => nav("backpack")} style={{ background: "none", border: "none", color: C.blue, fontFamily: "Inter", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{s.backpackWeight} kg</button>} />
          <Row icon={<TimerIcon size={16} />} label="Rest Timer Default" right={<span style={{ fontFamily: "Inter", fontSize: 13, color: C.sub }}>45 sec</span>} />
          <Row icon={<Dumbbell size={16} />} label="Equipment" right={<ChevronRight size={16} color={C.sub} />} />
          <Row icon={<Heart size={16} />} label="My Favorites" right={<button onClick={() => nav("favorites")} style={{ background: "none", border: "none", cursor: "pointer" }}><ChevronRight size={16} color={C.sub} /></button>} />
        </Card>

        <SectionTitle>Preferences</SectionTitle>
        <Card>
          <Row icon={<Bell size={16} />} label="Notifications" right={<Toggle on={s.notifications} onClick={() => setS("notifications", !s.notifications)} />} />
          <Row icon={<Volume2 size={16} />} label="Sound" right={<Toggle on={s.sound} onClick={() => setS("sound", !s.sound)} />} />
          <Row icon={<Vibrate size={16} />} label="Vibration" right={<Toggle on={s.vibration} onClick={() => setS("vibration", !s.vibration)} />} />
          <Row icon={<Scale size={16} />} label="Units" right={
            <div style={{ display: "flex", gap: 6 }}>
              {["kg", "lb"].map((u) => <Chip key={u} active={s.units === u} onClick={() => setS("units", u)}>{u}</Chip>)}
            </div>
          } />
        </Card>

        <SectionTitle>Theme</SectionTitle>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: "#000", border: `1.5px solid ${C.blue}` }} />
            <span style={{ fontFamily: "Inter", fontSize: 14, color: C.text, fontWeight: 600 }}>AMOLED Black</span>
            <Check size={15} color={C.blue} style={{ marginLeft: "auto" }} />
          </div>
        </Card>

        <SectionTitle>Data</SectionTitle>
        <Card>
          <Row icon={<Download size={16} />} label="Export workout history" right={<ChevronRight size={16} color={C.sub} />} />
          <div onClick={() => setResetConfirm(true)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", cursor: "pointer" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,92,122,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF5C7A" }}><RotateCcw size={16} /></div>
            <span style={{ fontFamily: "Inter", fontSize: 14.5, color: "#FF5C7A", fontWeight: 600 }}>Reset progress</span>
          </div>
        </Card>
      </div>

      {resetConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60, padding: 24 }} onClick={() => setResetConfirm(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 22, maxWidth: 320 }}>
            <div style={{ fontFamily: "Outfit", fontWeight: 700, fontSize: 16, color: C.text }}>Reset all progress?</div>
            <div style={{ fontFamily: "Inter", fontSize: 13, color: C.sub, marginTop: 8, lineHeight: 1.5 }}>This clears your workout history, streaks and weight log. Your plans stay saved.</div>
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <GhostButton style={{ flex: 1 }} onClick={() => setResetConfirm(false)}>Cancel</GhostButton>
              <PrimaryButton style={{ flex: 1, background: "#FF5C7A", boxShadow: "none" }} onClick={() => { update((d) => ({ ...d, history: [], weightLog: [d.weightLog[d.weightLog.length - 1]], bests: { streak: 0 } })); setResetConfirm(false); }}>Reset</PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  BOTTOM NAV                                                            */
/* ---------------------------------------------------------------------- */
function BottomNav({ active, onChange }) {
  const items = [
    { key: "home", label: "Training", icon: Home },
    { key: "discover", label: "Discover", icon: Compass },
    { key: "progress", label: "Progress", icon: BarChart3 },
    { key: "settings", label: "Settings", icon: SettingsIcon },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(6,7,9,0.92)", backdropFilter: "blur(14px)", borderTop: `1px solid ${C.border}`, display: "flex", padding: "10px 8px calc(env(safe-area-inset-bottom,0px) + 10px)", zIndex: 40 }}>
      {items.map((it) => {
        const Icon = it.icon;
        const isActive = active === it.key;
        return (
          <button key={it.key} onClick={() => onChange(it.key)} style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", padding: "4px 0" }}>
            <Icon size={21} color={isActive ? C.blue : C.sub} strokeWidth={isActive ? 2.4 : 2} style={isActive ? { filter: "drop-shadow(0 0 6px rgba(47,127,255,.6))" } : {}} />
            <span style={{ fontFamily: "Inter", fontSize: 10.5, fontWeight: 700, color: isActive ? C.blue : C.sub }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  APP ROOT                                                              */
/* ---------------------------------------------------------------------- */
export default function App() {
  const { data, update, loaded } = useAppData();
  const [tab, setTab] = useState("home");
  const [stack, setStack] = useState([]); // navigation stack of {screen, props}
  const [player, setPlayer] = useState(null);
  const [toast, setToast] = useState(null);

  const nav = (screen, props = {}) => {
    if (screen === "player") { setPlayer(props.source); return; }
    setStack((s) => [...s, { screen, props }]);
  };
  const back = () => setStack((s) => s.slice(0, -1));
  const changeTab = (t) => { setTab(t); setStack([]); };

  const finishOnboarding = (answers) => {
    update((d) => ({ ...d, profile: { ...d.profile, goal: answers.goal, experience: answers.experience, onboarded: true } }));
  };

  const completeWorkout = (result) => {
    update((d) => {
      const already = d.history.find((h) => h.date === todayISO());
      const history = already ? d.history : [...d.history, { date: todayISO(), title: result.title, min: result.min, cal: result.cal }];
      const streak = computeStreak(history);
      return { ...d, history, bests: { streak: Math.max(d.bests.streak, streak) } };
    });
    setPlayer(null);
    setStack([]);
    setTab("progress");
  };

  const top = stack[stack.length - 1];

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <style>{FONTS}</style>
        <div style={{ fontFamily: "Outfit", color: C.sub, fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>LOADING...</div>
      </div>
    );
  }

  if (!data.profile.onboarded) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg }}>
        <style>{FONTS}</style>
        <Onboarding onDone={finishOnboarding} />
      </div>
    );
  }

  if (player) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg }}>
        <style>{FONTS}</style>
        <WorkoutPlayer source={player} backpackWeight={data.settings.backpackWeight} onExit={() => setPlayer(null)} onComplete={completeWorkout} />
      </div>
    );
  }

  let body;
  if (top) {
    switch (top.screen) {
      case "discover": body = <DiscoverScreen nav={nav} initialCat={top.props.cat} />; break;
      case "workoutDetail": body = <WorkoutDetail workout={top.props.workout} nav={nav} onBack={back} data={data} update={update} />; break;
      case "planDetail": body = <PlanDetail plan={top.props.plan} nav={nav} onBack={back} />; break;
      case "exerciseDetail": body = <ExerciseDetail exercise={top.props.exercise} onBack={back} data={data} update={update} backpackWeight={data.settings.backpackWeight} />; break;
      case "planBuilder": body = <PlanBuilder onBack={back} challenge={top.props.challenge} onSave={(plan) => { update((d) => ({ ...d, plans: [...d.plans, plan] })); back(); setTab("home"); }} />; break;
      case "addExercise": body = <AddExercise onBack={back} onSave={(ex) => { update((d) => ({ ...d, customExercises: [...d.customExercises, ex] })); back(); }} />; break;
      case "favorites": body = <FavoritesScreen data={data} nav={nav} onBack={back} update={update} />; break;
      case "backpack": body = <BackpackScreen data={data} update={update} nav={nav} onBack={back} />; break;
      default: body = null;
    }
  } else {
    switch (tab) {
      case "home": body = <HomeScreen data={data} update={update} nav={nav} />; break;
      case "discover": body = <DiscoverScreen nav={nav} />; break;
      case "progress": body = <ProgressScreen data={data} update={update} />; break;
      case "settings": body = <SettingsScreen data={data} update={update} nav={nav} />; break;
      default: body = null;
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Inter" }}>
      <style>{FONTS}{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: ${C.sub2}; }
        button { -webkit-tap-highlight-color: transparent; }
      `}</style>
      <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", position: "relative" }}>
        {body}
        <BottomNav active={tab} onChange={changeTab} />
        {tab === "home" && !top && (
          <button onClick={() => nav("addExercise")} style={{
            position: "fixed", bottom: 92, right: 20, width: 52, height: 52, borderRadius: 16,
            background: C.blue, border: "none", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 22px rgba(47,127,255,0.45)", cursor: "pointer", zIndex: 41,
          }}>
            <Plus size={24} color="#fff" />
          </button>
        )}
      </div>
    </div>
  );
}
