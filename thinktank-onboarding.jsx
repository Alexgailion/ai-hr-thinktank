import { useState, useEffect } from "react";

const I18N = {
  en: {
    appName: "AI-HR Think Tank",
    step: "Step", of: "of", back: "Start over",
    briefBtn: "Brief the team →",
    specificHint: "Pick what matters most to you right now.",
    teamLabel: "The team:",
    lockedMsg: "Context locked. Briefing the team.",
    copyLabel: "Copy this prompt →", copyHint: "Paste into Claude with the AI-HR Think Tank skill active. The team will skip the preamble and go straight to debate.",
    copied: "✓ Copied",
    summaryLabels: { industry: "Industry", size: "Size", role: "Role", topic: "Focus" },
    steps: [
      { id: "industry", title: "What industry are you in?", subtitle: "This shapes everything the team will say.", type: "grid",
        options: [
          { value: "tech", label: "Tech / Internet", icon: "💻" },
          { value: "finance", label: "Finance / Insurance", icon: "🏦" },
          { value: "manufacturing", label: "Manufacturing", icon: "🏭" },
          { value: "healthcare", label: "Healthcare / Pharma", icon: "🏥" },
          { value: "retail", label: "Retail / Consumer", icon: "🛍️" },
          { value: "legal", label: "Legal / Pro Services", icon: "⚖️" },
          { value: "education", label: "Education / EdTech", icon: "🎓" },
          { value: "energy", label: "Energy / Utilities", icon: "⚡" },
          { value: "other", label: "Other", icon: "🌐" },
        ]},
      { id: "size", title: "How large is your organization?", subtitle: "Size changes the playbook entirely.", type: "list",
        options: [
          { value: "tiny", label: "< 30 people", sub: "Everyone knows everyone" },
          { value: "small", label: "30–150 people", sub: "Coordination starts to matter" },
          { value: "medium", label: "150–800 people", sub: "Layers and silos appear" },
          { value: "large", label: "800–3,000 people", sub: "Politics is a real variable" },
          { value: "enterprise", label: "3,000+ people", sub: "Change management is the job" },
        ]},
      { id: "role", title: "What's your seat at the table?", subtitle: "Your position shapes what advice you can actually use.", type: "list",
        options: [
          { value: "chro", label: "CHRO / HR Director", sub: "You own the people strategy" },
          { value: "ceo", label: "CEO / Founder / GM", sub: "You own everything" },
          { value: "hrbp", label: "HR Business Partner", sub: "You translate between business and people" },
          { value: "bizlead", label: "Business Unit Lead", sub: "You own a P&L or function" },
          { value: "od", label: "OD / L&D Specialist", sub: "You design the system" },
          { value: "other", label: "Other", sub: "Tell us in your question" },
        ]},
      { id: "topic", title: "What area do you want the team to focus on?", subtitle: "You can pick more than one. You'll shape the exact question once you're in the conversation.", type: "multiselect",
        options: [
          { value: "org", label: "Org Design", sub: "Structure, reporting lines, team division", icon: "🏗️" },
          { value: "ai", label: "AI Transformation", sub: "Tool adoption, workflow redesign, resistance", icon: "🤖" },
          { value: "talent", label: "Talent Strategy", sub: "Hiring, retention, key talent review", icon: "🎯" },
          { value: "reward", label: "Rewards & Performance", sub: "Compensation, KPIs, equity incentives", icon: "💰" },
          { value: "leadership", label: "Leadership Development", sub: "Manager capability, succession planning", icon: "🧠" },
          { value: "crisis", label: "Urgent Diagnosis", sub: "Team crisis, attrition spike, project failure", icon: "⚡" },
        ]},
    ],
    teamMembers: ["Tech 👊", "OD ⚡", "Performance 🗂️", "Talent Dev 📚", "Recruiting 🔍", "C&B 💰", "HRG 🧣"],
  },
  zh: {
    appName: "AI-HR 智囊团",
    step: "第", of: "步 /", back: "重新开始",
    briefBtn: "提交给智囊团 →",
    specificHint: "选你现在最想突破的方向。",
    teamLabel: "智囊团：",
    lockedMsg: "背景已锁定，正在召集智囊团……",
    copyLabel: "复制提示词 →", copyHint: "粘贴到已激活 AI-HR 智囊团 Skill 的 Claude 对话中，直接开始讨论。",
    copied: "✓ 已复制",
    summaryLabels: { industry: "行业", size: "规模", role: "角色", topic: "关注方向" },
    steps: [
      { id: "industry", title: "你所在的行业是？", subtitle: "行业背景决定智囊团的讨论方向。", type: "grid",
        options: [
          { value: "tech", label: "科技 / 互联网", icon: "💻" },
          { value: "finance", label: "金融 / 保险", icon: "🏦" },
          { value: "manufacturing", label: "制造业", icon: "🏭" },
          { value: "healthcare", label: "医疗 / 医药", icon: "🏥" },
          { value: "retail", label: "零售 / 消费品", icon: "🛍️" },
          { value: "legal", label: "法律 / 专业服务", icon: "⚖️" },
          { value: "education", label: "教育 / EdTech", icon: "🎓" },
          { value: "energy", label: "能源 / 公用事业", icon: "⚡" },
          { value: "other", label: "其他", icon: "🌐" },
        ]},
      { id: "size", title: "你们组织的规模是？", subtitle: "规模不同，打法完全不同。", type: "list",
        options: [
          { value: "tiny", label: "30人以下", sub: "人人相识，决策极快" },
          { value: "small", label: "30–150人", sub: "协同开始变得重要" },
          { value: "medium", label: "150–800人", sub: "层级和壁垒开始出现" },
          { value: "large", label: "800–3000人", sub: "政治是真实变量" },
          { value: "enterprise", label: "3000人以上", sub: "变革管理本身就是主业" },
        ]},
      { id: "role", title: "你在这件事上的角色是？", subtitle: "你的位置决定哪些建议你能真正用上。", type: "list",
        options: [
          { value: "chro", label: "CHRO / HR负责人", sub: "你负责人才战略" },
          { value: "ceo", label: "CEO / 创始人 / 总经理", sub: "你负责一切" },
          { value: "hrbp", label: "HR BP", sub: "你是业务与HR之间的桥梁" },
          { value: "bizlead", label: "业务负责人", sub: "你负责某个P&L或职能" },
          { value: "od", label: "OD / L&D 专家", sub: "你负责设计组织系统" },
          { value: "other", label: "其他", sub: "在议题里说明即可" },
        ]},
      { id: "topic", title: "你最想让智囊团聚焦哪个方向？", subtitle: "可以多选。进入对话后，智囊团会引导你说清楚具体问题。", type: "multiselect",
        options: [
          { value: "org", label: "组织设计", sub: "架构调整、团队分工、汇报关系", icon: "🏗️" },
          { value: "ai", label: "AI转型落地", sub: "工具引入、流程重构、阻力突破", icon: "🤖" },
          { value: "talent", label: "人才策略", sub: "招聘、保留、关键人才盘点", icon: "🎯" },
          { value: "reward", label: "激励与绩效", sub: "薪酬设计、KPI、期权激励", icon: "💰" },
          { value: "leadership", label: "领导力发展", sub: "管理者培养、高管转型、继任规划", icon: "🧠" },
          { value: "crisis", label: "紧急诊断", sub: "团队危机、人员流失、项目失控", icon: "⚡" },
        ]},
    ],
    teamMembers: ["Tech 👊", "OD ⚡", "Performance 🗂️", "Talent Dev 📚", "Recruiting 🔍", "C&B 💰", "HRG 🧣"],
  },
  ja: {
    appName: "AI-HR シンクタンク",
    step: "ステップ", of: "/", back: "最初からやり直す",
    briefBtn: "チームにブリーフィング →",
    specificHint: "今最も重要なテーマを選んでください。",
    teamLabel: "チーム：",
    lockedMsg: "情報確定。チームをブリーフィング中…",
    copyLabel: "プロンプトをコピー →", copyHint: "AI-HR Think Tank スキルが有効なClaudeに貼り付けてください。",
    copied: "✓ コピー済",
    summaryLabels: { industry: "業界", size: "規模", role: "役割", topic: "テーマ" },
    steps: [
      { id: "industry", title: "あなたの業界は？", subtitle: "業界がチームの議論の方向性を決めます。", type: "grid",
        options: [
          { value: "tech", label: "テック / IT", icon: "💻" },
          { value: "finance", label: "金融 / 保険", icon: "🏦" },
          { value: "manufacturing", label: "製造業", icon: "🏭" },
          { value: "healthcare", label: "医療 / 製薬", icon: "🏥" },
          { value: "retail", label: "小売 / 消費財", icon: "🛍️" },
          { value: "legal", label: "法律 / 専門サービス", icon: "⚖️" },
          { value: "education", label: "教育 / EdTech", icon: "🎓" },
          { value: "energy", label: "エネルギー", icon: "⚡" },
          { value: "other", label: "その他", icon: "🌐" },
        ]},
      { id: "size", title: "組織の規模は？", subtitle: "規模によって戦略はまったく異なります。", type: "list",
        options: [
          { value: "tiny", label: "30人未満", sub: "全員が知り合い" },
          { value: "small", label: "30〜150人", sub: "連携が重要になり始める" },
          { value: "medium", label: "150〜800人", sub: "階層とサイロが現れる" },
          { value: "large", label: "800〜3,000人", sub: "政治が実変数になる" },
          { value: "enterprise", label: "3,000人以上", sub: "変革管理が仕事の中心" },
        ]},
      { id: "role", title: "あなたの役割は？", subtitle: "立場によって、実際に使えるアドバイスが変わります。", type: "list",
        options: [
          { value: "chro", label: "CHRO / HR責任者", sub: "人材戦略のオーナー" },
          { value: "ceo", label: "CEO / 創業者 / GM", sub: "すべてのオーナー" },
          { value: "hrbp", label: "HRビジネスパートナー", sub: "事業とHRの橋渡し役" },
          { value: "bizlead", label: "事業責任者", sub: "P&Lまたは機能のオーナー" },
          { value: "od", label: "OD / L&Dスペシャリスト", sub: "組織システムの設計者" },
          { value: "other", label: "その他", sub: "質問の中で説明してください" },
        ]},
      { id: "topic", title: "チームに集中してほしいテーマは？", subtitle: "複数選択可。具体的な質問は会話の中でチームが引き出します。", type: "multiselect",
        options: [
          { value: "org", label: "組織設計", sub: "構造・報告ライン・チーム分担", icon: "🏗️" },
          { value: "ai", label: "AI変革推進", sub: "ツール導入・業務再設計・抵抗の克服", icon: "🤖" },
          { value: "talent", label: "タレント戦略", sub: "採用・定着・主要人材のレビュー", icon: "🎯" },
          { value: "reward", label: "報酬・パフォーマンス", sub: "給与設計・KPI・株式インセンティブ", icon: "💰" },
          { value: "leadership", label: "リーダーシップ開発", sub: "マネージャー育成・後継者計画", icon: "🧠" },
          { value: "crisis", label: "緊急診断", sub: "チーム危機・離職急増・プロジェクト失敗", icon: "⚡" },
        ]},
    ],
    teamMembers: ["Tech 👊", "OD ⚡", "Performance 🗂️", "Talent Dev 📚", "Recruiting 🔍", "C&B 💰", "HRG 🧣"],
  },
  es: {
    appName: "AI-HR Think Tank",
    step: "Paso", of: "de", back: "Reiniciar",
    briefBtn: "Informar al equipo →",
    specificHint: "Cuanto más específico, más agudo será el debate.",
    teamLabel: "El equipo:",
    lockedMsg: "Contexto guardado. Informando al equipo…",
    copyLabel: "Copiar prompt →", copyHint: "Pégalo en Claude con el skill AI-HR Think Tank activo.",
    copied: "✓ Copiado",
    summaryLabels: { industry: "Industria", size: "Tamaño", role: "Rol", topic: "Tema" },
    steps: [
      { id: "industry", title: "¿En qué industria trabajas?", subtitle: "Esto define todo lo que el equipo dirá.", type: "grid",
        options: [
          { value: "tech", label: "Tecnología / Internet", icon: "💻" },
          { value: "finance", label: "Finanzas / Seguros", icon: "🏦" },
          { value: "manufacturing", label: "Manufactura", icon: "🏭" },
          { value: "healthcare", label: "Salud / Farmacia", icon: "🏥" },
          { value: "retail", label: "Retail / Consumo", icon: "🛍️" },
          { value: "legal", label: "Legal / Servicios Prof.", icon: "⚖️" },
          { value: "education", label: "Educación / EdTech", icon: "🎓" },
          { value: "energy", label: "Energía / Utilities", icon: "⚡" },
          { value: "other", label: "Otro", icon: "🌐" },
        ]},
      { id: "size", title: "¿Qué tan grande es tu organización?", subtitle: "El tamaño cambia completamente el enfoque.", type: "list",
        options: [
          { value: "tiny", label: "Menos de 30 personas", sub: "Todos se conocen" },
          { value: "small", label: "30–150 personas", sub: "La coordinación empieza a importar" },
          { value: "medium", label: "150–800 personas", sub: "Aparecen capas y silos" },
          { value: "large", label: "800–3,000 personas", sub: "La política es una variable real" },
          { value: "enterprise", label: "Más de 3,000 personas", sub: "La gestión del cambio es el trabajo" },
        ]},
      { id: "role", title: "¿Cuál es tu rol?", subtitle: "Tu posición define qué consejos puedes realmente usar.", type: "list",
        options: [
          { value: "chro", label: "CHRO / Director de RRHH", sub: "Eres dueño de la estrategia de personas" },
          { value: "ceo", label: "CEO / Fundador / GM", sub: "Eres dueño de todo" },
          { value: "hrbp", label: "HR Business Partner", sub: "Conectas negocio y personas" },
          { value: "bizlead", label: "Líder de Unidad de Negocio", sub: "Tienes un P&L o función" },
          { value: "od", label: "Especialista OD / L&D", sub: "Diseñas el sistema organizacional" },
          { value: "other", label: "Otro", sub: "Explícalo en tu pregunta" },
        ]},
      { id: "topic", title: "¿Qué quieres que el equipo diseccione?", subtitle: "Sé específico. Las preguntas vagas dan respuestas genéricas.", type: "textarea",
        placeholder: "Ej: Somos un bufete de 30 personas. La IA amenaza el trabajo de los abogados junior. ¿Cómo deberíamos reestructurar el equipo y el modelo de honorarios en los próximos 2 años?" },
    ],
    teamMembers: ["Tech 👊", "OD ⚡", "Performance 🗂️", "Talent Dev 📚", "Recruiting 🔍", "C&B 💰", "HRG 🧣"],
  },
};

const LANG_OPTIONS = [{ code: "en", label: "EN" }, { code: "zh", label: "中文" }, { code: "ja", label: "日本語" }];

function detectLang() {
  const nav = (navigator.language || "en").toLowerCase();
  if (nav.startsWith("zh")) return "zh";
  if (nav.startsWith("ja")) return "ja";
  return "en";
}

export default function ThinkTankOnboarding() {
  const [lang, setLang] = useState("en");
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { setLang(detectLang()); }, []);

  const t = I18N[lang];
  const STEPS = t.steps;
  const step = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const reset = () => { setCurrentStep(0); setAnswers({}); setSubmitted(false); };
  const handleLangChange = (code) => { setLang(code); reset(); };

  const handleSelect = (value) => {
    setAnswers({ ...answers, [step.id]: value });
    setTimeout(() => { if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1); }, 260);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const toggleMulti = (stepId, value) => {
    const current = answers[stepId] || [];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setAnswers({ ...answers, [stepId]: updated });
  };

  const getLabel = (stepId, value) => {
    const s = STEPS.find(s => s.id === stepId);
    return s?.options?.find(o => o.value === value)?.label || value;
  };

  const topicLabels = (answers.topic || []).map(v => {
    const s = STEPS.find(s => s.id === "topic");
    return s?.options?.find(o => o.value === v)?.label || v;
  }).join(", ");
  const promptText = `[AI-HR Think Tank]\n${t.summaryLabels.industry}: ${getLabel("industry", answers.industry)}\n${t.summaryLabels.size}: ${getLabel("size", answers.size)}\n${t.summaryLabels.role}: ${getLabel("role", answers.role)}\n${t.summaryLabels.topic}: ${topicLabels}\n\nPlease start by asking me what specific challenge I want to explore within these areas.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const LangBar = () => (
    <div className="flex gap-1">
      {LANG_OPTIONS.map(l => (
        <button key={l.code} onClick={() => handleLangChange(l.code)}
          className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${lang === l.code ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" : "border-zinc-800 text-zinc-600 hover:text-zinc-400 hover:border-zinc-600"}`}>
          {l.label}
        </button>
      ))}
    </div>
  );

  if (submitted) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="flex justify-end mb-6"><LangBar /></div>
        <div className="text-xs font-mono text-emerald-400 mb-5 tracking-widest uppercase">{t.lockedMsg}</div>
        <div className="space-y-2 mb-6">
          {["industry","size","role","topic"].map(k => (
            <div key={k} className="flex items-start gap-3 text-sm">
              <span className="text-zinc-500 w-20 shrink-0 pt-0.5">{t.summaryLabels[k]}</span>
              <span className="text-zinc-100 leading-relaxed">
                {k === "topic"
                  ? topicLabels
                  : getLabel(k, answers[k])}
              </span>
            </div>
          ))}
        </div>
        <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">{t.copyLabel}</span>
            <button onClick={handleCopy}
              className={`text-xs px-3 py-1 rounded-lg border transition-all ${copied ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"}`}>
              {copied ? t.copied : "Copy"}
            </button>
          </div>
          <div className="text-sm text-zinc-300 font-mono bg-zinc-950 rounded-lg p-4 whitespace-pre-wrap select-all leading-relaxed">{promptText}</div>
          <p className="text-xs text-zinc-600 mt-3">{t.copyHint}</p>
        </div>
        <button onClick={reset} className="mt-4 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">← {t.back}</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="px-6 pt-7 pb-4">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-zinc-500 tracking-widest uppercase">{t.appName}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-600">{t.step} {currentStep + 1} {t.of} {STEPS.length}</span>
              <LangBar />
            </div>
          </div>
          <div className="h-0.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {currentStep > 0 && (
        <div className="px-6 pb-2">
          <div className="max-w-xl mx-auto flex gap-2 flex-wrap">
            {STEPS.slice(0, currentStep).map((s, i) => (
              <button key={s.id} onClick={() => setCurrentStep(i)}
                className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 transition-colors">
                {answers[s.id] ? getLabel(s.id, answers[s.id]) : s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex items-start justify-center px-6 pt-8">
        <div className="w-full max-w-xl">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-zinc-100 mb-2 leading-snug">{step.title}</h1>
            <p className="text-sm text-zinc-500">{step.subtitle}</p>
          </div>

          {step.type === "grid" && (
            <div className="grid grid-cols-3 gap-2">
              {step.options.map(opt => (
                <button key={opt.value} onClick={() => handleSelect(opt.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-150
                    ${answers[step.id] === opt.value ? "border-emerald-500 bg-emerald-500/10 text-emerald-300" : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 hover:bg-zinc-800"}`}>
                  <span className="text-2xl">{opt.icon}</span>
                  <span className="text-xs font-medium text-center leading-tight">{opt.label}</span>
                </button>
              ))}
            </div>
          )}

          {step.type === "list" && (
            <div className="space-y-2">
              {step.options.map(opt => (
                <button key={opt.value} onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-150 text-left
                    ${answers[step.id] === opt.value ? "border-emerald-500 bg-emerald-500/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800"}`}>
                  <div>
                    <div className={`text-sm font-medium ${answers[step.id] === opt.value ? "text-emerald-300" : "text-zinc-200"}`}>{opt.label}</div>
                    {opt.sub && <div className="text-xs text-zinc-500 mt-0.5">{opt.sub}</div>}
                  </div>
                  {answers[step.id] === opt.value && <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 ml-4" />}
                </button>
              ))}
            </div>
          )}

          {step.type === "multiselect" && (
            <div>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {step.options.map(opt => {
                  const selected = (answers[step.id] || []).includes(opt.value);
                  return (
                    <button key={opt.value} onClick={() => toggleMulti(step.id, opt.value)}
                      className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-150 text-left
                        ${selected ? "border-emerald-500 bg-emerald-500/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800"}`}>
                      <span className="text-xl mt-0.5">{opt.icon}</span>
                      <div>
                        <div className={`text-sm font-medium leading-tight ${selected ? "text-emerald-300" : "text-zinc-200"}`}>{opt.label}</div>
                        <div className="text-xs text-zinc-500 mt-0.5 leading-snug">{opt.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-zinc-600">{t.specificHint}</p>
                <button onClick={handleSubmit} disabled={!(answers[step.id] || []).length}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all
                    ${(answers[step.id] || []).length ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}`}>
                  {t.briefBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-5">
        <div className="max-w-xl mx-auto flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-zinc-600 mr-1">{t.teamLabel}</span>
          {t.teamMembers.map(m => (
            <span key={m} className="text-xs px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
