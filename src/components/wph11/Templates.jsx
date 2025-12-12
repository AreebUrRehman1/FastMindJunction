export function Templates({ section, darkMode }) {

  const templateId = section.id;

  switch (templateId) {
    case 'variables':
      return (
        <div className="grid md:grid-cols-2 gap-4">
          {section.points.map((pt, i) => (
            <div key={i} className={`p-5 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{pt.type}</h3>
              <p className="mb-3 text-sm opacity-90">{pt.def}</p>
              <div className="text-xs font-mono uppercase tracking-wide opacity-60">Examples:</div>
              <div className="font-medium text-sm">{pt.examples}</div>
            </div>
          ))}
        </div>
      );

    case 'goldenRule':
      return (
        <div className="space-y-4">
          <div className={`rounded-xl overflow-hidden divide-y ${darkMode ? 'divide-slate-700 border border-slate-700' : 'divide-slate-200 border border-slate-200'}`}>
            {section.comparison.map((item, i) => (
              <div key={i} className={`p-4 flex flex-col sm:flex-row gap-4 ${darkMode ? 'bg-slate-800/30' : 'bg-white'}`}>
                <span className="font-bold sm:w-1/3 shrink-0">{item.label}</span>
                <span className={`sm:w-2/3 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</span>
              </div>
            ))}
          </div>
          {/* Image Placeholder */}
          {section.imageTag && (
            <div className="flex justify-center mt-4 text-center text-sm italic">
              {section.imageTag}
            </div>
          )}
          <div className={`p-4 rounded-l-md border-l-4 ${darkMode ? 'bg-amber-900/20 border-amber-500 text-amber-200' : 'bg-amber-50 border-amber-500 text-amber-800'}`}>
            <strong className="block uppercase text-xs font-bold tracking-wider mb-1 opacity-70">Golden Rule</strong>
            {section.goldenRule}
          </div>
        </div>
      );

    case 'equations':
      return (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {section.equations.map((eq) => (
              <div key={eq.name} className={`p-5 rounded-xl border text-center ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-sm uppercase tracking-widest opacity-60 mb-2">{eq.type}</div>
                <div className="text-xl font-serif italic mb-2 font-bold tracking-wide">
                  {eq.formula}
                </div>
                <div className="text-xs opacity-50">{eq.name}</div>
              </div>
            ))}
          </div>
          {/* Image Placeholder */}
          {section.imageTag && (
            <div className="flex justify-center mt-4 text-center text-sm italic">
              {section.imageTag}
            </div>
          )}
          <div className={`p-4 rounded-lg text-sm ${darkMode ? 'bg-indigo-900/30 text-indigo-200' : 'bg-indigo-50 text-indigo-800'}`}>
            {section.insight}
          </div>
        </div>
      );

    case 'equationsWithGoldenRule':
      return (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {section.equations.map((eq) => (
              <div key={eq.name} className={`p-5 rounded-xl border text-center ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-sm uppercase tracking-widest opacity-60 mb-2">{eq.type}</div>
                <div className="text-xl font-serif italic mb-2 font-bold tracking-wide">
                  {eq.formula}
                </div>
                <div className="text-xs opacity-50">{eq.name}</div>
              </div>
            ))}
          </div>
          {/* Image Placeholder */}
          {section.imageTag && (
            <div className="flex justify-center mt-4 text-center text-sm italic">
              {section.imageTag}
            </div>
          )}
          <div className={`p-4 rounded-l-md border-l-4 ${darkMode ? 'bg-amber-900/20 border-amber-500 text-amber-200' : 'bg-amber-50 border-amber-500 text-amber-800'}`}>
            <strong className="block uppercase text-xs font-bold tracking-wider mb-1 opacity-70">Golden Rule</strong>
            {section.goldenRule}
          </div>
        </div>
      );

    case 'conceptBreakdown':
      return (
        <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="text-center mb-6">
            <div className="text-3xl font-serif italic font-bold">
              {section.formulaHighlight}
            </div>
            <p className="mt-6 text-sm opacity-60">{section.variablesFullForm}</p>
          </div>
          <ul className="space-y-2">
            {section.conditions.map((cond, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                <span>{cond}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'strategy':
      return (
        <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
          <ul className="space-y-4">
            {section.conditions.map((cond, i) => (
              <li key={i} className="flex items-center gap-x-3 py-1">
                <div className={` w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${darkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}`}>
                  {i + 1}
                </div>
                <span>{cond}</span>
              </li>
            ))}
          </ul>
          {/* Image Placeholder */}
          {section.imageTag && (
            <div className="flex justify-center mt-4 text-center text-sm italic">
              {section.imageTag}
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}