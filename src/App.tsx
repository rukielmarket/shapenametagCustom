import { useEffect, useMemo, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { colors } from './data/colors';
import { shapeParts as parts, shapes } from './data/shapes';
import ProductPreview from './components/product-preview/ProductPreview';
const shapeForPath = (path: string) => shapes.find((shape) => path.toLowerCase().includes(shape.slug)) ?? shapes[0];
const pathForShape = (slug: string, count: number) => {
  const firstPathPart = window.location.pathname.split('/').filter(Boolean)[0] ?? '';
  const prefix = shapes.some((shape) => shape.slug === firstPathPart) ? '' : (firstPathPart ? `/${firstPathPart}` : '');
  return `${prefix}/${slug}${count === 3 ? '?length=3' : ''}`;
};

export default function App() {
  const [activeShape, setActiveShape] = useState(() => shapeForPath(window.location.pathname));
  const [modelId, setModelId] = useState<string>(() => new URLSearchParams(window.location.search).get('length') === '3' ? shapeForPath(window.location.pathname).models[1].id : shapeForPath(window.location.pathname).models[0].id);
  const [selectedPartId, setSelectedPartId] = useState('background');
  const [partColors, setPartColors] = useState<Record<string, string>>({ background: 'white', letter: 'pink' });
  const [previewBackground, setPreviewBackground] = useState<'white' | 'black'>('white');
  const model = activeShape.models.find((item) => item.id === modelId) ?? activeShape.models[0];
  const colorLabel = useMemo(() => colors.find((color) => color.id === partColors[selectedPartId])?.name ?? '', [partColors, selectedPartId]);

  useEffect(() => {
    const queryRoute = new URLSearchParams(window.location.search).get('route');
    if (queryRoute) {
      const count = queryRoute.endsWith('/3') || queryRoute.endsWith('?length=3') ? 3 : 2;
      const shape = shapeForPath(queryRoute);
      window.history.replaceState({}, '', pathForShape(shape.slug, count));
      setActiveShape(shape);
      setModelId(shape.models[count === 3 ? 1 : 0].id);
    }
    const onPopState = () => {
      const shape = shapeForPath(window.location.pathname);
      const count = new URLSearchParams(window.location.search).get('length') === '3' ? 3 : 2;
      setActiveShape(shape);
      setModelId(shape.models[count === 3 ? 1 : 0].id);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const selectShape = (shape: typeof shapes[number]) => {
    setActiveShape(shape);
    setModelId(shape.models[0].id);
    window.history.pushState({}, '', pathForShape(shape.slug, 2));
  };
  const selectModel = (id: string) => {
    setModelId(id);
    window.history.pushState({}, '', pathForShape(activeShape.slug, id.endsWith('-3') ? 3 : 2));
  };
  const visibleColors = colors;

  return <main className="app-shell" id="top">
    <header className="topbar">
      <a className="brand" href="/" aria-label="컬러 스튜디오 홈"><span className="brand-mark">✳</span><span>COLOR <b>STUDIO</b></span></a>
      <div className="topbar-center"><span className="live-dot" /> SHAPE NAME TAG <span className="topbar-divider">/</span> 3D COLOR STUDIO</div>
    </header>

    <nav className="shape-tabs" aria-label="네임택 모양 선택">{shapes.map((shape) => <a key={shape.id} href={pathForShape(shape.slug, 2)} className={`shape-tab ${shape.id === activeShape.id ? 'active' : ''}`} aria-current={shape.id === activeShape.id ? 'page' : undefined} onClick={(event) => { event.preventDefault(); selectShape(shape); }}><span className="shape-tab-icon">{shape.emoji}</span><span>{shape.label}</span></a>)}</nav>

    <section className="workspace">
      <div className="preview-column">
        <div className="section-heading preview-heading"><div><span className="eyebrow">{activeShape.label.toUpperCase()} NAME TAG</span><h1>나만의 컬러를 조합해보세요 🎨</h1></div></div>
        <div className="preview-card">
          <div className="preview-card-top"><span>3D OBJECT VIEWER</span><div className="preview-toolbar"><div className="background-picker"><span className="background-toggle-label">화면 배경</span><div className="background-toggle" role="group" aria-label="미리보기 배경색"><button type="button" className={previewBackground === 'white' ? 'active' : ''} onClick={() => setPreviewBackground('white')} aria-pressed={previewBackground === 'white'}><i className="background-swatch light" />밝은색</button><button type="button" className={previewBackground === 'black' ? 'active' : ''} onClick={() => setPreviewBackground('black')} aria-pressed={previewBackground === 'black'}><i className="background-swatch dark" />어두운색</button></div></div></div></div>
          <ProductPreview model={model} parts={parts} partColors={partColors} productId="shape-name-tag" backgroundColor={previewBackground === 'black' ? '#493b52' : '#ffffff'} hideIcon={false} />
          <div className="preview-card-bottom"><div><strong>{activeShape.label} 네임택 · {model.label}</strong></div><div className="mini-swatches">{parts.map((part) => <span key={part.id} title={`${part.label}: ${partColors[part.id]}`} style={{ backgroundColor: colors.find((c) => c.id === partColors[part.id])?.hex }} />)}</div></div>
        </div>
        <div className="preview-caption"><span><span className="caption-star">✳</span> 미리보기용 이미지로, 실제 상품과 컬러가 다를 수 있습니다.</span></div>
      </div>

      <aside className="controls-column">
        <section className="control-section model-section"><div className="control-title"><span className="step-number">01</span><div><h2>글자 수 선택</h2><p>원하는 글자 수의 네임택을 선택해 주세요.</p></div></div><div className="model-options" role="group" aria-label="글자 수 선택">{activeShape.models.map((item, index) => <button key={item.id} type="button" className={`model-option ${model.id === item.id ? 'selected' : ''}`} onClick={() => selectModel(item.id)} aria-pressed={model.id === item.id}><span className="part-index">0{index + 1}</span><span>{item.label}</span>{model.id === item.id && <ChevronRight size={15} className="part-chevron" />}</button>)}</div></section>
        <section className="control-section part-section"><div className="control-title"><span className="step-number">02</span><div><h2>색상 파츠 선택</h2><p>색을 바꿀 부분을 선택해 주세요.</p></div></div><div className="part-options">{parts.map((part, index) => <button key={part.id} className={`part-option ${selectedPartId === part.id ? 'selected' : ''}`} onClick={() => setSelectedPartId(part.id)} aria-pressed={selectedPartId === part.id}><span className="part-index">0{index + 1}</span><span>{part.label}<small>컬러</small></span><span className="part-color-preview" style={{ background: colors.find((color) => color.id === partColors[part.id])?.hex }} />{selectedPartId === part.id && <ChevronRight size={15} className="part-chevron" />}</button>)}</div></section>
        <section className="control-section color-section"><div className="color-heading"><div className="control-title"><span className="step-number">03</span><div><h2>컬러 선택</h2><p>적용할 컬러를 골라주세요.</p></div></div><span className="selected-color-label">{colorLabel}</span></div><div className="color-grid">{visibleColors.map((color) => <button key={color.id} className={`color-option ${partColors[selectedPartId] === color.id ? 'selected' : ''} ${color.id === 'white' ? 'is-white' : ''}`} onClick={() => setPartColors((current) => ({ ...current, [selectedPartId]: color.id }))} aria-label={`${color.name} ${color.hex}`} aria-pressed={partColors[selectedPartId] === color.id}><span className="color-swatch" style={{ backgroundColor: color.hex }}>{partColors[selectedPartId] === color.id && <span className="swatch-check">✓</span>}</span><span className="color-name">{color.name}</span></button>)}</div></section>
        <p className="controls-footnote"><span>✳</span> 배경과 글씨 컬러를 자유롭게 조합해 보세요.</p>
      </aside>
    </section>
    <footer className="site-footer"><span>© 2026 RUKIELMARKET</span><span>SHAPE NAME TAG COLOR STUDIO</span></footer>
  </main>;
}
