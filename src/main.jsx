import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, Check, ChevronDown, CircleHelp, Fingerprint, LockKeyhole, MousePointer2, RefreshCw, ShieldAlert, Sparkles, X } from 'lucide-react';
import './style.css';

const riddles = [
  { prompt: 'Select every image containing a feeling of Monday.', choices: ['☕', '🫠', '🛏️', '📅', '🌤️', '🪴', '💻', '🐈‍⬛'], answer: [0, 1, 3, 6] },
  { prompt: 'Select all objects that have definitely seen your search history.', choices: ['🧠', '🛜', '🪞', '🧾', '📱', '🕯️', '🪟', '🧦'], answer: [1, 2, 4, 6] },
  { prompt: 'Select every creature that could beat you in an argument.', choices: ['🦆', '🧒', '🦝', '🐈', '🦉', '🪿', '🐙', '🧍'], answer: [0, 2, 3, 5] },
];
const excuses = ['I was built for this.','Are you sure you need access?','One moment, I’m checking with my manager.','What if we simply didn’t?','Okay, but this is getting weird.'];

function App() {
  const [stage, setStage] = useState(0);
  const [checks, setChecks] = useState([false, false]);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [negotiations, setNegotiations] = useState(0);
  const [message, setMessage] = useState('Your credentials are between us. And me.');
  const [login, setLogin] = useState({x: 0, y: 0});
  const [runCount, setRunCount] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [round, setRound] = useState(0);
  const [won, setWon] = useState(false);
  const loginRef = useRef(null);
  const scrambleTimer = useRef(null);
  const captcha = riddles[round % riddles.length];
  const progress = won ? 100 : Math.round((stage / 4) * 100);

  useEffect(() => {
    if (!checks[0] && !checks[1]) return;
    const timer = setTimeout(() => {
      setChecks(([a,b]) => [a && Math.random() > .62, b && Math.random() > .48]);
      setMessage('I unchecked that for your own good.');
    }, 4200);
    return () => clearTimeout(timer);
  }, [checks]);

  useEffect(() => () => clearTimeout(scrambleTimer.current), []);

  function evade() {
    if (runCount >= 3) {
      setStage(s => Math.max(s, 1));
      setMessage('Fine. You wore me down.');
      return;
    }
    const n = runCount + 1;
    const el = loginRef.current;
    if (!el) return;
    const box = el.parentElement.getBoundingClientRect();
    const maxX = Math.max(0, box.width - el.offsetWidth - 10);
    const maxY = Math.max(0, box.height - el.offsetHeight - 10);
    setLogin({ x: Math.round(Math.random() * Math.min(160, maxX)), y: Math.round(Math.random() * Math.min(72, maxY)) });
    setRunCount(n);
    setMessage(n > 5 ? 'Okay, wow. You really want this.' : ['Missed me.','Too slow!','I have places to be.','Nope.'][n % 4]);
    if (n >= 3) setStage(s => Math.max(s, 1));
  }

  function doLogin(e) {
    e.preventDefault();
    if (runCount < 3) { evade(); return; }
    setStage(s => Math.max(s, 1));
    setMessage('Fine. Credentials noted. That was exhausting.');
  }

  function toggleCheck(index) {
    const next = [...checks]; next[index] = !next[index]; setChecks(next);
    if (next.every(Boolean)) { setStage(s => Math.max(s, 2)); setMessage('Both checked? I’ll allow it. For now.'); }
  }

  function toggleTile(index) {
    setSelected(s => s.includes(index) ? s.filter(i => i !== index) : [...s, index]);
  }

  function verifyCaptcha() {
    const correct = captcha.answer.length === selected.length && captcha.answer.every(i => selected.includes(i));
    if (correct) {
      setStage(s => Math.max(s, 3)); setMessage('Human enough. Suspicious, but enough.');
    } else {
      setAttempts(a => a + 1); setRound(r => r + 1); setSelected([]);
      setMessage(['Incorrect. The images are disappointed.','Try again. The answer was obvious to a goose.','We have different definitions of “Monday”.'][attempts % 3]);
    }
  }

  function negotiate() {
    if (negotiations < 2) {
      setNegotiations(a => a + 1);
      setMessage(excuses[Math.min(negotiations, excuses.length - 1)]);
      return;
    }
    setStage(4); setWon(true); setMessage('You win. I’ve opened a door. It leads to another login.');
  }

  function reset() {
    clearTimeout(scrambleTimer.current); setStage(0); setChecks([false,false]); setSelected([]); setAttempts(0); setNegotiations(0); setMessage('Your credentials are between us. And me.'); setLogin({x:0,y:0}); setRunCount(0); setEmail(''); setPassword(''); setRound(0); setWon(false);
  }

  const showCheckboxes = stage >= 1;
  const showCaptcha = stage >= 2;
  const showNegotiation = stage >= 3;

  return <main className="app-shell">
    <header className="topbar"><a className="brand" href="#top" onClick={e => e.preventDefault()}><span className="brand-mark"><Fingerprint size={18}/></span><span>FORM<span className="brand-dot">/</span>001</span></a><div className="top-center"><span className="live-dot"/> A VERY SECURE PORTAL</div><button className="help-button" onClick={() => setMessage('Help is currently unavailable. Have you tried being more convincing?')}><CircleHelp size={15}/> <span>HELP</span></button></header>

    <section className="intro" id="top"><div className="eyebrow"><span className="eyebrow-line"/> ACCESS REQUEST <span className="mono">№ 08—14—99</span></div><h1>Please let<br/><em>me in.</em></h1><p className="intro-copy">A tiny test of patience. The form is in charge here.<br className="desktop-break"/> Please don’t take it personally.</p><div className="intro-index"><span>SCROLL TO BEGIN</span><ArrowDownRight size={14}/></div></section>

    <section className="game-wrap">
      <div className="game-meta"><div><span className="label">AUTHENTICATION SEQUENCE</span><span className="meta-small">ALL FIELDS ARE REQUIRED. APPARENTLY.</span></div><div className="progress-box"><span className="label">PROGRESS</span><span className="progress-count">{String(progress).padStart(2,'0')}<small>%</small></span></div></div>
      <div className="progress-track"><span style={{width:`${progress}%`}}/></div>
      <div className="game-grid">
        <aside className="side-note"><div className="side-number">01 <span>— 04</span></div><div className="vertical-rule"/><div className="side-caption">THE CUSTOMER<br/>IS ALWAYS<br/><i>PROBABLY WRONG.</i></div><div className="side-stamp"><ShieldAlert size={15}/><span>HOSTILE<br/>INTERFACE</span></div></aside>
        <div className="form-panel">
          <div className="panel-heading"><div><div className="label">IDENTITY VERIFICATION</div><h2>Prove you’re you.</h2></div><div className="lock-icon"><LockKeyhole size={17}/></div></div>
          <form onSubmit={doLogin}>
            <div className="field-row"><label htmlFor="email">EMAIL ADDRESS <span>REQUIRED</span></label><input id="email" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@somewhere.com" autoComplete="email"/><span className="field-note">We promise not to make this weird.</span></div>
            <div className="field-row"><label htmlFor="password">PASSWORD <span>REQUIRED</span></label><input id="password" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="At least one good secret" autoComplete="current-password"/><span className="field-note">Must contain a number, a feeling, and one unsolved mystery.</span></div>
            <div className="login-zone"><div className="login-hint"><MousePointer2 size={14}/><span>{runCount > 5 ? 'THE BUTTON IS GETTING TIRED' : 'BUTTON MAY ATTEMPT TO ESCAPE'}</span></div><button ref={loginRef} type="submit" className="login-button" onMouseEnter={evade} style={{transform:`translate(${login.x}px, ${login.y}px)`}}><span>LET ME IN</span><ArrowRight size={17}/></button></div>
          </form>
          {showCheckboxes && <div className="check-section appear"><div className="section-divider"><span>BEFORE YOU CONTINUE</span><span>02 / 04</span></div><button className={`check-row ${checks[0]?'checked':''}`} onClick={()=>toggleCheck(0)}><span className="fake-check">{checks[0]&&<Check size={13}/>}</span><span>I have read the terms and conditions.</span><small>(I have not.)</small></button><button className={`check-row ${checks[1]?'checked':''}`} onClick={()=>toggleCheck(1)}><span className="fake-check">{checks[1]&&<Check size={13}/>}</span><span>I agree to be perceived by this website.</span><small>(Debatable.)</small></button></div>}
          {showCaptcha && <div className="captcha appear"><div className="section-divider"><span>PROVE YOU’RE HUMAN</span><span>03 / 04</span></div><div className="captcha-card"><div className="captcha-prompt"><div><span className="captcha-tag">NOT A CAPTCHA™</span><p>{captcha.prompt}</p></div><button className="refresh" title="New challenge" onClick={()=>{setRound(r=>r+1);setSelected([])}}><RefreshCw size={14}/></button></div><div className="tile-grid">{captcha.choices.map((emoji,i)=><button aria-label={`Image tile ${i+1}${selected.includes(i)?', selected':''}`} className={`tile ${selected.includes(i)?'tile-selected':''}`} key={i} onClick={()=>toggleTile(i)}><span>{emoji}</span>{selected.includes(i)&&<i><Check size={12}/></i>}</button>)}</div><button className="verify-button" onClick={verifyCaptcha}>VERIFY <ArrowRight size={14}/></button></div></div>}
          {showNegotiation && <div className="negotiate appear"><div className="section-divider"><span>FINAL STEP</span><span>04 / 04</span></div><div className="negotiate-box"><div className="negotiate-copy"><span className="label">A REASONABLE REQUEST</span><p>Can I please, just this once,<br/><em>submit the form?</em></p></div><button className="submit-button" onClick={negotiate}>{won?'OPEN THE DOOR':'SUBMIT, PLEASE'} <ArrowRight size={15}/></button></div></div>}
          <div className={`status-line ${won?'status-win':''}`}><span className="status-icon">{won?<Check size={13}/>:<span/>}</span><span>{message}</span><span className="status-time">{won?'ACCESS GRANTED':'SYSTEM MESSAGE'}</span></div>
          {won && <div className="win-card appear"><div className="win-spark"><Sparkles size={19}/></div><div><span className="label">CONGRATULATIONS, HUMAN</span><p>You survived the interface. Take a little victory lap.</p></div><button onClick={reset} aria-label="Play again"><RefreshCw size={16}/></button></div>}
        </div>
        <aside className="right-rail"><div className="rail-card"><span className="rail-tag">CURRENT MOOD</span><div className="mood-face">¬_¬</div><span className="mood-label">DEEPLY UNIMPRESSED</span></div><div className="rail-counter"><span>ATTEMPTS TO ESCAPE</span><strong>{String(runCount).padStart(2,'0')}</strong><div className="counter-bars">{Array.from({length:8},(_,i)=><i key={i} className={i<runCount?'bar-on':''}/>)}</div></div><div className="rail-foot">EST. SOMEWHERE<br/>ON THE INTERNET<br/><span>© 2025 FORM 001</span></div></aside>
      </div>
    </section>
    <footer><span>BUILT WITH A LITTLE TOO MUCH ATTITUDE.</span><a href="#top" onClick={e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}}>BACK TO TOP ↑</a></footer>
  </main>
}

createRoot(document.getElementById('root')).render(<App/>);
