export const PROJECT = {
  title: "Stock Market Predictor",
  index: "NIFTY 50 (^NSEI)",
  datasetFile: "nifty50_data.csv",
  rows: 3601,
  columns: 5,
  columnNames: ["Open", "High", "Low", "Close", "Volume"],
  dateRange: { from: "2012-02-21", to: "2026-09-25" },
  loadedMessage:
    "[+] Loaded 3601 NIFTY 50 trading days from 'nifty50_data.csv' (2012-02-21 to 2026-09-25).",
  datasetLocation:
    "bundled/nifty50_data.csv (offline) · Yahoo Finance via yfinance when online",
  missingValues: 0,
  trainPeriod: { from: "2012-05-02", to: "2023-11-12", days: 2840 },
  holdoutPeriod: { from: "2023-11-13", to: "2026-09-24", days: 711 },
  upShareTrain: "53.9%",
  upShareHoldout: "52.6%",
  selectedClassifier: "Random Forest (walk-forward CV selected)",
  selectedRegressor: "Linear Regression",
  finalCvAuc: 0.554,
  holdoutAccuracy: "52.32%",
  holdoutRocAuc: 0.530,
  bootstrapCi: "48.66% – 55.98%",
  mcnemar: "chi² = 0.004, p = 0.9490",
};

export const MENU_OPTIONS = [
  { id: 1, label: "Download Stock Data" },
  { id: 2, label: "Show Dataset" },
  { id: 3, label: "Visualize Dataset" },
  { id: 4, label: "Train Models" },
  { id: 5, label: "Compare Models" },
  { id: 6, label: "Predict Future Stock Price" },
  { id: 7, label: "Predict Tomorrow Trend" },
  { id: 8, label: "Stock Information" },
  { id: 9, label: "Run Full ML Study (Units I–V)" },
  { id: 10, label: "Exit" },
] as const;

export const DATASET_PREVIEW = [
  { date: "2012-02-21", open: 5561.9, high: 5621.5, low: 5561.75, close: 5607.15, volume: 231132126 },
  { date: "2012-02-22", open: 5614.65, high: 5624.2, low: 5586.3, close: 5614.5, volume: 193567890 },
  { date: "2012-02-23", open: 5620.1, high: 5648.75, low: 5605.2, close: 5634.2, volume: 178234512 },
  { date: "2012-02-24", open: 5638.5, high: 5655.0, low: 5610.8, close: 5622.45, volume: 165890443 },
  { date: "2012-02-27", open: 5625.0, high: 5680.3, low: 5618.9, close: 5675.1, volume: 201445678 },
  { date: "2012-02-28", open: 5680.0, high: 5695.4, low: 5650.2, close: 5668.75, volume: 187654321 },
  { date: "2012-02-29", open: 5665.3, high: 5678.9, low: 5632.1, close: 5645.6, volume: 176543210 },
  { date: "2012-03-01", open: 5648.0, high: 5710.5, low: 5640.0, close: 5702.3, volume: 198765432 },
  { date: "2012-03-02", open: 5705.0, high: 5725.8, low: 5688.4, close: 5718.9, volume: 182345678 },
  { date: "2012-03-03", open: 5720.0, high: 5735.2, low: 5695.6, close: 5705.4, volume: 169876543 },
];

export const REGRESSION_MODELS = [
  { name: "Linear Regression", mae: 154.87, rmse: 215.31, r2: 0.9776 },
  { name: "Decision Tree Regressor", mae: 4158.78, rmse: 4397.26, r2: -8.3387 },
  { name: "Random Forest Regressor", mae: 3966.13, rmse: 4212.21, r2: -7.5692 },
];

export const CLASSIFICATION_MODELS = [
  { name: "Logistic Regression", accuracy: 0.5146, precision: 0.5259, recall: 0.7798, f1: 0.6282, best: true },
  { name: "Decision Tree Classifier", accuracy: 0.5077, precision: 0.5441, recall: 0.3926, f1: 0.4561, best: false },
  { name: "Random Forest Classifier", accuracy: 0.4798, precision: 0.5588, recall: 0.0504, f1: 0.0925, best: false },
  { name: "K-Nearest Neighbors Classifier", accuracy: 0.4923, precision: 0.519, recall: 0.4721, f1: 0.4944, best: false },
];

export const FULL_ML_STUDY = [
  { model: "Majority Baseline", cvAuc: 0.5, testAcc: "52.60%", balAcc: "50.00%", f1: "0.6894", mcc: "+0.000", testAuc: "—" },
  { model: "Logistic Regression", cvAuc: 0.5276, testAcc: "53.02%", balAcc: "51.72%", f1: "0.6322", mcc: "+0.040", testAuc: "0.5189" },
  { model: "Naive Bayes", cvAuc: 0.5439, testAcc: "50.07%", balAcc: "50.54%", f1: "0.4662", mcc: "+0.011", testAuc: "0.5195" },
  { model: "SVM (RBF)", cvAuc: 0.5519, testAcc: "51.48%", balAcc: "50.30%", f1: "0.6128", mcc: "+0.007", testAuc: "0.5266" },
  { model: "Decision Tree", cvAuc: 0.5291, testAcc: "52.60%", balAcc: "50.00%", f1: "0.6894", mcc: "+0.000", testAuc: "0.5071" },
  { model: "Random Forest", cvAuc: 0.5538, testAcc: "52.32%", balAcc: "51.51%", f1: "0.5969", mcc: "+0.032", testAuc: "0.5295", selected: true },
  { model: "KNN (k=25)", cvAuc: 0.5366, testAcc: "48.95%", balAcc: "48.42%", f1: "0.5468", mcc: "-0.032", testAuc: "0.4978" },
  { model: "Gradient Boosting", cvAuc: 0.546, testAcc: "50.49%", balAcc: "50.06%", f1: "0.5533", mcc: "+0.001", testAuc: "0.5087" },
  { model: "Soft Voting Ensemble", cvAuc: 0.5489, testAcc: "53.16%", balAcc: "52.37%", f1: "0.6031", mcc: "+0.050", testAuc: "0.5235" },
  { model: "MLP Neural Network", cvAuc: 0.5447, testAcc: "52.32%", balAcc: "51.22%", f1: "0.6152", mcc: "+0.027", testAuc: "0.5221" },
];

export const STOCK_INFO = {
  symbol: "^NSEI",
  name: "NIFTY 50",
  exchange: "National Stock Exchange of India (NSE)",
  type: "Market index (50 large-cap Indian equities)",
  currency: "INR",
  dataSource: "Yahoo Finance (yfinance) or bundled CSV",
  featuresIteration1: "OHLCV, SMA-20, EMA-20, daily return, RSI-14, MACD",
  featuresIteration2:
    "16 stationary features: 1/5/10-day returns, MA ratios, RSI, MACD, volatility, ATR, Bollinger %B, gap, candle body, volume z-score + K-Means regime",
  labeledDays: 3551,
  livePredictionDay: "2026-09-25 (unlabelled, reserved for live prediction)",
};

export const PREDICTIONS = {
  price: {
    model: "Linear Regression",
    predictionDate: "2026-09-28",
    predictedClose: 23071.77,
    dataUpTo: "2026-09-25",
  },
  trend: {
    model: "Random Forest (walk-forward CV selected)",
    dataUpTo: "2026-09-25",
    predictionDate: "2026-09-28",
    trend: "UP",
    pUp: 51.16,
    pDown: 48.84,
    confidence: 51.16,
    disclaimer:
      "Note: hold-out accuracy of daily direction models is close to 50%; treat this as a probability, not a trading signal.",
  },
};

export const ARCHITECTURE_LAYERS = [
  {
    name: "DATA",
    color: "border-sky-400 bg-sky-950/40",
    items: [
      "Yahoo Finance (yfinance ^NSEI) or bundled nifty50_data.csv",
      "3,601 trading days · Feb 2012 – Sep 2026",
      "Chronological split: 2,840 train / 711 hold-out (no shuffle)",
    ],
  },
  {
    name: "FEATURES",
    color: "border-emerald-400 bg-emerald-950/40",
    items: [
      "Iteration 1: OHLCV + SMA/EMA/RSI/MACD",
      "Iteration 2: 16 leakage-free stationary indicators",
      "Unit III: K-Means regimes (Bullish / Sideways / Bearish)",
    ],
  },
  {
    name: "MODELS",
    color: "border-amber-400 bg-amber-950/40",
    items: [
      "Regression: OLS, SGD, Decision Tree, Random Forest",
      "Classifiers: LR, NB, SVM, DT, RF, KNN, GB, soft voting, MLP",
      "Majority-class baseline for significance testing",
    ],
  },
  {
    name: "EVALUATION",
    color: "border-violet-400 bg-violet-950/40",
    items: [
      "5-fold walk-forward CV on training period (ROC-AUC selection)",
      "Hold-out metrics: Acc, F1, Balanced Acc, MCC, ROC-AUC",
      "Bootstrap CI, McNemar's test, paired t-test, bias–variance curve",
    ],
  },
  {
    name: "OUTPUT",
    color: "border-rose-400 bg-rose-950/40",
    items: [
      "Menu-driven CLI (this web mock): explore, train, predict, full study",
      "Saved artifacts: results/ figures, CSV tables, study_summary.json, saved_study_model.pkl",
    ],
  },
];

export const REPORT_FIGURES: Record<string, { src: string; caption: string }> = {
  architecture: {
    src: "/report/architecture.png",
    caption: "Fig. 4.1 — System Architecture Diagram",
  },
  mainMenu: { src: "/report/main-menu.png", caption: "Fig. 5.3.1 — Main Menu of the CLI Application" },
  dataset: { src: "/report/dataset-overview.png", caption: "Fig. 5.3.2 — Dataset Overview" },
  training: { src: "/report/model-training.png", caption: "Fig. 5.3.3 — Model Training and Comparison" },
  mlStudy: { src: "/report/full-ml-study.png", caption: "Fig. 5.3.4 — Full ML Study Output" },
  regime: { src: "/report/market-regime.png", caption: "Fig. 5.3.5 — Market Regime Detection (K-Means)" },
  prediction: { src: "/report/price-trend-prediction.png", caption: "Fig. 5.3.6 — Price and Trend Prediction" },
  holdout: { src: "/report/holdout-performance.png", caption: "Hold-out performance (Iteration 2)" },
  confusion: { src: "/report/confusion-matrix.png", caption: "Confusion Matrix — Random Forest (711-day hold-out)" },
  roc: { src: "/report/roc-curve.png", caption: "ROC Curve — hold-out period" },
  biasVariance: { src: "/report/bias-variance.png", caption: "Bias–variance trade-off (decision tree depth)" },
  actualVsPredicted: {
    src: "/report/actual-vs-predicted.png",
    caption: "NIFTY 50 next-day close — actual vs predicted (test period)",
  },
};
