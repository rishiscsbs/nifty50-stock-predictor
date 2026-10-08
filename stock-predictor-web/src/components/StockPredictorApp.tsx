"use client";

import { useCallback, useMemo, useState } from "react";
import { ReportFigure } from "@/components/ReportFigure";
import { TerminalBanner, TerminalBlock, TerminalLine } from "@/components/TerminalBlock";
import {
  ARCHITECTURE_LAYERS,
  CLASSIFICATION_MODELS,
  DATASET_PREVIEW,
  FULL_ML_STUDY,
  MENU_OPTIONS,
  PREDICTIONS,
  PROJECT,
  REGRESSION_MODELS,
  REPORT_FIGURES,
  STOCK_INFO,
} from "@/lib/mockData";

type MenuId = (typeof MENU_OPTIONS)[number]["id"];

export function StockPredictorApp() {
  const [choice, setChoice] = useState<MenuId | null>(null);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [downloaded, setDownloaded] = useState(false);
  const [trained, setTrained] = useState(false);
  const [studyDone, setStudyDone] = useState(false);

  const appendLog = useCallback((line: string) => {
    setLogs((prev) => [...prev.slice(-40), line]);
  }, []);

  const runAction = useCallback(
    (id: MenuId) => {
      setChoice(id);
      appendLog(`Enter your choice (1-10): ${id}`);

      if (id === 1) {
        appendLog("[+] Downloading NIFTY 50 OHLCV from Yahoo Finance (^NSEI)...");
        setTimeout(() => {
          setDownloaded(true);
          appendLog("[+] Saved to nifty50_data.csv (3601 rows).");
        }, 600);
      }
      if (id === 4) {
        appendLog("[*] Training regression models (Iteration 1)...");
        setTimeout(() => {
          setTrained(true);
          appendLog("[+] Model training completed successfully.");
        }, 900);
      }
      if (id === 9) {
        appendLog("[+] Iteration 1: baseline models on the original feature set...");
        appendLog("[+] Iteration 2: stationary features, regimes, ensembles, MLP, walk-forward CV...");
        setTimeout(() => {
          setStudyDone(true);
          appendLog("[+] Figures and tables saved in the 'results' folder.");
        }, 1200);
      }
    },
    [appendLog],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(input.trim());
    if (!Number.isInteger(n) || n < 1 || n > 10) return;
    if (n === 10) {
      appendLog("Thank you for using Stock Market Predictor. Goodbye!");
      setChoice(10);
      setInput("");
      return;
    }
    runAction(n as MenuId);
    setInput("");
  };

  const panel = useMemo(() => {
    if (choice === null) return null;
    if (choice === 10) {
      return (
        <TerminalBlock>
          <TerminalLine kind="ok">Session ended. Refresh the page to restart the CLI mock.</TerminalLine>
        </TerminalBlock>
      );
    }

    switch (choice) {
      case 1:
        return (
          <TerminalBlock>
            <TerminalBanner title="DOWNLOAD STOCK DATA" />
            <TerminalLine kind={downloaded ? "ok" : "info"}>
              {downloaded
                ? "[+] nifty50_data.csv refreshed — 3,601 trading days ready."
                : "[*] Fetching ^NSEI daily bars (mock — no live API in this frontend-only demo)..."}
            </TerminalLine>
            <ReportFigure {...REPORT_FIGURES.dataset} />
          </TerminalBlock>
        );
      case 2:
        return (
          <TerminalBlock>
            <TerminalBanner title="DATASET PREVIEW (FIRST 10 ROWS)" />
            <pre className="overflow-x-auto text-xs text-zinc-200">
              {`Date         Open      High       Low     Close        Volume`}
              {DATASET_PREVIEW.map(
                (r) =>
                  `\n${r.date}  ${r.open.toFixed(2).padStart(8)}  ${r.high.toFixed(2).padStart(8)}  ${r.low.toFixed(2).padStart(8)}  ${r.close.toFixed(2).padStart(8)}  ${r.volume.toFixed(1).padStart(14)}`,
              ).join("")}
            </pre>
            <p className="my-2 text-zinc-500">{"-".repeat(56)}</p>
            <TerminalLine>Rows : {PROJECT.rows}</TerminalLine>
            <TerminalLine>Columns : {PROJECT.columns}</TerminalLine>
            <TerminalLine>Column Names : {PROJECT.columnNames.join(", ")}</TerminalLine>
            <TerminalLine>Missing Values : {PROJECT.missingValues}</TerminalLine>
            <TerminalLine>Dataset Location : {PROJECT.datasetLocation}</TerminalLine>
            <ReportFigure {...REPORT_FIGURES.dataset} />
          </TerminalBlock>
        );
      case 3:
        return (
          <TerminalBlock>
            <TerminalBanner title="VISUALIZE DATASET" />
            <TerminalLine kind="info">
              Charts from the PBL report (price, regimes, evaluation, ROC, bias–variance, actual vs predicted).
            </TerminalLine>
            <ReportFigure {...REPORT_FIGURES.regime} />
            <ReportFigure {...REPORT_FIGURES.holdout} />
            <ReportFigure {...REPORT_FIGURES.roc} />
            <ReportFigure {...REPORT_FIGURES.biasVariance} />
            <ReportFigure {...REPORT_FIGURES.actualVsPredicted} />
          </TerminalBlock>
        );
      case 4:
        return (
          <TerminalBlock>
            <TerminalBanner title="TRAIN MODELS (ITERATION 1)" />
            {!trained ? (
              <TerminalLine kind="warn">[*] Training in progress… select again or wait.</TerminalLine>
            ) : (
              <>
                <TerminalLine kind="ok">[+] Linear Regression (MAE = 154.87)</TerminalLine>
                <TerminalLine kind="ok">[+] Decision Tree Regressor (MAE = 4158.78)</TerminalLine>
                <TerminalLine kind="ok">[+] Random Forest Regressor (MAE = 3966.13)</TerminalLine>
                <TerminalLine kind="ok">[+] Saved saved_regression_model.pkl, saved_classification_model.pkl</TerminalLine>
              </>
            )}
            <ReportFigure {...REPORT_FIGURES.training} />
          </TerminalBlock>
        );
      case 5:
        return (
          <TerminalBlock>
            <TerminalBanner title="COMPARE MODELS" />
            <p className="mb-2 font-semibold text-cyan-300">Regression Models (Price Prediction)</p>
            <table className="mb-4 w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-600 text-zinc-400">
                  <th className="py-1 pr-2">#</th>
                  <th className="py-1 pr-2">Model</th>
                  <th className="py-1 pr-2">MAE</th>
                  <th className="py-1 pr-2">RMSE</th>
                  <th className="py-1">R²</th>
                </tr>
              </thead>
              <tbody>
                {REGRESSION_MODELS.map((m, i) => (
                  <tr key={m.name} className="border-b border-zinc-800">
                    <td className="py-1 pr-2">{i + 1}</td>
                    <td className="py-1 pr-2">{m.name}</td>
                    <td className="py-1 pr-2">{m.mae.toFixed(2)}</td>
                    <td className="py-1 pr-2">{m.rmse.toFixed(2)}</td>
                    <td className="py-1">{m.r2.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mb-2 font-semibold text-cyan-300">Classification Models (Trend Prediction)</p>
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-600 text-zinc-400">
                  <th className="py-1 pr-2">#</th>
                  <th className="py-1 pr-2">Model</th>
                  <th className="py-1 pr-2">Acc</th>
                  <th className="py-1 pr-2">Prec</th>
                  <th className="py-1 pr-2">Recall</th>
                  <th className="py-1">F1</th>
                </tr>
              </thead>
              <tbody>
                {CLASSIFICATION_MODELS.map((m, i) => (
                  <tr
                    key={m.name}
                    className={`border-b border-zinc-800 ${m.best ? "bg-cyan-950/50 text-cyan-200" : ""}`}
                  >
                    <td className="py-1 pr-2">{i + 1}</td>
                    <td className="py-1 pr-2">{m.name}{m.best ? " [BEST]" : ""}</td>
                    <td className="py-1 pr-2">{m.accuracy.toFixed(4)}</td>
                    <td className="py-1 pr-2">{m.precision.toFixed(4)}</td>
                    <td className="py-1 pr-2">{m.recall.toFixed(4)}</td>
                    <td className="py-1">{m.f1.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2">
              <TerminalLine kind="info">
                [BEST CLASSIFIER]: Logistic Regression (Iteration 1 split). Full study selects Random Forest.
              </TerminalLine>
            </p>
            <ReportFigure {...REPORT_FIGURES.training} />
          </TerminalBlock>
        );
      case 6:
        return (
          <TerminalBlock>
            <TerminalBanner title="PREDICT FUTURE STOCK PRICE" />
            <TerminalLine>Selected Model : {PREDICTIONS.price.model}</TerminalLine>
            <TerminalLine>Data Available Up To : {PREDICTIONS.price.dataUpTo}</TerminalLine>
            <TerminalLine>Prediction Date : {PREDICTIONS.price.predictionDate}</TerminalLine>
            <TerminalLine kind="info">
              Predicted Closing Price : {PREDICTIONS.price.predictedClose.toLocaleString("en-IN", { minimumFractionDigits: 2 })} pts
            </TerminalLine>
            <ReportFigure {...REPORT_FIGURES.prediction} />
            <ReportFigure {...REPORT_FIGURES.actualVsPredicted} />
          </TerminalBlock>
        );
      case 7:
        return (
          <TerminalBlock>
            <TerminalBanner title="PREDICT TOMORROW TREND" />
            <TerminalLine>Selected Classifier : {PREDICTIONS.trend.model}</TerminalLine>
            <TerminalLine>Data Available Up To : {PREDICTIONS.trend.dataUpTo}</TerminalLine>
            <TerminalLine>Prediction Date : {PREDICTIONS.trend.predictionDate}</TerminalLine>
            <TerminalLine kind="info">Tomorrow&apos;s Trend : {PREDICTIONS.trend.trend}</TerminalLine>
            <TerminalLine>
              P(UP) / P(DOWN) : {PREDICTIONS.trend.pUp.toFixed(2)}% / {PREDICTIONS.trend.pDown.toFixed(2)}%
            </TerminalLine>
            <TerminalLine>Confidence : {PREDICTIONS.trend.confidence.toFixed(2)}%</TerminalLine>
            <p className="my-2 text-zinc-500">{"-".repeat(56)}</p>
            <TerminalLine kind="warn">{PREDICTIONS.trend.disclaimer}</TerminalLine>
            <ReportFigure {...REPORT_FIGURES.prediction} />
            <ReportFigure {...REPORT_FIGURES.confusion} />
          </TerminalBlock>
        );
      case 8:
        return (
          <TerminalBlock>
            <TerminalBanner title="STOCK INFORMATION" />
            <TerminalLine>Symbol : {STOCK_INFO.symbol}</TerminalLine>
            <TerminalLine>Name : {STOCK_INFO.name}</TerminalLine>
            <TerminalLine>Exchange : {STOCK_INFO.exchange}</TerminalLine>
            <TerminalLine>Type : {STOCK_INFO.type}</TerminalLine>
            <TerminalLine>Currency : {STOCK_INFO.currency}</TerminalLine>
            <TerminalLine>Data Source : {STOCK_INFO.dataSource}</TerminalLine>
            <TerminalLine>Date Range : {PROJECT.dateRange.from} → {PROJECT.dateRange.to}</TerminalLine>
            <TerminalLine>Train / Hold-out : {PROJECT.trainPeriod.days} / {PROJECT.holdoutPeriod.days} days</TerminalLine>
            <TerminalLine>UP-day share (train / hold-out) : {PROJECT.upShareTrain} / {PROJECT.upShareHoldout}</TerminalLine>
            <TerminalLine>Iteration 1 features : {STOCK_INFO.featuresIteration1}</TerminalLine>
            <TerminalLine>Iteration 2 features : {STOCK_INFO.featuresIteration2}</TerminalLine>
            <TerminalLine>Labelled days : {STOCK_INFO.labeledDays}</TerminalLine>
            <TerminalLine>Live row : {STOCK_INFO.livePredictionDay}</TerminalLine>
            <ReportFigure {...REPORT_FIGURES.architecture} />
          </TerminalBlock>
        );
      case 9:
        return (
          <TerminalBlock>
            <TerminalBanner title="FULL ML STUDY — NIFTY 50 NEXT-DAY DIRECTION" />
            <TerminalLine>
              Train: {PROJECT.trainPeriod.from} to {PROJECT.trainPeriod.to} ({PROJECT.trainPeriod.days} days)
            </TerminalLine>
            <TerminalLine>
              Hold-out: {PROJECT.holdoutPeriod.from} to {PROJECT.holdoutPeriod.to} ({PROJECT.holdoutPeriod.days} days)
            </TerminalLine>
            {!studyDone && <TerminalLine kind="warn">[*] Running walk-forward CV and significance tests (mock)…</TerminalLine>}
            <table className="my-3 w-full border-collapse text-left text-[11px]">
              <thead>
                <tr className="border-b border-zinc-600 text-zinc-400">
                  <th className="py-1 pr-1">Model</th>
                  <th className="py-1 pr-1">CV AUC</th>
                  <th className="py-1 pr-1">Test Acc</th>
                  <th className="py-1 pr-1">Bal Acc</th>
                  <th className="py-1 pr-1">F1</th>
                  <th className="py-1 pr-1">MCC</th>
                  <th className="py-1">Test AUC</th>
                </tr>
              </thead>
              <tbody>
                {FULL_ML_STUDY.map((row) => (
                  <tr
                    key={row.model}
                    className={`border-b border-zinc-800 ${row.selected ? "bg-cyan-950/60 text-cyan-100" : ""}`}
                  >
                    <td className="py-1 pr-1">{row.model}{row.selected ? " *" : ""}</td>
                    <td className="py-1 pr-1">{row.cvAuc.toFixed(4)}</td>
                    <td className="py-1 pr-1">{row.testAcc}</td>
                    <td className="py-1 pr-1">{row.balAcc}</td>
                    <td className="py-1 pr-1">{row.f1}</td>
                    <td className="py-1 pr-1">{row.mcc}</td>
                    <td className="py-1">{row.testAuc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <TerminalLine kind="info">* Selected by walk-forward CV ROC-AUC: Random Forest</TerminalLine>
            <TerminalLine kind="info">Bootstrap 95% CI of hold-out accuracy: {PROJECT.bootstrapCi}</TerminalLine>
            <TerminalLine kind="info">McNemar vs majority baseline: {PROJECT.mcnemar}</TerminalLine>
            {studyDone && <TerminalLine kind="ok">[+] Figures and tables saved in the &apos;results&apos; folder.</TerminalLine>}
            <ReportFigure {...REPORT_FIGURES.mlStudy} />
            <ReportFigure {...REPORT_FIGURES.regime} />
            <ReportFigure {...REPORT_FIGURES.holdout} />
            <ReportFigure {...REPORT_FIGURES.confusion} />
            <ReportFigure {...REPORT_FIGURES.roc} />
            <ReportFigure {...REPORT_FIGURES.biasVariance} />
          </TerminalBlock>
        );
      default:
        return null;
    }
  }, [choice, downloaded, studyDone, trained]);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-6 lg:flex-row">
      <aside className="lg:w-72 lg:shrink-0">
        <div className="sticky top-4 rounded-xl border border-zinc-700 bg-zinc-900/90 p-4 shadow-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">PBL Report Mock</p>
          <h1 className="mt-1 text-lg font-bold text-white">NIFTY 50 ML Predictor</h1>
          <p className="mt-1 text-xs text-zinc-400">
            Predictive Analysis of Stock Prices — frontend-only CLI replica (Srijith &amp; Rishi)
          </p>
          <nav className="mt-4 flex flex-col gap-1">
            {MENU_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => runAction(opt.id)}
                className={`rounded-md px-2 py-1.5 text-left text-sm transition ${
                  choice === opt.id
                    ? "bg-cyan-900/60 text-cyan-100 ring-1 ring-cyan-600"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <span className="text-zinc-500">{opt.id}.</span> {opt.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="overflow-hidden rounded-xl border border-zinc-700 bg-[#0c0c0e] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-red-500/90" />
            <span className="h-3 w-3 rounded-full bg-amber-400/90" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
            <span className="ml-2 truncate text-xs text-zinc-400">
              Stock Market Predictor CLI — python main.py (Next.js mock)
            </span>
          </div>

          <div className="max-h-[70vh] overflow-y-auto p-4 md:p-6">
            <TerminalBlock>
              <TerminalLine kind="ok">{PROJECT.loadedMessage}</TerminalLine>
              <TerminalBanner title="STOCK MARKET PREDICTOR" />
              {MENU_OPTIONS.map((opt) => (
                <TerminalLine key={opt.id}>
                  <span className="text-zinc-500">{opt.id}.</span> {opt.label}
                </TerminalLine>
              ))}
              <p className="text-zinc-500">{"=".repeat(56)}</p>
              <form onSubmit={handleSubmit} className="mt-2 flex flex-wrap items-center gap-2">
                <label className="text-yellow-300" htmlFor="menu-choice">
                  Enter your choice (1-10):
                </label>
                <input
                  id="menu-choice"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-16 rounded border border-zinc-600 bg-zinc-950 px-2 py-1 text-yellow-300 outline-none focus:border-cyan-500"
                  inputMode="numeric"
                  maxLength={2}
                />
                <button
                  type="submit"
                  className="rounded bg-zinc-700 px-3 py-1 text-xs text-white hover:bg-zinc-600"
                >
                  Run
                </button>
              </form>
            </TerminalBlock>

            {logs.length > 0 && (
              <div className="mt-4 border-t border-zinc-800 pt-3">
                <p className="mb-1 text-xs uppercase text-zinc-500">Session log</p>
                {logs.map((line, i) => (
                  <p key={`${line}-${i}`} className="font-mono text-xs text-zinc-500">{line}</p>
                ))}
              </div>
            )}

            {panel && (
              <div className="mt-6 border-t border-zinc-800 pt-4">
                {panel}
              </div>
            )}
          </div>
        </div>

        <section className="mt-6 rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
          <h2 className="text-sm font-semibold text-white">System architecture (report §4.1)</h2>
          <p className="mt-1 text-xs text-zinc-400">
            End-to-end pipeline: data → features → models → evaluation → CLI output.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ARCHITECTURE_LAYERS.map((layer) => (
              <div key={layer.name} className={`rounded-lg border p-3 ${layer.color}`}>
                <p className="text-xs font-bold text-white">{layer.name}</p>
                <ul className="mt-2 list-disc pl-4 text-[11px] text-zinc-300">
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ReportFigure {...REPORT_FIGURES.architecture} />
          <ReportFigure {...REPORT_FIGURES.mainMenu} />
        </section>
      </main>
    </div>
  );
}
